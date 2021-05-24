import Vue from 'vue'
import Vuex from 'vuex'
import {axiosDefault} from '@/store/api/BaseAxios'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production', // ture : 성능이슈,
	state: {
		todoList: [
			{
				title: '달리기',
				date: '2021-01-01 03:33:21',
				isEnd: false,
				id: 1
			}
		],
		toDayDate: new Date(),
		time: new Date()
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
		},
		clearToToList(state) {
			localStorage.clear();
			state.todoList = [];
		},
		completedToDo(state, todoItem) {
			state.todoList.forEach(item => {
				if (item.id === todoItem.id) {
					item.isEnd = !item.isEnd;
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
        updateDateTime(state){
            state.toDayDate = new Date();
            state.time = new Date();
        },
	},
	actions: {
		completedToDo({commit}, todoItem) { // {commit}
			commit('completedToDo', todoItem);
		},
		deleteToDoItem({commit}, todoItem) {
			commit('deleteToDoItem', todoItem);
		},
		addToDoItem({commit}, todoItem) {	
            if(this.state.todoList.length > 0){	
                todoItem.id = this.state.todoList[this.state.todoList.length - 1].id + 1;
            }else{
                todoItem.id = 1;
            }
            commit('updateDateTime');
            let today = this.getters.toDayDate;
            let time = this.getters.time;
            todoItem.date = today + ' ' + time;
            commit('addToDoItem', todoItem);
		},
		/*
		initTodoList({commit}) {
			commit('initTodoList');
		},
		*/
		async initTodoList({commit}, userId) {
			await axiosDefault()
                .get("/api/v1/todos/" + userId)
                .catch((error) => {
                    console.log("error : " + error)
                })
                .then((response) => {
					commit('initTodoList', response.data);
                })
		},
		clearToToList({commit}) {
			commit('clearToToList');
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
		}
	},
	methods: {

	}
})