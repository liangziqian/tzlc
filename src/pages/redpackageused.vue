<template>
    <div>
        <!-- <div v-title>已失效</div> -->
        <div class='hongbaodetail cf' v-for='(h,index) in hongbaolist' :class='[h.status==3?"guoqi":"used"]'>
            <div class='hongbaoNumber'>
                <div>{{hongbaoContent}}</div>
                <div>{{h.amount}}<span>元</span></div>
            </div>
            <div class='hongbaoNotice'>
                <!--  <div><i></i><span>除周周盈外产品</span></div> -->
                <div><i></i><span>红包有效期{{h.validTime}}天</span></div>
                <div><i></i><span>满{{h.userMoney}}元</span></div>
            </div>
            <div class='hongbaoTime'>
                <span>有效期至{{h.time}}</span>
                <!--  <span>详情</span> -->
            </div>
        </div>
        <div class='noinvestBG' v-show='!hongbaolist.length'>
            <i></i>
            <div>参加活动获得更多优惠券</div>
        </div>
    </div>
</template>
<script>
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
export default {
    data: function() {
        return {
            hongbaolist: []
        }
    },
    mounted: function() {
        let $this = this
        $.post(ROOT + '/wap/myhome/hongbao_list.html', {
            status: 1
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

.guoqi {
    background: url('../assets/hadguoqi.png') no-repeat 50% 50%;
    background-size: 100%;
    .hongbaoNumber {
        color: #999;
    }
}
.used {
    background: url('../assets/hadused.png') no-repeat 50% 50%;
    background-size: 100%;
    .hongbaoNumber {
        color: #999;
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
