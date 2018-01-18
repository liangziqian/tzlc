<template>
    <div id='money'>
        <div class='biao' v-for='(b,index) in biao'>
            <router-link :to="{path:'/detail/'+b.id,query:{type:b.type}}">
                <i class='VIP' v-show='b.type==3&&b.lineWidth!=100'></i>
                <i class='HOT' v-show='b.type==2&&b.lineWidth!=100'></i>
                <i class='sellOut' v-show='b.lineWidth==100'></i>
                <div class='biaoTitle' :style='{color:b.lineWidth==100?"#c2c2c2":""}'>
                    <!--<i :class='{biaoActive:b.isActivity}' v-show='b.isActivity==1&&b.lineWidth != 100'></i>-->
                    <span>{{b.title}}</span>
                    <span class='activeTitle' v-show='b.isActivity==1&&b.lineWidth != 100'>{{b.activityName}}</span>
                </div>
                <ul class='biaoContent cf'>
                    <li class='year'>
                        <div :style='{color:b.lineWidth==100?"#999":""}'>
                          {{b.year}}%
                          <!--<i v-show="b.israiserates">+{{b.raiserates}}</i>-->
                        </div>
                        <div>预期年化率
                          <a class="rz1" v-show="index==0">已融资<span>{{b.lineWidth}}%</span></a>
                        </div>
                    </li>
                    <li class='day'>
                        <div :style='{color:b.lineWidth==100?"#acacac":"#4b4b4b"}'>到期还本还息</div>
                        <div><span>期限{{b.day}}{{b.isDay==0 ? '月' : '天'}}</span><span>{{b.money}}元起投</span></div>
                    </li>
                </ul>
              <div class="touzi">
                <div class='button' v-show='(index==0)&&b.lineWidth!=100'>立即抢购</div>
                <div class='button' v-show='(b.type==2 || b.type==3)&&index!=0&&b.lineWidth!=100'>立即投资 </div>
                <div class='button' v-show='b.lineWidth==100'>募集完成</div>
                <div v-show="index!=0" class="rz">已融资<span :class="b.lineWidth==100 ? '' : 'active'">{{b.lineWidth}}%</span></div>
              </div>
            </router-link>
        </div>
        <div class='downBiao' @click='downBiao'><span>点击查看更多项目</span></div>
        <div class='slideArea'>
            <div class='shield'>
                <i class='line-1'></i>
                <i class='shield-1'></i>
                <span class='slideAreaText'>个人资产由银行级别风控体系保障</span>
                <i class='line-2'></i>
            </div>
        </div>
    </div>
</template>
<script>
import Swiper from '../config/swiper.min.js'
import '../config/swiper.min.css'
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
export default {
    data: function() {
        return {
            banner: [],
            biao: [],
            mySwiper: ''
                // loading: false,
                // loadingFlag: true,
                // loadingTextContent: '加载中',
                // page: 1, //不能改
                // totalpage: 2 //不能改
        }
    },
    watch: {
        biao: function() {
            this.$nextTick(function() {
                $('.lines span').each(function() {
                    if ($(this).data('line') == 100) {
                        $(this).css({
                            background: '#999'
                        })
                    }
                    $(this).animate({
                        width: $(this).data('line') + '%'
                    })
                })
            })
        }
    },
    methods: {
        downBiao: function() {
            this.$router.push('/soldout')
        }
    },
    created: function() {
        let self = this
        let arrayDefault = []
        let data = {}
        $.post(ROOT + '/wap/borrow_list.html', {
            type: 'recommend'
        }, function(response) {
            if (response.code == 0) {
                self.totalpage = response.totalPage
                for (let i of response.data) {
                    data.id = i.borrowId
                    data.title = i.borrowName
                    data.lineWidth = i.percent
                    data.year = i.apr
                    data.day = i.validTime
                    data.money = i.lowestAccount
                    data.isActive = i.isActive
                    data.repaymentType = i.repaymentType
                    data.type = i.type
                    data.isDay = i.isDay
                    data.isActivity = i.isActivity
                    data.activityName = i.activityName
//                    data.israiserates = i.israiserates
//                    data.raiserates = i.raiserates

                    // arrayDefault.push(data)

                    // if (data.type == 3) {
                    //     self.noobbiao.push(data)
                    // } else {
                    //     arrayDefault.push(data)
                    // }

                    self.biao.push(data)
                    data = {}
                }

                // arrayDefault.sort(function(a, b) {
                //     return b.type - a.type
                // })
                // self.goodbiao = arrayDefault

            }
        })
    },
    mounted: function() {
        let $this = this
        if (this.$route.query.login == 1) {
            $.post(ROOT + '/wap/myhome/user-index.html', function(response) {
                if (response.code == 0) {
                    sessionStorage.setItem('isLogin',true)
                    sessionStorage.setItem('paypassword', response.data.pay_password_status)
                    sessionStorage.setItem('bankbind', response.data.card_binding_status)
                    sessionStorage.setItem('realname', response.data.real_verify_status)
                }
            })
        }
        this.$nextTick(function() {
            $this.mySwiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                observer: true,
                observeParents: true,
                autoplay: 5000,
                autoplayDisableOnInteraction: false
            })
        })
        $.post(ROOT + '/wap/banner_list.html', {
            id: 57
        }, function(response) {
            if (response.code == 0) {
                for (let i of response.data) {
                    $this.banner.push(i)
                }
            }
        })
        $('body>div').css({
            height: 'auto'
        })
    },
    destroyed: function() {
        $('body>div').css({
            height: '100%'
        })
    }
}
</script>
<style lang='less' scoped>
.banner {
    height: 1.6rem;
    overflow: hidden;
    img {
        width: 100%;
    }
}

