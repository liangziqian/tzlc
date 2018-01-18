<template>
    <div>
        <!-- <div v-title>消息中心</div> -->
        <div class='msglist'>
            <div v-for='m in msg' @click='todetail'>
                <router-link :to='{path:"/msgdetail"+m.id}'>
                    <div :class='[m.isRead==1?"gery":""]'>{{m.name}}</div>
                    <div>{{m.time1}}</div>
                </router-link>
            </div>
        </div>
        <div class='crossGlass' v-show='!!msg.length'>
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
            page: 1,
            msg: [],
            content: '点击加载更多',
            contentFlag: true,
            totalpage: 0
        }
    },
    methods: {
        investMore: function() {
            if (!this.contentFlag) return false
            let $this = this
            let data = {}
            $.post(ROOT + '/wap/myhome/messages.html', {
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
        },
        todetail: function() {

        }

    },
    mounted: function() {
        let $this = this
        $.post(ROOT + '/wap/myhome/messages.html', {
            page: $this.page
        }, function(response) {
            if (response.code == '0') {
                for (let i of response.data) {
                    $this.msg.push(i)
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

.msglist {
    background: #fff;
    >div {
        margin-left: .3rem;
        font-size: .28rem;
        color: #3a3a3a;
        border-bottom: 1px solid #dcdcdc;
        div:nth-of-type(1) {
            padding: .3rem 0;
            color: #3a3a3a;
        }
        div:nth-of-type(2) {
            padding: 0 0 .3rem 0;
            color: #888;
            font-size: .22rem;
        }
    }
}

.gery {
    color: #888 !important;
}
</style>
