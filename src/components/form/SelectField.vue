<template>
	<select 
		class="select-area"
		:name="name" 
		:id="id" 
		:value="value" 
		@change="updateInput"
	>
		<option
			v-for="(option, i) in options" :key="i" 
			:value="option.value"
		>{{option.text}}</option>
	</select>
</template>
<script>
	export default {
		name: 'SelectStyle',
		props: {
			value: {
				typs: String
			}, 
			name: {
				typs: String
			}, 
			id: {
				typs: String
			}, 
			options: {
				typs: String
			}
		},
		methods: {
			updateInput: function (e) {
				this.$emit('input', e.target.value)
			}
		}
	}
</script>
<style lang="scss" scoped>
.select-area {
	width: 85px;
	height: 40px;
}
</style>