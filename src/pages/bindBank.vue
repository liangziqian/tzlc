<template>
    <div class='bankOutGlass'>
        <!-- <div v-title>我的银行卡</div> -->
        <div class='validate' v-show='!addflag&&cardList'></div>
        <div class='bank-tips cf' v-show='addflag&&cardList'>
            <i></i>
            <div>为了保障账户的安全，请先进行实名认证，投资时只能用一张银行卡进行充值和提现。</div>
        </div>
        <div class='bank-tips cf' v-show='!addflag&&cardList'>
            <i></i>
            <div>您已实名认证，如信息有问题，请及时联系客服。请输入您的银行卡号进行信息绑定，确保您本人实名信息与银行卡信息一致。</div>
        </div>
        <div class='bank-glass' v-show='addflag&&cardList'>
            <div class='addbank' @click='addbank'>
                <i></i>
                <span>点击添加银行卡</span>
            </div>
        </div>
        <div class='bank-type-input' v-show='!addflag&&cardList'>
            <span class='input-title'>姓名</span>
            <span class='sp-input' :class='[fs3]'>{{username}}</span>
            <span class='realname'>已实名</span>
        </div>
        <div class='bank-type-input  bank-mg20' v-show='!addflag&&cardList' @click='showCity'>
            <span class='input-title'>所属银行</span>
            <span class='sp-input' :class='[fs3]' id='cityChange'>{{cityContext}}</span>
            <i></i>
            <input type="hidden" v-model.trim='cityId'>
        </div>
        <div class='line' v-show='!addflag&&cardList'>
            <div></div>
        </div>
        <!--         <div class='bank-type-input' v-show='!addflag&&cardList'>
            <span class='input-title'>预留手机</span>
            <input type="text" placeholder='请输入预留手机号' class='sp-input' :class='[fs3]' v-model.trim='telephone' maxlength="11">
        </div> -->
        <!--         <div class='line' v-show='!addflag&&cardList'>
            <div></div>
        </div> -->
        <div class='bank-type-input' v-show='!addflag&&cardList'>
            <span class='input-title'>银行卡</span>
            <input type="text" placeholder='请输入您的银行卡号' class='sp-input' :class='[fs3]' v-model.trim='cardNo' maxlength="19">
        </div>
        <div class='bank-nextpart' v-show='!addflag&&cardList'>
            <button type='button' @click='tosub' :class='[colorBTN?"bank-blueBTN":""]'>下一步</button>
        </div>
        <div v-show='!cardList' class='bank-card-list'>
            <div class='one-card'>
                <div class='card-top'>
                    <i v-if='bankname=="招商银行"' class='zhaoshang bank-icon'></i>
                    <i v-if='bankname=="工商银行"' class='gongshang bank-icon'></i>
                    <i v-if='bankname=="光大银行"' class='guangda bank-icon'></i>
                    <i v-if='bankname=="广发银行"' class='guangfa bank-icon'></i>
                    <i v-if='bankname=="华夏银行"' class='huaxia bank-icon'></i>
                    <i v-if='bankname=="建设银行"' class='jianshe bank-icon'></i>
                    <i v-if='bankname=="民生银行"' class='minsheng bank-icon'></i>
                    <i v-if='bankname=="农业银行"' class='nongye bank-icon'></i>
                    <i v-if='bankname=="平安银行"' class='pingan bank-icon'></i>
                    <i v-if='bankname=="浦发银行"' class='pufa bank-icon'></i>
                    <i v-if='bankname=="兴业银行"' class='xingye bank-icon'></i>
                    <i v-if='bankname=="邮政储蓄银行"' class='youzheng bank-icon'></i>
                    <i v-if='bankname=="中国银行"' class='zhongguo bank-icon'></i>
                    <i v-if='bankname=="中信银行"' class='zhongxin bank-icon'></i>
                    <span class='bank-name'>{{bankname}}</span>
                    <span class='bank-tips'>具体以银行实际允许额度为准</span>
                </div>
                <div class='card-middle'>
                    <div class='bankcard-num'>{{bankcardNum}}</div>
                    <div class='bankday'>支付单笔{{bankday}}万，日累计{{bankSimgle}}万</div>
                </div>
                <div class='card-bottom cf'>
                    <span class='card-bottom-left'>预留手机号码</span>
                    <span class='card-bottom-right'>{{cardListMobile}}</span>
                </div>
            </div>
        </div>
        <div class='city_city' v-show='cityFlag'>
            <div v-for='b in banknamelist' class='rbanklist'>
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
                    <span id="bankNameTeam">{{b.bankName}}</span>
                    <span>单笔{{b.singleAmount}}万，日累计{{b.dailyAmont}}万</span>
            </div>
        </div>
        <div class='bank-ask' :class='[cardList?"":"mgtop"]'>如有疑问请联系客服</div>
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
            addflag: true,
            fs3: 'fs28',
            username: '',
            cardNo: '',
            telephone: '',
            colorBTN: false,
            cardList: true,
            cardListMobile: '',
            bankname: '',
            bankcardNum: '',
            bankday: '',
            bankSimgle: '',
            cityFlag: false,
            cityContext: '请选择所属银行',
            cityId: 0,
            banknamelist: []
        }
    },
    watch: {
        cardNo: function(val) {
            this.colorBTN = ((val.length == 16 || val.length == 19) && this.cityId > 0) ? true : false
        },
        cityId: function(val) {
            this.colorBTN = ((this.cardNo.length == 16 || this.cardNo.length == 19) && val > 0) ? true : false
        }
    },
    methods: {
        addbank: function() {
            if (sessionStorage.getItem('realname') == 0) {
                Toast('请先进行实名认证')
                return false
            } else if (sessionStorage.getItem('paypassword') == 0) {
                Toast('请先设置交易密码')
                return false
            }
            this.addflag = !this.addflag
        },
        showCity: function() {
            this.cityFlag = !this.cityFlag
        },
        tosub: function() {
            let $this = this
            if (!$this.colorBTN) return false
            Indicator.open()
            $.post(ROOT + '/wap/myhome/binding_card.html', {
                cardNo: $this.cardNo
            }, function(response) {
                Indicator.close()
                if (response.code == 0) {
                    sessionStorage.setItem('bankbind', 1)
                    $this.$router.push({
                        path: '/success',
                        query: {
                            type: 3
                        }
                    })
                } else {
                    Toast(response.msg)
                }
            })
        }
    },
    created: function() {
        if (this.$route.query.type == 1) {
            this.addbank()
        }
    },
    mounted: function() {
        let $this = this
        $.post(ROOT + '/wap/myhome/card_list.html', function(response) {
            if (response.code == 0) {
                $this.cardList = false
                $this.cardListMobile = response.data.telephone
                $this.bankname = response.data.bank_name
                $this.bankcardNum = response.data.card_no
                $this.bankday = response.data.dailyAmont
                $this.bankSimgle = response.data.singleAmount
            }
        })
        $.post(ROOT + '/wap/myhome/realname_setting.html', {
            realname: '',
            idCard: ''
        }, function(response) {
            if (response.code == 0) {
                $this.username = response.data.surname
            }
        })

        //银行

        $.post(ROOT + '/wap/bank_list.html', function(response) {
            if (response.code == 0) {
                for (let i of response.data) {
                    $this.banknamelist.push(i)
                }
                $this.$nextTick(function() {
                    $('.city_city div').on('click', function() {
                        $this.cityFlag = false
                        $this.cityContext = $(this).find('#bankNameTeam').text()
                        $this.cityId = 1
                    })
                })
            }
        })
    }
}
</script>
<style lang='less'>
.rbanklist{
    font-size: 0;
    padding: .3rem;
    border-bottom: 1px dashed #999;
    overflow: hidden;
}
.rbanklist i{
    width:.24rem;
    height:.24rem;
    float:left;
    margin-right:.1rem
}
.rbanklist span:nth-of-type(1){
    float:left;
    color:#6a6a6a;
    font-size:.24rem
}
.rbanklist span:nth-of-type(2){
    float:right;
    color:#888888;
    font-size:.24rem
}
.bank-tips {
    padding: .3rem;
    i {
        display: inline-block;
        width: .26rem;
        height: .26rem;
        float: left;
        background: url(../assets/blueamazing.png) no-repeat 50% 50%;
        background-size: 100%;
    }
    div {
        float: right;
        font-size: .26rem;
        color: #aaaaaa;
        width: 6.3rem;
    }
}

