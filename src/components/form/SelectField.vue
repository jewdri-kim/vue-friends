<template>
	<select 
		class="select"
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
//스타일 수정
.select {
	width:85px;
	padding: 0 35px 0 15px;
	color: #222;
}
</style>