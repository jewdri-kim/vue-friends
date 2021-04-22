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
        <!-- 
			투두 리스트 가져오기 오류
			<strong>{{ todoChkNum }}</strong><span>{{ todoList.length }}</span> 
		-->
      </div>
      <div class="add-box" :class="{ active: isShow }">
        <button class="add-btn" @click="todoShow">추가</button>
        <form >
          <div class="form">
            <div class="form-group">
              <input-field
                  v-model="inputTodo"
                  type="text"
                  id="todo"
                  placeholder="오늘 할 일!"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
	import InputField from "@/components/form/InputField";

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
				timeIcon: "",
				inputTodo: '',
				isShow: false,

				todoChkNum:0,
			}
		},
		methods: {
			dateInfo: function() {
				const today = new Date();

				// 날짜
				const year = today.getFullYear();
				this.year = year;
				const month = today.getMonth()+1;
				this.month = month;
				const date = today.getDate();
				this.date = date;
				/* days 가 오류가 왜 나는지 모르겠음 ...
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
				const day = today.getDay();
				this.day = days[today.getDay()];
				*/
				// 시간
				const time = this.timeLeft(''+today.getHours()) + ":" + this.timeLeft(''+today.getMinutes());
				this.time = time;

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
			addTodo: function(){
				this.todoList.push({
					id:this.todoList.length+1,
					content: this.inputTodo,
					done: false
				});

				this.inputTodo = '';
			},
			removeTodo: function() {
				//하나씩 삭제
			},
		},
		mounted () {
			//this.dateInfo();
			setInterval(this.dateInfo, 100); //실시간 반영
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
				padding:70px 40px 0;
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
					}
				}
			}
		}
	}
</style>