.swiper-slide {
    img {
        width: 100%;
        height: 1.6rem;
    }
}

.moneyTipTitle {
    color: #333333;
    font-size: .26rem;
    height: .65rem;
    line-height: .65rem;
    i {
        display: inline-block;
        vertical-align: middle;
        width: .07rem;
        height: .24rem;
        background: #44b2f7;
        border-radius: 100px;
        margin-left: .3rem;
        margin-right: .1rem;
    }
    span {
        vertical-align: middle;
    }
}

#money {
    height: 100%;
    position: relative;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}

.toptip {
    font-size: 0;
    background: #fff;
    div:first-child {
        border-right: 1px solid #dcdcdc;
    }
    div {
        display: inline-block;
        width: 50%;
        color: #333333;
        font-size: .26rem;
        margin: .25rem 0;
        i {
            display: inline-block;
            width: .07rem;
            height: .24rem;
            background: #44b2f7;
            border-radius: 100px;
            vertical-align: middle;
            margin-left: .3rem;
            margin-right: .1rem;
        }
    }
}

.scrollWapper {
    height: 7rem;
    overflow-y: scroll;
    position: relative;
}

.top{
    height:0.9rem;
    line-height: 0.9rem;
    text-align: center;
    font-size: .36rem;
    color:#4b4b4b;
    background-color:#fff;
    font-weight: bold;
}

