<template>
    <transition name="spinner" appear disappear>
      <div class="spinner" v-if="visible">
          <img src="@/assets/img/img_spinner.gif"  alt="">
      </div>
    </transition>
</template>

<script>

export default {
	name: 'Spinner',
	props: {
		visible :{}
	},
    data() {
    },
	methods: {
	}
}
</script>

<style lang="scss" scoped>
	.spinner-enter-active, .spinner-leave-active {
		transition:0.3s;
	}
	.spinner-leave-active {
		position:absolute;
	}
	.spinner-enter, .spinner-leave-to {
		opacity:0;
	}
    .spinner{
        display:flex;
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        align-content:center;
        align-items:center;
        justify-content:center;

        &:before{
            display:block;
            content:'';
            z-index:1;
            position:fixed;top:0;left:0;
            width:100%;height:100%;
            background:rgba(0,0,0,0.3);
        }

        img{
            position:relative;
            display:inline-flex;
            width:176px;
            height:140px;
            z-index:2;
        }
    }
</style>
