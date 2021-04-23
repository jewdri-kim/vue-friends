<template>
    <div class="todo-header">
		<div class="time-box">
			{{ time }} {{ timeText }}
		</div>
		<div class="date-box">
			<div>
				<span class="day">{{ day }}</span>
			</div>
			<div>
				<span class="year">{{ year }}</span><br/>
				<span class="month">{{ month }}</span>
				<span class="date">{{ date }}</span>
			</div>
		</div>
		<div class="task-box">
			<strong>{{ todoChkNum }}</strong><span>{{ todoList.length }}</span> 
		</div>
		<div class="add-box" :class="{ active: isShow }">
			<button class="add-btn" @click="todoShow">추가</button>
			<form >
				<div class="form">
					<div class="form-group">
						<input-field
							v-model="addTodo.title"
							type="text"
							id="todo"
							placeholder="오늘 할 일!"
							@add="addNewTodo"
						/>
					</div>
					<button type="button" @click="addNewTodo">
						<span class="hide">입력</span>
						<i class="i-arr"></i>
					</button>
				</div>
			</form>
		</div>
    </div>
</template>

<script>
	import InputField from "@/components/form/InputField";
import { mapState } from "vuex";

	export default {
		name: 'Header',
		components:	{
			InputField,
		},
		data() {
			return {
				year: "",
				month: "",
				day: "",
				date: "",
				time: "",
				timeText: "",			
                addTodo:{
                    title:null,
                    date: new Date(),
                    isEnd : false
                },
				isShow: false,

				todoChkNum:0,
			}
		},
		methods: {
			dateInfo: function() {
				const today = this.$store.state.toDayDate;
				const todayTime = new Date();
				//console.log("+++" + today)

				//날짜
				this.year = today.getFullYear();
				this.month = today.getMonth()+1;
				this.date = today.getDate();
				const
					days = [
						'일',
						'월',
						'화',
						'수',
						'목',
						'금',
						'토'
					]
				this.day = days[today.getDay()];

				// 시간
				this.time = this.timeLeft(''+todayTime.getHours()) + ":" + this.timeLeft(''+todayTime.getMinutes());

				// 시간 텍스트
				const timeBox = today.getHours();

				if(timeBox < 12){
					this.timeText = "Good morning";
				} else if(timeBox < 18){
					this.timeText = "Good afternoon"
				} else{
					this.timeText = "Good night"
				}
			},
			timeLeft: function(str) {
				// 한자리 숫자 앞에 0 붙이기
				const timeLeft = '00';
				return timeLeft.substring(0, timeLeft.length - str.length) + str;
			},
			todoShow: function () {
				this.isShow = !this.isShow;
			},
			//todo 추가
             addNewTodo() {            
                let item = this.addTodo;
                this.$store.dispatch('addToDoItem', {...item});
                this.addTodo.title = '';
                // console.log(this.todoList)
            },
			removeTodo: function() {
				//하나씩 삭제
			},
		},
		mounted () {
			//this.dateInfo();
			setInterval(this.dateInfo, 100); //실시간 반영
		},
		computed: {
			...mapState(['todoList']),
			todoListCompleted() {
				return this.$store.getters.getTodoListCompleted
			},
		},
	}
</script>
<style lang="scss">
	.todo-wrap{
		.todo-header{
			height:40%;
			background:#fff081;
			.time-box{
				position:absolute;
				top:15px;
				right:15px;
				color:#ff8f00;
				font-weight:700;
			}
			.date-box{
				position:absolute;
				top:12%;
				left:10%;
				>div{
					display:inline-block;
					vertical-align:middle;
					font-size:0;
					text-align:center;
					span{
						display:inline-block;
						font-size:16px;
						line-height:20px;
						color:#333;
					}
				}
				.day{
					font-size:34px;
					font-weight:900;
					margin-right:5px;
				}
				.month{
					&:after{
						content:'/';
						padding:0 1px;
					}
				}
			}
			.task-box{
				position:absolute;
				top:12%;
				right:10%;
				font-size:0;
				span{
					display:inline-block;
					font-size:20px;
					font-weight:800;
					color:#333;
				}
				strong{
					display:inline-block;
					font-size:30px;
					font-weight:800;
					color:#ff8f00;
					&:after{
						content:'/';
						color:#333;
						font-size:20px;
						padding:0 5px;
						display:inline-block;
					}
				}
			}
			.add-box{
				//position:relative;
				transition:all 0.5s ease-in;
				.add-btn {
					position: absolute;
					top: 20%;
					right: 7%;
					width: 40px;
					height: 40px;
					border: 1px solid #000;
					//background:#ff8f00;
					line-height: 40px;
					text-align: center;
					border-radius: 100%;
					font-size:0;
					&:before, &:after{
						content:'';
						position:absolute;
						top:50%;left:50%;
						transform:translate(-50%, -50%);
						background:#000
					}
					&:before{
						width:1px;height:18px;
					}
					&:after{
						width:18px;height:1px;
					}
				}
				.form{
					position:absolute;
					top:20%;
					right:5%;
					width:0%;
					text-align:center;
					transition:all 0.5s ease-in;
					//opacity:0;
					.form-group{
						input{
							padding:0;
							border:0;
							border-radius:30px;
							box-shadow:7px 7px 7px rgba(0,0,0,0.06);
						}
					}
					button{
						position: absolute;
						top: 50%;
						right: 15px;
						transform: translateY(-50%);
						background: #ffc107;
						border-radius: 100%;
						width: 30px;
						height: 30px;
						font-size: 0;
						opacity: 0;
						z-index: -1;
							.i-arr{
								&::before{
									content:'';
									position:absolute;top:50%;left:50%;
									display:inline-block; 
									width: 15px;height:1px;
									background:#fff;
									transform: translate(-50%,-50%);
									}
								&::after{
									content:'';
									position:absolute;top:50%;left:65%;
									display:inline-block; 
									width: 8px; height:8px;
									border-style: solid;border-color: transparent #fff #fff transparent;border-width: 0 1px 1px 0;
									-webkit-transform: rotate(-45deg);
									-ms-transform: rotate(-45deg);
									transform: translate(-50%,-50%) rotate(-45deg);
									margin-left:-1px;
									-webkit-transition: all .3s ease;-moz-transition: all .3s ease;transition: all .3s ease;
									}

							}
					}
				}
				&.active{
					.form {
						width: 90%;
						//opacity:1;
						.form-group {
							input {
								padding: 0 20px;
							}
						}
						button{
							opacity: 1;
							z-index: 1;
							transition: all .3s ease;
							transition-delay: 0.3s;
						}
					}
				}
			}
		}
	}
</style>