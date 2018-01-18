<template>
    <div>
        <!-- <div v-title>首页</div> -->
        <div class="swiper-container" style='font-size:0;height: 3.3rem;'>
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for='b in banner' @click='bannerlink(b.id,b.url)'>
                    <a>
                        <img :src="b.picture">
                    </a>
                </div>
                <!--<div class="swiper-slide">
                    <img src="../assets/banner.jpg">
                </div> -->
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <!-- 系统消息 -->
        <div class='noticetitle'>
            <i></i>
            <div>
                <ul id='notice'>
                    <li v-for='text in noticeText' :data-msgid='text.id'>
                        {{text.name}}
                    </li>
                </ul>
            </div>
        </div>
        <!-- 首页tab -->
        <div class='recommended'>
            <div class='wapper' @click='toquestion'>
                <div class='recommended-img'><img src="../assets/xszn.png"></div>
                <div class='recommended-text'>资质证明</div>
            </div>
            <div class='wapper' @click='tosafe'>
                <div class='recommended-img'><img src="../assets/safe.png"></div>
                <div class='recommended-text'>安全保障</div>
            </div>
            <div class='wapper' @click='tomsg'>
                <div class='recommended-img'><img src="../assets/infocenter.png"><i></i></div>
                <div class='recommended-text'>消息中心</div>
            </div>
            <div class='wapper' @click='tohongbao'>
                <div class='recommended-img'><img src="../assets/youhuijuan.png"></div>
                <div class='recommended-text'>我的优惠券</div>
            </div>
        </div>
      <router-link :to='{path:"/detail/"+VIP.borrowId}'>
        <div class='VIP' id='vip' v-show='VIPFlag'>
            <div class='wapper'>
                <div class='VIPtitle'>
                  <span>{{VIP.borrowName}}</span>
                  <span class='activeTitle' v-show='VIP.isActivity==1'>{{VIP.activityName}}</span>
                  <i class='VIPshow' v-show='VIP.type==3'></i>
                </div>
                <div class="VIPInfo">
                  <div class='VIPperce'>
                    {{VIP.apr}}<span>%</span>
                    <!--<i v-show="VIP.israiserates==1">+{{VIP.raiserates}}</i>-->
                    <p>预期年化率</p>
                  </div>
                  <div class='VIPnotice'>
                    <span class="sp-1">期限{{VIP.validTime}}{{VIP.isDay==1?'天':'月'}}</span>
                    <span class="sp-2">{{VIP.lowestAccount}}元起投</span>
                    <span class="sp-3">已融资{{VIP.percent}}%</span>
                  </div>
                </div>
                <div class='VIPbtn'>
                  <router-link :to='{path:"/detail/"+VIP.borrowId}'>立即投资</router-link>
                </div>
            </div>
        </div>
      </router-link>
      <!--<router-link :to='{path:"/detail/"+VIP.borrowId}'>-->
        <!--<div class='VIP' id='vip' v-show='VIPFlag'>-->
          <!--<div class='wapper'>-->
            <!--<div class='VIPtitle'>-->
              <!--新手体验标-->
              <!--<i class='VIPshow'></i>-->
            <!--</div>-->
            <!--<div class="VIPInfo">-->
              <!--<div class='VIPperce'>-->
                <!--{{VIP.apr}}<span>%</span><i>+0.00%</i>-->
                <!--<p>预期年化率</p>-->
              <!--</div>-->
              <!--<div class='VIPnotice'>-->
                <!--<span class="sp-1">期限1天</span>-->
                <!--<span class="sp-4">体验金投资专享</span>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class='VIPbtn'>-->
              <!--<router-link :to='{path:"/detail/"+VIP.borrowId}'>立即投资</router-link>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</router-link>-->
        <!--广告位-->
      <div class="advertising" @click='tofriend'>
          <img src="../assets/youqing.png" alt="邀请好友拿现金" title="邀请好友拿现金">
      </div>
        <!-- 底部介绍 -->
        <div class='biaoContent'>
            <div class='fang'>
                <i></i>
                <div>
                    <div>国企全资</div>
                </div>
            </div>
            <div class='cir'>
                <i></i>
                <div>
                    <div>资产担保</div>
                </div>
            </div>
            <div class='ju'>
                <i></i>
                <div>
                    <div>晋商银行存管</div>
                </div>
            </div>
        </div>
        <div class="phone" @click='totanchuang'></div>
        <div class="tanchuang" v-show="dialFlag">
          <div class="close" @click='toclose'>取消</div>
          <div class="dial" @click='todial'>拨打</div>
        </div>
    </div>
