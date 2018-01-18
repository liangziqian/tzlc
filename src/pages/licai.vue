<template>
    <div>
        <div class="licaijin">
            <div class="licaititle">
              <p>理财体验金</p>
              <h3>10000元</h3>
            </div>
            <div class="item border">
                <div class="left">体验金预期收益</div>
                <div class="right">3.8元</div>
            </div>
            <div class="item border">
              <div class="left">体验金预期年化率</div>
              <div class="right">3.8元</div>
            </div>
            <div class="item">
              <div class="left">体验金到期时间</div>
              <div class="right">2017.11.7-2.17.12.1</div>
            </div>
        </div>
        <div class="btn">立即抢购</div>
        <div class="tip">到期体验金收益自动发放至账户余额</div>
    </div>
</template>
<script>
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
</script>
<style lang='less' scoped>
.licaijin{
  width:7.11rem;
  background-color: #fff;
  margin: .58rem auto 1.04rem;
  .licaititle{
      height:2.32rem;
      padding-top: .32rem;
      width: 100%;
      background: url('../assets/licaititle.png') no-repeat 50% top;
      p{
        height: .64rem;
        line-height: .64rem;
        font-size: .36rem;
        color:#fff;
        text-align: center;
      }
      h3{
        height:1rem;
        line-height: 1rem;
        text-align: center;
        padding-bottom: .37rem;
        color: #fff;
        font-size: .72rem;
      }
  }
  .item{
    height:1.44rem;
    font-size: .3rem;
    line-height: 1.44rem;
    color:#4b4b4b;
    padding: 0 .5rem;
    .left{
      float: left;
    }
    .right{
      float: right;
    }
    &.border{
      border-bottom: 1px solid #ccc;
    }
  }
}
.btn{
  width: 6.9rem;
  height:.8rem;
  margin: 0 auto;
  line-height: .8rem;
  text-align: center;
  background-color: #43b2f7;
  font-size: .36rem;
  color:#fff;
}
.tip{
  height: .93rem;
  line-height: .93rem;
  font-size: .24rem;
  color: #adacac;
  text-align: center;
}
</style>
