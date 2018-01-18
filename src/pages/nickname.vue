<template>
    <div>
        <!-- <div v-title>我的昵称</div> -->
        <div class='type-input mg20'>
            <input type="text" placeholder='请输入您的昵称' class='sp-input fs28' v-model.trim='friendval' maxlength='12'>
            <i v-show='showNumLock2' class='clear-input' @click='clearfriend'></i>
        </div>
        <div class='tip'>昵称默认为注册手机或注册微信名称，您可以点击上面进行昵称的修改</div>
        <div class='nextpart'>
            <button type='button' @click='tosub' :class='[colorBTN?"blueBTN":""]'>确定</button>
        </div>
    </div>
</template>
<script>
import {
    Toast
} from 'mint-ui'
import {
    Indicator
} from 'mint-ui'
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
export default {
    data: function() {
        return {
            showNumLock2: false,
            friendval: '',
            colorBTN: false
        }
    },
    watch: {
        friendval: function() {
            this.showNumLock2 = this.friendval.length > 0 ? true : false
            this.colorBTN = this.friendval.length > 0 ? true : false
        }
    },
    methods: {
        clearfriend: function() {
            this.friendval = ''
        },
        tosub: function() {
            let $this = this
            if (!this.colorBTN) return false
            $.post(ROOT + '/wap/myhome/username_setting.html', {
                username: $this.friendval
            }, function(response) {
                if (response.code == 0) {
                    $this.$router.push({
                        path: '/success',
                        query: {
                            type: 5
                        }
                    })
                } else {
                    Toast(response.msg)
                }
            })
        }
    }
}
</script>
<style lang='less' scoped>
.tip {
    color: #888888;
    font-size: .24rem;
    padding: .3rem;
    line-height: 1.5;
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
        right: .3rem;
    }
    .password-icon {
        display: inline-block;
        width: .35rem;
        height: .88rem;
        position: absolute;
        background-size: 100%;
        right: .25rem;
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
        font-weight: bold;
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
        padding: 0 1.23rem 0 .3rem;
    }
    .fs28 {
        font-size: .28rem;
    }
    .fs32 {
        font-size: .32rem;
    }
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

.blueBTN {
    background: #44b2f7 !important;
}
</style>
