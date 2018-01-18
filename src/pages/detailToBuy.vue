<template>
    <div class='warpper'>
        <!-- <div v-title>立即抢购</div> -->
        <div class='buydetail'>
            <div class='buydetail-cell1'>
                <div>{{apr}}<span>%</span></div>
            </div>
            <div class='buydetail-cell2'>
                <div>{{borrowName}}</div>
                <div>期限{{validTime}}{{isday==0?'月':'天'}}</div>
            </div>
        </div>
        <div class='line'>
            <div></div>
        </div>
        <div class='moneydetail'>剩余可投金额(元)：<span>{{accountRemain}}</span></div>
        <div class='type-input'>
            <span class='input-title'>投资金额(元)</span>
            <input type="text" id='typeinput' :placeholder='lowestAccount+"元起投，整百购买"' class='sp-input pr153' :class='[fs2]' v-model.trim='codeval'>
            <span class='sendcode' :class='{sendcodegray:sendcodeStyle}' @click='showHand'>余额全投</span>
        </div>
        <div class='line'>
            <div></div>
        </div>
        <div class='canuse cf'>
            <div>预期收益(元):<span>{{interest}}</span></div>
            <div>可用余额(元)：<span>{{moneyUsable}}</span></div>
        </div>
        <div class='divwapper cf mg20' @click='dealhongbao'>
            <span>优惠券</span>
            <i></i>
            <span class='versionNum'>{{hongbaoChargeContent}}</span>
        </div>
        <div class='form-radio'>
            <i :class='[radioStyleFlag ? radioright : radioerror]' @click='radioChange'></i><span>我同意<span>《支付协议》</span></span>
        </div>
        <div class='slideArea'>
            <div class='shield'>
                <i class='shield-1'></i>
                <span class='slideAreaText'>资金服务由第三方机构富友支付提供</span>
            </div>
        </div>
        <div class='buyBTN'>
            <div :class='[colorBTN ? "blueBTN" : ""]' @click='tosub'>确定</div>
        </div>
        <!--公用遮罩层-->
        <div class='mask' v-show='inputflag||hongbaoflag||bankflag'></div>
        <!--红包选择框-->
        <transition enter-active-class='animated slideInUp' leave-active-class='animated slideOutDown'>
            <div class='hongbaoGlass' v-show='hongbaoflag'>
                <div class='hongbaoTitle'>
                    选择优惠券
                    <span @click='closehongbao'>完成</span>
                </div>
                <div class='hongbaoBar'>
                    <span @click='hongbao(1)'><i :class='[hongbaoBarFlag?"active":"normal"]'></i><span :class='[hongbaoBarFlag?"fontactive":""]'>红包</span></span>
                    <span @click='hongbao(2)'><i :class='[!hongbaoBarFlag?"active":"normal"]'></i><span :class='[!hongbaoBarFlag?"fontactive":""]'>加息券</span></span>
                    <i class='hongbaoline' :class='[!hongbaoBarFlag?"hongbaoline50":""]'></i>
                </div>
                <div class='buydetailHongbaolist'>
                    <div class='hongbaodetail cf' v-for='(h,index) in hongbaolist' :class='[h.status==0?"canUse":"noUse"]' @click='hongbaoclick($event,h.id,index)'>
                        <!--    <div class='hiddenContent' style='display:none;'>{{h.remark}}</div> -->
                        <div class='hongbaoNumber'>
                            <div>{{hongbaoContent}}</div>
                            <div>{{h.amount}}<span>元</span></div>
                        </div>
                        <div class='hongbaoNotice'>
                            <!-- <div><i></i><span>除周周盈外产品</span></div> -->
                            <div><i></i><span>红包有效期{{h.validTime}}天</span></div>
                            <div><i></i><span>满{{h.userMoney}}元</span></div>
                            <div><i></i><span>投资期限需大于{{h.timeLimit}}天</span></div>
                        </div>
                        <div class='hongbaoTime'>
                            <span>有效期至{{h.time}}</span>
                            <span>
                                <router-link :to='{path:"/redpackagedetail",query:h}'>详情</router-link>
                            </span>
                        </div>
                    </div>
                    <div class='nohaveHongbao' v-show='hongbaolist.length==0'>
                        <i></i>
                        <div>当前没有优惠券</div>
                    </div>
                    <div class='hongbaoFoot' @click='nohongbao' v-show='hongbaolist.length>0'>
                        <i></i>不使用优惠券
                    </div>
                </div>
            </div>
        </transition>
        <!-- 余额不足的弹窗 -->
        <transition enter-active-class='animated slideInUp' leave-active-class='animated slideOutDown'>
            <div class='hongbaoGlass' v-show='bankflag'>
                <div class='bankTitle'>
                    <i @click='closebankPop'></i>付款详情
                </div>
                <div class='bankList cf'>
                    <span>投资金额</span>
                    <span>{{codeval}}元</span>
                </div>
                <div class='bankList cf'>
                    <span>余额支付</span>
                    <span v-if='hongbaoChargeContent==="选择优惠券"'>{{needBank?moneyUsable:codeval}}元</span>
                    <span v-else>{{needBank?moneyUsable:codeval-hongbaoCharge}}元</span>
                </div>
                <div class='bankList cf'>
                    <span>优惠抵扣</span>
                    <span>{{hongbaoChargeContent==='选择优惠券'?'0元':hongbaoChargeContent}}</span>
                </div>
                <div class='bankList cf'>
                    <span style='color:#333333;'>还需银行卡支付</span>
                    <span style='font-size:.4rem;color:#fd6721;'>{{needBank?codeval-moneyUsable-hongbaoCharge:0}}元</span>
                </div>
                <div class='chargeGlass cf'>
                    <div class='chargeGlass-4 cf'>
                        <i v-if='backname=="招商银行"' class='zhaoshang'></i>
                        <i v-if='backname=="工商银行"' class='gongshang'></i>
                        <i v-if='backname=="光大银行"' class='guangda'></i>
                        <i v-if='backname=="广发银行"' class='guangfa'></i>
                        <i v-if='backname=="华夏银行"' class='huaxia'></i>
                        <i v-if='backname=="建设银行"' class='jianshe'></i>
                        <i v-if='backname=="民生银行"' class='minsheng'></i>
                        <i v-if='backname=="农业银行"' class='nongye'></i>
                        <i v-if='backname=="平安银行"' class='pingan'></i>
                        <i v-if='backname=="浦发银行"' class='pufa'></i>
                        <i v-if='backname=="兴业银行"' class='xingye'></i>
                        <i v-if='backname=="邮政储蓄银行"' class='youzheng'></i>
                        <i v-if='backname=="中国银行"' class='zhongguo'></i>
                        <i v-if='backname=="中信银行"' class='zhongxin'></i>
                        <div class='chargeGlass-7'>
                            <div class='chargeGlass-5'>{{backname}}
                                <!-- <span>(尾号{{endnum}})</span> -->
                            </div>
                            <div class='chargeGlass-6'>单笔最高{{singleAmount}}万，日累计{{dailyAmont}}万</div>
                        </div>
                    </div>
                </div>
                <div class='slideArea' style='margin-top: 1rem;'>
                    <div class='shield'>
                        <i class='shield-1'></i>
                        <span class='slideAreaText'>资金服务由第三方机构富友支付提供</span>
                    </div>
                </div>
                <div class='buyBTN'>
                    <div :class='[colorBTN ? "blueBTN" : ""]' @click='tosubpassword'>确定</div>
                </div>
            </div>
        </transition>
        <!--交易密码-->
        <div class='dealPasswordInput' v-show='inputflag' @click='showdealpassword'>
            <div class='dealpasswordCloseAndTitle'>
                <i @click='dealpasswordClose'></i>
                <span>请输入交易密码</span>
            </div>
            <div class='inputflag cf'>
                <input type="password" maxlength="6" id='forinput' v-model.trim='inputval'>
                <div><span v-show='lengthwatcher > 0'></span></div>
                <div><span v-show='lengthwatcher > 1'></span></div>
                <div><span v-show='lengthwatcher > 2'></span></div>
                <div><span v-show='lengthwatcher > 3'></span></div>
                <div><span v-show='lengthwatcher > 4'></span></div>
                <div><span v-show='lengthwatcher > 5'></span></div>
            </div>
            <div class='forget' @click='todealpassword'>忘记密码?</div>
        </div>
        <form :action='formAddress' id='chargeSubmit' type='post'>
            <input type="hidden" name='ENCTP' id='form1'>
            <input type="hidden" name='FM' id='form2'>
            <input type="hidden" name='LOGOTP' id='form3'>
            <input type="hidden" name='MCHNTCD' id='form4'>
            <input type="hidden" name='VERSION' id='form5'>
        </form>
    </div>
