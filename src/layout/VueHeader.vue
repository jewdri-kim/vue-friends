<template>
	<div class="todo-header">
		<div class="time-box">
			{{ time }}
			<!--{{ timeText }}-->
			<span v-if="type === 'morning'">
				<img src="@/assets/img/ico-morning.png" class="ico-time" />
			</span>
			<span v-else-if="type === 'afternoon'">
				<img src="@/assets/img/ico-afternoon.png" class="ico-time" />
			</span>
			<span v-else-if="type === 'night'">
				<img src="@/assets/img/ico-night.png" class="ico-time" />
			</span>
		</div>
		<div class="date-box">
			<div>
				<span class="day">{{ day }}</span>
			</div>
			<div>
				<span class="year">{{ year }}</span
				><br />
				<span class="month">{{ month }}</span>
				<span class="date">{{ date }}</span>
			</div>
		</div>
		<div class="task-box">
			<strong>{{ todoChkNum }}</strong
			><span>{{ todoList.length }}</span>
		</div>
		<div class="add-box" :class="{ active: isShow }">
			<button class="add-btn" @click="todoShow">추가</button>
			<form>
				<div class="form">
					<div class="form-group">
						<input-field
							v-model="addTodo.text"
							type="text"
							id="todo"
							placeholder="Add New Task!"
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
		<popup :visible="popVisible" @PopUpclose="popVisible = false">
			<h2 slot="text">할 일을 입력해주세요.</h2>
			<div class="btn-wrap">
				<a href="#" @click.prevent="popVisible = false" class="btn"
					>확인</a
				>
			</div>
		</popup>
	</div>
</template>

<script>
import InputField from "@/components/form/InputField.vue";
import Popup from "@/layout/VuePopUp.vue";
import { mapState } from "vuex";

