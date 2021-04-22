<template>
	<div>
		<div
			class="list"
			:class="{ checked: todoItem.isEnd }"
		>
			<button @click="$emit('check', todoItem)" class="btn-chk">DO</button>
			<p class="label">{{ todoItem.title }}</p>
			<div>
				<button @click="$emit('delete', todoItem)">X</button>
				<p>{{ todoItem.date | moment("D. ddd") }}</p>
			</div>
		</div>
	</div>
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
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #fff;
	padding: 10px;

	& + .list {
		border-top: 1px solid #ddd;
	}

	> p {
		word-break: break-all;
		max-width: 55%;
	}

	> div p {
		color: #ccc;
		font-size: 12px;
		font-weight: 300;
		padding-top: 10px;
	}
}

.checked {
	.label {
		text-decoration: line-through;
		color: #ddd;
	}

	.btn-chk {
		color: #ddd;
	}
}
</style>