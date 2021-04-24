<template>
	<section class="todo-wrap">
		<Header />
		<div class="todo-body">

			<div class="filter-wrap">
				<div class="filter all-area">
					<button @click="clearAll()" class="btn-all">
						<i class="i-chk"></i>
						<span>전체 삭제</span>
					</button>
				</div>
				<div class="filter select-area">
					<select-field
						:options="options"
						v-model="selected"
						@input="listChange"
					></select-field>
				</div>
			</div>

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
import SelectField from '@/components/form/SelectField.vue';
import { mapState } from "vuex";

export default {
	name: "Todo",
	components: {
		Header,
		Footer,
		BoardList,
		SelectField,
	},
	data() {
		return {
			isChecked: false,
			todoInput: "",
            addTodo:{
                title:null,
                date: new Date(),
                isEnd : false
            },
            noDataString: '목록이 없습니다.',
			selected: "",
			options: [
				{
					text: "정렬",
					value: "",
				},
				{
					text: "latest",
					value: "A",
				},
				{
					text: "oldest",
					value: "B",
				}
			],
		};
	},

	computed: {
        ...mapState(['todoList']),
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
		},
		//정렬
		listChange(){
			if( this.selected === 'A'){
				this.$store.dispatch('sortTodoList');
			} else {
				this.$store.dispatch('reverseTodoList');
			}
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
		.filter-wrap{
			font-size:0;
			padding:15px 30px 0;
			.filter{
				display:inline-block;
				width:50%;
				&.all-area{
					.btn-all{
						background:transparent;
						font-size:0;
						.i-chk{
							position:relative;
							display:inline-block;
							width:20px;height:20px;
							border:1px solid #ddd;
							background:#fff;
							border-radius:100%;
							vertical-align:middle;
							/*
							&::before{
								content: "";
								position: absolute;
								background: #ffbf0b;
								border-radius:15px;
								-webkit-transform: translate(-5px, 7px) rotate(45deg);
								transform:translate(-5px, 7px) rotate(45deg);
								-webkit-transform-origin: left;
								transform-origin: left;
								width: 6px;height: 2px;
							}
							&::after{
								content: "";
								position: absolute;
								background: #ffbf0b;
								border-radius:15px;
								-webkit-transform:translate(-2px, 11px) rotate(-45deg);
								transform:translate(-2px, 11px) rotate(-45deg);
								-webkit-transform-origin: left;
								transform-origin: left;
								width: 9px;height: 2px;
							}
							*/
						}
						span{
							display:inline-block;
							margin-left:7px;
							font-size:13px;
							vertical-align:middle;
						}
					}
				}
				&.select-area{
					position:relative;
					text-align:right;
					&:after{
						content: "";
						z-index: 2;
						position: absolute;
						top: 12px;
						right: 0px;
						display: inline-block;
						width: 7px;
						height: 7px;
						border-style: solid;
						border-color: transparent #000 #000 transparent;
						border-width: 0 1px 1px 0;
						-webkit-transform: rotate(45deg);
						-ms-transform: rotate(45deg);
						transform: rotate(45deg);
						-webkit-transition: all 0.15s ease-in-out;
						transition: all 0.15s ease-in-out;
					}
				}
			}
		}
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
</style>