<template>
    <div>
        <!-- <div v-title>实名认证</div> -->
        <div class='validate' v-if='realnameFlag'></div>
        <div class='tips cf' v-if='realnameFlag'>
            <i></i>
            <div>根据国家监管要求，用户投资前需进行实名认证。请您使用本人的实名信息</div>
        </div>
        <div class='type-input' v-if='realnameFlag'>
            <span class='input-title'>真实姓名</span>
            <input type="text" placeholder='请输入您的姓名' class='sp-input fs28' v-model.trim='realname'>
        </div>
        <div class='line'>
            <div></div>
        </div>
        <div class='type-input' v-if='realnameFlag'>
            <span class='input-title'>身份证号</span>
            <input type="text" placeholder='请输入您的身份证号' class='sp-input fs28' v-model.trim='idcard' maxlength="18">
        </div>
        <div class='nextpart' v-if='realnameFlag'>
            <button type='button' @click='tosub' :class='[blueBTN?"blueBTN":""]'>下一步</button>
        </div>
        <div class='realnameStatus cf' v-if='!realnameFlag'>
            <div class='realnameContent'>
                <div>{{realnameContent}}</div>
                <div>{{idcardContent}}</div>
            </div>
            <span class='realname'>已实名</span>
        </div>
        <div class='tip' v-if='!realnameFlag'>为了保障账户的安全，实名信息不能修改。</div>
        <div class='ask' :class='[realnameFlag?"":"mg8"]'>如有疑问请联系客服</div>
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
            idcard: '',
            realnameContent: '',
            idcardContent: '',
            realnameFlag: false,
            blueBTN: false
        }
    },
    watch: {
        realname: function(val) {
            this.blueBTN = (val.length > 0 && this.idcard.length == 18) ? true : false
        },
        idcard: function(val) {
            this.blueBTN = (this.realname.length > 0 && val.length == 18) ? true : false
        }
    },
    methods: {
        tosub: function() {
            let $this = this
            if (!$this.blueBTN) return false
            $.post(ROOT + '/wap/myhome/realname_setting.html', {
                realname: $this.realname,
                idCard: $this.idcard
            }, function(response) {
                if (response.code == 0) {
                    sessionStorage.setItem('realname', 1)
                    $this.$router.push('/dealpassword')
                } else if (response.code == 1) {
                    Toast(response.msg)
                }

            })
        }
    },
    mounted: function() {
        let $this = this
        let index = sessionStorage.getItem('realname')
        if (index == 0) {
            $this.realnameFlag = true
        } else if (index == 1) {
            $.post(ROOT + '/wap/myhome/realname_setting.html', {
                realname: '',
                idCard: ''
            }, function(response) {
                if (response.code == 0) {
                    $this.realnameContent = response.data.surname
                    $this.idcardContent = response.data.idCard
                }
            })
        }
    }
}
</script>
<style lang='less' scoped>
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
    background: url('../assets/validate-1.png') no-repeat 50% 50%;
    margin: .45rem auto .2rem auto;
    background-size: 100%;
}

.nextpart {
    margin-top: .62rem;
    text-align: center;
    font-size: 0;
    button {
        width: 6.9rem;
        background: #9ed5f8;
        color: #fff;
        padding: .25rem 0;
        border-radius: 40px;
        font-size: .28rem;
        height: .8rem;
    }
}

.type-input {
    font-size: 0;
    position: relative;
    height: .88rem;
    background: #fff;
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
    .sp-input {
        width: 100%;
        height: .88rem;
        position: absolute;
        left: 0;
        top: 0;
        padding: 0 1.23rem 0 2.1rem;
        /*  line-height: .88rem;*/
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
}

.blueBTN {
    background: #44b2f7 !important;
}

.tip {
    color: #888888;
    font-size: .24rem;
    padding: .2rem 0 0 .3rem;
}

.realnameStatus {
    margin-top: .2rem;
    padding: .2rem .3rem;
    font-size: 0;
    background: #fff;
    .realnameContent {
        float: left;
        div:nth-of-type(1) {
            color: #555555;
            font-size: .32rem;
            margin-bottom: .25rem;
        }
        div:nth-of-type(2) {
            color: #acacac;
            font-size: .28rem;
        }
    }
    .realname {
        float: right;
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
        top: .3rem;
    }
}

.ask {
    margin-top: 4.68rem;
    text-align: center;
    color: #888888;
    font-size: .24rem;
}

.mg8 {
    margin-top: 8.3rem;
}
</style>
