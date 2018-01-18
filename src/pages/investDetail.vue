<template>
    <div>
        <!-- <div v-title>投资详情</div> -->
        <div class='glass cf mg20'>
            <span class='title'>项目名称</span>
            <span class='content'>{{borrowName}}</span>
        </div>
        <div class='glass cf'>
            <span class='title'>投资本金(元)</span>
            <span class='content'>{{money}}</span>
        </div>
        <div class='glass cf'>
            <span class='title'>年化利率</span>
            <span class='content'>{{apr}}%</span>
        </div>
        <div class='glass cf'>
            <span class='title'>预期收益(元)</span>
            <span class='content'>{{interest}}</span>
        </div>
        <div class='glass cf'>
            <span class='title'>投资日</span>
            <span class='content'>{{tenderAddtime}}</span>
        </div>
        <!--        <div class='glass cf'>
            <span class='title'>回款日</span>
            <span class='content'>{{repayTime}}</span>
        </div> -->
        <div class='glass cf'>
            <span class='title'>状态</span>
            <span class='content bluefont'>{{status==5?'计息中':status==6||status==11?'已还款':status==2||status==3?'审核中':'募集中'}}</span>
        </div>
        <div class='activeBTN cf'>
            <span @click='checkoutProduct'>查看产品详情</span>
            <!--     <span>投资合同</span> -->
        </div>
    </div>
</template>
<script>
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
export default {
    data: function() {
        return {
            borrowName: this.$route.query.borrowName,
            money: this.$route.query.money,
            interest: this.$route.query.interest,
            repayTime: this.$route.query.repayTime,
            status: this.$route.query.status,
            tenderAddtime: '',
            apr: ''
        }
    },
    methods: {
        checkoutProduct: function() {
            this.$router.push('/detail/' + this.$route.params.id)
        }
    },
    mounted: function() {
        let $this = this
        $.post(ROOT + '/wap/myhome/tender_detail.html', {
            borrow_id: $this.$route.params.id,
            tender_id: $this.$route.params.tid
        }, function(response) {
            if (response.code == 0) {
                $this.apr = response.data.apr
                $this.tenderAddtime = response.data.time
            }
        })
    }
}
</script>
<style lang='less' scoped>
.mg20 {
    margin-top: .2rem;
}

.glass {
    background: #fff;
    padding: 0 .3rem;
    line-height: 1rem;
    div {
        border-bottom: 1px solid #d9d9d9;
    }
    .title {
        float: left;
        color: #a3a3a3;
        font-size: .28rem;
    }
    .content {
        float: right;
        color: #727272;
        font-size: .28rem;
    }
    .bluefont {
        color: #44b2f7;
    }
}

.activeBTN {
    font-size: 0;
    background: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #cfcfcf;
    span {
        padding: .3rem 0;
        float: left;
        width: 100%;
        color: #44b2f7;
        font-size: .36rem;
        text-align: center;
    }
    /*    span:nth-of-type(1) {
        border-right: 1px solid #cfcfcf;
    }*/
}
</style>
