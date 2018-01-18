<template>
    <div class='glass'>
        <!-- <div v-title>我的</div> -->
        <div class='title cf'>
            <i class='touxiang' @click='setup'><img src="../assets/touxiang.png" v-if='!touxiangsrcflag'><img :src="touxiangsrc" v-else></i>
            <span v-if="loginflag">登录/注册</span>
            <span v-else>{{accountStar}}</span>
            <i class="info" @click='toMsg'></i>
            <i class="setting" @click='setup'></i>
        </div>
        <div class="count">
          <div class='moneyContent'>账户余额(元)<i @click="show=!show" :class="show ? 'sun': 'unsun'"></i></div>
          <div class="moneyContent2" v-if="show">{{useableMoney}}<span @click='tocharge'>充值</span></div>
          <div class="moneyContent2" v-else>******<span @click='tocharge'>充值</span></div>
        </div>
        <div class='typeTips'>
            <div class="cash">
              <div class='capital'>
                <div>每日预期收益(元)</div>
                <div v-if="show">{{sumDailyInterest}}</div>
                <div v-else>******</div>
              </div>
              <div class='capital'>
                <div>累计收益(元)</div>
                <div v-if="show">{{myinterest}}</div>
                <div v-else>******</div>
              </div>
              <div class='capital' @click='toMyCapital'>
                <div>我的资产(元)</div>
                <div v-if="show">{{totalMoney}}</div>
                <div v-else>******</div>
              </div>
            </div>
        </div>
        <div class="divwapper">
          <ul>
            <li @click='toInvest' class="border-right">
              <h3>我的投资</h3>
              <p>小额分散稳定收益</p>
            </li>
            <li @click='tohongbao' class="hongbao">
              <h3>红包优惠</h3>
              <p>理财红包、加息券</p>
              <i></i>
            </li>
            <li @click='towithdraw' class="border-right">
              <h3>快速提现</h3>
              <p>提现到账更快速</p>
            </li>
            <li @click='tofriend'>
              <h3>邀请好友</h3>
              <p>还有注册，有福同享</p>
            </li>
            <li @click='todate' class="border-right border-none">
              <h3>回款日期</h3>
              <p>清晰了解资金情况</p>
            </li>
            <li @click='toTransactionRecord' class="border-none">
              <h3>交易记录</h3>
              <p>笔笔交易清晰透明</p>
            </li>
          </ul>
        </div>
        <div class='mask' v-if='loginflag'></div>
        <div class='mask' v-if='validata' style='z-index:11;'></div>
        <div class='validataPop' v-if='validata'>
            <div class='poptitle'>提示</div>
            <div class='popcontent'>{{validataContent}}</div>
            <div class='popBTN'>
                <span @click='closeValidataPop'>取消</span>
                <span @click='pathtoValidata'>{{validataBTNcontent}}</span>
            </div>
        </div>
        <div class='loginmask' v-if='loginflag'>
            <div @click='toregistry'><span class='registry'>注册</span></div>
            <div @click='toregistry'><span class='login'>登录</span></div>
        </div>
    </div>
