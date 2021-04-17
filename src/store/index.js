import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    todoList: [
      { /*
        date: Date,
        do : String,
        isEnd : Boolean
        id: Number */
      }
    ],
    toDayDate : null,
    time : null,
    todoChkNum : null
  },
  mutations: {
    addToDoItem(todoItem){
      localStorage.setItem(todoItem, todoItem);
      this.todoList.push(todoItem);
     },
    deleteToDoItem(todoItem, index){
      localStorage.removeItem(todoItem);
      this.todoList.splice(index,1);
    },
    clearToToList(){
      localStorage.clear();
      this.todoList = [];
    },
    completedToDo(todoItem, index){
      this.todoList[index].isEnd = !this.todoList[index].isEnd;
    }
  },
  actions: {
    addToDoItem(context, todoItem){
      context.commit('addToDoItem',todoItem);
    }
  },
  modules: {
  },
  getters:{
    toDayDate (){},
    time(){}
  }
})
