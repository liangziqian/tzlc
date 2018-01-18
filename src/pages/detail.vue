<template>
    <div id='borrowDetail'>
        <!-- <div v-title>项目详情</div> -->
        <div class='biaotypeONE' v-show='detailType'>
            <div class='biaodetail'>
                <div class='year'>预期年化收益</div>
                <div class='yearnumber'>{{apr}}%
                  <!--<i v-show="israiserates">+{{raiserates}}%</i>-->
                </div>
            </div>
            <div class='prossLine'>
                <div id='pross'></div>
                <span class='point' id='point'>
                <span>已售{{parseInt(num)}}%</span>
                </span>
            </div>
            <div class='biaoMoney'>
                <div class='contentGlass'>
                    <div>投资期限({{isday}})</div>
                    <div>{{timelimit}}</div>
                </div>
                <span class='line'>
                <span></span>
                </span>
                <div class='contentGlass'>
                    <div>融资规模(元)</div>
                    <div>{{account}}</div>
                </div>
                <span class='line'>
                <span></span>
                </span>
                <div class='contentGlass'>
                    <div>剩余可投(元)</div>
                    <div>{{accountRemain}}</div>
                </div>
            </div>
            <div class='biaoListDetail'>
                <div>
                    <span>投资</span>
                    <span>开始计息</span>
                    <span>回款</span>
                </div>
                <div>
                    <span>
                    <span class='pointB'></span>
                    <span class='pointLineL'></span>
                    </span>
                    <span>
                    <span class='pointB'></span>
                    <span class='pointLineB'></span>
                    </span>
                    <span>
                    <span class='pointB'></span>
                    <span class='pointLineR'></span>
                    </span>
                </div>
                <div>
                    <span>现在投资</span>
                    <span>满标次日</span>
                    <span>到期回款</span>
                </div>
            </div>
            <div class='divwarpper'>
                <span>项目名称</span>
                <span>{{borrowName}}</span>
            </div>
            <div class='line'>
                <div></div>
            </div>
            <div class='divwarpper'>
                <span>起投金额(元)</span>
                <span>{{lowestAccount}}</span>
            </div>
            <div class='line'>
                <div></div>
            </div>
            <div class='divwarpper'>
                <span>投资上限(元)</span>
                <span>{{mostAccount}}</span>
            </div>
            <div class='line'>
                <div></div>
            </div>
            <div class='divwarpper'>
                <span>付息方式</span>
                <span>
                        {{repaymentWay}}
                       <!--  <br><span>正常情况下，资金将在到期日后一个工作日内退回到您的账户余额中</span> -->
                </span>
            </div>
            <!--<div class="waitao">
              <div class="divwarpper1">
                  <span>首</span>
                  <span>一马当先</span>
                  <span v-if="firstusermobile">{{firstusermobile}}</span>
                  <span v-else>虚位以待</span>
                  <span>奖励 <span>5.00元</span> 投资红包</span>
              </div>
              <div class="divwarpper1">
                <span>高</span>
                <span>一鸣惊人</span>
                <span v-if="maxmoneyusermobile">{{maxmoneyusermobile}}</span>
                <span v-else>虚位以待</span>
                <span v-if="maxmoney">目前榜首<span>{{maxmoney}}</span>元超过Ta抢 <span>10.00</span>元最高投资红包</span>
                <span v-else>目前还没人投资，投资最高的可获<span>10.00元</span> 投资红包</span>
              </div>
              <div class="divwarpper1">
                <span>尾</span>
                <span>一锤定音</span>
                <span v-if="lastusermobile">{{lastusermobile}}</span>
                <span v-else>虚位以待</span>
                <span>奖励 <span>5.00元</span> 投资红包</span>
              </div>
            </div>
            <div class='slideArea'>
                <div class='arrow'><i style='transform:rotate(180deg)'></i></div>
                <div class='shield'>
                    <i class='line-1'></i>
                    <span class='slideAreaText'>点击查看更多详情</span>
                    <i class='line-2'></i>
                </div>
            </div>-->
        </div>
        <div v-show='!detailType'>
            <div class='detailbar' @click.stop=''>
                <i :class='[activenumber==0?"active-1":activenumber==1?"active-2":"active-3"]'></i>
                <span :class='[activenumber==0?"active":""]' @click='typeActiveOne'>项目介绍</span>
                <span :class='[activenumber==1?"active":""]' @click='typeActiveTwo'>安全保障</span>
                <span :class='[activenumber==2?"active":""]' @click='typeActiveThree'>投资记录</span>
            </div>
            <!-- tab1 -->
            <!-- 债权详情-->
            <div class='tipslist mg20' v-show='activenumber==0'><i></i><span>债权详情</span></div>
            <div class='detailbarContent' id='detailbarContent' v-show='activenumber==0'>
                <div id='jieshao' class='imgmax'></div>
            </div>
            <!-- <div class='tipslist mg20' v-show='activenumber==0'><i></i><span>详细说明</span></div>
            <div class='detailbarContent' id='detailbarContent' v-show='activenumber==0'>
                <div class='xiangxishuoming'>
                    <span>融资规模</span>
                    <span>{{xiangxiContent.account}}元</span>
                </div>
            </div>
            <div class='detailbarContent' id='detailbarContent' v-show='activenumber==0'>
                <div class='xiangxishuoming'>
                    <span>起投金额</span>
                    <span>{{xiangxiContent.lowestAccount}}元</span>
                </div>
            </div>
            <div class='detailbarContent' id='detailbarContent' v-show='activenumber==0'>
                <div class='xiangxishuoming'>
                    <span>预计年化</span>
                    <span>{{xiangxiContent.apr}}%</span>
                </div>
            </div>
            <div class='detailbarContent' id='detailbarContent' v-show='activenumber==0'>
                <div class='xiangxishuoming'>
                    <span>投资期限</span>
                    <span>{{xiangxiContent.validTime}}{{isday}}</span>
                </div>
            </div>
            <div class='detailbarContent' id='detailbarContent' v-show='activenumber==0'>
                <div class='xiangxishuoming'>
                    <span>手续费</span>
                    <span>{{xiangxiContent.borrowFee==0?'无手续费':xiangxiContent.borrowFee+'元'}}</span>
                </div>
            </div> -->
            <!-- 银行卡列表 -->
            <div class='tipslist mg20' v-show='activenumber==0'><i></i><span>支持的银行与限额(仅支持储蓄卡)</span></div>
            <div class='detailbarContent' id='detailbarContent' v-show='activenumber==0'>
                <div v-for='b in banklist' class='rbanklist cf'>
                    <i v-if='b.bankName=="招商银行"' class='zhaoshang'></i>
                    <i v-if='b.bankName=="工商银行"' class='gongshang'></i>
                    <i v-if='b.bankName=="光大银行"' class='guangda'></i>
                    <i v-if='b.bankName=="广发银行"' class='guangfa'></i>
                    <i v-if='b.bankName=="华夏银行"' class='huaxia'></i>
                    <i v-if='b.bankName=="建设银行"' class='jianshe'></i>
                    <i v-if='b.bankName=="民生银行"' class='minsheng'></i>
                    <i v-if='b.bankName=="农业银行"' class='nongye'></i>
                    <i v-if='b.bankName=="平安银行"' class='pingan'></i>
                    <i v-if='b.bankName=="浦发银行"' class='pufa'></i>
                    <i v-if='b.bankName=="兴业银行"' class='xingye'></i>
                    <i v-if='b.bankName=="邮政储蓄银行"' class='youzheng'></i>
                    <i v-if='b.bankName=="中国银行"' class='zhongguo'></i>
                    <i v-if='b.bankName=="中信银行"' class='zhongxin'></i>
                    <span>{{b.bankName}}</span>
                    <span>单笔{{b.singleAmount}}万，日累计{{b.dailyAmont}}万</span>
                </div>
                <div style='font-size:.22rem;color:#6a6a6a;padding:.12rem 0;'><span style='color:#ed7a00;'>温馨提示：</span>具体金额以银行实际允许额度为准</div>
            </div>
            <!-- tab2 -->
            <!-- <div class='tipslist mg20' v-show='activenumber==1'><i></i><span>项目介绍</span></div> -->
            <!-- 项目介绍 -->
            <div class='detailbarContent' v-show='activenumber==1'>
                <div class='imgmax' id='explain'></div>
            </div>
            <!-- 附件 -->
            <!-- <div class='tipslist mg20' v-show='activenumber==1'><i></i><span>附件：相关证照信息</span></div>
            <div class='detailbarContent' v-show='activenumber==1' id='detailimg' v-html='attachment'></div> -->
            <!-- tab3 -->
            <!-- 投资记录 -->
            <div class='mg20 detailbarContent' v-show='activenumber==2' @click.stop=''>
                <div v-for='touzi in touzilist' class='touzili cf'>
                    <div>
                        <span>{{touzi.mobile}}</span>
                        <br>
                        <span>{{touzi.time}}</span>
                    </div>
                    <div>
                        {{touzi.money}}
                    </div>
                </div>
                <button type='button' @click='pageadd' v-if='!touzipageflag'>点击加载更多</button>
                <button type='button' v-else>没有更多了</button>
            </div>
        </div>
        <!-- 计算器 -->
        <transition enter-active-class='animated bounceIn' leave-active-class='animated bounceOut'>
            <div class='computed' v-show='computed'>
                <div class='computedTitle'>
                    收益计算器
                    <i @click='showComputed'></i>
                </div>
                <div class='jisuan'>
                    <input type="text" placeholder="投资金额" v-model.trim='touzimoney' id='touzimoney'>
                    <span class='yuan'>元</span>
                    <span class='jisuanday'>{{timelimit}}</span>
                    <span class='ri'>{{isday}}</span>
                    <i></i><i></i>
                </div>
                <div class='profits cf'>
                    <span>预计收益(元)</span>
                    <span>{{profits}}</span>
                </div>
            </div>
        </transition>
        <!-- 遮罩 -->
        <div class='mask' v-show='computed'></div>
        <div class='mask' v-if='validata' style='z-index:11;' @click.stop=''></div>
        <div class='validataPop' v-if='validata' @click.stop=''>
            <div class='poptitle'>提示</div>
            <div class='popcontent'>{{validataContent}}</div>
            <div class='popBTN'>
                <span @click='closeValidataPop'>取消</span>
                <span @click='pathtoValidata'>{{validataBTNcontent}}</span>
            </div>
        </div>
        <div class='bottombarhidden'></div>
        <div class='bottombar'>
            <i @click.stop='showComputed'></i>
            <div class='bottombarContent' @click.stop='tobuy' :style='{background:detailStatus==2||detailStatus==3||detailStatus==5?"#9ed5f8":detailStatus==6?"#999":""}'>
                <div>{{detailStatus==2||detailStatus==3?'已售罄':detailStatus==5?'还款中':detailStatus==6?'已还款':'立即抢购'}}</div>
                <div>已抢购人次:{{personnumber}}次</div>
            </div>