</template>
<script>
import {
    Toast
} from 'mint-ui'
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
window.timeComputedFlag = true

function noticeAnimate() {
    if (!window.timeComputedFlag) return false
    window.timeComputedFlag = false
    setInterval(function() {
        let animateUl = $('#notice')
        if ($('#notice li').length == 1) return false
        let firstLi = $('#notice li:eq(0)')
        firstLi.animate({
            marginTop: '-.33rem'
        }, 500, function() {
            firstLi.appendTo(animateUl).css({
                marginTop: 0
            })
        })
    }, 2000)
}
export default {
    data: function() {
        return {
            mySwiper: '',
            noticeText: [],
            banner: [],
            arrowTrans: false,
            biao: [],
            VIPFlag: true,
            dialFlag:false,
            VIP: {
                borrowId: '',
                borrowName: '',
                apr: '',
                lowestAccount: '',
                validTime: '',
                percent: '',
                repaymentType: '', //还款方式，目前没有用到
                type: -1,
                activityName:'',
                isActivity:''
//                israiserates:'',
//                raiserates:''
            },
            recommendFlag: true
        }
    },
    methods: {
        tomsgCenter: function() {
            this.$router.push('/msg')
        },
        slideToggle: function() {
            let self = this
            $('#vip').slideToggle(function() {
                self.arrowTrans = self.arrowTrans ? false : true
            })
        },
        tomsg: function() {
          if (!sessionStorage.getItem('isLogin')) {
            Toast('请先登录')
            this.$router.push('/login')
            return false
          }
          this.$router.push('/msg')
//            Toast('敬请期待')
        },
        tosafe: function() {
            this.$router.push('/safe')
        },
        bannerlink: function(bannerid,bannerurl){
            if(bannerid==265){
                if (!sessionStorage.getItem('isLogin')) {
                    Toast('请先登录')
                    this.$router.push('/login')
                    return false
                }
                this.$router.push({
                    path: '/friend',
                    query: {
                        m: sessionStorage.getItem('account')
                    }
                })
            }else{
                if(bannerurl){
                    window.location.href = bannerurl;
                }
            }
        },
        tohongbao: function() {
            if (!sessionStorage.getItem('isLogin')) {
                Toast('请先登录')
                this.$router.push('/login')
                return false
            }
          this.$router.push('/index/fuli/hongbao1?type1=2&type=3')
        },
        tofriend: function() {
          if (!sessionStorage.getItem('isLogin')) {
            Toast('请先登录')
            this.$router.push('/login')
            return false
          }
          this.$router.push({
            path: '/friend1',
            query: {
              m: sessionStorage.getItem('account')
            }
          })
        },
        toquestion: function() {
          this.$router.push('/zzzm')
        },
        dayactive: function() {
             Toast('敬请期待')
//            this.$router.push({
//                path: '/turntable',
//                query: {
//                    jsessionid: sessionStorage.getItem('userid')
//                }
//            })
        },
        totanchuang:function(){
            this.dialFlag=true;
        },
        toclose:function(){
            this.dialFlag=false;
        },
        todial:function(){
          window.location.href = 'tel:400-107-9077';
        }
    },
    created: function() {
        //清理后台session
        if (!sessionStorage.getItem('isLogin')) {
            $.post(ROOT + '/wap/loginout.html', function(response) {

            })
        }
    },
    mounted: function() {
        let $this = this
        let data = {}
        let localTel = localStorage.getItem('telephone')
        let localpw = localStorage.getItem('password')

        //自动登录

        if (!sessionStorage.getItem('isLogin') && localTel && localpw) {
            $.post(ROOT + '/wap/login_step2.html', {
                telephone: localTel,
                password: localpw
            }, function(response) {
                if (response.code == 0) {
                    sessionStorage.setItem('isLogin', true)
                    sessionStorage.setItem('account', localTel)
                    sessionStorage.setItem('accountStar', localTel.substring(0, 3) + '****' + localTel.substring(7, 11))
                    $.post(ROOT + '/wap/myhome/user-index.html', function(response) {
                        if (response.code == 0) {
                            sessionStorage.setItem('paypassword', response.data.pay_password_status)
                            sessionStorage.setItem('bankbind', response.data.card_binding_status)
                            sessionStorage.setItem('realname', response.data.real_verify_status)
                        }
                    })
                }
            })
        }

        /*首页BANNER图*/



        /*滚动*/

        $.post(ROOT + '/wap/invest_total.html', function(response) {
            if (response.code == 0) {
                for (let i of response.data) {
                    $this.noticeText.push(i)
                }
                $this.$nextTick(function() {
                    $('#notice>li').on('click', function() {
                        if (!sessionStorage.getItem('isLogin')) {
                            Toast('请先登录')
                            $this.$router.push('/login')
                            return false
                        }

                        $this.$router.push('/msgdetail' + $(this).data('msgid'))
                    })
                })
            }
        })

        /*首页新手推荐标*/

        $.post(ROOT + '/wap/novice_borrow.html', function(response) {
            if (response.code == 0) {
                if (!!response.data.borrowData) {
                    $this.VIP.borrowId = response.data.borrowData.borrowId
                    $this.VIP.borrowName = response.data.borrowData.borrowName
                    $this.VIP.apr = response.data.borrowData.apr
                    $this.VIP.lowestAccount = response.data.borrowData.lowestAccount
                    $this.VIP.validTime = response.data.borrowData.validTime
                    $this.VIP.percent = response.data.borrowData.percent
                    $this.VIP.type = response.data.borrowData.type
                    $this.VIP.isDay = response.data.borrowData.isDay
                    $this.VIP.isActivity = response.data.borrowData.isActivity
                    $this.VIP.activityName = response.data.borrowData.activityName
//                    $this.VIP.israiserates = response.data.borrowData.israiserates
//                    $this.VIP.raiserates = response.data.borrowData.raiserates
                } else {
                    $this.VIPFlag = false
                }
            } else if (response.code == 1) {
                $this.VIPFlag = false

            }
        })

        /*首页优质推荐标*/

        $.post(ROOT + '/wap/recommend_borrow.html', function(response) {
            if (response.code == 0) {
                if (response.data.length > 0) {
                    for (let i of response.data) {
                        data.borrowId = i.borrowId
                        data.borrowName = i.borrowName
                        data.apr = i.apr
                            // data.timeLimit = i.timeLimit
                        data.timeLimit = i.validTime
                        data.lowestAccount = i.lowestAccount
                        data.percent = i.percent
                        data.isDay = i.isDay
                        data.isActivity = i.isActivity
                        data.activityName = i.activityName
                        $this.biao.push(data)
                        data = {}
                    }
                } else {
                    $this.recommendFlag = false
                }
            } else if (response.code == 1) {
                $this.recommendFlag = false
            }
        })
        noticeAnimate()
        this.$nextTick(function() {
            $.post(ROOT + '/wap/banner_list.html', {
                id: 56
            }, function(response) {
                if (response.code == 0) {
                    for (let i of response.data) {
                        $this.banner.push(i)
                    }
                }
            })
            $this.mySwiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                observer: true,
                observeParents: true,
                autoplay: 5000,
                autoplayDisableOnInteraction: false
            })
        })
    }
}
</script>
<style lang='less' scoped>
.swiper-slide {
    img {
        width: 100%;
        height: 4rem;
    }
}
.tanchuang{
  position: fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background:rgba(0,0,0,.5) url("../assets/kefu.png") no-repeat center 30%;
  z-index: 11;
  .close{
    position: fixed;
    left:2rem;
    top:60%;
    background:url("../assets/close.png") no-repeat center top;
    width:1.03rem;
    padding-top:1.38rem;
    font-size:.3rem;
    color: #fff;
    text-align: center;
  }
  .dial{
    position: fixed;
    left:4.27rem;
    top:60%;
    background:url("../assets/dial.png") no-repeat center top;
    width:1.03rem;
    padding-top:1.38rem;
    font-size:.3rem;
    color: #fff;
    text-align: center;
  }
}
.phone{
  position: fixed;
  right:0;
  bottom:2.9rem;
  width:1.46rem;
  height:1.49rem;
  background: url("../assets/phone.png") no-repeat center;
  background-size:100%;
  z-index: 2;
}
.noticetitle {
    font-size: 0;
    padding: .3rem 0 .3rem .25rem;
    background: #fff;
    border-bottom:1px solid #e6e6e6;
    i {
        display: inline-block;
        width: .33rem;
        height: .33rem;
        background: url(../assets/noticetitle.png) no-repeat 50% 50%;
        background-size: contain;
    }
    div {
        overflow: hidden;
        display: inline-block;
        width: 5.5rem;
        height: .33rem;
        margin-left: .22rem;
        padding-left: .3rem;
        margin-top: 0;
        ul {
            li {
                height: .33rem;
                width: 100%;
                font-size: .26rem;
                color: #6a6a6a;
                line-height: .33rem;
                overflow: hidden;
            }
        }
    }
}

