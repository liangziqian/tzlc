<template>
    <div>
        <!-- <div v-title>账户余额</div> -->
        <div class='cashBG'>
            <div class='cashBG-1'>可用余额(元)</div>
            <div class='cashBG-2'>{{money_usable}}</div>
        </div>
        <div class='glass cf'>
            <span>正在提现(元)</span>
            <span>{{money_withdraw}}</span>
        </div>
        <div class='mask' v-if='validata' style='z-index:11;'></div>
        <div class='validataPop' v-if='validata'>
            <div class='poptitle'>提示</div>
            <div class='popcontent'>{{validataContent}}</div>
            <div class='popBTN'>
                <span @click='closeValidataPop'>取消</span>
                <span @click='pathtoValidata'>{{validataBTNcontent}}</span>
            </div>
        </div>
        <div class='cashBTN cf'>
            <span @click='charge'>充值</span>
            <span @click='withdraw'>提现</span>
        </div>
        <div class='cashtips'>
            <i></i><span class='cashtips-orange'>温馨提示</span><span>：账户提现，工作日资金将在(T+1)24点前转入您的银行卡。</span>
        </div>
        <div class='slideArea'>
            <div class='shield'>
                <i class='shield-1'></i>
                <span class='slideAreaText'>个人资产由银行级别风控体系保障</span>
            </div>
        </div>
    </div>
</template>
<script>
import {
    Toast
} from 'mint-ui'
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
export default {
    data: function() {
        return {
            money_usable: '',
            money_withdraw: '',
            //以下验证使用
            validata: false,
            validataContent: '',
            validataBTNcontent: '',
            errorIndexArray: ''
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
                this.$router.push('/mybank')
            }
        },
        charge: function() {
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
        withdraw: function() {
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
        let $this = this
        $.post(ROOT + '/wap/myhome/iCount.html', function(response) {
            if (response.code == 0) {
                $this.money_usable = response.data.money_usable
                $this.money_withdraw = response.data.money_withdraw
            }
        })
    }
}
</script>
<style lang='less' scoped>
.cashBG {
    font-size: 0;
    height: 3.22rem;
    background: url(../assets/cashBG.png) no-repeat 50% 50%;
    background-size: 100%;
    .cashBG-1 {
        text-align: center;
        padding-top: .53rem;
        color: #ffffff;
        font-size: .32rem;
    }
    .cashBG-2 {
        text-align: center;
        padding-top: .48rem;
        font-size: .7rem;
        color: #fff;
    }
}

.slideArea {
    font-size: 0;
    position: fixed;
    bottom: .3rem;
    width: 100%;
    .arrow {
        text-align: center;
        padding: .2rem 0 .07rem 0;
        i {
            display: inline-block;
            width: .27rem;
            height: .26rem;
            background: url(../assets/arrow.png) no-repeat 50% 50%;
            background-size: 100%;
            transition: transform .5s;
        }
        .arrowTransform {
            transform: rotate(180deg);
        }
    }
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

.cashtips {
    font-size: .24rem;
    color: #888888;
    padding: 0 .3rem;
    i {
        display: inline-block;
        background: url('../assets/smallsun.png');
        width: .31rem;
        height: .3rem;
        background-size: 100%;
        vertical-align: middle;
        position: relative;
        bottom: .04rem;
        margin-right: .05rem;
    }
    .cashtips-orange {
        color: #ff7300;
    }
    span {
        vertical-align: middle;
    }
}

.cashBTN {
    padding: .45rem .3rem .3rem .3rem;
    span:nth-of-type(1) {
        float: left;
        font-size: .32rem;
        color: #fff;
        width: 3.33rem;
        border-radius: 40px;
        background: #44b2f7;
        padding: .2rem 0;
        text-align: center;
    }
    span:nth-of-type(2) {
        float: right;
        font-size: .32rem;
        color: #44b2f7;
        width: 3.33rem;
        border-radius: 40px;
        padding: .2rem 0;
        text-align: center;
        border: 1px solid #44b2f7;
        background: #fff;
    }
}

.glass {
    padding: .3rem .3rem;
    font-size: 0;
    background: #fff;
    span:nth-of-type(1) {
        float: left;
        font-size: .28rem;
        color: #333;
    }
    span:nth-of-type(2) {
        float: right;
        font-size: .3rem;
        color: #333;
    }
}
</style>
