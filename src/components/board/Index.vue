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
        <div v-else class="nodata-wrap">
			<div class="nodata">
				<img src="@/assets/img/ico-nodata.png" class="ico-nodata"/>
				<p>{{ noDataString }}</p>
			</div>
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
		height:100%;
		overflow-y:scroll;
	}
	.nodata-wrap{
		position:relative;
		height:100%;
		margin:0 15px;
		background:#fff;
		border-radius: 12px;
		text-align:center;
		.nodata{
			position:absolute;
			top:50%;
			width:100%;
			text-align:center;
			transform: translateY(-50%);
		}
		.ico-nodata{
			width:50px;
			margin-bottom:10px;
		}
	}
</style>