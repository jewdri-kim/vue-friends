<template>
    <transition name="page-animation" appear disappear>
      <div class="pop-layer" :visible="visible" v-if="visible">
        <div class="dim"></div>
        <div class="pop-wrap">
          <div class="pop-content">
              <slot name="header"></slot>
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
  data() {
    return {

    }
  },
  methods: {
    close(){
      this.$emit('PopUpclose');
    }
  }
}
</script>

<style lang="scss" scoped>
    .pop-layer{
        position:fixed;top:0;left:0;
        width:100%;height:100%;
        z-index:999;
        .dim{
            z-index:1;
            position:fixed;top:0;left:0;
            width:100%;height:100%;
            background:rgba(0,0,0,0.8);
        }
        .pop-wrap{
            position:absolute;top:50%;left:50%;
            z-index:2;
            width:640px;
            background:#fff;
        }
        .pop-title{
            padding:27px 24px;
            border-bottom:1px solid #EBEBEB;
            .title{
                font-size:24px;
                font-weight:600;
            }
        }
        .pop-content{
            overflow:auto;
            overflow-x:hidden;
            max-height:90vh;
            &::-webkit-scrollbar{display:none}
        }
        .pop-close{
            display:flex;
            justify-content:space-between;
            a{
                display:block;
                padding:12px 20px;
                font-size:15px;
                line-height:25px;
            }
        }
        .btn-close{
            position:fixed;
            display:block;
            width:44px;height:44px;
            background:#000;
            bottom:80px;left:50%;
            z-index:10;
            transform:translateX(-50%);
            font-size:0;
            &:after{
                box-shadow:0 0 11px 5px rgba(0, 0, 0, 0.4);
            }
        }
        .btn-wrap{
            margin-top:0;
        }
        &.mid-pop{
            .pop-wrap{
                width:768px;
            }
            .cont-wrap{
                padding-bottom:70px;
            }
        }
        &.full-pop{
            background:rgba(255,255,255,0.94);
            .dim{
                display:none;
            }
            .pop-wrap{
                top:47%;
                left:0;
                margin-left:0!important;
                width:100%;
                background:none;
                .btn-wrap{
                    margin-top:110px;
                }
                [class^='btn-type']{
                    max-width:640px;
                    &.btn-l{
                        max-width:100%;
                    }
                }
            }
            .cont-wrap{
                padding:{
                    left:0;
                    right:0;
                    bottom:0;
                }
                .text-type{
                    font-size:48px;
                }
                .text-type2{
                    font-size:30px;
                }
                .text-type3{
                    font-size:24px;
                    color:#787878;
                }
                .btn-wrap{
                    margin-top:72px;
                }
                .img-box{
                    margin-top:50px;
                    &+.btn-wrap{
                        margin-top:50px;
                    }
                }
            }
            .terms-box{
                width:808px;
                padding:32px 16px 32px 48px;
                margin:40px auto 0;
                background:#fff;
                .terms-inner{
                    overflow:hidden;
                    overflow-y:auto;
                    height:185px;
                    padding-right:30px;
                    word-break:keep-all;
                    font-size:20px;
                    text-align:left;
                }
                p{
                    margin:5px 0 10px;
                    color:#787878;
                }
                
            }
            >.btn-close{
                bottom:30px;
            }
            .btn-close{
                background-position-x:-100px;
            }
            .spinner{
                .count{
                    color:#000;
                }
                &:after{
                    border:3px solid rgba(0,0,0,.3);
                    border-top-color:#fff;
                }
            }
            
        }
    }

    .pop-layer .pop-wrap{
    transform:translate(-50%,-50%);
    border-radius:50px;
    padding:30px;
    }
    .pop-layer .btn-close{left:initial;bottom:initial;top:0;right:-80px;}
    .pop-content dl{line-height:30px;font-size:16px;}
    .pop-content dl dt{font-size:20px;font-weight:600;}
    .pop-content dl dd{margin-top:10px;}
</style>
