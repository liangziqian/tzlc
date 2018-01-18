<template>
    <div>
        <!-- <div v-title>已售罄/已兑付</div> -->
        <div class='biao' v-for='b in biao'>
            <router-link :to="{path:'/detail/'+b.id,query:{type:'soldout'}}">
                <!--  <i class='VIP'></i> -->
                <div class='biaoTitle'><i :class='{biaoActive:b.isActive}'></i><span>{{b.title}}</span></div>
                <ul class='biaoContent cf'>
                    <li class='year'>
                        <div>{{b.year}}%</div>
                        <div>年化利率</div>
                    </li>
                    <li class='day'>
                        <div>{{b.day}}{{b.isDay==0 ? '月' : '天'}}</div>
                        <div>投资期限</div>
                    </li>
                    <li class='money'>
                        <div>{{b.money}}元</div>
                        <div>起投金额</div>
                    </li>
                </ul>
                <div class='line'></div>
                <ul class='proess cf'>
                    <li class='proessContent'>{{b.repaymentType}}</li>
                    <li class='proessText'>
                        <span class='title'>已融资：</span>
                        <div class='lines'>
                            <span :data-line='b.lineWidth'></span>
                        </div>
                        <span class='pars'>{{b.lineWidth}}%</span>
                    </li>
                </ul>
            </router-link>
        </div>
    </div>
</template>
<script>
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
export default {
    data: function() {
        return {
            biao: []
        }
    },
    watch: {
        biao: function() {
            this.$nextTick(function() {
                $('.lines span').each(function() {
                    $(this).animate({
                        width: $(this).data('line') + '%'
                    })
                })
            })
        }
    },
    mounted: function() {
        let self = this
        let data = {}
        $.post(ROOT + '/wap/borrow_list.html', {
            type: 'sell_out'
        }, function(response) {
            if (response.code == 0) {
                self.totalpage = response.totalPage
                for (let i of response.data) {
                    data.id = i.borrowId
                    data.title = i.borrowName
                    data.lineWidth = i.percent
                    data.year = i.apr
                    data.day = i.validTime
                    data.money = i.lowestAccount
                    data.isActive = i.isActive
                    data.repaymentType = i.repaymentType
                    self.biao.push(data)
                    data.isDay = i.isDay
                    data = {}
                }
            }
        })
    }
}
</script>
<style lang='less' scoped>
.biao {
    position: relative;
    padding: 0 .3rem;
    background: #fff;
    margin-top: .15rem;
    .biaoActive {
        display: inline-block;
        width: .5rem;
        height: .3rem;
        background: url(../assets/biaoActive.png) no-repeat 50% 50%;
        background-size: 100%;
        vertical-align: bottom;
        margin-right: .1rem;
    }
    .VIP {
        display: inline-block;
        height: .46rem;
        width: 1.1rem;
        background: url(../assets/noobVIP.png) no-repeat 50% 50%;
        background-size: 100%;
        position: absolute;
        right: .3rem;
        top: 0;
    }
    .biaoTitle {
        padding: .3rem 0;
        font-size: 0;
        color: #c2c2c2;
        span {
            font-size: .3rem;
        }
    }
    .biaoContent {
        display: block;
        padding-bottom: .2rem;
        li {
            width: 33.33%;
            float: left;
            height: .8rem;
            div:nth-of-type(2) {
                font-size: .24rem;
                color: #c9c9c9;
                margin-top: .1rem;
            }
        }
        .year {
            div:nth-of-type(1) {
                font-size: .54rem;
                color: #999999;
            }
        }
        .day {
            padding-top: .2rem;
            div:nth-of-type(1) {
                font-size: .3rem;
                color: #999999;
            }
        }
        .money {
            padding-top: .2rem;
            div:nth-of-type(1) {
                font-size: .3rem;
                color: #999999;
            }
        }
    }
    .line {
        border-top: 1px solid #d9d9d9;
    }
    .proess {
        padding: .2rem 0;
        li {
            width: 50%;
            float: left;
        }
        .proessContent {
            font-size: .24rem;
            color: #9a9a9a;
        }
        .proessText {
            text-align: right;
            font-size: 0;
            .title {
                font-size: .24rem;
                color: #9a9a9a;
                display: inline-block;
                vertical-align: middle;
            }
            .lines {
                display: inline-block;
                width: 1.3rem;
                height: .1rem;
                background: #f1f1f1;
                vertical-align: middle;
                span {
                    display: block;
                    height: 100%;
                    background: #999;
                    width: 0;
                    transition: width 3s;
                }
            }
            .pars {
                font-size: .24rem;
                color: #9a9a9a;
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
}
</style>