</template>
<script>
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
import {
    Toast
} from 'mint-ui'
export default {
    data: function() {
        return {
            fs2: 'fs28',
            codeval: '',
            radioStyleFlag: true,
            radioerror: 'radioerror', //radio不选
            radioright: 'radioright', //radio选中
            apr: '',
            borrowName: '',
            borrowId: -1,
            validTime: '',
            accountRemain: '',
            lowestAccount: 0,
            moneyUsable: 0,
            interest: 0,
            colorBTN: false,
            inputflag: false,
            lengthwatcher: 0,
            inputval: '',
            hongbaoflag: false,
            hongbaoBarFlag: true,
            hongbaolist: [],
            hongbaoContent: '红包',
            hongbaoSendId: 0,
            hongbaoChargeContent: '选择优惠券',
            hongbaoCharge: 0,
            backname: '',
            isday: -1,
            endnum: '',
            singleAmount: '',
            dailyAmont: '',
            bankflag: false,
            hongbaoindex: -1,
            needBank: false,
            // formAddress: 'http://www-1.fuiou.com:18670/mobile_pay/h5pay/payAction.pay',
            formAddress: ROOT == '' ? 'https://mpay.fuiou.com:16128/h5pay/payAction.pay' : 'http://www-1.fuiou.com:18670/mobile_pay/h5pay/payAction.pay'
        }
    },
    watch: {
        codeval: function() {
            this.fs2 = this.codeval === '' ? 'fs28' : 'fs32'
            this.colorBTN = this.codeval.toString().length > 2 && this.radioStyleFlag ? true : false
        },
        radioStyleFlag: function() {
            this.colorBTN = this.codeval.toString().length > 2 && this.radioStyleFlag ? true : false
        },
        inputval: function() {
            let $this = this
            let orderid=(new Date()).valueOf();
            if (this.inputval.length == 6) {
                let data = {}
                if ($this.hongbaoindex > -1) {
                    data = {
                        borrowId: $this.$route.query.id,
                        payPassword: $this.inputval,
                        tenderMoney: $this.codeval - $this.hongbaoCharge,
                        source: 'h5',
                        hongbaoId: $this.hongbaoSendId,
                        orderid:orderid
                    }
                } else {
                    data = {
                        borrowId: $this.$route.query.id,
                        payPassword: $this.inputval,
                        tenderMoney: $this.codeval,
                        source: 'h5',
                        orderid:orderid
                    }
                }
                $.post(ROOT + '/wap/borrow/tender.html', data, function(response) {
                    if (response.code == 0) {
                        if (response.data.ENCTP) {
                            // debugger
                            // $this.formAddress = response.data.submit_url
                            $('#form1').val(response.data.ENCTP)
                            $('#form2').val(response.data.FM)
                            $('#form3').val(response.data.LOGOTP)
                            $('#form4').val(response.data.MCHNTCD)
                            $('#form5').val(response.data.VERSION)
                            $('#chargeSubmit').submit()
                        } else {
                            TrackingIO.payment (orderid,$this.codeval,'CNY','yeepay');
                            $this.$router.push({
                                path: '/success',
                                query: {
                                    type: 7,
                                    money: $this.codeval,
                                    interest: $this.interest,
                                    borrowname: $this.borrowName
                                }
                            })
                        }
                    } else {
                        Toast(response.msg)
                    }
                })
            }
            this.lengthwatcher = this.inputval.length
        }
    },
    methods: {
        todealpassword: function() {
            this.$router.push({
                path: '/dealpassword',
                query: {
                    type: 0
                }
            })
        },
        tosubpassword: function() {
            this.bankflag = false
            this.inputflag = true
            this.$nextTick(function() {
                $('#forinput').focus()
            })
        },
        nohongbao: function() {
            this.hongbaoflag = !this.hongbaoflag
            this.hongbaolist = []
            this.hongbaoindex = -1
            this.hongbaoChargeContent = '选择优惠券'
        },
        closebankPop: function() {
            this.bankflag = !this.bankflag
        },
        hongbaoclick: function(e, id, index) {
            let $this = this
            this.hongbaoSendId = id
            $(e.currentTarget).siblings().removeClass('checkActive')
            if ($(e.currentTarget).hasClass('noUse')) {
                Toast('该红包无法使用')
            } else {
                $(e.currentTarget).addClass('checkActive')
                $this.hongbaoindex = index
                $this.hongbaoCharge = parseInt($(e.currentTarget).find('.hongbaoNumber>div:eq(1)').text())
                $this.hongbaoChargeContent = '红包抵扣' + $(e.currentTarget).find('.hongbaoNumber>div:eq(1)').text()
            }
        },
        hongbao: function(index) {
            let $this = this
            if (index === 1) {
                this.hongbaoBarFlag = true
                this.hongbaolist = []
                $.post(ROOT + '/wap/myhome/hongbao_list.html', {
                    status: 0,
                    tenderMoney: $this.codeval,
                    borrowId: $this.borrowId
                }, function(response) {
                    if (response.code == 0) {
                        for (let i of response.data) {
                            $this.hongbaolist.push(i)
                        }
                        $this.$nextTick(function() {
                            if ($this.hongbaoindex > -1) {
                                $('.hongbaodetail').eq($this.hongbaoindex).addClass('checkActive')
                            }
                        })
                    }
                })
            } else if (index === 2) {
                this.hongbaoBarFlag = false
                this.hongbaolist = []
            }
        },
        radioChange: function() {
            this.radioStyleFlag = this.radioStyleFlag === true ? false : true
        },
        showHand: function() {
            this.codeval = this.moneyUsable
            $('#typeinput').blur()
        },
        tosub: function() {
            let $this = this
            if (!this.colorBTN) return false
            if (this.codeval > this.moneyUsable) {
                this.needBank = true
            } else {
                this.needBank = false
            }
            this.bankflag = true
                // return false
                // }
                // this.inputflag = true
                // this.$nextTick(function() {
                //     $('#forinput').focus()
                // })
        },
        dealpasswordClose: function() {
            this.inputflag = !this.inputflag
            this.inputval = ''
        },
        showdealpassword: function() {
            $('#forinput').focus()
        },
        dealhongbao: function() {
            let $this = this
            if (this.codeval < this.lowestAccount) {
                Toast('投资金额需大于' + this.lowestAccount + '元')
                return false
            }
            $.post(ROOT + '/wap/myhome/hongbao_list.html', {
                status: 0,
                tenderMoney: $this.codeval,
                borrowId: $this.borrowId
            }, function(response) {
                if (response.code == 0) {
                    for (let i of response.data) {
                        $this.hongbaolist.push(i)
                    }
                    $this.$nextTick(function() {
                        if ($this.hongbaoindex > -1) {
                            $('.hongbaodetail').eq($this.hongbaoindex).addClass('checkActive')
                        }
                    })
                }
            })
            this.hongbaoflag = !this.hongbaoflag
        },
        closehongbao: function() {
            this.hongbaoflag = !this.hongbaoflag
            this.hongbaolist = []
        }
    },
    mounted: function() {
        sessionStorage.removeItem('borrowIndex')
        let $this = this
        this.$nextTick(function() {
            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                $('#forinput').css('font-size', 0)
            }
            $('#typeinput').on('blur', function() {
                $this.codeval = $this.codeval === '' ? 0 : $this.codeval
                let parseVal = parseInt($this.codeval).toString()
                if (parseVal.length > 2) {
                    $this.codeval = parseInt(parseVal.substring(0, parseVal.length - 2) + '00')
                } else {
                    $this.codeval = parseVal
                }
                if ($this.codeval > $this.accountRemain) {
                    $this.codeval = $this.accountRemain
                    Toast('剩余可投金额不足，已帮您自动更改')
                }
                $.post(ROOT + '/wap/borrow/expect_profit.html', {
                    borrowId: $this.$route.query.id,
                    tenderMoney: $this.codeval
                }, function(response) {
                    $this.interest = response.data.interest
                })
            })
        })
        $.post(ROOT + '/wap/borrow/detail.html', {
            borrow_id: $this.$route.query.id
        }, function(response) {
            $this.apr = response.data.apr
            $this.borrowName = response.data.borrowName
            $this.borrowId = response.data.borrowId
            $this.validTime = response.data.validTime
            $this.accountRemain = response.data.accountRemain
            $this.lowestAccount = response.data.lowestAccount
            $this.isday = response.data.isDay
        })
        $.post(ROOT + '/wap/borrow/prep_tender.html', {
            borrowId: $this.$route.query.id
        }, function(response) {
            if (response.code == 0) {
                $this.moneyUsable = response.data.moneyUsable
            } else {
                Toast(response.msg)
                $this.$router.push({
                    path: '/index/money',
                    query: {
                        type: 2
                    }
                })
            }
        })
        $.post(ROOT + '/wap/myhome/card_list.html', function(response) {
            if (response.code == 0) {
                $this.backname = response.data.bank_name
                $this.endnum = response.data.card_no.substring(response.data.card_no.lastIndexOf('*') + 1)
                $this.singleAmount = response.data.singleAmount
                $this.dailyAmont = response.data.dailyAmont
            }
        })
    }
}
</script>
<style lang='less' scoped>
.chargeGlass {
    background: #fff;
    padding: .3rem .3rem .3rem 0;
    font-size: 0;
    margin-left: .3rem;
    border-bottom: 1px solid #d9d9d9;
    .chargeGlass-1 {
        font-size: .28rem;
        color: #666;
        vertical-align: middle;
    }
    .chargeGlass-2 {
        margin-left: .9rem;
        font-size: .3rem;
        color: #333;
        vertical-align: middle;
    }
    .chargeGlass-3 {
        font-size: .2rem;
        color: #fff;
        background: #ed7a00;
        text-align: center;
        float: right;
        width: .78rem;
        height: .28rem;
        line-height: 1.5;
    }
    .chargeGlass-4 {
        display: inline-block;
        vertical-align: middle;
        i {
            display: inline-block;
            width: .51rem;
            height: .5rem;
            /*background: url('../assets/bank-icon.png') no-repeat 50% 50%;
            background-size: 100%;*/
            float: left;
            position: relative;
            top: .1rem;
            right: .1rem;
        }
    }
    .chargeGlass-7 {
        float: right;
        .chargeGlass-5 {
            font-size: .3rem;
            color: #666666;
            margin-bottom: .15rem;
            span {
                margin-left: .2rem;
                font-size: .24rem;
            }
        }
        .chargeGlass-6 {
            font-size: .24rem;
            color: #afafaf;
        }
    }
}

