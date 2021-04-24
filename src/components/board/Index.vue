<template>
	<div>
        <ul v-if="listData.length > 0" class="list-wrap">
            <todo-item 
                v-for="(todo, i) in listData" :key="i"
                :isChecked="isChecked"
                :todoItem ="todo"
                
                @check="checkTodo"
                @delete="toggleTodo"

            ></todo-item>
        </ul>
        <div v-else class="no-data">
           {{ noDataString }}
        </div>


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
        noDataString: {
            default: '게시글이 없습니다.'
        }
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
	.list-wrap{
		margin:0 15px;
	}
	.no-data{
		margin:0 15px;
		min-height:300px;
		padding:15px;
		background:#fff;
		border-radius: 12px;
		text-align:center;
		line-height:300px;
	}
</style>