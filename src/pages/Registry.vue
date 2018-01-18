<template>
    <div id='login'>
        <!-- <div v-title>注册</div> -->
        <div class='tips pdBottom0 mb1' v-show='!sendcodeFlag'>已向手机<span>{{userAccount}}</span>发送短信</div>
        <div class='tips'>请输入短信验证码完成注册</div>
        <div class='type-input'>
            <span class='input-title'>验证码</span>
            <input type="text" placeholder='请输入短信验证码' class='sp-input pr153' :class='[fs2]' v-model.trim='codeval'>
            <span class='sendcode' :class='{sendcodegray:sendcodeStyle}' @click='sendcode'>{{sendcodeText}}</span>
        </div>
        <div class='line'>
            <div></div>
        </div>
        <div class='type-input'>
            <span class='input-title'>登录密码</span>
            <template v-if='passwordTypeFlag'>
                <input type='text' placeholder='请输入登录密码' class='sp-input' :class='[fs]' v-model.trim='telval'>
            </template>
            <template v-else>
                <input type='password' placeholder='请输入登录密码' class='sp-input' :class='[fs]' v-model.trim='telval'>
            </template>
            <i v-show='showNumLock' class='clear-input' @click='clearinput'></i>
            <i class='password-icon' @click='typeChange' :class='[passwordTypeFlag ? passwordsun : passwordmoon]'></i>
        </div>
        <div class='password-tips'>密码区分大小写，建议使用6位以上数字、字母组合</div>
        <div class='type-input'>
            <span class='input-title'>邀请码</span>
            <input type="text" placeholder='请输入邀请码（选填）' class='sp-input' :class='[fs3]' v-model.trim='friendval' maxlength='11'>
            <i v-show='showNumLock2' class='clear-input' @click='clearfriend'></i>
        </div>
        <div class='subBTN'>
            <button type='button' :class='{blueBTN:colorBTN}' @click='tosub'>注册并登录</button>
        </div>
        <div class='form-radio'>
            <i :class='[radioStyleFlag ? radioright : radioerror]' @click='radioChange'></i><span>我同意<span @click="tozcxy">《用户使用协议》</span></span>
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
            showNumLock: false, //input清除按钮
            showNumLock2: false, //input清除按钮
            telval: '', //双绑数据
            codeval: '', //发送验证码双绑数据
            friendval: '', //邀请码双绑数据
            fs: 'fs28', //input字体大小
            fs2: 'fs28', //codeinput字体大小
            fs3: 'fs28', //friendinput字体大小
            colorBTN: false, //提交按钮颜色
            passwordTypeFlag: false, //密码隐藏切换
            passwordmoon: 'password-moon', //隐藏密码样式
            passwordsun: 'password-sun', //显示密码样式
            userAccount: '', //用户手机号码
            sendcodeFlag: true, //防止重复点击
            sendcodeText: '发送', //发送验证码文本
            sendcodeStyle: false, //发送验证码文本样式
            radioStyleFlag: true, //radio样式切换
            radioerror: 'radioerror', //radio不选
            radioright: 'radioright', //radio选中
            channel:'',//通道数据绑定
            signKey:''
        }
    },
    watch: {
        telval: function() {
            this.fs = this.telval === '' ? 'fs28' : 'fs32'
            this.showNumLock = this.telval === '' ? false : true
            this.colorBTN = (this.telval.length >= 6 && this.codeval.length > 0) && this.radioStyleFlag ? true : false
        },
        codeval: function() {
            this.fs2 = this.codeval === '' ? 'fs28' : 'fs32'
            this.colorBTN = (this.telval.length >= 6 && this.codeval.length > 0) && this.radioStyleFlag ? true : false
        },
        friendval: function() {
            this.fs3 = this.friendval === '' ? 'fs28' : 'fs32'
            this.showNumLock2 = this.friendval === '' ? false : true
        },
        radioStyleFlag: function() {
            this.colorBTN = (this.telval.length >= 6 && this.codeval.length > 0) && this.radioStyleFlag ? true : false
        }
    },
    methods: {
        tosub: function() {
            let $this = this
            if (!this.colorBTN) return false
            if (!(/^[0-9a-zA-Z]{6,15}$/g.test(this.telval))) {
                Toast('密码格式错误(6-15位数字，字母)')
                return false
            }
            $.post(ROOT + '/wap/signup.html', {
                telephone: sessionStorage.getItem('account'),
                password: $this.telval,
                code: $this.codeval,
                referee: $this.friendval,
                channel:sessionStorage.getItem('channel')
            }, function(response) {
                if (response.code == 0) {
                    Toast('注册成功')
                    window.TrackingIO.register(sessionStorage.getItem('account'))
                    $.post(ROOT + '/wap/login_step2.html', {
                        telephone: sessionStorage.getItem('account'),
                        password: $this.telval
                    }, function(response) {
                        if (response.code == 0) {
                            sessionStorage.setItem('isLogin', true)
                        	  sessionStorage.setItem('userid', response.data.id)
                            localStorage.setItem('telephone', sessionStorage.getItem('account'))
                            localStorage.setItem('password', $this.telval)
                            if($this.$route.query.productId){
                                $this.$router.push({
                                      path: '/turntablesj',
                                      query: {
                                          productId: $this.$route.query.productId,
                                          jsessionid: response.data.id
                                      }
                                  })
                                }else{
                                  $this.$router.push({
                                        path: '/index/person',
                                        query: {
                                            type: 3
                                        }
                                  })
                            }
                        }
                    })
                } else if (response.code == 1) {
                    Toast(response.msg)
                }
            })
        },
        tozcxy:function(){
          this.$router.push('/zcxy')
        },
        clearinput: function() {
            this.telval = ''
        },
        clearfriend: function() {
            this.friendval = ''
        },
        typeChange: function() {
            this.passwordTypeFlag = this.passwordTypeFlag === true ? false : true
        },
        radioChange: function() {
            this.radioStyleFlag = this.radioStyleFlag === true ? false : true
        },
        sendcode: function() {
            const self = this
            if (self.sendcodeFlag === false) return false
            self.sendcodeFlag=false;
            $.post(ROOT + '/wap/send_code.html', {
                telephone: sessionStorage.getItem('account'),
                signKey:self.signKey
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
                    Toast(response.msg);
                    self.sendcodeFlag=true
                }
            })
        }
    },
    created: function() {
        this.userAccount = sessionStorage.getItem('accountStar')
        this.channel = sessionStorage.getItem('channel')
        $.post(ROOT + '/wap/webappsign.html',function(res){
          this.signKey=res.data
        })
    },
    mounted: function() {
        this.sendcode()
        this.friendval = this.$route.query.m ? this.$route.query.m : ''
    }
}
</script>
<style lang='less' scoped>
.tips {
    font-size: .28rem;
    text-align: center;
    padding: .4rem 0 .3rem 0;
    color: #999;
    /*font-weight: bold;*/
    letter-spacing: .03rem;
    line-height: .6rem;
    span {
        color: #ed7900;
    }
}

.pdBottom0 {
    padding-bottom: 0 !important;
}

.mb1 {
    margin-bottom: -.4rem !important;
}

.line {
    height: .01rem;
    position: relative;
    div {
        position: absolute;
        right: 0;
        top: 0;
        border: 1px solid #dcdcdc;
        height: 100%;
        width: 96%;
    }
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

.password-tips {
    font-size: .24rem;
    color: #999;
    padding: .2rem 0 .2rem 0.3rem;
}

.showNumLock {
    font-size: .32rem;
    font-family: 'Miscrosoft YaHei';
    color: #44b2f7;
    background: #d8e9f3;
    height: .7rem;
    line-height: .7rem;
    text-align: center;
    border-top: 1px solid #b7ddf6;
    border-bottom: 1px solid #b7ddf6;
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
</style>
