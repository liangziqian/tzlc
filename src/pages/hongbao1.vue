<template>
    <div>
        <!-- <div v-title>红包优惠</div> -->
        <!--<div class='hongbaotitle'>-->
            <!--<span :class='[activeIndex==0?"active":""]' @click='activeCharge(0)'>红包</span>-->
            <!--<span :class='[activeIndex==1?"active":""]' @click='activeCharge(1)'>加息券</span>-->
        <!--</div>-->
        <div class='hongbaorule cf'>
            <span @click='popChange'><span>使用规则 </span><i></i></span>
        </div>
        <div class='hongbaodetail cf' v-for='(h,index) in hongbaolist'>
            <!--<router-link :to='{path:"/redpackagedetail",query:h}'>-->
                <div class="hongbaoNumber cf" :class='[h.status==0?"canUse":"noUse"]'>
                  <span>¥</span>{{h.amount}}
                </div>
                <div class='hongbaoNotice cf'>
                    <div class="list">红包期限：{{h.timeLimit}}天</div>
                    <div class="list">有效日期：{{h.time}}</div>
                    <div class="list">投资期限：{{h.validTime}}天</div>
                    <div class="list">使用条件：投资≥{{h.userMoney}}元</div>
                </div>
                <div class="shiyong" v-show="h.status==0" @click="toMoney">立即使用 ></div>
                <div class="yiwancheng"  v-show="h.status!=0" :class="h.status==3 ? 'guoqi' : 'used'"></div>
                <div class="btn" @click="tobtn" :class="btn ? '': 'btn1'"> 使用详情</div>
                <div class="usedetail" v-show="btn">
                  <p>1、每笔订单仅能使用一张优惠券，不能与其他优惠券同时使用； </p>
                  <P>2、活动最终解释权归中青网投所有。</P>
                </div>
            <!--</router-link>-->
        </div>
        <div class='noinvestBG' v-show='!hongbaolist.length'>
            <i></i>
            <div>参加活动获得更多优惠券</div>
        </div>
      <div class='mask' v-show='popflag'></div>
      <transition enter-active-class='animated bounceIn' leave-active-class='animated bounceOut'>
        <div class='pop' v-show='popflag'>
          <div class='popTitle'>
            <span v-show='activeIndex==0'>红包说明</span>
            <span v-show='activeIndex==1'>加息券说明</span>
            <i @click='popChange'></i>
          </div>
          <div class='popContent'>
            1、红包可用于大多数的标，部分标无法使用。
            <br>
            <br> 2、红包可直接抵扣投资金额，如，当前您想投资100元，您账户有10元红包，只需要在充值90元即可完成投资。
            <br>
            <br> 3、红包不能叠加使用，同时也不能与加息券一同使用。
            <br>
            <br> 4、红包可以通过活动等方式获取。
            <br>
            <br> 5、请在有效期内使用。
            <br>
            <br> 6、红包使用方式最终解释权归中青网投享有。
          </div>
          <div class='popBTN' @click='popChange'>我已了解</div>
        </div>
      </transition>
    </div>
</template>
<script>
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
export default {
    data: function() {
        return {
            hongbaolist: [],
            hongbaolist1:[],
            activeIndex: 0,
            btn:false,
            popflag: false
        }
    },
    methods: {
        popChange: function() {
            this.popflag = !this.popflag
        },
        todown: function() {
            this.$router.push('/redpackageused')
        },
        tobtn: function() {
          this.btn = !this.btn
        },
        toMoney:function(){
          this.$router.push({
            path: '/index/money',
            query: {
              type: 2
            }
          })
        }
    },
    mounted: function() {
        let $this = this
        $.post(ROOT + '/wap/myhome/hongbao_list.html', {
            status: 4
        }, function(response) {
            if (response.code == 0) {
                for (let i of response.data) {
                    $this.hongbaolist.push(i)
                }
            }
        })
    }
}
</script>
<style lang='less' scoped>
.hongbaorule {
    font-size: 0;
    width: 6.9rem;
    margin: 0 auto;
    padding: .15rem 0;
    >span {
        float: right;
        i {
            display: inline-block;
            width: .27rem;
            height: .25rem;
            background: url('../assets/query.png') no-repeat 50% 50%;
            vertical-align: middle;
            background-size: 100%;
            margin-right: .05rem;
        }
        span {
            font-size: .24rem;
            color: #adb2b7;
            vertical-align: middle;
        }
    }
}

