<template>
    <div>
        <!-- <div v-title>充值</div> -->
        <div class='chargeGlass cf mg20'>
            <span class='chargeGlass-1'>姓名</span>
            <span class='chargeGlass-2'>{{realname}}</span>
            <span class='chargeGlass-3'>已实名</span>
        </div>
        <div class='line'>
            <div></div>
        </div>
        <div class='chargeGlass cf'>
            <span class='chargeGlass-1'>银行卡</span>
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
                    <div class='chargeGlass-5'>{{backname}}<span>(尾号{{endnum}})</span></div>
                    <div class='chargeGlass-6'>单笔最高{{singleAmount}}万，日累计{{dailyAmont}}万</div>
                </div>
            </div>
        </div>
        <div class='chargeTips'>充值金额</div>
        <!--         <div class='chargeInput cf'>
            <span style='float: left;position: relative;top: .04rem;'>金额(元)</span>
            <input style='float: left;' type="text" placeholder="请输入金额" v-model.trim='moneyval'>
        </div> -->
        <div class='bank-type-input mg20'>
            <span class='input-title'>金额(元)</span>
            <!--             <span class='sp-input' :class='[fs3]'>{{cityContext}}</span> -->
            <input class='sp-input' type="text" placeholder="充值金额需大于2元" v-model.trim='moneyval'>
            <!--  <span class='allget' @click='allget'>全部提现</span> -->
        </div>
        <div class='subBTN'>
            <button type='button' :class='[colorBTN ? "blueBTN" : ""]' @click='tosub'>确定</button>
        </div>
        <div class='form-radio'>
            <i :class='[radioStyleFlag ? "radioright" : "radioerror"]' @click='radioChange'></i><span>我同意<span>《支付协议》</span></span>
        </div>
        <div class='mask' v-show='inputflag'></div>
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
import {
    Toast
} from 'mint-ui'
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
export default {
    data: function() {
        return {
            realname: '',
            backname: '',
            endnum: '',
            singleAmount: '',
            dailyAmont: '',
            radioStyleFlag: true,
            moneyval: '',
            colorBTN: false,
            inputflag: false,
            inputval: '',
            lengthwatcher: 0,
            // formAddress: 'http://www-1.fuiou.com:18670/mobile_pay/h5pay/payAction.pay',
            formAddress: ROOT == '' ? 'https://mpay.fuiou.com:16128/h5pay/payAction.pay' : 'http://www-1.fuiou.com:18670/mobile_pay/h5pay/payAction.pay'
        }
    },
    watch: {
        moneyval: function() {
            if (this.moneyval > 0 && this.radioStyleFlag) {
                this.colorBTN = true
            } else {
                this.colorBTN = false
            }
        },
        radioStyleFlag: function() {
            if (this.moneyval > 0 && this.radioStyleFlag) {
                this.colorBTN = true
            } else {
                this.colorBTN = false
            }
        },
        inputval: function() {
            let $this = this
            if (this.inputval.length == 6) {
                $.post(ROOT + '/wap/myhome/charge.html', {
                    money: $this.moneyval,
                    source: 'h5'
                        // payPassword: $this.inputval
                }, function(response) {
                    if (response.code == 0) {
                        // $this.formAddress=res
                        $('#form1').val(response.data.ENCTP)
                        $('#form2').val(response.data.FM)
                        $('#form3').val(response.data.LOGOTP)
                        $('#form4').val(response.data.MCHNTCD)
                        $('#form5').val(response.data.VERSION)
                        $this.formAddress = response.data.submit_url;
                        $('#chargeSubmit').submit()
                    } else {
                        Toast(response.msg)
                    }
                })
            }
            this.lengthwatcher = this.inputval.length
        }
    },
    methods: {
        tosub: function() {
            let $this = this
            if (!this.colorBTN) return false
            $.post(ROOT + '/wap/myhome/charge.html', {
                    money: $this.moneyval,
                    source: 'h5'
                        // payPassword: $this.inputval
                }, function(response) {
                    if (response.code == 0) {
                        // $this.formAddress = response.data.submit_url;
                        $('#form1').val(response.data.ENCTP)
                        $('#form2').val(response.data.FM)
                        $('#form3').val(response.data.LOGOTP)
                        $('#form4').val(response.data.MCHNTCD)
                        $('#form5').val(response.data.VERSION)
                        $('#chargeSubmit').submit()
                    } else {
                        Toast(response.msg)
                    }
                })
                // this.inputflag = true
                // this.$nextTick(function() {
                //     $('#forinput').focus()
                // })
        },
        radioChange: function() {
            this.radioStyleFlag = this.radioStyleFlag === true ? false : true
        },
        dealpasswordClose: function() {
            this.inputflag = !this.inputflag
            this.inputval = ''
        },
        showdealpassword: function() {
            $('#forinput').focus()
        }
    },
    mounted: function() {
        let $this = this
        this.$nextTick(function() {
            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                $('#forinput').css('font-size', 0)
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
        $.post(ROOT + '/wap/myhome/realname_setting.html', {
            realname: '',
            idCard: ''
        }, function(response) {
            if (response.code == 0) {
                $this.realname = response.data.surname
            }
        })
    }
}
</script>
<style lang='less' scoped>
.mg20 {
    margin-top: .2rem;
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
        z-index: 5;
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
}

.chargeTips {
    color: #8a8a8a;
    padding: .15rem 0 .15rem .3rem;
    font-size: .26rem;
}

.line {
    text-align: right;
    font-size: 0;
    background: #fff;
    div {
        display: inline-block;
        width: 7.2rem;
        border-top: 1px solid #d9d9d9;
    }
}

.subBTN {
    padding: .5rem 0 .4rem 0;
    font-size: 0;
    height: auto;
    text-align: center;
    button {
        background: #9ed5f8;
        color: #fff;
        font-size: .28rem;
        border-radius: 40px;
        height: .8rem;
        width: 6.9rem;
    }
}

.blueBTN {
    background: #44b2f7 !important;
}

.form-radio {
    font-size: 0;
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
        /*font-weight: bold;*/
        vertical-align: middle;
        >span {
            color: #ed7900;
        }
    }
}

.chargeInput {
    font-size: 0;
    padding: .3rem;
    background: #fff;
    span {
        color: #666666;
        font-size: .28rem;
    }
    input {
        margin-left: .45rem;
        font-size: .3rem;
    }
}

.chargeGlass {
    background: #fff;
    padding: .3rem .3rem .3rem .3rem;
    font-size: 0;
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
        margin-left: .65rem;
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

.bank-type-input {
    font-size: 0;
    position: relative;
    height: .88rem;
    background: #fff;
    .nofont {
        text-decoration: line-through;
    }
    .yesfont {
        margin-left: .2rem;
    }
    .havecount {
        font-size: .26rem;
        color: #999999;
    }
    .input-title {
        /*    font-size: .3rem;*/
        display: inline-block;
        width: 2rem;
        height: .88rem;
        line-height: .88rem;
        padding: 0 0 0 .3rem;
        /*        color: #555;*/
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        font-weight: normal;
        font-size: .28rem;
        color: #666;
    }
    .pr153 {
        padding-right: 1.53rem !important;
    }
    .sp-input {
        width: 100%;
        height: .88rem;
        position: absolute;
        left: 0;
        top: 0;
        padding: 0 1.23rem 0 1.85rem;
        line-height: .88rem;
        font-size: .3rem;
    }
    .fs28 {
        font-size: .28rem;
    }
    .fs32 {
        font-size: .32rem;
    }
    .realname {
        display: inline-block;
        width: .8rem;
        height: .3rem;
        background: #ed7a00;
        color: #fff;
        line-height: .37rem;
        font-size: .2rem;
        text-align: center;
        float: right;
        position: relative;
        right: .3rem;
        top: .3rem;
    }
    i {
        display: inline-block;
        width: .2rem;
        height: .36rem;
        float: right;
        background: url(../assets/blink.png) no-repeat 50% 50%;
        background-size: 100%;
        margin-right: .3rem;
        margin-left: .15rem;
        margin-top: .24rem;
    }
    .allget {
        color: #44b2f7 !important;
        font-size: .28rem;
        display: inline-block;
        width: 2rem;
        height: .88rem;
        line-height: .88rem;
        padding: 0 0 0 .3rem;
        /*        color: #555;*/
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
        font-weight: normal;
    }
}
</style>