<!--             <div class='bottombarContent' @click.stop='tobuy' :style='{background:detailStatus==2||detailStatus==3||detailStatus==5?"#9ed5f8":detailStatus==6?"#999":""}'>
                <div>{{detailStatus==2||detailStatus==3?'已售罄':detailStatus==5?'还款中':detailStatus==6?'已还款':'立即抢购'}}</div>
                <div>已抢购人次:{{personnumber}}次</div>
            </div> -->
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
            num: 0,
            datanomal: true,
            personnumber: 0,
            timelimit: '',
            apr: '',
            account: 0,
            accountRemain: 0,
            startTime: '',
            endTime: '',
            borrowName: '',
            lowestAccount: 0,
            repaymentWay: '',
            detailType: true,
            activenumber: 0,
            computed: false,
            mostAccount: 0,
            detailStatus: -1,
            //以下验证使用
            validata: false,
            validataContent: '',
            validataBTNcontent: '',
            errorIndexArray: '',
            soldout: false,
            isday: '天',
            jieshao: '',
            touzilist: [],
            touzipage: 1,
//            firstusermobile:'',
//            lastusermobile:'',
//            maxmoneyusermobile:'',
//            maxmoney:'',
            touzipageflag: false,
            profits: '0.00',
            touzimoney: '',
            explain: '',
            attachment: '',
