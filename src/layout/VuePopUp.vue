<template>
    <transition name="popup" appear disappear>
      <div class="popup-wrap" :visible="visible" v-if="visible">
        <div class="dim"></div>
        <div class="popup-inner">
          <div class="popup-content">
              <slot name="text"></slot>
              <slot></slot>
          </div>
          <button class="btn-close" @click="close">팝업닫기</button>
        </div>
      </div>
    </transition>
</template>

<script>
export default {
	name: 'Popup',
	props: {
		visible :{}
	},
	methods: {
		close(){
			this.$emit('PopUpclose');
		}
	}
}
</script>

<style lang="scss" scoped>
    .popup-wrap{
        position:fixed;top:0;left:0;
        width:100%;height:100%;
        z-index:999;
        .dim{
            z-index:1;
            position:fixed;top:0;left:0;
            width:100%;height:100%;
            background:rgba(0,0,0,0.3);
        }
        .popup-inner{
            position:absolute;top:50%;left:50%;
            z-index:2;
            width:80%;
            background:#fff;
            border-radius:15px;
            transform:translate(-50%,-50%);
            text-align:center;
            padding:70px 10px 50px;
        }
        .popup-content{
            overflow:auto;
            overflow-x:hidden;
            max-height:90vh;
            &::-webkit-scrollbar{display:none}
        }
        .btn-close{
            position:absolute;
            top:30px;right:30px;
            display:block; 
            font-size:0;
            z-index:100;
            &:before, &:after{
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 20px;
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
	.popup-enter-active, .popup-leave-active {
		transition:0.3s;
	}
	.popup-leave-active {
		position:absolute;
	}
	.popup-enter, .popup-leave-to {
		opacity:0;
	}
</style>