.validate {
    width: 5.16rem;
    height: .64rem;
    background: url('../assets/validate-3.png') no-repeat 50% 50%;
    margin: 0 auto .45rem auto;
    background-size: 100%;
}

.line {
    text-align: right;
    font-size: 0;
    background: #fff;
    div {
        display: inline-block;
        width: 7.2rem;
        border-top: 1px solid #d9d9d9;
    }
}

.bank-mgtop {
    margin-top: 7.3rem !important;
}

.bank-card-list {
    font-size: 0;
    text-align: center;
    padding-top: .2rem;
    .one-card {
        display: inline-block;
        width: 6.9rem;
        height: 3rem;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        .card-top {
            background: #44b2f7;
            position: absolute;
            top: 0;
            width: 100%;
            padding: .1rem .28rem;
            .bank-icon {
                /* background: url(../assets/bank-icon.png) no-repeat 50% 50%;
                background-size: 100%;*/
                display: inline-block;
                width: .51rem;
                height: .5rem;
                float: left;
            }
            .bank-name {
                font-size: .3rem;
                color: #fff;
                float: left;
                position: relative;
                left: .2rem;
                top: .1rem;
            }
            .bank-tips {
                float: right;
                font-size: .2rem;
                color: #fff;
                position: relative;
                top: .14rem;
                padding: 0;
            }
        }
        .card-middle {
            .bankcard-num {
                padding-top: 1.2rem;
                padding-bottom: .16rem;
                font-size: .4rem;
                color: #ed7a00;
            }
            .bankday {
                color: #999999;
                font-size: .22rem;
            }
        }
        .card-bottom {
            padding: .2rem .25rem;
            background: #f8f8f8;
            position: absolute;
            bottom: 0;
            width: 100%;
            .card-bottom-left {
                font-size: .22rem;
                color: #666666;
                float: left;
            }
            .card-bottom-right {
                font-size: .24rem;
                color: #666666;
                float: right;
            }
        }
    }
}

