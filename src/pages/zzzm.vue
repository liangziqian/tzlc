<template>
    <div>
        <!-- <div v-title>常见问题</div> -->
        <div class='warpper'>
            <div class='cf zzzm-1' @click="guoziflag=!guoziflag">
                  <span>国资背景<i></i></span>
            </div>
            <div class="zhanshi" v-show="guoziflag">
              <img class="guozi" v-bind:src="guozi_1" @click="onshow(guozi_1)">
              <p>国粮鼎峰泰（天津）粮油贸易</p>
              <img class="guozi" v-bind:src="guozi_2" @click="onshow(guozi_2)">
              <p>浙江青柠网络科技</p>
              <img class="guozi" v-bind:src="guozi_3" @click="onshow(guozi_3)">
              <p>内蒙古通辽国家粮食储备库</p>
            </div>
            <div class='cf zzzm-2' @click="cunguanflag=!cunguanflag">
                <span>银行存管协议<i></i></span>
            </div>
            <div class="zhanshi" v-show="cunguanflag">
              <img class="picture" v-bind:src="cunguan_1" @click="onshow(cunguan_1)">
              <p>银行存管协议首页</p>
              <img class="picture" v-bind:src="cunguan_2" @click="onshow(cunguan_2)">
              <p>银行存管协议尾页</p>
            </div>
            <div class='cf zzzm-3' @click="hlwflag=!hlwflag">
                <span>互联网经营许可证书<i></i></span>
            </div>
            <div class="zhanshi" v-show="hlwflag">
              <img class="picture" v-bind:src="hulianwang" @click="onshow(hulianwang)">
              <p>互联网经营许可证书</p>
            </div>
            <div class='cf zzzm-4' @click="ruanzhuflag=!ruanzhuflag" >
                <span>计算机软件著作权登记证书<i></i></span>
            </div>
            <div class="zhanshi" v-show="ruanzhuflag">
              <img class="picture" v-bind:src="ruanzhu" @click="onshow(ruanzhu)">
              <p>计算机软件著作权登记证书</p>
            </div>
            <div class='cf zzzm-5' @click="lvshiflag=!lvshiflag">
                <span>律师协议<i></i></span>
            </div>
            <div class="zhanshi" v-show="lvshiflag">
              <img class="picture" v-bind:src="lvshi_1" @click="onshow(lvshi_1)">
              <p>律师协议首页</p>
              <img class="picture" v-bind:src="lvshi_2" @click="onshow(lvshi_2)">
              <p>律师协议尾页</p>
            </div>
            <div class='cf zzzm-6' @click="danbaoflag=!danbaoflag">
                <span>担保协议书<i></i></span>
            </div>
            <div class="zhanshi" v-show="danbaoflag">
              <img class="picture" v-bind:src="danbao_1" @click="onshow(danbao_1)">
              <p>担保协议书首页</p>
              <img class="picture" v-bind:src="danbao_2" @click="onshow(danbao_2)">
              <p>担保协议书尾页</p>
            </div>
        </div>
        <a href="javascript:;" class="motai" v-show="motai" @click="motai=!motai"><img v-bind:src="imgsur"></a>
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      guoziflag:false,
      cunguanflag:false,
      hlwflag:false,
      ruanzhuflag:false,
      lvshiflag:false,
      danbaoflag:false,
      motai:false,
      guozi_1 : require('../assets/guozi-1.png'),
      guozi_2 : require('../assets/guozi-2.png'),
      guozi_3 : require('../assets/guozi-3.png'),
      cunguan_1 : require('../assets/cunguan-1.png'),
      cunguan_2 : require('../assets/cunguan-2.png'),
      hulianwang : require('../assets/hulianwang.png'),
      ruanzhu : require('../assets/ruanzhu.png'),
      lvshi_1: require('../assets/lvshi-1.png'),
      lvshi_2 : require('../assets/lvshi-2.png'),
      danbao_1 : require('../assets/danbao-1.png'),
      danbao_2 : require('../assets/danbao-2.png'),
      imgsur:'',
    }
  },
  methods:{
    onshow:function(src){
      this.imgsur=src
      this.motai=true
    }
  }
}
</script>
<style lang='less' scoped>
.motai{
  width:100%;
  height:100%;
  background: rgba(0,0,0,.5);
  position: fixed;
  left:0;
  top:0;
  img{
    width:100%;
    position: fixed;
    left:0;
    top:0;
    bottom:0;
    right:0;
    margin: auto;
  }
}
.warpper {
    background: #fff;
    .cf {
        a {
            display: inline-block;
            width: 100%;
            height: 100%;
        }
        padding-left: 1rem;
        &.zzzm-1{
          background: url('../assets/zzzm-1.png') no-repeat .35rem .3rem;
        }
        &.zzzm-2{
          background: url('../assets/zzzm-2.png') no-repeat .35rem .3rem;
        }
        &.zzzm-3{
          background: url('../assets/zzzm-3.png') no-repeat .35rem .3rem;
        }
        &.zzzm-4{
          background: url('../assets/zzzm-4.png') no-repeat .35rem .3rem;
        }
        &.zzzm-5{
          background: url('../assets/zzzm-5.png') no-repeat .35rem .3rem;
        }
        &.zzzm-6{
          background: url('../assets/zzzm-6.png') no-repeat .35rem .3rem;
        }
        span {
            color: #333333;
            border-top: 1px solid #d9d9d9;
            font-size: .32rem;
            width: 100%;
            height:102px;
            line-height: 102px;
            display: block;
            position: relative;
            i {
              display: inline-block;
              width: .2rem;
              height: .36rem;
              background: url('../assets/blink.png') no-repeat 50% 50%;
              background-size: 100%;
              float: right;
              position: absolute;
              right: .25rem;
              top: .3rem;
            }
        }
    }
    .zhanshi{
        text-align: center;
        p{
          font-size: .24rem;
          text-align: center;
          color: #333;
          line-height: .9rem;
          height: .9rem;
        }
        .guozi{
          width:5.42rem;
          height:3.75rem;
          margin: 0.2rem auto 0;
        }
        .picture{
          width: 4rem;
          height:5.7rem;
          margin: 0.2rem auto 0;
        }

    }
}
</style>
