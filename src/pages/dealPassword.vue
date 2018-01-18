<template>
    <div class='dealpasswordWrapper'>
        <!-- <div v-title>{{this.$route.query.type==0?'修改交易密码':'设置交易密码'}}</div> -->
        <div class='validate' v-if='!dealpasswordFlag'></div>
        <div class='tips cf' v-show='!inputflag'>
            <i></i>
            <div>您正在进行设置交易密码，为确保您的账户资金安全，请先进行手机验证。</div>
        </div>
        <div class='sp-show' v-show='!inputflag'>
            <div class='cf'>
                <span>手机号</span>
                <span>{{telphone}}</span>
            </div>
        </div>
        <div class='type-input' v-show='!inputflag'>
            <span class='input-title'>验证码</span>
            <input type="text" placeholder='请输入短信验证码' class='sp-input pr153' :class='[fs2]' v-model.trim='codeval'>
            <span class='sendcode' :class='{sendcodegray:sendcodeStyle}' @click='sendcode'>{{sendcodeText}}</span>
        </div>
        <div class='tips cf' v-show='inputflag'>
            <i></i>
            <div>{{onceContent}}</div>
        </div>
        <!-- <div v-show='inputflag' class='dealTIP'>{{onceContent}}</div> -->
        <div class='dealPasswordInput' v-show='inputflag' @click='dealpasswordShowAgain'>
            <div class='inputflag cf'>
                <input type="password" maxlength="6" id='forinput' v-model='inputval'>
                <div><span v-show='lengthwatcher > 0'></span></div>
                <div><span v-show='lengthwatcher > 1'></span></div>
                <div><span v-show='lengthwatcher > 2'></span></div>
                <div><span v-show='lengthwatcher > 3'></span></div>
                <div><span v-show='lengthwatcher > 4'></span></div>
                <div><span v-show='lengthwatcher > 5'></span></div>
            </div>
        </div>
        <div class='forgetPassWordRouter' @click='resetdealpassword' v-show='inputflag'><span>重置交易密码</span></div>
        <div class='subBTN' v-show="!inputflag">
            <button type='button' @click='showflag' :class='[colorBTN?"colorBTN":""]' id='enterBTN'>确定</button>
        </div>
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
            inputflag: false,
            inputval: '',
            lengthwatcher: 0,
            onceval: '',
            twoval: '',
            fs: 'fs28', //input字体大小
            fs2: 'fs28', //codeinput字体大小
            onceContent: '请输入6位数字交易密码',
            btnflag: true,
            sendcodeFlag: true, //防止重复点击
            sendcodeText: '发送', //发送验证码文本
            sendcodeStyle: false, //发送验证码文本样式
            codeval: '',
            colorBTN: false,
            dealpasswordFlag: false,
            telphone: sessionStorage.getItem('accountStar')
        }
    },
    methods: {
        showflag: function() {
            let $this = this
            if (!this.colorBTN) return false
            $.post(ROOT + '/wap/myhome/findPWD_step1.html', {
                code: $this.codeval
            }, function(response) {
                if (response.code == 0) {
                    $this.inputflag = true
                    $this.$nextTick(function() {
                        $('#forinput').focus()
                    })
                } else {
                    Toast(response.msg)
                }
            })
        },
        resetdealpassword: function() {
            this.twoval = ''
            this.onceval = ''
            this.inputval = ''
        },
        sendcode: function() {
            const self = this
            if (self.sendcodeFlag === false) return false
            $.post(ROOT + '/wap/send_code.html', {
                telephone: sessionStorage.getItem('account'),
                trade: 'trade'
            }, function(response) {
                let time = 60
                if (response.code == 0) {
                    self.sendcodeFlag = false
                    self.sendcodeStyle = true
                    const timer = setInterval(function() {
                        if (time === 0) {
                            clearInterval(timer)
                            self.sendcodeFlag = true
                            self.sendcodegray = false
                            self.sendcodeText = '重发'
                        } else {
                            self.sendcodeText = '重发(' + time + ')'
                            time--
                        }
                    }, 1000)
                } else if (response.code == 1) {
                    Toast(response.msg)
                }
            })
        },
        dealpasswordShowAgain: function() {
            this.$nextTick(function() {
                $('#forinput').focus()
            })
        }
    },
    watch: {
        codeval: function() {
            this.fs2 = this.codeval === '' ? 'fs28' : 'fs32'
            this.colorBTN = this.codeval.length > 0 ? true : false
        },
        inputval: function(val) {
            let $this = this
            if (val.length == 6 && this.onceval.length == 0) {
                this.onceval = val
                this.inputval = ''
                this.onceContent = '请再次输入交易密码确认'
            } else if (val.length == 6 && this.onceval.length == 6) {
                if (this.onceval == val) {
                    this.inputflag = false
                    this.btnflag = false
                    $.post(ROOT + '/wap/myhome/findPWD_step2.html', {
                        passwordPay: $this.onceval,
                        re_passwordPay: $this.inputval,
                        opt: ''
                    }, function(response) {
                        if (response.code == 0) {
                            sessionStorage.setItem('paypassword', 1)
                            if (sessionStorage.getItem('bankbind') == 1) {
                                $this.$router.push({
                                    path: '/success',
                                    query: {
                                        type: 1
                                    }
                                })
                            } else {
                                $this.$router.push({
                                    path: '/mybank',
                                    query: {
                                        type: 1
                                    }
                                })
                            }
                        } else {
                            Toast(response.msg)
                        }
                    })
                } else {
                    Toast('两次密码输入不一致')
                }
            }
            this.lengthwatcher = val.length
        }
    },
    mounted: function() {
        this.dealpasswordFlag = this.$route.query.type == 0 ? true : false
        this.sendcode()
        this.$nextTick(function() {
            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                $('#forinput').css('font-size', 0)
            }
        })
    }
}
</script>
<style lang='less' scoped>
.dealTIP {
    padding: 1rem 0 .5rem 0;
    text-align: center;
    color: #555555;
    font-size: .3rem;
}