.bank-glass {
    text-align: center;
    font-size: 0;
    .addbank {
        text-align: center;
        height: 3rem;
        background: #fff;
        width: 6.9rem;
        display: inline-block;
        line-height: 3rem;
        i {
            display: inline-block;
            width: .36rem;
            height: .36rem;
            background: url(../assets/add.png) no-repeat 50% 50%;
            background-size: 100%;
            vertical-align: middle;
            margin-right: .14rem;
        }
        span {
            color: #797979;
            font-size: .32rem;
            vertical-align: middle;
        }
    }
}

#cityChange {
    color: #999;
}

.bank-type-input {
    font-size: 0;
    position: relative;
    height: .88rem;
    background: #fff;
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
        /*font-weight: bold;*/
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
        padding: 0 1.23rem 0 2.1rem;
        line-height: .88rem;
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
}

.bank-nextpart {
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

.bank-blueBTN {
    background: #44b2f7 !important;
}

.bank-ask {
    margin-top: 4.68rem;
    text-align: center;
    color: #888888;
    font-size: .24rem;
}

.city_city {
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    .city-bank-name {
        margin-left: .3rem;
        border-bottom: 1px solid #dcdcdc;
        font-size: .4rem;
        padding: .2rem 0;
    }
}

.city_word {
    font-size: .26rem;
    color: #666666;
    background: #f1f1f1;
    >span {
        display: inline-block;
        padding: .15rem .3rem;
    }
    div {
        background: #fff;
        span {
            padding: .3rem;
            display: block;
            margin-left: .3rem;
            height: 100%;
            border-bottom: 1px solid #d9d9d9;
        }
    }
    div:last-child {
        span {
            border-bottom: none;
        }
    }
}

.bankOutGlass {
    position: relative;
    height: 100%;
    padding-top: .45rem;
}

.city_fixed {
    position: fixed;
    right: 0;
    z-index: 12;
    top: 0;
    font-size: 0;
    height: 100%;
    div {
        font-size: .28rem;
        color: #44b2f7;
        padding: .2rem .15rem 0 .15rem;
        text-align: center;
        height: 100/26%;
    }
}

.bank-mg20 {
    margin-top: .2rem;
}
</style>