//            israiserates,
//            raiserates,
            xiangxiContent: {
                account: '',
                lowestAccount: '',
                apr: '',
                validTime: '',
                borrowFee: ''
            },
            banklist: []
        }
    },
    watch: {
        touzimoney: function() {
            let $this = this
            if (this.touzimoney == '') {
                this.profits = '0.00'
                return false
            }
            $.post(ROOT + '/wap/borrow/expect_profit.html', {
                borrowId: $this.$route.params.id,
                tenderMoney: $this.touzimoney
            }, function(response) {
                $this.profits = response.data.interest
            })
        }
    },
    methods: {
        tobuy: function() {
            if (!sessionStorage.getItem('isLogin')) {
                Toast('请先登录')
                this.$router.push('/login')
                return false
            }
            if (this.detailStatus == 2 || this.detailStatus == 3) {
                Toast('该标已售罄')
                return false
            }
            if (this.detailStatus == 5) {
                Toast('该标正在还款')
                return false
            }
            if (this.detailStatus == 6) {
                Toast('该标已还款')
                return false
            }
            let indexArray = []
            indexArray.push(sessionStorage.getItem('realname'))
            indexArray.push(sessionStorage.getItem('paypassword'))
            indexArray.push(sessionStorage.getItem('bankbind'))
            this.errorIndexArray = indexArray.indexOf('0')
            sessionStorage.setItem('borrowIndex', this.$route.params.id)
            if (this.errorIndexArray == 0) {
                this.validata = true
                this.validataContent = '您尚未通过实名认证'
                this.validataBTNcontent = '去认证'
            } else if (this.errorIndexArray == 1) {
                this.validata = true
                this.validataContent = '您尚未设置交易密码'
                this.validataBTNcontent = '去设置'
            } else if (this.errorIndexArray == 2) {
                this.validata = true
                this.validataContent = '您尚未绑定银行卡号'
                this.validataBTNcontent = '去绑定'
            } else {
                this.$router.push({
                    path: '/detailtobuy',
                    query: {
                        id: this.$route.params.id
                    }
                })
            }
        },
        closeValidataPop: function() {
            this.validata = false
        },
        pathtoValidata: function() {
            if (this.errorIndexArray == 0) {
                this.$router.push('/realname')
            } else if (this.errorIndexArray == 1) {
                this.$router.push('/dealpassword')
            } else if (this.errorIndexArray == 2) {
                this.$router.push({
                    path: '/mybank',
                    query: {
                        type: 1
                    }
                })
            }
        },
        typeActiveOne: function() {
            this.activenumber = 0
        },
        typeActiveTwo: function() {
            this.activenumber = 1
        },
        typeActiveThree: function() {
            this.activenumber = 2
        },
        showComputed: function() {
            this.computed = !this.computed
        },
        pageadd: function() {
            $.post(ROOT + '/wap/borrow/tender_list.html', {
                borrowId: $this.$route.params.id,
                page: $this.touzipage
            }, function(response) {
                if (response.code == 0) {
                    for (let i of response.data) {
                        $this.touzilist.push(i)
                    }
                    if ($this.touzipage == response.totalPage) {
                        $this.touzipageflag = true
                    } else {
                        $this.touzipage++
                    }
                }
            })
        }
    },
    mounted: function() {
        let $this = this
        if (this.$route.query.type === 'soldout') {
            this.soldout = true
        }
        $.post(ROOT + '/wap/borrow/detail.html', {
            'borrow_id': $this.$route.params.id
        }, function(response) {
          console.log(response.data)
            $this.timelimit = response.data.validTime
            $this.apr = response.data.apr
            $this.account = response.data.account
            $this.accountRemain = response.data.accountRemain
            $this.accountRemain = response.data.accountRemain
            $this.accountRemain = response.data.accountRemain
//            $this.israiserates = response.data.israiserates
//            $this.raiserates = response.data.raiserates
            $this.personnumber = response.data.people
            $this.num = (($this.account - $this.accountRemain) / $this.account * 100).toFixed(2)
            $this.startTime = response.data.startTime
            $this.endTime = response.data.endTime
            $this.borrowName = response.data.borrowName
            $this.lowestAccount = response.data.lowestAccount
            $this.repaymentWay = response.data.repaymentWay
            $this.isday = response.data.isDay == 1 ? '天' : '月'
            $this.mostAccount = response.data.mostAccount
            $this.detailStatus = response.data.status
//            $this.maxmoney = response.data.maxmoney?response.data.maxmoney:''
//            $this.lastusermobile = response.data.lastusermobile ? (response.data.lastusermobile.substring(0,3)+'****'+response.data.lastusermobile.substring(7,11)):''
//            $this.firstusermobile = response.data.firstusermobile? (response.data.firstusermobile.substring(0,3)+'****'+response.data.firstusermobile.substring(7,11)):''
//            $this.maxmoneyusermobile = response.data.maxmoneyusermobile? (response.data.maxmoneyusermobile.substring(0,3)+'****'+response.data.maxmoneyusermobile.substring(7,11)):''
                // $this.jieshao = response.data.detail
                // $this.explain = response.data.explain
            $this.attachment = response.data.attachment
            $this.xiangxiContent.account = response.data.account
            $this.xiangxiContent.lowestAccount = response.data.lowestAccount
            $this.xiangxiContent.apr = response.data.apr
            $this.xiangxiContent.validTime = response.data.validTime
            $this.xiangxiContent.borrowFee = response.data.borrowFee

            $this.$nextTick(function() {
                $('#jieshao').append(response.data.detail)
                $('#explain').append(response.data.explain)
            })
            if ($this.num > 98) {
                $('#point').animate({
                    left: 98 + '%'
                })
            } else {
                $('#point').animate({
                    left: $this.num + '%'
                })
            }
            $('#pross').animate({
                width: $this.num + '%'
            })
            if ($this.num >= 95) {
                $('#point span').css({
                    right: '.2rem'
                })
            } else if ($this.num <= 5) {
                $('#point span').css({
                    right: '-1rem'
                })
            }
        })
        $.post(ROOT + '/wap/borrow/tender_list.html', {
            borrowId: $this.$route.params.id,
            page: $this.touzipage
        }, function(response) {
            if (response.code == 0) {
                for (let i of response.data) {
                    $this.touzilist.push(i)
                }
                if ($this.touzipage == response.totalPage) {
                    $this.touzipageflag = true
                } else {
                    $this.touzipage++
                }
            }
        })
        $.post(ROOT + '/wap/bank_list.html', function(response) {
            if (response.code == 0) {
                for (let i of response.data) {
                    $this.banklist.push(i)
                }
            }
        })
        this.$nextTick(function() {
            let ele = document.getElementById('borrowDetail')

            // let touchstart = 0
            // let touchend = 0

            ele.addEventListener('click', function(e) {
                $this.detailType = !$this.detailType
            }, false)
            $('.mask')[0].addEventListener('click', function(e) {
                e.stopPropagation()
            }, false)
            $('.computed')[0].addEventListener('click', function(e) {
                e.stopPropagation()
            }, false)

            // ele.addEventListener('touchend', function(event) {
            //     touchend = event.changedTouches[0].clientY
            //     if (touchend - touchstart > 200) {
            //         $this.detailType = !$this.detailType
            //     }
            // }, false)
        })
    }
}
</script>
<style lang='less' scoped>
.bottombarhidden {
    height: 1rem;
}

