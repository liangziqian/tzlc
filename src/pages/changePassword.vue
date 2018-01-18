<template>
    <div>
        <!-- <div v-title>修改登录密码</div> -->
        <div class='type-input mg20'>
            <span class='input-title'>原密码</span>
            <input type="password" placeholder='请输入您的原密码' class='sp-input' :class='[fs]' v-model.trim='oldPassword'>
        </div>
        <div class='type-input mg20'>
            <span class='input-title'>新密码</span>
            <input type="password" placeholder='请输入6-20位英文字母和数字' class='sp-input' :class='[fs2]' v-model.trim='newPassword'>
        </div>
        <div class='line'>
            <div></div>
        </div>
        <div class='type-input'>
            <span class='input-title'>确认密码</span>
            <input type="password" placeholder='请再次输入新密码' class='sp-input' :class='[fs3]' v-model.trim='newPassword2'>
        </div>
        <div class='subBTN'>
            <button type='button' :class='{blueBTN:colorBTN}' @click='tosub'>确认修改</button>
        </div>
        <div class='forgetPassWordRouter' @click='forgetPassWordRouter'><span>忘记密码？</span></div>
        <div class='ask'>如有疑问请联系客服</div>
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
            oldPassword: '',
            newPassword: '',
            newPassword2: '',
            fs: 'fs28',
            fs2: 'fs28',
            fs3: 'fs28',
            colorBTN: false
        }
    },
    watch: {
        oldPassword: function() {
            this.fs = this.oldPassword === '' ? 'fs28' : 'fs32'
            if (this.oldPassword.length >= 6 && this.newPassword.length >= 6 && this.newPassword2.length >= 6) {
                this.colorBTN = true
            }
        },
        newPassword: function() {
            this.fs2 = this.newPassword === '' ? 'fs28' : 'fs32'
            if (this.oldPassword.length >= 6 && this.newPassword.length >= 6 && this.newPassword2.length >= 6) {
                this.colorBTN = true
            }
        },
        newPassword2: function() {
            this.fs3 = this.newPassword2 === '' ? 'fs28' : 'fs32'
            if (this.oldPassword.length >= 6 && this.newPassword.length >= 6 && this.newPassword2.length >= 6) {
                this.colorBTN = true
            }
        }
    },
    methods: {
        tosub: function() {
            let $this = this
            if (!this.colorBTN) return false
            if (!(/^[0-9a-zA-Z]{6,15}$/g.test(this.newPassword))) {
                Toast('密码格式错误(6-15位数字，字母)')
                return false
            }
            $.post(ROOT + '/wap/myhome/updatePWD.html', {
                password: $this.oldPassword,
                new_password: $this.newPassword,
                new_password2: $this.newPassword2
            }, function(response) {
                if (response.code == 0) {
                    $this.$router.push({
                        path: '/success',
                        query: {
                            type: 4
                        }
                    })
                } else {
                    Toast(response.msg)
                }
            })
        },
        forgetPassWordRouter: function() {
            this.$router.push('/forgetpassword')
        }
    }
}
</script>
<style lang='less' scoped>
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
        right: .5rem;
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
    .sp-input {
        width: 100%;
        height: .88rem;
        position: absolute;
        left: 0;
        top: 0;
        padding: 0 .78rem 0 2.1rem;
    }
    .fs28 {
        font-size: .28rem;
    }
    .fs32 {
        font-size: .32rem;
    }
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

.mg20 {
    margin-top: .2rem;
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
        /*font-weight: bold;*/
        padding-right: .3rem;
    }
}

.blueBTN {
    background: #44b2f7 !important;
}

.ask {
    margin-top: 4.68rem;
    text-align: center;
    color: #888888;
    font-size: .24rem;
}
</style>
