<template>
    <div>
        <!-- <div v-title>红包优惠</div> -->
        <div class='hongbaotitle'>
            <span :class='[activeIndex==0?"active":""]' @click='activeCharge(0)'>红包</span>
            <span :class='[activeIndex==1?"active":""]' @click='activeCharge(1)'>加息券</span>
        </div>
        <div class='hongbaorule cf'>
            <span @click='popChange'><i></i><span>使用规则</span></span>
        </div>
        <div class='hongbaodetail cf' v-for='(h,index) in hongbaolist' :class='[h.status==0?"canUse":"noUse"]'>
            <router-link :to='{path:"/redpackagedetail",query:h}'>
                <div class='hongbaoNumber'>
                    <div>{{hongbaoContent}}</div>
                    <div>{{h.amount}}<span>元</span></div>
                </div>
                <div class='hongbaoNotice'>
                    <!--  <div><i></i><span>除周周盈外产品</span></div> -->
                    <div><i></i><span>红包有效期{{h.validTime}}天</span></div>
                    <div><i></i><span>投资期限{{h.timeLimit}}天以上</span></div>
                    <div><i></i><span>满{{h.userMoney}}元</span></div>
                </div>
                <div class='hongbaoTime'>
                    <span>有效期至{{h.time}}</span>
                    <span>详情</span>
                </div>
            </router-link>
        </div>
        <div class='noinvestBG' v-show='!hongbaolist.length'>
            <i></i>
            <div>参加活动获得更多优惠券</div>
        </div>
        <div class='downhongbao' @click='todown'>
            查看已失效优惠券&gt;
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
            activeIndex: 0,
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
        activeCharge: function(index) {
            let $this = this
            this.activeIndex = index
            if (index === 0) {
                $.post(ROOT + '/wap/myhome/hongbao_list.html', {
                    status: 0
                }, function(response) {
                    if (response.code == 0) {
                        for (let i of response.data) {
                            $this.hongbaolist.push(i)
                        }
                    }
                })
            } else {
                this.hongbaolist = []
            }
        }
    },
    mounted: function() {
        let $this = this
        $.post(ROOT + '/wap/myhome/hongbao_list.html', {
            status: 0
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
.hongbaotitle {
    font-size: 0;
    text-align: center;
    padding-bottom: .2rem;
    padding-top: .2rem;
    background: #fff;
    span {
        font-size: .26rem;
        background: #fff;
        display: inline-block;
        width: 1.9rem;
        height: .6rem;
        line-height: .6rem;
        color: #44b2f7;
        border: 1px solid #44b2f7;
    }
    .active {
        color: #fff;
        background: #44b2f7;
    }
    span:nth-of-type(1) {
        border-top-left-radius: 40px;
        border-bottom-left-radius: 40px;
    }
    span:nth-of-type(2) {
        border-top-right-radius: 40px;
        border-bottom-right-radius: 40px;
    }
}

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
    width: 6.9rem;
    height: 2.2rem;
    margin: 0 auto .2rem auto;
    position: relative;
    .hongbaoNumber {
        float: left;
        width: 50%;
        display: inline-block;
        padding-left: .4rem;
        padding-top: .3rem;
        div:nth-of-type(1) {
            font-size: .29rem;
            padding-bottom: .2rem;
        }
        div:nth-of-type(2) {
            font-size: .66rem;
            span {
                font-size: .34rem;
            }
        }
    }
    .hongbaoNotice {
        float: right;
        width: 50%;
        padding-top: .3rem;
        font-size: 0;
        div {
            padding-bottom: .2rem;
            i {
                display: inline-block;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background: #666666;
                margin-right: .1rem;
            }
            span {
                font-size: .22rem;
                color: #666666;
            }
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

.canUse {
    background: url('../assets/hongbaoCanUseBG.png') no-repeat 50% 50%;
    background-size: 100%;
    .hongbaoNumber {
        color: #35a0e4;
    }
}

.downhongbao {
    color: #8a8a8a;
    font-size: .24rem;
    text-align: center;
    padding: .35rem 0;
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