.rbanklist {
    font-size: 0;
    padding: .15rem 0;
    border-bottom: 1px dashed #999;
    i {
        width: .24rem;
        height: .24rem;
        float: left;
        margin-right: .1rem;
    }
    span:nth-of-type(1) {
        float: left;
        color: #6a6a6a;
        font-size: .24rem;
    }
    span:nth-of-type(2) {
        float: right;
        color: #888888;
        font-size: .24rem;
    }
}

.xiangxishuoming {
    padding: 0 .3rem;
    span:nth-of-type(1) {
        display: inline-block;
        color: #bebebe;
        font-size: .24rem;
        width: 1.9rem;
    }
}

.profits {
    font-size: 0;
    padding: 0 .3rem;
    margin-top: .35rem;
    span:nth-of-type(1) {
        color: #888888;
        font-size: .28rem;
        float: left;
    }
    span:nth-of-type(2) {
        font-size: .4rem;
        color: #fb4d4d;
        float: right;
    }
}

.tipslist {
    font-size: 0;
    background: #fff;
    border-bottom: 1px dashed #999;
    padding: .2rem 0;
    padding-left: .3rem;
    i {
        display: inline-block;
        width: .08rem;
        height: .2rem;
        background: #44b2f7;
        margin-right: .08rem;
    }
    span {
        color: #6a6a6a;
        font-size: .28rem;
    }
}

