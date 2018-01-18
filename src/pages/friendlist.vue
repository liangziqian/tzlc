<template>
    <div>
        <div class='tipGlass mg20'>
            <div>
                <div>{{human}}</div>
                <div>累计邀请(人)</div>
            </div>
            <div>
                <div>{{money}}</div>
                <div>累计奖励(元)</div>
            </div>
        </div>
        <div class='biao' v-for='i in list'>
            <div>+{{i.money}}元理财红包</div>
            <div>
                <div>邀请号码：{{i.invitePhone}}</div>
                <div>奖励时间：{{i.time}}</div>
                <div>来源说明：{{i.remark}}</div>
            </div>
        </div>
        <div class='noinvestBG' v-show='!list.length'>
            <i></i>
            <div>当前没有理财红包</div>
        </div>
    </div>
</template>
<script>
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
export default {
    data: function() {
        return {
            human: 0,
            money: 0,
            list: []
        }
    },
    mounted: function() {
        let $this = this
        $.post(ROOT + '/wap/myhome/invitation_record.html', function(response) {
            if (response.code == 0) {
                $this.human = response.data.allPeople
                $this.money = response.data.allMoney
                $this.list = response.data.list
            }
        })
    }
}
</script>
<style lang='less' scoped>
.biao {
    font-size: 0;
    background: #fff;
    margin-top: .2rem;
    height: 1.8rem;
    >div:nth-of-type(1) {
        display: inline-block;
        width: 50%;
        color: #ff4848;
        font-size: .32rem;
        text-align: center;
        line-height: 1.8rem;
        height: 100%;
        vertical-align: top;
    }
    >div:nth-of-type(2) {
        display: inline-block;
        width: 50%;
        line-height: 1.8rem;
        height: 100%;
        vertical-align: top;
        padding: .3rem 0;
        div {
            padding-left: .33rem;
            margin-right: .33rem;
            font-size: .24rem;
            color: #bfbfbf;
            line-height: normal;
            height: 33.33%;
            overflow: hidden;
            white-space: nowrap;
        }
    }
}

.tipGlass {
    background: #fff url('../assets/line.png') no-repeat 50% 50%;
    background-size: 1%;
    font-size: 0;
    >div {
        width: 50%;
        display: inline-block;
        padding: .3rem 1rem .3rem 1rem;
        >div:nth-of-type(1) {
            text-align: center;
            font-size: .33rem;
            color: #333333;
        }
        >div:nth-of-type(2) {
            font-size: .28rem;
            color: #adb2b7;
        }
    }
}

.noinvestBG {
    font-size: 0;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    i {
        display: inline-block;
        width: 3.97rem;
        height: 3.08rem;
        background: url('../assets/noborrow.png') no-repeat 50% 50%;
    }
    div {
        font-size: .28rem;
        color: #7e7e7e;
        a {
            color: #44b2f7;
        }
    }
}
</style>