.hongbaodetail {
    width: 7.11rem;
    margin: 0 auto .24rem auto;
    position: relative;
    background-color: #fff;
    .shiyong{
      position: absolute;
      right:.35rem;
      top:.25rem;
      font-size: .3rem;
      color:#fff;
      height: 1rem;
      line-height: 1rem;
    }
    .yiwancheng{
        width:1.59rem;
        height:1.59rem;
        position: absolute;
        right:.4rem;
        top:.22rem;
        background: url('../assets/hadguoqi.png') no-repeat 50% 50%;
        &.guoqi {
          background: url('../assets/hadguoqi.png') no-repeat 50% 50%;
          background-size: 100%;
        }
        &.used {
          background: url('../assets/hadused.png') no-repeat 50% 50%;
          background-size: 100%;
        }
    }
    .hongbaoNumber {
        width: 100%;
        display: inline-block;
        height:1.48rem;
        line-height: 1.39rem;
        padding-bottom: .08rem;
        font-size: .7rem;
        color:#fff;
        span{
          font-size: .3rem;
          vertical-align: top;
          line-height: 1.1rem;
          margin-right: .19rem;
          display: inline-block;
          padding-left: .34rem;
        }
    }
    .hongbaoNotice {
        width: 100%;
        padding: .12rem 0;
        font-size: 0;
        .list {
            float:left;
            height:.5rem;
            width:33%;
            margin: 0 .3rem;
            font-size: .24rem;
            color:#4b4b4b;
            text-indent: .43rem;
            line-height: .5rem;
            background:  url('../assets/hongbaoNotice-1.png') no-repeat left center;
            &.list:nth-of-type(2){
              background:  url('../assets/hongbaoNotice-2.png') no-repeat left center;
              width:47%;
            }
            &.list:nth-of-type(3){
              background:  url('../assets/hongbaoNotice-3.png') no-repeat left center;
            }
            &.list:nth-of-type(4){
              background:  url('../assets/hongbaoNotice-4.png') no-repeat left center;
              width:47%;
            }
        }
    }
    .btn{
      height:.65rem;
      line-height: .65rem;
      color:#4b4b4b;
      margin: 0 .4rem;
      font-size: .24rem;
      font-weight: bold;
      background:url('../assets/hongbaoBtn-1.png') no-repeat right center;
      &.btn1{
        background:url('../assets/hongbaoBtn-2.png') no-repeat right center;
      }
    }
    .usedetail{
      margin: .12rem .73rem .4rem;
      p{
        font-size: .24rem;
        color:#4b4b4b;
        line-height: .43rem;
      }
    }
    .hongbaoTime {
        position: absolute;
        bottom: 0.2rem;
        width: 100%;
        font-size: 0;
        padding-left: .4rem;
        padding-right: .6rem;
        span {
            font-size: .24rem;
            color: #999;
        }
        span:nth-of-type(1) {}
        span:nth-of-type(2) {
            float: right;
        }
    }
}
.canUse {
    background: url('../assets/hongbaoCanUseBG.png') no-repeat 50% top;
    background-size: 100%;
}
.noUse{
  background: url('../assets/hongbaoCanNoUse.png') no-repeat 50% top;
  background-size: 100%;
}
.downhongbao {
    color: #8a8a8a;
    font-size: .24rem;
    text-align: center;
    padding: .35rem 0;
}
.pop {
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -3.7rem 0 0 -3.03rem;
  display: inline-block;
  width: 6.06rem;
  height: 7.4rem;
  background: #fff;
  border-radius: 10px;
  z-index: 6;
  .popTitle {
    font-size: 0;
    padding: .36rem;
    border-bottom: 2px solid #44b2f7;
    span {
      font-size: .32rem;
      color: #44b2f7;
      display: inline-block;
    }
    i {
      display: inline-block;
      width: .28rem;
      height: .28rem;
      background: url(../assets/closePop.png) no-repeat 50% 50%;
      float: right;
      background-size: 100%;
    }
  }
  .popContent {
    font-size: .26rem;
    color: #6f6f6f;
    padding: .3rem .3rem 0 .3rem;
    line-height: 1.5;
    height: 5rem;
    overflow-y: scroll;
  }
  .popBTN {
    font-size: .28rem;
    color: #fff;
    background: #44b2f7;
    text-align: center;
    margin: .25rem .3rem 0 .3rem;
    border-radius: 40px;
    padding: .25rem 0;
  }
}

.noinvestBG {
    font-size: 0;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    i {
        display: inline-block;
        width: 3.97rem;
        height: 3.08rem;
        background: url('../assets/noborrow.png') no-repeat 50% 50%;
    }
    div{
        font-size: .28rem;
        color: #7e7e7e;
        a{
            color: #44b2f7;
        }
    }
}
</style>