.detailimg {
    img {
        width: 100%;
    }
}


.jisuan {
    margin-top: .4rem;
    border-bottom: 1px dashed #999;
    position: relative;
    font-size: 0;
    padding: 0 .3rem .4rem .3rem;
    input {
        width: 2.4rem;
        height: .76rem;
        font-size: .28rem;
        border: 1px solid #cacaca;
        padding-left: .76rem;
        vertical-align: middle;
    }
    i:nth-of-type(1) {
        display: inline-block;
        width: .36rem;
        height: .34rem;
        background: url('../assets/smallmoney.png') no-repeat 50% 50%;
        background-size: 100%;
        position: absolute;
        top: .2rem;
        left: .4rem;
    }
    i:nth-of-type(2) {
        display: inline-block;
        width: .36rem;
        height: .34rem;
        background: url('../assets/smalldate.png') no-repeat 50% 50%;
        background-size: 100%;
        position: absolute;
        top: .2rem;
        right: 2.75rem;
    }
    .yuan {
        font-size: .26rem;
        color: #333333;
        vertical-align: middle;
        margin-left: .15rem;
        margin-right: .45rem;
    }
    .jisuanday {
        display: inline-block;
        line-height: .76rem;
        width: 2.4rem;
        height: .76rem;
        font-size: .28rem;
        border: 1px solid #cacaca;
        padding-left: .76rem;
        vertical-align: middle;
    }
    .ri {
        font-size: .26rem;
        color: #333333;
        vertical-align: middle;
        margin-left: .15rem;
    }
}