.biao {
    position: relative;
    padding: 0 .3rem;
    background: #fff;
    margin-top: .2rem;
    .biaoActive {
        display: inline-block;
        width: .5rem;
        height: .3rem;
        background: url(../assets/biaoActive.png) no-repeat 50% 50%;
        background-size: 100%;
        vertical-align: bottom;
        margin-right: .1rem;
    }
    .activeTitle {
        padding-left: .17rem;
        color: #555;
        font-size: .3rem;
        vertical-align: bottom;
        display: inline-block;
        height: .3rem;
        margin-left: .17rem;
    }
    .VIP {
        display: inline-block;
        height: .56rem;
        width: .5rem;
        background: url(../assets/noobVIP.png) no-repeat 50% 50%;
        background-size: 100%;
        position: absolute;
        right: .63rem;
        top: -3px;
    }
    .HOT {
        display: inline-block;
        height: .56rem;
        width: .5rem;
        background: url(../assets/hot.png) no-repeat 50% 50%;
        background-size: 100%;
        position: absolute;
        right: .63rem;
        top: -3px;
    }
    .sellOut{
        display: inline-block;
        height: .56rem;
        width: .5rem;
        background: url(../assets/sellOut.png) no-repeat 50% 50%;
        background-size: 100%;
        position: absolute;
        right: .63rem;
        top: -3px;
    }
    .biaoTitle {
        padding: .3rem 0;
        font-size: 0;
        color: #555555;
        span {
            font-size: .3rem;
        }
    }
    .biaoContent {
        display: block;
        li:nth-of-type(1) {
          border-right: 1px solid #ccc;
        }
        li:nth-of-type(2) {
            text-align: right;
        }
        li {
            width: 50%;
            float: left;
            height: .8rem;
            div:nth-of-type(2) {
                font-size: .24rem;
                color: #c9c9c9;
                margin-top: .1rem;
            }
        }
        .year {
            div:nth-of-type(1) {
                font-size: .54rem;
                color: #ed7900;
            }
            i{
              font-style: normal;
            }
            div:nth-of-type(2){
                position: relative;
                .rz1{
                  width:1.55rem;
                  height:.22rem;
                  font-size: .24rem;
                  color: #c9c9c9;
                  position: absolute;
                  left:1.5rem;
                  top:0;
                  background: url(../assets/licai_icon.png) no-repeat left center;
                  text-indent: .3rem;
                  line-height: .22rem;
                  span{
                    font-size: .24rem;
                    color: #f59a22;
                    text-indent: 0;
                    display: inline-block;
                    line-height: .22rem;
                    height: .22rem;
                  }
                }
            }
        }
        .day {
            div:nth-of-type(1) {
                font-size: .3rem;
                color: #555555;
                padding-bottom: .32rem;
            }
            span{
              border: 1px solid #ccc;
              padding: .02rem;
              margin-left: .1rem;
            }
        }
    }
    .line {
        border-top: 1px solid #d9d9d9;
    }
    .touzi{
        padding-bottom: .25rem;
        text-align: right;
        .button{
          height:.64rem;
          width:1.8rem;
          border-radius: 4px;
          background-color:#43b2f7;
          font-size: .26rem;
          color:#fff;
          text-align: center;
          line-height: .64rem;
          display: inline-block;
          position: relative;
          &.button:nth-of-type(1){
            width:100%;
          }
          &.button:nth-of-type(3){
            background-color:#c5c4c4;
          }
        }
        .rz{
          position: absolute;
          left:.3rem;
          bottom:.47rem;
          font-size: .24rem;
          color: #c9c9c9;
          background: url(../assets/licai_icon.png) no-repeat left center;
          text-indent: .3rem;
          line-height: .22rem;
          height:.22rem;
          span{
            font-size: .24rem;
            color: #c9c9c9;
            display: inline-block;
            line-height: .22rem;
            height: .22rem;
            text-indent: 0;
            &.active{
              color:#f59a22
            }
          }
        }
    }
    .proess {
        padding: .2rem 0;
        li {
            width: 50%;
            float: left;
        }
        .proessContent {
            font-size: .24rem;
            color: #666666;
        }
        .proessText {
            text-align: right;
            font-size: 0;
            .title {
                font-size: .24rem;
                color: #666666;
                display: inline-block;
                vertical-align: middle;
            }
            .lines {
                display: inline-block;
                width: 1.3rem;
                height: .1rem;
                background: #f1f1f1;
                vertical-align: middle;
                span {
                    display: block;
                    height: 100%;
                    background: #ffb400;
                    width: 0;
                    transition: width 3s;
                }
            }
            .pars {
                font-size: .24rem;
                color: #ffb400;
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
}

.loadingWapper {
    text-align: center;
    font-size: 0;
    padding: .1rem 0;
    .loadingImg {
        display: inline-block;
        vertical-align: middle;
        width: .6rem;
        height: .3rem;
        background: url(../assets/loading.gif) no-repeat 50% 50%;
        background-size: 100%;
    }
    .loadingContent {
        display: inline-block;
        vertical-align: middle;
        color: #999;
        font-size: .24rem;
    }
}

.slideArea {
    font-size: 0;
    padding-bottom: .3rem;
    .shield {
        text-align: center;
        .line-1 {
            display: inline-block;
            width: .5rem;
            border-bottom: 1px solid #dcdcdc;
            margin-top: -.1rem;
            height: .1rem;
            margin-right: .37rem;
        }
        .line-2 {
            display: inline-block;
            width: .5rem;
            border-bottom: 1px solid #dcdcdc;
            margin-top: -.1rem;
            height: .1rem;
            margin-left: .37rem;
        }
        .shield-1 {
            display: inline-block;
            width: .27rem;
            height: .3rem;
            background: url(../assets/shield.png) no-repeat 50% 50%;
            background-size: 100%;
            vertical-align: middle;
            margin-right: .1rem;
            position: relative;
            bottom: .02rem;
        }
        .slideAreaText {
            font-size: .26rem;
            color: #b1b1b1;
            vertical-align: middle;
        }
    }
}

.downBiao {
    padding: .4rem 0;
    font-size: 0;
    text-align: center;
    span:nth-of-type(1) {
        font-size: .28rem;
        color: #a1a0a0;
    }
    span:nth-of-type(2) {
        font-size: .28rem;
        color: #8d8d8d;
        font-weight: bold;
        margin: 0 .2rem;
    }
    span:nth-of-type(3) {
        font-size: .28rem;
        color: #a1a0a0;
    }
    span:nth-of-type(4) {
        font-size: .28rem;
        color: #8d8d8d;
        font-weight: bold;
        margin-left: .2rem;
    }
}
</style>