.nohaveHongbao {
    font-size: 0;
    padding-top: 1.7rem;
    i {
        display: block;
        width: 3.37rem;
        height: 2.25rem;
        margin: 0 auto;
        background: url('../assets/donthaveHongbao.png') no-repeat 50% 50%;
    }
    div {
        text-align: center;
        font-size: .28rem;
        padding-top: .3rem;
        color: #7e7e7e;
    }
}

.buydetail {
    padding: .2rem 0 .2rem 0;
    background: #fff;
    font-size: 0;
    .buydetail-cell1 {
        padding-left: .3rem;
        display: inline-block;
        width: 3.45rem;
        vertical-align: top;
        div {
            font-size: .9rem;
            color: #fb4d4d;
            span {
                font-size: .3rem;
            }
        }
    }
    .buydetail-cell2 {
        display: inline-block;
        width: 3.45rem;
        vertical-align: top;
        div {
            font-size: .32rem;
            color: #888888;
        }
        div:nth-of-type(2) {
            padding-top: .22rem;
        }
    }
}

.hongbaoGlass {
    width: 100%;
    height: 9.65rem;
    background: #fff;
    z-index: 6;
    position: fixed;
    bottom: 0;
    left: 0;
    overflow: hidden;
    .hongbaoTitle {
        text-align: center;
        font-size: .38rem;
        color: #333333;
        position: relative;
        height: 1.1rem;
        line-height: 1.1rem;
        border-bottom: 1px solid #d9d9d9;
        span {
            position: absolute;
            right: .25rem;
            top: 0;
            font-size: .3rem;
            color: #44b2f7;
        }
    }
    .bankTitle {
        text-align: center;
        font-size: .38rem;
        color: #333333;
        position: relative;
        height: 1.1rem;
        line-height: 1.1rem;
        border-bottom: 1px solid #d9d9d9;
        i {
            display: inline-block;
            width: .5rem;
            height: .5rem;
            background: url('../assets/closePop.png') no-repeat 50% 50%;
            background-size: 100%;
            float: left;
            position: absolute;
            top: .3rem;
            left: .3rem;
        }
    }
    .bankList {
        margin-left: .3rem;
        border-bottom: 1px solid #d9d9d9;
        padding: .35rem .3rem .35rem 0;
        span:nth-of-type(1) {
            float: left;
            font-size: .3rem;
            color: #afafaf;
        }
        span:nth-of-type(2) {
            float: right;
            color: #333333;
            font-size: .3rem;
        }
    }
    .buydetailHongbaolist {
        margin-top: .2rem;
        height: 7.5rem;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
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
                    a {
                        color: #999;
                    }
                }
                span:nth-of-type(1) {}
                span:nth-of-type(2) {
                    float: right;
                }
            }
        }
        .hongbaoFoot {
            color: #797979;
            font-size: .32rem;
            text-align: center;
            padding: .4rem 0;
            width: 6.9rem;
            margin: 0 auto;
            border: 1px solid #d9d9d9;
            position: relative;
            i {
                width: .36rem;
                height: .36rem;
                background: url('../assets/nohongbao.png') no-repeat 50% 50%;
                display: inline-block;
                position: absolute;
                top: .38rem;
                left: 2rem;
            }
        }
        .canUse {
            background: url('../assets/hongbaoCanUseBG1.png') no-repeat 50% 50%;
            background-size: 100%;
            .hongbaoNumber {
                color: #35a0e4;
            }
        }
        .noUse {
            background: url('../assets/hongbaoNoUseBG1.png') no-repeat 50% 50%;
            background-size: 100%;
            .hongbaoNumber {
                color: #dbdbdb;
            }
        }
        .checkActive {
            background: url('../assets/hongbaoActiveBG.png') no-repeat 50% 50% !important;
            background-size: 100% !important;
        }
    }
    .hongbaoBar {
        font-size: 0;
        border-bottom: 1px solid #d9d9d9;
        position: relative;
        >span {
            display: inline-block;
            text-align: center;
            width: 50%;
            font-size: 0;
            color: #c0c0c0;
            margin: .3rem 0;
        }
        >span:nth-of-type(1) {
            border-right: 1px solid #d9d9d9;
            i {
                display: inline-block;
                width: .38rem;
                height: .26rem;
                vertical-align: middle;
                margin-right: .05rem;
            }
            span {
                vertical-align: middle;
                font-size: .28rem;
            }
            .fontactive {
                color: #44b2f7;
            }
            .normal {
                background: url('../assets/cash.png') no-repeat 50% 50%;
                background-size: 100%;
            }
            .active {
                background: url('../assets/cashactive.png') no-repeat 50% 50%;
                background-size: 100%;
            }
        }
        span:nth-of-type(2) {
            i {
                display: inline-block;
                width: .38rem;
                height: .26rem;
                vertical-align: middle;
                margin-right: .05rem;
            }
            span {
                vertical-align: middle;
                font-size: .28rem;
            }
            .fontactive {
                color: #44b2f7;
            }
            .normal {
                background: url('../assets/jiaxi.png') no-repeat 50% 50%;
                background-size: 100%;
            }
            .active {
                background: url('../assets/jiaxiactive.png') no-repeat 50% 50%;
                background-size: 100%;
            }
        }
        .hongbaoline {
            display: inline-block;
            height: 2px;
            background: #44b2f7;
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 50%;
            transition: left .3s;
        }
        .hongbaoline50 {
            left: 50%;
        }
    }
}