.biaodetail {
    height: 3.13rem;
    position: relative;
    background: #fff;
    font-size: 0;
    i.active {
        display: inline-block;
        height: .46rem;
        width: 1.1rem;
        background: url(../assets/noobVIP.png) no-repeat 50% 50%;
        background-size: 100%;
        position: absolute;
        right: .3rem;
        top: 0;
    }
    i.active2 {
        display: inline-block;
        height: .46rem;
        width: 1.1rem;
        background: url(../assets/hot.png) no-repeat 50% 50%;
        background-size: 100%;
        position: absolute;
        right: .3rem;
        top: 0;
    }
    .year {
        font-size: .26rem;
        color: #959595;
        text-align: center;
        padding: .8rem 0 .4rem 0;
    }
    .yearnumber {
        font-size: .65rem;
        color: #fb4d4d;
        text-align: center;
        margin-left: -.1rem;
    }
}

.mg20 {
    margin-top: .2rem;
}

#borrowDetail {
    height: 100%;
}

.detailbarContent {
    padding: .2rem .3rem;
    background: #fff;
    font-size: .26rem;
    .touzili {
        font-size: 0;
        border-bottom: 1px dashed #999;
        height: .9rem;
        div {
            display: inline-block;
            font-size: .26rem;
            width: 50%;
            height: .9rem;
            vertical-align: top;
            color: #414042;
        }
        div:nth-of-type(1) {
            line-height: 1.5;
            span:nth-of-type(2) {
                font-size: .2rem;
                color: #888888;
            }
        }
        div:nth-of-type(2) {
            line-height: .9rem;
            text-align: right;
            color: #414042;
            font-size: .26rem;
        }
    }
    button {
        display: block;
        width: 2rem;
        height: .5rem;
        margin: 0 auto;
        color: #6a6a6a;
        font-size: .26rem;
        background: #fff;
        border-bottom: 1px solid #d5d5d5;
        border-radius: 10px;
    }
}

.detailbar {
    background: #fff;
    font-size: 0;
    position: relative;
    span {
        display: inline-block;
        width: 33.33%;
        font-size: .3rem;
        text-align: center;
        color: #888888;
        margin: .3rem 0;
        border-right: 1px solid #888;
    }
    .active {
        color: #44b2f7;
    }
    span:last-child {
        border: none;
    }
    i {
        display: inline-block;
        width: 33.33%;
        height: .02rem;
        background: #44b2f7;
        position: absolute;
        bottom: 0;
        transition: left .5s;
    }
    .active-1 {
        left: 0;
    }
    .active-2 {
        left: 33.33%;
    }
    .active-3 {
        left: 66.66%;
    }
}

.computed {
    width: 6.8rem;
    display: inline-block;
    height: 3.8rem;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -1.9rem;
    margin-left: -3.4rem;
    z-index: 6;
    border-radius: 10px;
    .computedTitle {
        text-align: center;
        font-size: .32rem;
        color: #666666;
        padding: .3rem 0;
        position: relative;
        i {
            float: right;
            width: .4rem;
            height: .4rem;
            background: url(../assets/dealpasswordClose.png) no-repeat 50% 50%;
            background-size: 100%;
            position: absolute;
            top: .28rem;
            right: .3rem;
        }
    }
}

.mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .4;
    top: 0;
    left: 0;
    z-index: 5;
}

