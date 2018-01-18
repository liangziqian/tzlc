<template>
    <div>
        <!-- <div v-title>安全保障</div> -->
        <div class='gqptai'>
          <div class="content">
            <div class="picture"><img v-bind:src="guozi_1" @click="onshow(guozi_1)"></div>
            <p>国粮鼎峰泰（天津）粮油贸易</p>
            <div class="picture"><img v-bind:src="guozi_2" @click="onshow(guozi_2)"></div>
            <p>浙江青柠网络科技</p>
              <div class="picture"><img v-bind:src="guozi_3" @click="onshow(guozi_3)"></div>
            <p>内蒙古通辽国家粮食储备库</p>
          </div>
          <a href="javascript:;" class="motai" v-show="motai" @click="motai=!motai"><img v-bind:src="imgsur"></a>
        </div>
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      guozi_1 : require('../assets/guozi-1.png'),
      guozi_2 : require('../assets/guozi-2.png'),
      guozi_3 : require('../assets/guozi-3.png'),
      imgsur:'',
      motai:false
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
.gqptai {
    height: 33.13rem;
    background: url('../assets/gqptai.png') no-repeat 50% 50%;
    background-size: 100%;
    position: relative;
    .content{
      height:17rem;
      width:100%;
      text-align: center;
      position: absolute;
      left:0;
      top:16.13rem;
      .picture{
        width:5.68rem;
        height:3.98rem;
        background: #fff;
        padding: .12rem;
        margin-top: .74rem;
        display: inline-block;
        img{
          width:5.44rem;
          height:3.74rem;
        }
      }
      p{
        height:.66rem;
        line-height: .66rem;
        font-size: .24rem;
        color: #333;
        text-align: center;
      }
    }
}
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
</style>