.warpper {
    height: 100%;
}

.slideArea {
    font-size: 0;
    margin-top: 2rem;
    width: 100%;
    .shield {
        text-align: center;
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

.divwapper {
    font-size: 0;
    background: #fff;
    padding: .3rem 0;
    i:nth-of-type(1) {
        display: inline-block;
        width: .2rem;
        height: .36rem;
        float: right;
        background: url(../assets/blink.png) no-repeat 50% 50%;
        background-size: 100%;
        margin-right: .3rem;
        margin-left: .15rem;
    }
    >span:nth-of-type(1) {
        font-size: .28rem;
        color: #555555;
        float: left;
        margin-top: .08rem;
        margin-left: .4rem;
        font-weight: bold;
    }
    .versionNum {
        float: right;
        font-size: .24rem;
        color: #cccccc;
        margin-top: .08rem;
    }
}

.moneydetail {
    font-size: .28rem;
    color: #666666;
    background: #fff;
    padding: .24rem 0 .24rem .4rem;
    span {
        color: #333333;
        font-size: .3rem;
    }
}

.line {
    text-align: right;
    font-size: 0;
    background: #fff;
    div {
        display: inline-block;
        width: 7.1rem;
        border-top: 1px solid #d9d9d9;
    }
}

.type-input {
    margin-top: .2rem;
    font-size: 0;
    position: relative;
    height: .88rem;
    .clear-input {
        display: inline-block;
        width: .28rem;
        height: .88rem;
        background: url(../assets/clearinput.png) no-repeat 50% 50%;
        position: absolute;
        background-size: 100%;
        right: .95rem;
    }
    .input-title {
        font-size: .28rem;
        display: inline-block;
        width: 2.2rem;
        height: .88rem;
        line-height: .88rem;
        padding: 0 0 0 .4rem;
        color: #555;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        font-weight: bold;
    }
    .pr153 {
        padding-right: 1.53rem !important;
    }
    .sendcode {
        font-size: .3rem;
        width: 1.53rem;
        height: .88rem;
        line-height: .88rem;
        display: inline-block;
        position: absolute;
        right: 0;
        top: 0;
        color: #44b2f7;
        text-align: right;
        padding: 0 .25rem 0 0;
    }
    .sendcodegray {
        color: #999 !important;
    }
    .sp-input {
        width: 100%;
        height: .88rem;
        position: absolute;
        left: 0;
        top: 0;
        padding: 0 1.23rem 0 2.5rem;
    }
    .fs28 {
        font-size: .28rem;
    }
    .fs32 {
        font-size: .32rem;
    }
}

.canuse {
    padding: .15rem .25rem .15rem .4rem;
    background: #fff;
    div:nth-of-type(1) {
        float: left;
        font-size: .24rem;
        color: #888888;
        span {
            font-size: .26rem;
            color: #ed7a00;
        }
    }
    div:nth-of-type(2) {
        float: right;
        font-size: .24rem;
        color: #888888;
        span {
            font-size: .26rem;
            color: #ed7a00;
        }
    }
}

.form-radio {
    font-size: 0;
    margin-top: .4rem;
    i {
        display: inline-block;
        width: .32rem;
        height: .32rem;
        vertical-align: middle;
        margin: 0 .16rem 0 .3rem;
    }
    .radioerror {
        background: url(../assets/radio.png) no-repeat 50% 50%;
        background-size: 100%;
    }
    .radioright {
        background: url(../assets/radio-right.png) no-repeat 50% 50%;
        background-size: 100%;
    }
    >span {
        font-size: .28rem;
        font-weight: bold;
        vertical-align: middle;
        >span {
            color: #ed7900;
        }
    }
}

.buyBTN {
    text-align: center;
    div {
        display: inline-block;
        margin: .3rem 0 0 0;
        width: 6.9rem;
        height: .96rem;
        border-radius: 15px;
        background: #9ed5f8;
        color: #fff;
        text-align: center;
        font-size: .36rem;
        line-height: .96rem;
    }
}

.blueBTN {
    background: #44b2f7 !important;
}

.mask {
    background: RGBA(0, 0, 0, .6);
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
}

.dealPasswordInput {
    font-size: 0;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    z-index: 1;
    background: #fff;
    padding-bottom: 1.14rem;
    z-index: 6;
    .dealpasswordCloseAndTitle {
        text-align: left;
        border-bottom: 1px solid #d9d9d9;
        padding: .38rem;
        margin-bottom: 1.14rem;
        i {
            display: inline-block;
            background: url('../assets/dealpasswordClose.png') no-repeat 50% 50%;
            width: .48rem;
            background-size: 100%;
            height: .46rem;
            vertical-align: middle;
        }
        span {
            color: #333333;
            font-size: .38rem;
            vertical-align: middle;
            padding-left: 1.58rem;
        }
    }
    .inputflag {
        position: relative;
        overflow: hidden;
        display: inline-block;
        width: 6.9rem;
        height: 1.17rem;
        border: 2px solid #aaaaaa;
        border-radius: 10px;
        #forinput {
            height: 50%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        div {
            float: left;
            display: inline-block;
            width: 16.6%;
            height: 100%;
            background-color: #Fff;
            border-right: 1px solid #eaeaea;
            position: relative;
            span {
                display: inline-block;
                background: url(../assets/point.png) no-repeat 50% 50%;
                background-size: 75%;
                width: .3rem;
                height: .3rem;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
        div:last-child {
            border: none;
        }
    }
    .forget {
        font-size: .26rem;
        float: right;
        position: relative;
        top: .3rem;
        right: .3rem;
        color: #ed7900;
    }
}
</style>