.slideArea {
    font-size: 0;
    .arrow {
        text-align: center;
        padding: .2rem 0 .07rem 0;
        i {
            display: inline-block;
            width: .27rem;
            height: .26rem;
            background: url(../assets/arrow.png) no-repeat 50% 50%;
            background-size: 100%;
            transition: transform .5s;
        }
        .arrowTransform {
            transform: rotate(180deg);
        }
    }
    .shield {
        text-align: center;
        .line-1 {
            display: inline-block;
            width: 1.5rem;
            border-bottom: 1px solid #dcdcdc;
            margin-top: -.1rem;
            height: .1rem;
            margin-right: .37rem;
        }
        .line-2 {
            display: inline-block;
            width: 1.5rem;
            border-bottom: 1px solid #dcdcdc;
            margin-top: -.1rem;
            height: .1rem;
            margin-left: .37rem;
        }
        .shield-1 {
            display: inline-block;
            width: .27rem;
            height: .3rem;
            background: url(../assets/shield.png) no-repeat 50% 50%;
            background-size: 100%;
            vertical-align: middle;
            margin-right: .1rem;
            position: relative;
            bottom: .02rem;
        }
        .slideAreaText {
            font-size: .26rem;
            color: #b1b1b1;
            vertical-align: middle;
        }
    }
}

.prossLine {
    height: 4px;
    background: #d9d9d9;
    position: relative;
    div {
        position: absolute;
        left: 0;
        height: 100%;
        top: 0;
        width: 0;
        transition: width 1s;
        background: #44b2f7;
    }
    .point {
        background: #44b2f7;
        height: .15rem;
        width: .15rem;
        border-radius: 50%;
        position: absolute;
        top: -.05rem;
        left: 0;
        transition: left 1s;
        z-index: 1;
    }
    span {
        display: inline-block;
        width: 1rem;
        height: .3rem;
        background: #6cb8ec;
        color: #fff;
        font-size: .2rem;
        text-align: center;
        line-height: .3rem;
        border-radius: .1rem;
        position: absolute;
        bottom: .2rem;
        right: -.4rem;
    }
}