.forgetPassWordRouter {
    font-size: 0;
    text-align: right;
    padding-top: .5rem;
    span {
        font-size: .28rem;
        color: #ed7900;
        /*font-weight: bold;*/
        padding-right: .3rem;
    }
}

.sp-show {
    background: #fff;
    >div {
        margin-left: .3rem;
        height: .88rem;
        border-bottom: 1px solid #d9d9d9;
        span:nth-of-type(1) {
            float: left;
            font-size: .3rem;
            height: 100%;
            line-height: .88rem;
            color: #555;
            width: 1.8rem;
        }
        span:nth-of-type(2) {
            float: left;
            font-size: .28rem;
            height: 100%;
            line-height: .88rem;
            color: #333333;
        }
    }
}

.tips {
    padding: .3rem;
    i {
        display: inline-block;
        width: .26rem;
        height: .26rem;
        float: left;
        background: url(../assets/blueamazing.png) no-repeat 50% 50%;
        background-size: 100%;
    }
    div {
        float: right;
        font-size: .26rem;
        color: #aaaaaa;
        width: 6.3rem;
    }
}

.validate {
    width: 5.16rem;
    height: .64rem;
    background: url('../assets/validate-2.png') no-repeat 50% 50%;
    margin: .45rem auto .2rem auto;
    background-size: 100%;
}

.dealpasswordWrapper {
    height: 100%;
    position: relative;
}

.mg20 {
    margin-top: .2rem;
}

.type-input {
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
    .password-icon {
        display: inline-block;
        width: .35rem;
        height: .88rem;
        position: absolute;
        background-size: 100%;
        right: .25rem;
    }
    .password-moon {
        background: url(../assets/password-moon.png) no-repeat 50% 50%;
        background-size: 100%;
    }
    .password-sun {
        background: url(../assets/password-sun.png) no-repeat 50% 50%;
        background-size: 100%;
    }
    .input-title {
        font-size: .3rem;
        display: inline-block;
        width: 2.1rem;
        height: .88rem;
        line-height: .88rem;
        padding: 0 0 0 .3rem;
        color: #555;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        /*font-weight: bold;*/
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
        padding: 0 1.23rem 0 2.1rem;
    }
    .fs28 {
        font-size: .28rem;
    }
    .fs32 {
        font-size: .32rem;
    }
}

.dealPasswordInput {
    font-size: 0;
    text-align: center;
    .inputflag {
        position: relative;
        #forinput {
            height: 50%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        overflow: hidden;
        display: inline-block;
        width: 6.9rem;
        height: 1.17rem;
        border: 1px solid #aaaaaa;
        border-radius: 10px;
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

.subBTN {
    padding: .7rem 0 0 0;
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

.colorBTN {
    background: #44b2f7 !important;
}
</style>
