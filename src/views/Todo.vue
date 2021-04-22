<template>
	<section class="todo-wrap">
    <Header />
		<div class="todo-body">
            <!--
			<input type="text" v-model="todoInput" @keyup.enter="addNewTodo" />-->

			<button @click="clearAll()">Clear All</button>

			<board-list
				style="margin-top:15px"
				:listData="todoList"
				:isChecked="isChecked"
                :noDataString="noDataString"
				@check="checkTodo"
				@delete="deleteTodo"
			></board-list>


		</div>
    <Footer />
	</section>
</template>
<script>
import Header from "@/layout/VueHeader";
import Footer from "@/layout/VueFooter";
import BoardList from "@/components/board/Index.vue";
import { mapState } from "vuex";

export default {
	name: "Todo",
	components: {
		// TodoItem,
		Header,
		Footer,
		BoardList,
	},
	data() {
		return {
			isChecked: false,
			todoInput: "",
			// todoList: []
            addTodo:{
                title:null,
                date: new Date(),
                isEnd : false
            },
            noDataString: '할일 목록이 없습니다.'
		};
	},

	// json 객체로 만든다(html안에서 내부 변수처럼 사용)
	computed: {
        ...mapState(['todoList']),
		//삭제 버튼 클릭시 on/off
		activeTodoList() {
			// filter()는 배열 내 각 요소에 대해 한 번 제공된 callback 함수를 호출해, callback이 true로 강제하는 값을 반환하는 모든 값이 있는 새로운 배열을 생성합니다.

			//return this.todoList.filter((todo) => todo.state === "active")
			return this.$store.getters.addTodoList
		},
	},
	methods: {
		//삭제 버튼 클릭 시 상태값 변경
		deleteTodo(todo) {
			this.$store.dispatch('deleteToDoItem', {...todo});
		},
		//체크 클릭 
		checkTodo(todo) {
			this.$store.dispatch('completedToDo', {...todo});
		},
		//전부 삭제
		clearAll(){
			this.$store.dispatch('clearToToList');
		}
	},
};
</script>
<style lang="scss" scoped>
.todo-wrap{
  position:relative;
  height:100vh;
  border:1px solid #ddd;
	.todo-body{
		overflow:hidden;
		position:absolute;
		top:30%;
		left:50%;
		background:#f8f8f8;
		width:90%;
		height:60%;
		transform:translateX(-50%);
		.todo-list{
			height:100%;
			overflow-y:scroll;
		}
		ul{
			padding:20px;
			li{
				position:relative;
				padding:15px 10px;
				background:#fff;
				&+li{
					margin-top:20px;
				}
				.del-btn{
					position:absolute;
					top:50%;
					right:10px;
					transform:translateY(-50%);
					background:transparent;
				}
				p{

				}
			}
		}
	}
}
input {
	background-color: #fff;
}
</style>