.biaoMoney {
    font-size: 0;
    background: #fff;
    text-align: center;
    height: 1.16rem;
    .contentGlass {
        width: 2rem;
        display: inline-block;
        vertical-align: top;
        height: 1.16rem;
        div:nth-of-type(1) {
            color: #adb2b7;
            font-size: .24rem;
            padding: .26rem 0 .19rem 0;
        }
        div:nth-of-type(2) {
            color: #6a6a6a;
            font-size: .32rem;
        }
    }
    span.line {
        display: inline-block;
        vertical-align: top;
        width: .6rem;
        text-align: center;
        height: 1.16rem;
        position: relative;
        span {
            width: 1px;
            background: #dadada;
            display: inline-block;
            height: .52rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}

.validataPop {
    width: 5.4rem;
    height: 2.5rem;
    background: #f8f8f9;
    border-radius: 40px;
    position: absolute;
    z-index: 11;
    top: 50%;
    left: 50%;
    margin-top: -1.25rem;
    margin-left: -2.7rem;
    overflow: hidden;
    font-size: 0;
    .poptitle {
        margin-top: .45rem;
        font-size: .32rem;
        font-weight: bold;
        color: #000;
        text-align: center;
    }
    .popcontent {
        margin-top: .1rem;
        font-size: .24rem;
        color: #000;
        text-align: center;
    }
    .popBTN {
        height: .88rem;
        border-top: 1px solid #d6d6de;
        position: absolute;
        width: 100%;
        bottom: 0;
        span {
            display: inline-block;
            width: 50%;
            height: 100%;
            line-height: .88rem;
            font-size: .32rem;
            text-align: center;
            color: #007aff;
        }
        span:first-child {
            border-right: 1px solid #d6d6de;
        }
    }
}

.bottombar {
    height: 1rem;
    background: #44b2f7;
    color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 0;
    i {
        display: inline-block;
        height: 1rem;
        position: absolute;
        left: 0;
        top: 0;
        width: 1rem;
        background: #36a2eb url(../assets/calculator.png) no-repeat 47% 50%;
        background-size: 70%;
    }
    .bottombarContent {
        display: block;
        height: 100%;
        color: #fff;
        div:nth-of-type(1) {
            font-size: .36rem;
            text-align: center;
            padding: .2rem 0 .08rem 0;
        }
        div:nth-of-type(2) {
            font-size: .24rem;
            text-align: center;
        }
    }
    .blackBG {
        background: #999999 !important;
    }
}

.biaoListDetail {
    background: #fff;
    text-align: center;
    font-size: 0;
    margin-top: .18rem;
    border-bottom: 1px solid #d9d9d9;
    >div:nth-of-type(1) {
        padding-top: .5rem;
        display: inline-block;
        width: 5.55rem;
        span {
            font-size: .26rem;
            color: #bebebe;
            display: inline-block;
            width: 33.33%;
            height: 100%;
        }
        span:nth-of-type(1) {
            text-align: left;
        }
        span:nth-of-type(2) {
            text-align: center;
        }
        span:nth-of-type(3) {
            text-align: right;
        }
    }
    >div:nth-of-type(2) {
        span {
            display: inline-block;
            width: 33.33%;
            height: .4rem;
            position: relative;
            .pointB {
                display: inline-block;
                width: .15rem;
                height: .15rem;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                background: #e0e0e0;
                transform: translate(-50%, -50%);
            }
            .pointLineL {
                display: inline-block;
                height: 1px;
                width: 50%;
                position: absolute;
                background: #e0e0e0;
                top: 50%;
                right: 0;
            }
            .pointLineB {
                display: inline-block;
                height: 1px;
                width: 100%;
                position: absolute;
                background: #e0e0e0;
                top: 50%;
                right: 0;
            }
            .pointLineR {
                display: inline-block;
                height: 1px;
                width: 50%;
                position: absolute;
                background: #e0e0e0;
                top: 50%;
                left: 0;
            }
        }
    }
    >div:nth-of-type(3) {
        padding-bottom: .3rem;
        display: inline-block;
        width: 5.55rem;
        span {
            font-size: .24rem;
            color: #666666;
            display: inline-block;
            width: 33.33%;
            height: 100%;
        }
        span:nth-of-type(1) {
            text-align: left;
        }
        span:nth-of-type(2) {
            text-align: center;
        }
        span:nth-of-type(3) {
            text-align: right;
        }
    }
}

.divwarpper {
    background: #fff;
    padding: .3rem 0 .3rem .3rem;
    font-size: 0;
    >span {
        display: inline-block;
    }
    >span:nth-of-type(1) {
        width: 2.2rem;
        color: #bebebe;
        font-size: .28rem;
        text-align: left;
        vertical-align: top;
    }
    >span:nth-of-type(2) {
        color: #666666;
        font-size: .28rem;
        width: 5rem;
        vertical-align: top;
        span {
            padding-top: .14rem;
            display: inline-block;
            color: #bebebe;
            font-size: .24rem;
            text-align: left;
            vertical-align: top;
        }
    }
}
.waitao{
  background: #fff;
  padding: .07rem .35rem .07rem .33rem;
  font-size: 0;
  .divwarpper1{
    background: #fff;
    height: .64rem;
    line-height: .64rem;
    margin-top: -1px;
    &.divwarpper1:nth-of-type(1){
      margin-top: 0;
    }
    >span {
      color:#aaaaaa;
      float: left;
    }
    >span:nth-of-type(1) {
      width: 0.32rem;
      color: #fff;
      font-size: .22rem;
      text-align: center;
      height: .32rem;
      line-height: .32rem;
      display: inline-block;
      background-color: #ff666b;
      border-radius: 50%;
      margin: 0.16rem .04rem 0 0;
    }
    >span:nth-of-type(2) {
      font-size: .24rem;
      width: 1.2rem;
      text-align: center;
    }
    >span:nth-of-type(3) {
      font-size: .24rem;
      width: 1.74rem;
      text-align: center;
    }
    >span:nth-of-type(4) {
      font-size: .24rem;
      width: 3.33rem;
      text-align: left;
      padding-left: .17rem;
      span{
        color: #ff666b;
        font-size: .24rem;
      }
    }
    &.divwarpper1:nth-of-type(2){
      >span:nth-of-type(4) {
        line-height: .32rem !important;
        span{
          line-height: .32rem !important;
        }
      }
    }
  }
}

.line {
    text-align: right;
    font-size: 0;
    background: #fff;
    div {
        display: inline-block;
        width: 7rem;
        border-top: 1px solid #d9d9d9;
    }
}


</style>
