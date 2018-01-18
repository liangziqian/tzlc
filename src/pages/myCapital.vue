<template>
    <div>
        <!-- <div v-title>我的资产</div> -->
        <div class='capitalSVG'>
            <div class='outerProgress'></div>
            <div class='progress'></div>
            <div class='capitalDetail cf' @click='popChange'>
                <div>总资产(元)<i></i></div>
                <div>{{capitalALL}}</div>
            </div>
        </div>
        <div class='capitalGlass cf'>
            <span>可用余额(元)</span>
            <span>{{canUseCapital}}</span>
        </div>
        <div class='line'>
            <div></div>
        </div>
        <div class='capitalGlass cf'>
            <span>提现中资金(元)</span>
            <span>{{getCapital}}</span>
        </div>
        <div class='line'>
            <div></div>
        </div>
        <div class='capitalGlass cf'>
            <span>待收金额(元)</span>
            <span>{{getCollection}}</span>
        </div>
        <div class='line'>
            <div></div>
        </div>
        <div class='capitalGlass cf'>
            <span>冻结资金(元)</span>
            <span>{{getFreeze}}</span>
        </div>
        <div class='line'>
            <div></div>
        </div>
         <div class='capitalGlass cf'>
            <span>累计收益(元)</span>
            <span>{{getProfit}}</span>
        </div>
        <div class='slideArea'>
            <div class='shield'>
                <i class='line-1'></i>
                <i class='shield-1'></i>
                <span class='slideAreaText'>个人资产由银行级别风控体系保障</span>
                <i class='line-2'></i>
            </div>
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
        <div class='activeBTN cf'>
            <span @click='charge'>充值</span>
            <span @click='withdraw'>提现</span>
        </div>
        <div class='mask' v-show='popflag'></div>
        <transition enter-active-class='animated bounceIn' leave-active-class='animated bounceOut'>
            <div class='pop' v-show='popflag'>
                <div class='popTitle'>
                    <span>资产说明</span>
                    <i @click='popChange'></i>
                </div>
                <div class='popContent'>
                    1、总资产
                    <br> 总资产=可用余额+提现中资金+待收金额+冻结资金。
                    <br>
                    <br> 2、可用金额
                    <br> 用户账户中可以投资或提现的金额。
                    <br>
                    <br> 3、提现中资金
                    <br>用户发起提现申请，当资金未到达用户银行卡前，该笔资金处于冻结状态。
                    <br>
                    <br> 4、待收金额
                    <br> 投资本金加上利息。
                    <br>
                    <br> 5、预期收入
                    <br> 用户投资项目时所产生的预期收益利息。
                    <br>
                    <br>
                </div>
                <div class='popBTN' @click='popChange'>我已了解</div>
            </div>
        </transition>
    </div>
</template>
<script>
import $ from '../config/jquery.min.js'
import eve from '../config/ring'
import ROOT from '../config/ROOT'
export default {
    data: function() {
        return {
            capitalALL: 0,
            canUseCapital: 0,
            getCapital: 0,
            giveCapital: 0,
            getProfit: 0,
            popflag: false,
            progress: 0,
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
        popChange: function() {
            this.popflag = !this.popflag
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
        this.$nextTick(function() {
            $.post(ROOT + '/wap/myhome/iCount.html', function(response) {
                $this.capitalALL = response.data.money_total
                $this.canUseCapital = response.data.money_usable
                $this.getCapital = response.data.money_withdraw
                $this.getCollection = response.data.money_collection
                $this.getFreeze = response.data.money_tender_freeze
                $this.giveCapital = response.data.sum_account
                $this.getProfit = response.data.sum_interest
                    /*进度条*/
                $this.progress = ($this.canUseCapital / $this.capitalALL) * 100
                new eve({
                    selector: '.progress',
                    w: $('.progress').width(),
                    R: $('.progress').width() / 3,
                    sW: 20,
                    sColor: '#ffd800',
                    fColor: '#f95a29',
                    bgColor: '#fff',
                    percent: $this.progress,
                    speed: 1000,
                    delay: 0
                })
                new eve({
                    selector: '.outerProgress',
                    w: $('.outerProgress').width(),
                    R: $('.progress').width() / 2.5,
                    sW: 5,
                    sColor: '#ffd800',
                    fColor: '#f95a29',
                    bgColor: '#e5e5e5',
                    percent: 100,
                    speed: 0,
                    delay: 0
                })
            })
        })
    }
}
</script>
<style lang='less' scoped>
.capitalSVG {
    height: 3.12rem;
    background: #f95a29;
    text-align: center;
    font-size: 0;
    position: relative;
    margin-bottom: .1rem;
    .progress {
        height: 100%;
        display: inline-block;
        width: 3.75rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .outerProgress {
        height: 100%;
        display: inline-block;
        width: 3.75rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .capitalDetail {
        height: 100%;
        display: inline-block;
        width: 3.75rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        div:nth-of-type(1) {
            padding-top: 1.5rem;
            font-size: .24rem;
            color: #fff;
        }
        div:nth-of-type(2) {
            padding-top: .15rem;
            font-size: .42rem;
            color: #fff;
        }
        i {
            display: inline-block;
            width: .28rem;
            height: .28rem;
            background: url(../assets/capitalDetail.png) no-repeat 50% 50%;
            background-size: 100%;
            position: relative;
            left: .1rem;
            top: .06rem;
        }
    }
}

.slideArea {
    margin-top: .3rem;
    font-size: 0;
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

.line {
    text-align: right;
    font-size: 0;
    background: #fff;
    div {
        display: inline-block;
        width: 7rem;
        border-top: 1px solid #d9d9d9;
    }
}

.capitalGlass {
    font-size: 0;
    background: #fff;
    padding: .4rem .6rem .4rem .4rem;
    span:nth-of-type(1) {
        float: left;
        color: #aaaaaa;
        font-size: .3rem;
    }
    span:nth-of-type(2) {
        float: right;
        font-size: .3rem;
        color: #000000;
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
        width: 50%;
        color: #44b2f7;
        font-size: .36rem;
        text-align: center;
    }
    span:nth-of-type(1) {
        border-right: 1px solid #cfcfcf;
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

.mask {
    display: inline-block;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #000;
    opacity: .6;
}
</style>
