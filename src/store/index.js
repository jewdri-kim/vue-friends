import Vue from 'vue'
import Vuex from 'vuex'
import axios from './api/BaseAxios'
//import {axiosDefault} from '@/store/api/BaseAxios'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production', // ture : 성능이슈,
	state: {
		loading:false,
		todoList: [
			// {
			// 	id: 1,
			// 	text: '달리기',
			// 	state: 1,
			// 	created_at: '2021-01-01 03:33:21',
			// 	updated_at: null
			// }
		],
		
		toDayDate: new Date(),
		time: new Date(),
		userId: ''
	},
	mutations: {
		addToDoItem(state, todoItem) {
			//console.log('mutations addToDoItem');
			//console.log(todoItem);
			state.todoList.push(todoItem);
		},

		deleteToDoItem(state , todoId) {
			//console.log(`todoId ${todoId}`)
			state.todoList.splice(todoId, 1)

		},
		clearToToList(state) {
			// ocalStorage.clear();
			state.todoList = [];
		},
		completedToDo( state , todoItemPayload ) {
			state.todoList[todoItemPayload.idx].state = todoItemPayload.state
		},
		initTodoList(state, todoList) {
			state.todoList = todoList
		},
		sortTodoList(state) {
			state.todoList.sort(function (a, b) {
				return new Date(a.created_at) - new Date(b.created_at)
			})
			// let tmpData = JSON.stringify(state.todoList);
			// localStorage.setItem('todoList', tmpData);
		},
		reverseTodoList(state) {
			state.todoList.sort(function (a, b) {
				return new Date(b.created_at) - new Date(a.created_at)
			})
			// let tmpData = JSON.stringify(state.todoList);
			// localStorage.setItem('todoList', tmpData);
		},
        updateDateTime(state){
            state.toDayDate = new Date();
            state.time = new Date();
		},
		getUserId(state , setUserId) {
			state.userId = setUserId
		},
		setLoading(state, isLoading){
			state.loading = isLoading;
		}
	},
	actions: {
		completedToDo({ commit }, todoItemPayload) { 
			//console.log(todoItemPayload)
			axios.patch("/api/v1/todos/" + todoItemPayload.item.id, {
				state: todoItemPayload.state,
				text: todoItemPayload.item.text })
				.then(() => {
					commit('completedToDo', todoItemPayload);
				})
		},

		deleteToDoItem({ commit }, todoItemPayload) {
			//console.dir(todoItemPayload)
			axios.delete("/api/v1/todos/" + todoItemPayload.item.id)
				.then(() => {
					commit('deleteToDoItem', todoItemPayload.idx);
				})
		},

		getUserId({commit}) {
			//로컬스토리지 확인
			if (localStorage.getItem('localUserId')) {
				let userId = localStorage.getItem('localUserId')
				commit('getUserId', userId)
			} else {
				axios.post('/api/v1/user')
					.then(res => {
						let setUserId = res.data.data.user_id
						//console.log(setUserId)
						commit('getUserId', setUserId)

						localStorage.setItem('localUserId', setUserId)
					})
			}
		},

		addToDoItem({state, commit}, todoItem) {
			axios.post("/api/v1/todos/" + state.userId, todoItem)
				.then(() => {
					//console.log(res.data.data);
					commit('addToDoItem', todoItem);
				})
				.catch(err => {
					console.log(err)
				})
		},

		initTodoList({ state, commit }) {
			axios.get("/api/v1/todos/" + state.userId)
				.then(res => {
					let todoList = res.data.data
					commit('initTodoList', todoList);
				})
				.catch(err => {
					console.log(err)
				})
		},

		// async initTodoList({state, commit}) {
		// 	await axiosDefault()
		// 		.get("/api/v1/todos/" + state.userId)
		// 		.then(res => {
		// 			let todoList = res.data.data
		// 			console.log(todoList)
		// 			commit('initTodoList', todoList);
		// 		})
		// 		.catch(err => {
		// 			console.log(err)
		// 		})
		// },

		clearToToList({state, commit}) {
			console.log('clearToToList');
			console.log(state.todoList);

			

			state.todoList.forEach((element)=>{
				axios.delete("/api/v1/todos/" + element.id)
				.then(res => {
					console.log(res)
				})
			})
			commit('clearToToList');
			
			/*
			axios.delete("/api/v1/todos/" + todoItemPayload.item.id)
				.then(res => {
					console.log(res)
					commit('deleteToDoItem', todoItemPayload.idx);
				})*/
		},
		sortTodoList({ commit }) {
			commit('sortTodoList');
		},
		reverseTodoList({ commit }) {
			commit('reverseTodoList');
		},
        updateDateTime({ commit }){
			commit('updateDateTime');
        },
        updateTodoChkNum({ commit }){
			commit('updateTodoChkNum');
        },
		setLoading( { commit }, isLoading){	
			commit('setLoading', isLoading);
		}
	},
	modules: {},
	getters: { 
		toDayDate(state) {
			let today = state.toDayDate;
            let month = today.getMonth() + 1;
            month = month  < 10 ?  ('0' + month) : month;
			today = today.getFullYear() + '-' +
                    month + '-' +  today.getDate();
			return today;

		},
		time(state) {
			let time = state.time;
			time = time.getHours() + ':' +
				time.getMinutes() + ':' +
				time.getSeconds();
				
			return time;
		},

	},
	methods: {

	}
})