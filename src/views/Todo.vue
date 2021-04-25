<template>
	<section class="todo-wrap">
		<Header />
		<div class="todo-body">
			<div class="filter-wrap">
				<div class="filter all-area">
					<button @click="popOpen()" class="btn-all" v-if="todoList.length > 0">
						<img src="@/assets/img/ico-del.png" class="ico-del"/>
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
				class="todo-list"
				:listData="todoList"
				:isChecked="isChecked"
                :noDataString="noDataString"
				@check="checkTodo"
				@delete="deleteTodo"
			></board-list>
		</div>

        <popup :visible="popVisible" @PopUpclose="popVisible = false">
            <h2 slot="text">전체 할 일 목록이 없어집니다. <br>정말로 삭제하시겠습니까?</h2>
            <div class="btn-wrap">
                <a href="#" @click.prevent="clearAll" class="btn">예</a>
                <a href="#" @click.prevent="popVisible = false" class="btn v2">아니요</a>
            </div>
        </popup>
			<Footer />
	</section>
</template>
<script>
import Header from "@/layout/VueHeader";
import Footer from "@/layout/VueFooter";
import BoardList from "@/components/board/Index.vue";
import SelectField from '@/components/form/SelectField.vue';
import Popup from '@/layout/VuePopUp.vue';
import { mapState } from "vuex";
export default {
	name: "Todo",
	components: {
		Header,
		Footer,
		BoardList,
		SelectField,
		Popup
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
			popVisible: false
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
		popOpen(){
			this.popVisible = true;
        },
		//전부 삭제
		clearAll(){
            this.popVisible = false;
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
		height:60vh;
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
						.ico-del{
							position:relative;
							display:inline-block;
							width:15px;height:15px;
							vertical-align:middle;
						}
						span{
							display:inline-block;
							margin-left:7px;
							font-size:13px;
							vertical-align:middle;
							line-height:20px;
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
						top: 7px;
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
			height:85%;
			margin-top:15px;
		}
	}
}
</style>