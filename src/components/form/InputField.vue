<template>
	<div class="form-item">
		<input
				:value="value"
				:type="type"
				:id="id"
				:placeholder="placeholder"
				@input="change"
				@keyup.enter="addNew"
        >
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
			addNew:function($event) {
                //console.log('enter');
				this.$emit('add',$event.target.value);
			}
		}
	}
</script>