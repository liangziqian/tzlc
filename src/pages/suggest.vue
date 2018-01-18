<template>
    <div>
        <!-- <div v-title>意见反馈</div> -->
        <textarea class='texta' placeholder="有什么意见或建议，请在这里告诉我们..." v-model.trim='texta'></textarea>
        <div class='bank-type-input'>
            <span class='input-title'>联系方式</span>
            <!--             <span class='sp-input' :class='[fs3]'>{{cityContext}}</span> -->
            <input class='sp-input' type="text" placeholder="输入QQ号或邮箱(选填)" v-model.trim='moneyval'>
            <span class='allget' @click='allget'>提交</span>
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
            texta: '',
            moneyval: ''
        }
    },
    methods: {
        allget: function() {
            let $this = this
            if (this.texta == '' || this.moneyval == '') {
                Toast('填写内容不能为空')
                return false
            }
            $.post(ROOT + '/wap/myhome/create_suggestion.html', {
                content: $this.texta,
                contactWay: $this.moneyval
            }, function(response) {
                if (response.code == 0) {
                    Toast(response.data)
                    $this.$router.push({
                        path: '/index/find',
                        query: {
                            type: 4
                        }
                    })
                }
            })
        }
    }
}
</script>
<style lang='less' scoped>
.texta {
    display: block;
    height: 3.6rem;
    width: 100%;
    font-size: .28rem;
    border: none;
    outline: none;
    resize: none;
    padding: .2rem .4rem;
    border-bottom: 1px dashed #999;
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
        padding: 0 1.23rem 0 2.05rem;
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
        font-size: .28rem;
        display: inline-block;
        width: 1.2rem;
        height: .6rem;
        line-height: .6rem;
        position: absolute;
        right: .4rem;
        top: 0.14rem;
        z-index: 1;
        font-weight: normal;
        text-align: center;
        background: #44b2f7;
        color: #fff;
        border-radius: 10px;
    }
}
</style>
