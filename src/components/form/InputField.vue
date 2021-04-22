<template>
	<div class="form-item">
		<input
				:value="value"
				:type="type"
				:id="id"
				:placeholder="placeholder"
				@input="change"
				@keyup.enter="addNewTodo">
	</div>
</template>
<script>
	export default {
		name: 'inputField',
		props: [
			'type',
			'name',
			'id',
			'value',
			'placeholder',
		],
		methods: {
			change: function($event) {
				this.$emit('input', $event.target.value);
			},
			addNewTodo:function($event) {
				//인풋에서 엔터 쳤을 경우 값이 enterResult 안으로 들어가게 함
				if ($event.target.value == '')
					return;
				document.querySelector("#enterResult").innerHTML += this.value + '<br>';
				this.value = '';
			}
		}
	}
</script>