.recommended {
    margin: 0 0 .2rem 0;
    text-align: center;
    font-size: 0;
  background: #fff;
    .wapper {
        display: inline-block;
        width: 1.8rem;
        .recommended-img {
            padding: .4rem 0 .25rem 0;
            text-align: center;
            img {
                width: .77rem;
            }
        }
        .recommended-text {
            text-align: center;
            font-size: .28rem;
            color: #060606;
            padding-bottom: .48rem;
        }
    }
}

.VIP {
    height: 3rem;
    background: #fff;
    font-size: 0;
    padding-left: .33rem;
    .wapper {
        display: inline-block;
        width: 6.8rem;
        position: relative;
        .VIPshow {
            display: inline-block;
            height: .46rem;
            width: 1.1rem;
            background: url(../assets/noobVIP1.png) no-repeat 50% 50%;
            background-size: 100%;
        }
        .HOTshow {
            display: inline-block;
            height: .46rem;
            width: 1.1rem;
            background: url(../assets/hot.png) no-repeat 50% 50%;
            background-size: 100%;
        }
        .VIPtitle {
            font-size: .36rem;
            color: #4b4b4b;
            height: 1.3rem;
            line-height: 1.3rem;
            i{
              margin: -10px 0 -10px 7px;
            }
        }
        .VIPInfo{
          .VIPperce {
            float: left;
            font-size: 1rem;
            color: #ed7900;
            font-weight: bold;
            position: relative;
            span {
              font-size: .36rem;
              font-weight: normal;
            }
            i{
              font-size: .36rem;
              font-weight: normal;
              font-style: inherit;
              position: absolute;
              left:1.2rem;
              top:0.2rem;
            }
            p{
              font-size: .24rem;
              color:#a6a6a6;
              font-weight: normal;
              margin-top: 0.1rem;
            }
          }
          .VIPnotice {
            float: right;
            width:50%;
            border-left: 1px solid #ccc;
            margin-top: .11rem;
            span {
              display: block;
              font-size: .24rem;
              color: #999;
              height:.42rem;
              line-height: .42rem;
              text-indent: 1rem;
              &.sp-1 {
                background:url(../assets/VIPnotice-1.png) no-repeat .58rem 50%;
              }
              &.sp-2{
                background:url(../assets/VIPnotice-2.png) no-repeat .62rem 50%;
              }
              &.sp-3 {
                background:url(../assets/VIPnotice-3.png) no-repeat .61rem 50%;
              }
              &.sp-4 {
                background:url(../assets/VIPnotice-4.png) no-repeat .61rem 50%;
              }
            }
          }
        }
        .VIPbtn {
            a {
                width: 1.4rem;
                height: .4rem;
                line-height: .4rem;
                border-radius: 4px;
                color: #f38a00;
                font-size: .24rem;
                display: inline-block;
                border:1px solid #f38a00;
                position: absolute;
                top:.48rem;
                right:0rem;
                text-align: center;
            }
        }
    }
}

.advertising{
  margin-top: .2rem;
  img{
    width:100%;
  }
}
.biaoContent {
    padding: 0.2rem 0;
    font-size: 0;
    >div {
        width: 33.33%;
        display: inline-block;
        i {
            display: inline-block;
            width: .46rem;
            height: .44rem;
            margin-left: .18rem;
            vertical-align: middle;
        }
        >div {
            display: inline-block;
            width: 1.6rem;
            height: .44rem;
            vertical-align: middle;
            line-height: .44rem;
            margin-left: .2rem;
            div {
                font-size: .24rem;
                color: #adb2b7;
            }
        }
    }
    .fang {
        i {
            background: url(../assets/fang.png) no-repeat 50% 50%;
            background-size: 100%;
        }
    }
    .cir {
        i {
            background: url(../assets/cir.png) no-repeat 50% 50%;
            background-size: 100%;
        }
    }
    .ju {
        i {
            background: url(../assets/ju.png) no-repeat 50% 50%;
            background-size: 100%;
        }
    }
}
</style>