</template>
<script>
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
import Swiper from '../config/swiper.min.js'
import '../config/swiper.min.css'
import {
    MessageBox
} from 'mint-ui'
export default {
    data: function() {
        return {
            mySwiper: '',
            loginflag: true,
            totalMoney: 0,
            useableMoney: 0,
            myinterest: 0,
            sumDailyInterest: 0,
            //以下验证使用
            validata: false,
            validataContent: '',
            validataBTNcontent: '',
            errorIndexArray: '',
            touxiangsrcflag: false,
            touxiangsrc: '',
            accountStar:'',
            account:'',
            show:true
        }
    },
    methods: {
        closeValidataPop: function() {
            this.validata = false
        },
        pathtoValidata: function() {
            if (this.errorIndexArray == 0) {
                this.$router.push('/realname')
            } else if (this.errorIndexArray == 1) {
                this.$router.push('/dealpassword')
            } else if (this.errorIndexArray == 2) {
                this.$router.push({
                    path: '/mybank',
                    query: {
                        type: 1
                    }
                })
            }
        },
        setup: function() {
            this.$router.push('/setup')
        },
        toregistry: function() {
            this.$router.push('/login')
        },
        show:function(){
            this.useableMoney.replace('******')
        },
        toMyCapital: function() {
            this.$router.push('/myCapital')
        },
        cash: function() {
            this.$router.push('/cash')
        },
        toInvest: function() {
            this.$router.push('/invest')
        },
        toMsg: function() {
          this.$router.push('/msg')
        },
        toTransactionRecord: function() {
            this.$router.push('/transactionRecord')
        },
        toprofit: function() {
            this.$router.push('/profit')
        },
        tohongbao: function() {
            this.$router.push('/index/fuli/hongbao1?type1=2&type=3')
        },
        todate: function() {
          this.$router.push('/date')
        },
        tofriend:function(){
          this.$router.push({
            path: '/friend',
            query: {
              m: sessionStorage.getItem('account')
            }
          })
        },
        tocharge: function() {
            let indexArray = []
            indexArray.push(sessionStorage.getItem('realname'))
            indexArray.push(sessionStorage.getItem('paypassword'))
            indexArray.push(sessionStorage.getItem('bankbind'))
            this.errorIndexArray = indexArray.indexOf('0')

            if (this.errorIndexArray == 0) {
                this.validata = true
                this.validataContent = '您尚未通过实名认证'
                this.validataBTNcontent = '去认证'
            } else if (this.errorIndexArray == 1) {
                this.validata = true
                this.validataContent = '您尚未设置交易密码'
                this.validataBTNcontent = '去设置'
            } else if (this.errorIndexArray == 2) {
                this.validata = true
                this.validataContent = '您尚未绑定银行卡号'
                this.validataBTNcontent = '去绑定'
            } else {
                this.$router.push('/charge')
            }
        },
        towithdraw: function() {
            let indexArray = []
            indexArray.push(sessionStorage.getItem('realname'))
            indexArray.push(sessionStorage.getItem('paypassword'))
            indexArray.push(sessionStorage.getItem('bankbind'))
            this.errorIndexArray = indexArray.indexOf('0')

            if (this.errorIndexArray == 0) {
                this.validata = true
                this.validataContent = '您尚未通过实名认证'
                this.validataBTNcontent = '去认证'
            } else if (this.errorIndexArray == 1) {
                this.validata = true
                this.validataContent = '您尚未设置交易密码'
                this.validataBTNcontent = '去设置'
            } else if (this.errorIndexArray == 2) {
                this.validata = true
                this.validataContent = '您尚未绑定银行卡号'
                this.validataBTNcontent = '去绑定'
            } else {
                this.$router.push('/withdraw')
            }
        }
    },
    mounted: function() {
        sessionStorage.removeItem('borrowIndex')
        let $this = this
        if (sessionStorage.getItem('isLogin') || this.$route.query.login == 1) {
            this.loginflag = false
            this.accountStar=sessionStorage.getItem('accountStar')
            this.account=sessionStorage.getItem('account').substring(0,1)+"**"
            $.post(ROOT + '/wap/myhome/user-index.html', function(response) {
                if (response.code == 0) {
                    // 每日预期收益
                    $this.sumDailyInterest = response.data.sum_daily_interest
                    if ($this.sumDailyInterest.toString().indexOf('.') > -1) {
                        if ($this.sumDailyInterest.toString().split('.')[1].length == 1) {
                            $this.sumDailyInterest = $this.sumDailyInterest + '0'
                        }
                    } else {
                        $this.sumDailyInterest = $this.sumDailyInterest + '.00'
                    }
                    // 累计收益
                    $this.myinterest = response.data.myinterest
                    if ($this.myinterest.toString().indexOf('.') > -1) {
                        if ($this.myinterest.toString().split('.')[1].length == 1) {
                            $this.myinterest = $this.myinterest + '0'
                        }
                    } else {
                        $this.myinterest = $this.myinterest + '.00'
                    }
                    // 可用余额
                    $this.useableMoney = response.data.usable_money
                    if ($this.useableMoney.toString().indexOf('.') > -1) {
                        if ($this.useableMoney.toString().split('.')[1].length == 1) {
                            $this.useableMoney = $this.useableMoney + '0'
                        }
                    } else {
                        $this.useableMoney = $this.useableMoney + '.00'
                    }
                    // 全部资产
                    $this.totalMoney = response.data.total_money
                    if ($this.totalMoney.toString().indexOf('.') > -1) {
                        if ($this.totalMoney.toString().split('.')[1].length == 1) {
                            $this.totalMoney = $this.totalMoney + '0'
                        }
                    } else {
                        $this.totalMoney = $this.totalMoney + '.00'
                    }
                    // 头像
                    if (response.data.headImg != null) {
                        $this.touxiangsrcflag = true
                        $this.touxiangsrc = response.data.headImg
                    }
                    sessionStorage.setItem('paypassword', response.data.pay_password_status)
                    sessionStorage.setItem('bankbind', response.data.card_binding_status)
                    sessionStorage.setItem('realname', response.data.real_verify_status)
                }
            })
        }
    }
}
</script>
<style lang='less' scoped>
.typeTips {
    background: #fff;
    font-size: 0;
    padding: .27rem 0 .3rem 0;
    height: 1.18rem;
    .cash{
        background: #fff;
        .capital {
          display: inline-block;
          width: 33.3%;
          border-right:1px solid #ddd;
          div {
            text-align: center;
          }
          div:nth-of-type(1) {
            padding-bottom: .2rem;
            font-size: .24rem;
            color:#636363;
          }
          div:nth-of-type(2) {
            font-size: .28rem;
            color: #4b4b4b;
          }
        }
    }
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .6;
    z-index: 5;
}