export default {
	name: "Header",
	components: {
		InputField,
		Popup,
	},
	data() {
		return {
			year: "",
			month: "",
			day: "",
			date: "",
			time: "",
			timeText: "",
			addTodo: {
				// title:null,
				// date: new Date(),
				// isEnd : false

				id: null,
				text: null,
				isEnd: false,
				state: 1,
				created_at: new Date(),
				updated_at: null,
			},
			isShow: false,
			isActive: false,
			popVisible: false,
			type: "morning",
		};
	},
	methods: {
		dateInfo: function () {
			const today = this.$store.state.toDayDate;
			const todayTime = new Date();
			//console.log("+++" + today)

			//날짜
			this.year = today.getFullYear();
			this.month = today.getMonth() + 1;
			this.date = today.getDate();
			const days = ["일", "월", "화", "수", "목", "금", "토"];
			this.day = days[today.getDay()];

			// 시간
			this.time =
				this.timeLeft("" + todayTime.getHours()) +
				":" +
				this.timeLeft("" + todayTime.getMinutes());

			// 시간 텍스트
			const timeBox = today.getHours();

			if (timeBox < 12) {
				this.type = "morning";
			} else if (timeBox < 18) {
				this.type = "afternoon";
			} else {
				this.type = "night";
			}
		},
		timeLeft: function (str) {
			// 한자리 숫자 앞에 0 붙이기
			const timeLeft = "00";
			return timeLeft.substring(0, timeLeft.length - str.length) + str;
		},
		todoShow: function () {
			this.isShow = !this.isShow;
		},
		//todo 추가
		addNewTodo() {
			let item = this.addTodo;
			if (item.text === "" || item.text === null) {
				console.log("빈값");
				this.popVisible = true;
			} else {
				this.$store.dispatch("addToDoItem", { ...item });
				this.addTodo.text = "";
			}
			// console.log(this.todoList)
		},
	},
	mounted() {
		//this.dateInfo();
		setInterval(this.dateInfo, 100); //실시간 반영
	},
	computed: {
		...mapState(["todoList"]),
		todoListCompleted() {
			return this.$store.getters.getTodoListCompleted;
		},
		todoChkNum() {
			return this.$store.state.todoList.filter((item) => item.isEnd)
				.length;
		},
	},
};
</script>
<style lang="scss">
.todo-wrap {
	.todo-header {
		height: 40%;
		background: #fff081;
		.time-box {
			position: absolute;
			top: 10px;
			right: 15px;
			color: #ff8f00;
			font-weight: 700;
			.ico-time {
				width: 40px;
			}
		}
		.date-box {
			position: absolute;
			top: 11%;
			left: 10%;
			> div {
				display: inline-block;
				vertical-align: middle;
				font-size: 0;
				text-align: center;
				span {
					display: inline-block;
					font-size: 16px;
					line-height: 20px;
					color: #333;
				}
			}
			.day {
				font-size: 34px;
				font-weight: 900;
				margin-right: 5px;
			}
			.month {
				&:after {
					content: "/";
					padding: 0 1px;
				}
			}
		}
		.task-box {
			position: absolute;
			top: 11%;
			right: 10%;
			font-size: 0;
			span {
				display: inline-block;
				font-size: 22px;
				font-weight: 800;
				color: #333;
			}
			strong {
				display: inline-block;
				font-size: 40px;
				font-weight: 800;
				color: #ff8f00;
				&:after {
					content: "/";
					color: #333;
					font-size: 22px;
					padding: 0 5px;
					display: inline-block;
				}
			}
		}
		.add-box {
			//position:relative;
			transition: all 0.5s ease-in;
			.add-btn {
				position: absolute;
				top: 20%;
				right: 7%;
				width: 40px;
				height: 40px;
				border: 1px solid #ff8f00;
				background: #ff8f00;
				line-height: 40px;
				text-align: center;
				border-radius: 100%;
				font-size: 0;
				&:before,
				&:after {
					content: "";
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					background: #ffeb3b;
				}
				&:before {
					width: 2px;
					height: 18px;
				}
				&:after {
					width: 18px;
					height: 2px;
				}
			}
			.form {
				position: absolute;
				top: 20%;
				right: 5%;
				width: 0%;
				text-align: center;
				transition: all 0.5s ease-in;
				//opacity:0;
				.form-group {
					input {
						padding: 0;
						border: 0;
						border-radius: 30px;
						box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.06);
					}
				}
				button {
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
					.i-arr {
						&::before {
							content: "";
							position: absolute;
							top: 50%;
							left: 50%;
							display: inline-block;
							width: 15px;
							height: 1px;
							background: #fff;
							transform: translate(-50%, -50%);
						}
						&::after {
							content: "";
							position: absolute;
							top: 50%;
							left: 65%;
							display: inline-block;
							width: 8px;
							height: 8px;
							border-style: solid;
							border-color: transparent #fff #fff transparent;
							border-width: 0 1px 1px 0;
							-webkit-transform: rotate(-45deg);
							-ms-transform: rotate(-45deg);
							transform: translate(-50%, -50%) rotate(-45deg);
							margin-left: -1px;
							-webkit-transition: all 0.3s ease;
							-moz-transition: all 0.3s ease;
							transition: all 0.3s ease;
						}
					}
				}
			}
			&.active {
				.form {
					width: 90%;
					//opacity:1;
					.form-group {
						input {
							padding: 0 20px;
						}
					}
					button {
						opacity: 1;
						z-index: 1;
						transition: all 0.3s ease;
						transition-delay: 0.3s;
					}
				}
			}
		}
	}
}
.popup-wrap {
	h2 {
		font-size: 14px;
		font-weight: 300;
		line-height: 20px;
	}
	.btn-wrap {
		margin-top: 25px;
		.btn {
			display: inline-block;
			padding: 15px 20px;
			background: #fff081;
			font-size: 13px;
			color: #222;
			border-radius: 30px;
			min-width: 70px;
			& + .btn {
				margin-left: 15px;
				background: #ddd;
			}
		}
	}
}
</style>