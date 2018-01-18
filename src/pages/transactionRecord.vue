<template>
    <div>
        <!-- <div v-title>交易记录</div> -->
        <div class='transactionTab'>
            <span :class='[transactionAll?"font-blue":""]' @click='transAll'>全部</span>
            <span :class='[transactionIn?"font-blue":""]' @click='transIn'>收入</span>
            <span :class='[transactionOut?"font-blue":""]' @click='transOut'>支出</span>
        </div>
        <div class='transactionGlass'>
            <div class='transactionList' v-for='b in biao'>
                <div class='transactionList-1 cf'>
                    <span>{{b.remark}}</span>
                    <span class='in-font' v-if='b.type'>+{{b.money}}</span>
                    <span class='out-font' v-else>-{{b.money}}</span>
                </div>
                <div class='transactionList-2 cf'>
                    <span>{{b.addTime}}</span>
                    <span>{{b.result}}</span>
                </div>
            </div>
        </div>
        <div class='noinvestBG' v-show='!biao.length'>
            <i></i>
            <div>当前没有交易记录哦，
                <router-link :to='{path:"/index/money",query:{type:2}}'>去投资&gt;</router-link>
            </div>
        </div>
        <div class='crossGlass' v-show='!!biao.length'>
            <i class='crossLine'></i>
            <span @click='investMore'>{{content}}</span>
            <i class='crossLine'></i>
        </div>
    </div>
</template>
<script>
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
export default {
    data: function() {
        return {
            transactionAll: true,
            transactionIn: false,
            transactionOut: false,
            biao: [],
            page: 1,
            totalpage: 0,
            addType: [1, 6, 7, 32, 33, 39, 40, 41, 42, 43],
            lessType: [8, 12, 31, 35, 36, 37, 38],
            content: '点击加载更多',
            contentFlag: true,
            ajaxTypeContent: 'all'
        }
    },
    methods: {
        transAll: function() {
            this.transactionAll = true
            this.transactionIn = false
            this.transactionOut = false
            this.ajaxTypeContent = 'all'
            this.biao = []
            this.page = 1
            this.contentFlag = true
            this.investMore()
        },
        transIn: function() {
            this.transactionAll = false
            this.transactionIn = true
            this.transactionOut = false
            this.ajaxTypeContent = 'income'
            this.biao = []
            this.page = 1
            this.contentFlag = true
            this.investMore()
        },
        transOut: function() {
            this.transactionAll = false
            this.transactionIn = false
            this.transactionOut = true
            this.ajaxTypeContent = 'cost'
            this.biao = []
            this.page = 1
            this.contentFlag = true
            this.investMore()
        },
        investMore: function() {
            if (!this.contentFlag) return false
            let $this = this
            let data = {}
            $.post(ROOT + '/wap/myhome/records.html', {
                type: $this.ajaxTypeContent,
                page: $this.page
            }, function(response) {
                if (response.code == 0) {
                    $this.totalpage = response.totalPage
                    if (response.data.length > 0) {
                        for (let i of response.data) {
                            data.remark = i.remark
                            data.money = i.money
                            data.addTime = i.addTime
                            data.result = i.result
                            data.type = $this.addType.indexOf(i.type) > -1 ? true : false
                            $this.biao.push(data)
                            data = {}
                        }
                        if ($this.page == response.totalPage) {
                            $this.content = '没有更多了'
                            $this.contentFlag = false
                        } else {
                            $this.page++
                        }
                    }
                }
            })
        }
    },
    mounted: function() {
        let $this = this
        let data = {}
        $.post(ROOT + '/wap/myhome/records.html', {
            type: $this.ajaxTypeContent,
            page: $this.page
        }, function(response) {
            if (response.code == 0) {
                $this.totalpage = response.totalPage
                if (response.data.length > 0) {
                    for (let i of response.data) {
                        data.remark = i.remark
                        data.money = i.money
                        data.addTime = i.addTime
                        data.result = i.result
                        data.type = $this.addType.indexOf(i.type) > -1 ? true : false
                        $this.biao.push(data)
                        data = {}
                    }
                    if ($this.page == response.totalPage) {
                        $this.content = '没有更多了'
                        $this.contentFlag = false
                    } else {
                        $this.page++
                    }
                }
            }
        })
    }
}
</script>
<style lang='less' scoped>
.crossGlass {
    font-size: 0;
    text-align: center;
    margin-top: .3rem;
    margin-bottom: .3rem;
    .crossLine {
        display: inline-block;
        width: .4rem;
        height: .21rem;
        background: url('../assets/crossLine.png') no-repeat 50% 50%;
        background-size: 100%;
        vertical-align: middle;
    }
    span {
        color: #999999;
        font-size: .26rem;
        margin: 0 .2rem;
        display: inline-block;
        vertical-align: middle;
    }
}

.transactionGlass {
    background: #fff;
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

.transactionList {
    background: #fff;
    font-size: 0;
    border-bottom: 1px solid #d9d9d9;
    padding: .3rem .3rem .3rem 0;
    margin-left: .3rem;
    .transactionList-1 {
        padding-bottom: .25rem;
        span:nth-of-type(1) {
            float: left;
            color: #666666;
            font-size: .3rem;
        }
        span:nth-of-type(2) {
            float: right;
            font-size: .3rem;
        }
        .out-font {
            color: #35a0e4;
        }
        .in-font {
            color: #fb4d4d;
        }
    }
    .transactionList-2 {
        span:nth-of-type(1) {
            float: left;
            font-size: .24rem;
            color: #bababa;
        }
        span:nth-of-type(2) {
            float: right;
            font-size: .24rem;
            color: #bababa;
        }
    }
}

div.transactionList:last-child {
    border: none;
}

.transactionTab {
    font-size: 0;
    background: #fff;
    border-bottom: 1px solid #b7b7b7;
    margin-bottom: .2rem;
    span {
        display: inline-block;
        width: 33.33%;
        color: #999999;
        font-size: .28rem;
        text-align: center;
        border-right: 1px solid #c8c8c8;
        margin: .2rem 0;
    }
    span:last-child {
        border: none;
    }
}

.font-blue {
    color: #44b2f7 !important;
}
</style>