.validataPop {
    width: 5.4rem;
    height: 2.5rem;
    background: #f8f8f9;
    border-radius: 40px;
    position: absolute;
    z-index: 11;
    top: 50%;
    left: 50%;
    margin-top: -1.25rem;
    margin-left: -2.7rem;
    overflow: hidden;
    font-size: 0;
    .poptitle {
        margin-top: .45rem;
        font-size: .32rem;
        font-weight: bold;
        color: #000;
        text-align: center;
    }
    .popcontent {
        margin-top: .1rem;
        font-size: .24rem;
        color: #000;
        text-align: center;
    }
    .popBTN {
        height: .88rem;
        border-top: 1px solid #d6d6de;
        position: absolute;
        width: 100%;
        bottom: 0;
        span {
            display: inline-block;
            width: 50%;
            height: 100%;
            line-height: .88rem;
            font-size: .32rem;
            text-align: center;
            color: #007aff;
        }
        span:first-child {
            border-right: 1px solid #d6d6de;
        }
    }
}

.loginmask {
    width: 100%;
    position: fixed;
    bottom: 1rem;
    background: #fff;
    z-index: 5;
    font-size: 0;
    div {
        width: 50%;
        display: inline-block;
        text-align: center;
        padding: .26rem 0;
        span {
            display: inline-block;
            width: 3rem;
            height: .8rem;
            line-height: .8rem;
            text-align: center;
            border-radius: 40px;
            font-size: .28rem;
        }
        .registry {
            border: 2px solid #44b2f7;
            color: #44b2f7;
        }
        .login {
            border: 2px solid #fff;
            background: #44b2f7;
            color: #fff;
        }
    }
}

.glass {
    height: 100%;
    position: relative;
}

.title {
    background: #284a65;
    padding: .78rem 0;
    height:2.42rem;
    line-height: .86rem;
    font-size: .32rem;
    color: #fff;
    .span{
      display: inline-block;
      line-height: .86rem;
      height: .86rem;
      font-size: .32rem;
      color: #fff;
    }
    .touxiang {
        display: inline-block;
        width: .86rem;
        height: .86rem;
        border-radius: 50%;
        float: left;
        margin: 0 .24rem 0 .38rem;
        img {
            width: 100%;
            display: block;
        }
    }
    .setting{
      display: inline-block;
      width: .45rem;
      height: .86rem;
      float:right;
      background: url("../assets/setting.png") no-repeat center;
      background-size: contain;
    }
    .info{
      display: inline-block;
      width: .47rem;
      height: .86rem;
      float:right;
      margin: 0 .46rem 0 .53rem;
      background: url("../assets/info.png") no-repeat center;
      background-size: contain;
    }
}
.count{
  height:2.02rem;
  background:#284a65;
  padding-left: .4rem;
  margin-top: -2px;
  .moneyContent{
    height:.58rem;
    line-height: .58rem;
    font-size: .24rem;
    color: #fff;
    position: relative;
    .sun{
      position: absolute;
      top:.12rem;
      left:2.12rem;
      width:.5rem;
      height: .34rem;
      background: url("../assets/sun.png") no-repeat center;
      background-size: contain;
    }
    .unsun{
      position: absolute;
      top:.12rem;
      left:2.12rem;
      width:.5rem;
      height: .34rem;
      background: url("../assets/unsun.png") no-repeat center;
      background-size: contain;
    }
  }
  .moneyContent2{
    height:.77rem;
    line-height: .77rem;
    font-size: .6rem;
    color: #fff;
    position: relative;
    span{
      width:1.12rem;
      height:.48rem;
      border: 1px solid #fff;
      border-radius: .2rem;
      position: absolute;
      right:0.39rem;
      top:0.16rem;
      font-size: .24rem;
      color: #fff;
      text-align: center;
      line-height: .48rem;
    }
  }
}
.divwapper {
    font-size: 0;
    background: #fff;
    padding: .3rem 0;
    margin-top: .27rem;
    ul{
      height:4.05rem;
      background: #fff;
      li{
        width:50%;
        float: left;
        box-sizing: border-box;
        height:1.34rem;
        border-bottom: 0.01rem solid #ddd;
        background:#fff url("../assets/divwapper-1.png") no-repeat .62rem .25rem;
        h3{
          font-size: .3rem;
          color: #4b4b4b;
          text-indent: 1.34rem;
          padding: .24rem 0 .2rem 0;
        }
        p{
          font-size: .22rem;
          color: #a3a3a3;
          text-indent: 1.34rem;
        }
      }
      .hongbao{
        position: relative;
        i{
          width:.86rem;
          height: .86rem;
          background: url("../assets/jingxi.png") no-repeat left top;
          position: absolute;
          top:0;
          right:-.29rem;
        }
      }
      .border-right{
        border-right: 0.01rem solid #ddd;
      }
      .border-none{
        border-bottom:none;
      }
      li:nth-of-type(2){
        background:#fff url("../assets/divwapper-2.png") no-repeat .51rem .21rem;
      }
      li:nth-of-type(3){
        background:#fff url("../assets/divwapper-3.png") no-repeat .59rem .29rem;
      }
      li:nth-of-type(4){
        background:#fff url("../assets/divwapper-4.png") no-repeat .52rem .29rem;
      }
      li:nth-of-type(5){
        background:#fff url("../assets/divwapper-5.png") no-repeat .59rem .25rem;
      }
      li:nth-of-type(6){
        background:#fff url("../assets/divwapper-6.png") no-repeat .55rem .27rem;
      }
    }
}
</style>
