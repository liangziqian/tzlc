<template>
    <div id='login'>
        <!-- <div v-title>登录</div> -->
        <div class='tips'>请输入您的登录密码</div>
        <div class='type-input'>
            <span class='input-title'>登录密码</span>
            <template v-if='passwordTypeFlag'>
                <input type='text' placeholder='请输入登录密码' class='sp-input' :class='[fs]' v-model.trim='telval'>
            </template>
            <template v-else>
                <input type='password' placeholder='请输入登录密码' class='sp-input' :class='[fs]' v-model.trim='telval'>
            </template>
            <i v-show='showNumLock' class='clear-input' @click='clearinput'></i>
            <i class='password-icon' @click='typeChange' :class='[passwordTypeFlag ? passwordsun : passwordmoon,]'></i>
        </div>
        <div class='subBTN'>
            <button type='button' :class='{blueBTN:colorBTN}' @click='tosub'>登录</button>
        </div>
        <div class='forgetPassWordRouter'><span @click='forgetPassWordRouter'>忘记密码？</span></div>
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
            showNumLock: false, //input清除按钮
            telval: '', //双绑数据
            fs: 'fs28', //input字体大小
            colorBTN: false, //提交按钮颜色
            passwordTypeFlag: false, //密码隐藏切换
            passwordmoon: 'password-moon', //隐藏密码样式
            passwordsun: 'password-sun', //显示密码样式
        }
    },
    watch: {
        telval: function() {
            this.fs = this.telval === '' ? 'fs28' : 'fs32'
            this.showNumLock = this.telval === '' ? false : true
            this.colorBTN = this.telval.length >= 6 ? true : false
        }
    },
    methods: {
        tosub: function() {
            let $this = this
            if (this.telval.length < 6) {
                return false
            } else {
                $.post(ROOT + '/wap/login_step2.html', {
                    telephone: sessionStorage.getItem('account'),
                    password: $this.telval
                }, function(response) {
                    if (response.code == 0) {
                        sessionStorage.setItem('isLogin', true)
                        sessionStorage.setItem('userid', response.data.id)
                        localStorage.setItem('telephone',sessionStorage.getItem('account'))
                        localStorage.setItem('password',$this.telval)
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
                    } else if (response.code == 1) {
                        Toast('密码错误')
                    }
                })
            }
        },
        clearinput: function() {
            this.telval = ''
        },
        typeChange: function() {
            this.passwordTypeFlag = this.passwordTypeFlag === true ? false : true
        },
        forgetPassWordRouter: function() {
            this.$router.push('/forgetpassword')
        }
    }
}
</script>
<style lang='less' scoped>
.tips {
    font-size: .28rem;
    text-align: center;
    padding: .4rem 0 .3rem 0;
    color: #999;
    /* font-weight: bold;*/
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
        /*  font-weight: bold;*/
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

.forgetPassWordRouter {
    font-size: 0;
    text-align: right;
    padding-top: .5rem;
    span {
        font-size: .28rem;
        color: #ed7900;
        /* font-weight: bold;*/
        padding-right: .3rem;
    }
}

.blueBTN {
    background: #44b2f7 !important;
}
</style>
