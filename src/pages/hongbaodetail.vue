<template>
    <div>
        <!-- <div v-title>红包详情</div> -->
        <div class='hongbaodetail'>
            <div class='hongbaotimer cf'>
                <span>红包</span>
                <span>有效期至{{this.$route.query.time}}</span>
            </div>
            <div class='hongbaonumber'>{{this.$route.query.amount}}<span>元</span></div>
            <div class='hongbaoContent'>优惠券介绍</div>
            <div class='hongbaoContentText'>此券金额:{{this.$route.query.amount}}元</div>
            <div class='hongbaoContentText'>投资满{{this.$route.query.userMoney}}元才能使用，有效期{{this.$route.query.validTime}}天</div>
            <div class='hongbaoContentText'>投资期限需大于{{this.$route.query.timeLimit}}天</div>
            <div class='hongbaoContent' style='padding-top:.5rem;'>使用说明</div>
            <div class='hongbaoContentText'>每笔订单仅能使用一张优惠劵，不能与其它优惠券时使用</div>
            <div class='hongbaoContentText'>活动最终解释权浙江青柠网络科技有限公司所有</div>
        </div>
    </div>
</template>
<script>
export default {
    mounted: function() {
        console.log(this.$route.query)
    }
}
</script>
<style lang='less' scoped>
.hongbaodetail {
    width: 6.9rem;
    height: 7.17rem;
    background: url('../assets/hongbaodetailBG.png') no-repeat 50% 50%;
    background-size: 100%;
    margin: .2rem auto 0 auto;
    .hongbaotimer {
        font-size: 0;
        padding: .5rem .3rem .65rem .3rem;
        span:nth-of-type(1) {
            float: left;
            color: #44b2f7;
            font-size: .28rem;
        }
        span:nth-of-type(2) {
            float: right;
            color: #999;
            font-size: .24rem;
        }
    }
    .hongbaonumber {
        text-align: center;
        font-size: 1.1rem;
        color: #44b2f7;
        span {
            font-size: .38rem;
        }
    }
    .hongbaoContent {
        padding-top: .45rem;
        padding-left: .3rem;
        color: #676767;
        font-size: .28rem;
    }
    .hongbaoContentText {
        padding-top: .25rem;
        padding-left: .45rem;
        padding-right: .5rem;
        color: #999999;
        font-size: .28rem;
    }
}
</style>
