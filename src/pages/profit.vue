<template>
    <div>
        <!-- <div v-title>收益</div> -->
        <div class='profitBG'>
            <div class='profitBG-1'>每日预期收益(元)</div>
            <div class='profitBG-2'>{{sum_daily_interest}}</div>
        </div>
        <div class='profitGlass cf mgb20'>
            <span>累计收益(元)</span>
            <span>{{myinterest}}</span>
        </div>
        <div class='totalGlass cf' v-for='i in list'>
            <div class='totalGlass-1'>
                <div>{{i.borrowName}}</div>
                <div>{{i.today}}</div>
            </div>
            <span class='totalGlass-2'>+{{i.interest}}元</span>
            <div class='profit-line'>
                <div></div>
            </div>
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
            sum_daily_interest: '',
            myinterest: '',
            list: []
        }
    },
    mounted: function() {
        let $this = this
        let data = {}
        $.post(ROOT + '/wap/myhome/everyday_profit.html', function(response) {
            if (response.code == 0) {
                $this.sum_daily_interest = response.data.sum_daily_interest
                $this.myinterest = response.data.myinterest
                for (let i of response.data.tender_daily_list) {
                    data.borrowName = i.borrowName
                    data.interest = i.interest
                    data.today = i.today
                    $this.list.push(data)
                    data = {}
                }
            }
        })
    }
}
</script>
<style lang='less' scoped>
.profitGlass {
    background: #fff;
    padding: .3rem;
    span:nth-of-type(1) {
        float: left;
        font-size: .28rem;
        color: #333;
    }
    span:nth-of-type(2) {
        float: right;
        font-size: .3rem;
        color: #333;
    }
}

.totalGlass {
    background: #fff;
    padding: .3rem;
    position: relative;
    .totalGlass-1 {
        float: left;
        color: #9c9c9c;
        font-size: .28rem;
        div:nth-of-type(1) {
            padding-bottom: .2rem;
        }
    }
    .totalGlass-2 {
        float: right;
        color: #ed7a00;
        font-size: .28rem;
        position: relative;
        top: .2rem;
    }
}

.mgb20 {
    margin-bottom: .2rem;
}

.profitBG {
    height: 3.32rem;
    background: url('../assets/profitBG.png') no-repeat 50% 50%;
    background-size: 100%;
    .profitBG-1 {
        font-size: .32rem;
        color: #fff;
        padding: .66rem 0 .42rem 0;
        text-align: center;
    }
    .profitBG-2 {
        font-size: .7rem;
        color: #fff;
        text-align: center;
    }
}

div.totalGlass:last-child {
    .profit-line {
        div {
            border: none;
        }
    }
}

.profit-line {
    text-align: right;
    font-size: 0;
    position: absolute;
    right: 0;
    bottom: 0;
    background: #fff;
    div {
        display: inline-block;
        width: 7.2rem;
        border-top: 1px solid #d9d9d9;
    }
}
</style>
