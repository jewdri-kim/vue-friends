<template>
		<li
			class="list"
			:class="{ checked: todoItem.isEnd }">
			<button @click="$emit('check', todoItem)" class="btn-chk">체크</button>
			<div class="content">
				<p class="label">{{ todoItem.title }}</p>
				<p class="date">{{ todoItem.date | moment("MM.D. ddd") }}</p>
			</div>
			<div class="side">
				<button @click="$emit('delete', todoItem)" class="btn-del">삭제</button>
			</div>
		</li>
</template>

<script>
export default {
	name: "TodoItem",
	props: {
		todoItem: {
			type: Object,
		},
		isChecked: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style lang="scss" scoped>
.list {
	position:relative;
	background: #fff;
	padding: 15px 15px;
	width:100%;

	& + .list {
		margin-top:10px;
	}

	.content {
		display:inline-block;
		word-break: break-all;
		padding:0 10px 0 20px;
		vertical-align:middle;
		p{
			font-size:14px;
			&.date{
				margin-top:8px;
				font-size:11px;
				color:#777;
			}
		}
	}
	.side{
		position:absolute;top:50%;right:30px;
		transform: translateY(-50%);
	}

	.btn-chk {
		position:relative;
		display:inline-block;
		color: #ddd;
		background:#fff;
		border:1px solid #ddd;
		width:25px;
		height:25px;
		border-radius:100%;
		font-size:0;
		vertical-align:middle;
		&::before{
			content: "";
			position: absolute;
			background: #ffbf0b;
			border-radius:15px;
			transform:translate(-6px, -2px) rotate(45deg);
			transform-origin: left;
			width: 7px;height: 2px;
		}
		&::after{
			content: "";
			position: absolute;
			background: #ffbf0b;
			border-radius: 15px;
			transform: translate(-2px, 3px) rotate(-45deg);
			transform-origin: left;
			width: 13px;
			height: 2px;
		}
	}
	.btn-del{
		font-size:0;
		&:before, &:after{
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			width: 15px;
			height: 1px;
			background-color: #000;
		}
		&:before{
			-webkit-transform: translate(-50%, -50%) rotate(45deg);
			transform: translate(-50%, -50%) rotate(45deg);
		}
		&:after{
			-webkit-transform: translate(-50%, -50%) rotate(135deg);
			transform: translate(-50%, -50%) rotate(135deg);
		}
	}
}

.checked {
	.content{
		p{
			color:#aaa !important
		}
	}

	.btn-chk {
		background:#ffbf0b;
		border:1px solid #ffbf0b;
		&:before, &:after{
			background:#fff;
		}
	}
}
</style>