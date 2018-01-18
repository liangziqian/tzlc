<template>
    <div>
        <!-- <div v-title>我的投资</div> -->
        <div class='tipGlass mg20'>
            <div>
                <div>{{investALL}}</div>
                <div>投资本金(元)</div>
            </div>
            <div>
                <div>{{investCash}}</div>
                <div>预期收益(元)</div>
            </div>
        </div>
        <div class='biaoList' v-for="b in biao">
            <router-link :to='{path:"/investdetail/"+b.borrowid+"/"+b.tenderid,query:b}'>
                <div class='biao mg20'>
                    <div class='biaoTitle cf'>
                        <span>{{b.borrowName}}</span>
                        <i :class='[b.status=="5"?"biaoing":b.status=="6"||b.status=="11"?"biaodown":b.status=="2"||b.status=="3"?"shenhezhong":"mujizhong"]'></i>
                    </div>
                    <div class='invest-biaodetail cf'>
                        <span>投资金额(元)</span>
                        <span>{{b.money}}</span>
                    </div>
                    <div class='invest-biaodetail cf invest-biaodetail-last'>
                        <span>预期收益(元)</span>
                        <span>{{b.interest}}</span>
                    </div>
                    <!--                     <div class='invest-time cf'>
                        <div>
                            回款日
                            <span>{{b.repayTime}}</span>
                        </div>
                        <span>{{b.repayAccount}}</span>
                    </div> -->
                </div>
            </router-link>
        </div>
        <div class='noinvestBG' v-show='!biao.length'>
            <i></i>
            <div>当前没有投资记录哦，
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
            investALL: '0.00',
            investCash: '0.00',
            page: 1,
            biao: [],
            content: '点击加载更多',
            contentFlag: true
        }
    },
    methods: {
        investMore: function() {
            let $this = this
            if (!$this.contentFlag) return false
            let data = {}
            $.post(ROOT + '/wap/myhome/tblist.html', {
                page: $this.page
            }, function(response) {
                $this.investALL = response.data.sum_account
                $this.investCash = response.data.sum_interest
                if (response.data.interesting_list.length > 0) {
                    for (let i of response.data.interesting_list) {
                        data.borrowid = i.borrowId
                        data.tenderid = i.tenderId
                        data.borrowName = i.borrowName
                        data.money = i.money
                        data.tenderAddtime = i.tenderAddtime
                        data.interest = i.interest
                        data.repayTime = i.repayTime
                        data.status = i.status
                        data.repayAccount = i.repayAccount
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
            })
        }
    },
    mounted: function() {
        let $this = this
        let data = {}
        $.post(ROOT + '/wap/myhome/tblist.html', {
            page: $this.page
        }, function(response) {
            $this.investALL = response.data.sum_account
            $this.investCash = response.data.sum_interest
            if (response.data.interesting_list.length > 0) {
                for (let i of response.data.interesting_list) {
                    data.borrowid = i.borrowId
                    data.tenderid = i.tenderId
                    data.borrowName = i.borrowName
                    data.money = i.money
                    data.tenderAddtime = i.tenderAddtime
                    data.interest = i.interest
                    data.repayTime = i.repayTime
                    data.status = i.status
                    data.repayAccount = i.repayAccount
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
        })
    }
}
</script>
<style lang='less' scoped>
.mg20 {
    margin-top: .2rem;
}

.tipGlass {
    background: #fff url('../assets/line.png') no-repeat 50% 50%;
    background-size: 1%;
    font-size: 0;
    >div {
        width: 50%;
        display: inline-block;
        padding: .3rem 0 .3rem 1rem;
        >div:nth-of-type(1) {
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

.biao {
    background: #fff;
    font-size: 0;
    .biaoTitle {
        padding-left: .3rem;
        border-bottom: 1px solid #e5e5e5;
        span {
            font-size: .28rem;
            color: #333333;
            float: left;
            position: relative;
            top: .3rem;
        }
        i {
            display: inline-block;
            width: .84rem;
            height: .81rem;
            float: right;
        }
        .biaodown {
            background: url('../assets/biaodown.png') no-repeat 50% 50%;
            background-size: 100%;
        }
        .biaoing {
            background: url('../assets/biaoing.png') no-repeat 50% 50%;
            background-size: 100%;
        }
        .mujizhong {
            background: url('../assets/mujizhong.png') no-repeat 50% 50%;
            background-size: 100%;
        }
        .shenhezhong {
            background: url('../assets/shenhezhong.png') no-repeat 50% 50%;
            background-size: 100%;
        }
    }
    .invest-biaodetail {
        margin-left: .3rem;
        padding-top: .3rem;
        padding-right: .3rem;
        span:nth-of-type(1) {
            float: left;
            color: #adb2b7;
            font-size: .26rem;
        }
        span:nth-of-type(2) {
            float: right;
            color: #636363;
            font-size: .28rem;
        }
    }
    .invest-biaodetail-last {
        padding-bottom: .3rem;
        border-bottom: 1px solid #d9d9d9;
    }
    .invest-time {
        padding: .3rem;
        >div {
            color: #818181;
            font-size: .26rem;
            float: left;
            span {
                color: #333333;
                font-size: .28rem;
            }
        }
        >span {
            font-size: .28rem;
            color: #ed7900;
            float: right;
        }
    }
}
</style>
