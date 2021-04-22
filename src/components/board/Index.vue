<template>
	<div>

		<todo-item
			v-for="(todo, i) in listData" :key="i"
			:isChecked="isChecked"
			:todoItem ="todo"
			
			@check="checkTodo"
			@delete="toggleTodo"
            
		></todo-item>


	</div>
</template>

<script>
import TodoItem from './TodoItem.vue'
export default {
	name: "BoardList",
	components: {
		TodoItem
	},
	props:{
		listData: {
			type: Array,
		},
		isChecked: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		checkTodo(todo){
			this.$emit('check',todo)
		},
		toggleTodo(todo){
			this.$emit('delete',todo)
		}
	}
};
</script>

<style lang="scss" scoped>

</style>