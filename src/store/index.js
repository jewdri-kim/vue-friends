import Vue from 'vue'
import Vuex from 'vuex'
import axios from './api/BaseAxios'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production', // ture : 성능이슈,
	state: {

//  [{
//     id: Number, // 각 todoslit의 id(할일 아이디) : device의 고유번호를 넣어주면 됨. axios get 테스트 시에는 1을 사용
//     text: String, // 할일 내용, 기존의 title
//     state: Number, // 상태값(1: 미완료, 2: 완료)
//     created_at: String, // 생성일시(format: 2021-05-13 08:57:55)
//     updated_at: String, // 수정일시(format: 2021-05-13 09:06:16)
// }]

// todoList: [{
// 	title: '달리기',
// 	date: '2021-01-01 03:33:21',
// 	isEnd: false,
// 	id: 1,
// }],
		todoList: [
			// {
			// 	id: 1,
			// 	text: '달리기',
			// 	isEnd: false,
			// 	state: 1,
			// 	created_at: '2021-01-01 03:33:21',
			// 	updated_at: null
			// }
		],
		
		toDayDate: new Date(),
		time: new Date(),
	},
	mutations: {
		addToDoItem(state, todoItem) {
			state.todoList.push(todoItem);
			let tmpData = JSON.stringify(state.todoList);
			localStorage.setItem('todoList', tmpData);
		},


		deleteToDoItem(state, todoItem) {
			state.todoList.forEach(function (item, index) {
				if (item.id === todoItem.id) {
					state.todoList.splice(index, 1);
				}
				//localStorage.removeItem(todoItem);
				let tmpData = JSON.stringify(state.todoList);
				localStorage.setItem('todoList', tmpData);
			})

			// 삭제 왜안돼~~~~~~~~~~~~~~~~~~
			// axios.delete("/api/v1/todos/3")
			// 	.then(res => {

			// 		state.todoList.forEach(function (item, index) {
			// 			if (item.id === state.todoList.id) {
			// 				state.todoList.splice(index, 1);
			// 			}
			// 			//localStorage.removeItem(todoItem);
			// 			let tmpData = JSON.stringify(	res.data.data);
			// 				localStorage.setItem('todoList', tmpData);
			// 		})

					
			// 		console.log(` 삭제 ${res.data.data}`)
			// 	})
			// 	.catch(err => {
			// 		console.log(err)
			// 	})
			
			
		},


		clearToToList(state) {
			localStorage.clear();
			state.todoList = [];
		},
		completedToDo(state, todoItem) {

			// isEnd 값에 따라서 state값 바뀌기..왜안돼..?
			state.todoList.forEach(item => {
				if (item.id === todoItem.id) {
					item.isEnd = !item.isEnd;
					
					if (item.isEnd === false) {
						console.log('1')
						item.state === 1
					} else {
						console.log('2')
						item.state === 2
						
					}
				}
			})



			let tmpData = JSON.stringify(state.todoList);
			localStorage.setItem('todoList', tmpData);
		},
		initTodoList(state) {
			if (localStorage.getItem('todoList')) {
				state.todoList = JSON.parse(localStorage.getItem('todoList'));
			}
		},
		sortTodoList(state) {
			state.todoList.sort(function (a, b) {
				return new Date(a.date) - new Date(b.date)
			})
			let tmpData = JSON.stringify(state.todoList);
			localStorage.setItem('todoList', tmpData);
		},
		reverseTodoList(state) {
			state.todoList.sort(function (a, b) {
				return new Date(b.date) - new Date(a.date)
			})
			let tmpData = JSON.stringify(state.todoList);
			localStorage.setItem('todoList', tmpData);
		},
		updateDateTime(state) {
			state.toDayDate = new Date();
			state.time = new Date();
		},

	},
	actions: {
		completedToDo({commit}, todoItem) { // {commit}
			commit('completedToDo', todoItem);
		},
		deleteToDoItem({ commit }, todoItem) {
			commit('deleteToDoItem', todoItem);
		},


		addToDoItem({commit}, todoItem) {
			axios.post("/api/v1/todos/3", todoItem)
				.then(res => {
					if (res.data.length > 0) {
						res.data.id = this.state.todoList[this.state.todoList.length - 1].id + 1;
					} else {
						res.data.id = 1;
					}
					commit('updateDateTime');
					let today = this.getters.toDayDate;
					let time = this.getters.time;
					res.data.created_at = today + ' ' + time;
					commit('addToDoItem', todoItem);
				})
				.catch(err => {
					console.log(err)
				})
			
			// 디바이스 구별..어떻게...해...?
			// const deviceID = MediaDeviceInfo.deviceId
			// console.log(`deviceID : ${deviceID}`)

		},


		initTodoList({ commit }, todoList) {
			//console.log(this.state.todoList)

			axios.get("/api/v1/todos/3")
				.then(res => {
					console.log(res.data.data)
					// console.log(this.state.todoList)
					todoList = localStorage.setItem('todoList', JSON.stringify(res.data.data))
					commit("initTodoList", todoList)
				})
				.catch(err => {
					console.log(err)
				})

			commit('initTodoList', todoList);
		},


		clearToToList({commit}) {
			commit('clearToToList');
		},
		sortTodoList({commit}) {
			commit('sortTodoList');
		},
		reverseTodoList({commit}) {
			commit('reverseTodoList');
		},
		updateDateTime({commit}) {
			commit('updateDateTime');
		},
		updateTodoChkNum({commit}) {
			commit('updateTodoChkNum');
		},


	},
	modules: {},
	getters: {
		toDayDate(state) {
			let today = state.toDayDate;
			let month = today.getMonth() + 1;
			month = month < 10 ? ('0' + month) : month;
			today = today.getFullYear() + '-' +
				month + '-' + today.getDate();
			return today;

		},
		time(state) {
			let time = state.time;
			time = time.getHours() + ':' +
				time.getMinutes() + ':' +
				time.getSeconds();

			return time;
		}
	},
	methods: {

	}
})