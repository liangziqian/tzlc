<template>
    <div>
        <!-- <div v-title>手机绑定</div> -->
        <div class='realnameStatus cf' v-if='!realnameFlag'>
            <div class='realnameContent'>{{telphone}}</div>
            <span class='realname'>已绑定</span>
        </div>
        <div class='tip' v-if='!realnameFlag'>为了保障账户的安全，一个手机号只能作为一个账号进行登录。</div>
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
            telphone: ''
        }
    },
    mounted: function() {
        let $this = this
        $.post(ROOT + '/wap/myhome/mobile_setting.html', function(response) {
            if (response.code == 0) {
                $this.telphone = response.data.mobile
            }
        })
    }
}
</script>
<style lang='less' scoped>
.realnameStatus {
    margin-top: .2rem;
    padding: .3rem .3rem;
    font-size: 0;
    background: #fff;
    .realnameContent {
        float: left;
        color: #555555;
        font-size: .3rem;
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
    }
}

.tip {
    color: #888888;
    font-size: .24rem;
    padding: .2rem 0 0 .3rem;
}

.ask {
    margin-top: 8.63rem;
    text-align: center;
    color: #888888;
    font-size: .24rem;
}
</style>
