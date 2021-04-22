<template>
	<section class="todo-wrap">
    <Header />
		<div class="todo-body">

			<input type="text" v-model="todoInput" @keyup.enter="addNewTodo" />

			<button @click="$emit('clear')">DO clear</button>

			<board-list
				style="margin-top:15px"
				:todoList="activeTodoList"
				:isChecked="isChecked"
				@check="checkTodo"
				@delete="toggleTodo"
			></board-list>


		</div>
    <Footer />
	</section>
</template>
<script>
import Header from "@/layout/VueHeader";
import Footer from "@/layout/VueFooter";
import BoardList from "@/components/board/Index.vue";

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
		};
	},

	// json 객체로 만든다(html안에서 내부 변수처럼 사용)
	computed: {
		//삭제 버튼 클릭시 on/off
		activeTodoList() {
			// filter()는 배열 내 각 요소에 대해 한 번 제공된 callback 함수를 호출해, callback이 true로 강제하는 값을 반환하는 모든 값이 있는 새로운 배열을 생성합니다.

			//return this.todoList.filter((todo) => todo.state === "active")
			return this.$store.getters.addTodoList
		},
	},
	methods: {
		//todo 추가
		addNewTodo() {
			let item = {
				label: this.todoInput, //input 값
				state: "active", //상태
				isChecked: false, //체크여부
			}

			this.$store.dispatch('addNewTodo', item)
			this.todoInput = "" //이벤트 후 리셋
			// console.log(this.todoList)
		},

		//삭제 버튼 클릭 시 상태값 변경
		toggleTodo(todo) {
			todo.state = todo.state === "active" ? "done" : "active"
		},

		//체크 클릭 시 클래스 추가
		checkTodo(todo) {
			todo.isChecked = !todo.isChecked
			//console.log(todo);
		},

		//do 전부 삭제
		doClear(){
			//isChecked 가 true이면 state값을 done으로 바꿔준다.
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