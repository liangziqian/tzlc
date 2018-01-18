<template>
    <div>
        <!-- <div v-title>提现</div> -->
        <!--    <div class='chargeGlass cf mg20'>
            <span class='chargeGlass-1'>银行卡</span>
            <div class='chargeGlass-5'>{{backname}}<span>(尾号{{endnum}})</span></div>
        </div> -->
        <div class='bank-type-input mg20' @click='showCity'>
            <span class='input-title'>银行卡</span>
            <span class='sp-input' :class='[fs3]'>{{backname}}<span>(尾号{{endnum}})</span></span>
            <!--    <i></i>
            <input type="hidden" v-model.trim='cityId'> -->
        </div>
        <div class='line'>
            <div></div>
        </div>
        <div class='bank-type-input' @click='showCity'>
            <span class='input-title'>开户城市</span>
            <span class='sp-input' :class='[fs3]' id='cityChange'>{{cityContext}}</span>
            <i></i>
            <input type="hidden" v-model.trim='cityId'>
        </div>
        <div class='bank-type-input mg20'>
            <span class='input-title'>金额(元)</span>
            <!--             <span class='sp-input' :class='[fs3]'>{{cityContext}}</span> -->
            <input class='sp-input' type="text" placeholder="请输入金额" v-model.trim='moneyval'>
            <span class='allget' @click='allget'>全部提现</span>
        </div>
        <!--       <div class='chargeInput mg20'>
            <span>金额(元)</span>
            <input type="text" placeholder="请输入金额" v-model.trim='moneyval'>
            <span class='chargeInput-2' @click='allget'>全部提现</span>
        </div> -->
        <div class='line'>
            <div></div>
        </div>
        <div class='bank-type-input' style='height:1.76rem;'>
            <span class='input-title'>手续费(元)</span>
            <!--             <span class='sp-input' :class='[fs3]'>{{cityContext}}</span> -->
            <span class='sp-input' :class='[fs3]' style='padding-right:0;'>
                <div style='border-bottom:1px solid #dcdcdc;'>
                    <span class='nofont' v-if='count>0'>2.00</span>
            <span class='yesfont' v-if='count>0'>0.00</span>
            <span class='yesfont' v-if='count==0'>2.00</span>
        </div>
        <div class='havecount'>本月可免2次，剩余{{count}}次</div>
        </span>
    </div>
    <div class='line'>
        <div></div>
    </div>
    <div class='withdrawTotal'>
        账户余额(元)：<span>{{withdrawTotal}}</span>
    </div>
    <div class='subBTN'>
        <button type='button' :class='[colorBTN ? "blueBTN" : ""]' @click='tosub'>确定</button>
    </div>
    <div class='mask' v-show='inputflag'></div>
    <div class='dealPasswordInput' v-show='inputflag' @click='showdealpassword'>
        <div class='dealpasswordCloseAndTitle'>
            <i @click='dealpasswordClose'></i>
            <span>请输入交易密码</span>
        </div>
        <div class='inputflag cf'>
            <input type="password" maxlength="6" id='forinput' v-model.trim='inputval'>
            <div><span v-show='lengthwatcher > 0'></span></div>
            <div><span v-show='lengthwatcher > 1'></span></div>
            <div><span v-show='lengthwatcher > 2'></span></div>
            <div><span v-show='lengthwatcher > 3'></span></div>
            <div><span v-show='lengthwatcher > 4'></span></div>
            <div><span v-show='lengthwatcher > 5'></span></div>
        </div>
        <div class='forget' @click='todealpassword'>忘记密码?</div>
    </div>
    <div class='city_city' v-show='cityFlag'>
        <div class='city_word'>
            <span>A</span>
        </div>
        <div class='city_word'>
            <span>B</span>
        </div>
        <div class='city_word'>
            <span>C</span>
        </div>
        <div class='city_word'>
            <span>D</span>
        </div>
        <div class='city_word'>
            <span>E</span>
        </div>
        <div class='city_word'>
            <span>F</span>
        </div>
        <div class='city_word'>
            <span>G</span>
        </div>
        <div class='city_word'>
            <span>H</span>
        </div>
        <div class='city_word'>
            <span>I</span>
        </div>
        <div class='city_word'>
            <span>J</span>
        </div>
        <div class='city_word'>
            <span>K</span>
        </div>
        <div class='city_word'>
            <span>L</span>
        </div>
        <div class='city_word'>
            <span>M</span>
        </div>
        <div class='city_word'>
            <span>N</span>
        </div>
        <div class='city_word'>
            <span>O</span>
        </div>
        <div class='city_word'>
            <span>P</span>
        </div>
        <div class='city_word'>
            <span>Q</span>
        </div>
        <div class='city_word'>
            <span>R</span>
        </div>
        <div class='city_word'>
            <span>S</span>
        </div>
        <div class='city_word'>
            <span>T</span>
        </div>
        <div class='city_word'>
            <span>U</span>
        </div>
        <div class='city_word'>
            <span>V</span>
        </div>
        <div class='city_word'>
            <span>W</span>
        </div>
        <div class='city_word'>
            <span>X</span>
        </div>
        <div class='city_word'>
            <span>Y</span>
        </div>
        <div class='city_word'>
            <span>Z</span>
        </div>
        <div class='city_fixed'>
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>D</div>
            <div>E</div>
            <div>F</div>
            <div>G</div>
            <div>H</div>
            <div>I</div>
            <div>J</div>
            <div>K</div>
            <div>L</div>
            <div>M</div>
            <div>N</div>
            <div>O</div>
            <div>P</div>
            <div>Q</div>
            <div>R</div>
            <div>S</div>
            <div>T</div>
            <div>U</div>
            <div>V</div>
            <div>W</div>
            <div>X</div>
            <div>Y</div>
            <div>Z</div>
        </div>
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
            realname: '',
            backname: '',
            endnum: '',
            singleAmount: '',
            dailyAmont: '',
            radioStyleFlag: true,
            moneyval: '',
            colorBTN: false,
            inputflag: false,
            inputval: '',
            lengthwatcher: 0,
            withdrawTotal: '',
            cityId: 0,
            cityContext: '选择开户所在地级市',
            cityFlag: false,
            count: -1,
            clickflag: false
        }
    },
    watch: {
        moneyval: function() {
            if (this.moneyval > 0 && this.radioStyleFlag && this.cityId > 0) {
                this.colorBTN = true
            } else {
                this.colorBTN = false
            }
        },
        radioStyleFlag: function() {
            if (this.moneyval > 0 && this.radioStyleFlag && this.cityId > 0) {
                this.colorBTN = true
            } else {
                this.colorBTN = false
            }
        },
        cityId: function() {
            if (this.moneyval > 0 && this.radioStyleFlag && this.cityId > 0) {
                this.colorBTN = true
            } else {
                this.colorBTN = false
            }
        },
        inputval: function() {
            let $this = this
            if (this.inputval.length == 6) {
                $.post(ROOT + '/wap/myhome/withdraws.html', {
                    city_id: $this.cityId,
                    money: parseFloat($this.moneyval),
                    pay_password: $this.inputval
                }, function(response) {
                    if (response.code == 0) {
                        $this.$router.push({
                            path: '/success',
                            query: {
                                type: 8,
                                money: $this.moneyval,
                                count: $this.count
                            }
                        })
                    } else {
                        Toast(response.msg)
                    }
                })
            }
            this.lengthwatcher = this.inputval.length
        }
    },
    methods: {
        showCity: function() {
            if (this.clickflag) return false
            this.cityFlag = !this.cityFlag
        },
        tosub: function() {
            let $this = this
            if (!this.colorBTN) return false
            this.inputflag = true
            this.$nextTick(function() {
                $('#forinput').focus()
            })
        },
        allget: function() {
            this.moneyval = this.withdrawTotal
        },
        radioChange: function() {
            this.radioStyleFlag = this.radioStyleFlag === true ? false : true
        },
        dealpasswordClose: function() {
            this.inputflag = !this.inputflag
            this.inputval = ''
        },
        showdealpassword: function() {
            $('#forinput').focus()
        },
        todealpassword: function() {
            this.$router.push({
                path: '/dealpassword',
                query: {
                    type: 0
                }
            })
        }
    },
    mounted: function() {
        let $this = this
        this.$nextTick(function() {
            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                $('#forinput').css('font-size', 0)
            }
        })

        // 提现准备

        $.post(ROOT + '/wap/myhome/prep_withdraws.html', {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1
        }, function(response) {
            if (response.code == 0) {
                $this.backname = response.data.bank_name
                $this.endnum = response.data.last_no
                $this.withdrawTotal = response.data.money_usable
                $this.count = response.data.count
                if (response.data.status == 1) {
                    $this.clickflag = true
                    $this.cityContext = response.data.city_name
                    $this.cityId = response.data.city_id
                }
            }
        })
        let word = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        let wordIndex = 0
        let appendIndex = 0
        $.post(ROOT + '/wap/myhome/city_list.html', function(response) {
            if (response.code == 0) {
                for (let i = 0; i < response.data.city_list.length; i++) {
                    if (response.data.city_list[i].pinyin == word[wordIndex]) {
                        $('.city_word:eq(' + appendIndex + ')').append('<div data-cityid=' + response.data.city_list[i].cityId + '><span>' + response.data.city_list[i].cityName + '</span></div>')
                    } else {
                        wordIndex++
                        appendIndex++
                    }
                }
                $('.city_word div').on('click', function() {
                    $this.cityFlag = false
                    $this.cityContext = $(this).children().text()
                    $this.cityId = $(this).data('cityid')
                })
                $('.city_fixed div').on('click', function() {
                    let $text = $(this).text()
                    $('.city_word span').each(function() {
                        if ($(this).text() == $text) {
                            if ($('html,body').is(':animated')) return false
                            $('html,body').animate({
                                'scrollTop': $(this).parent().position().top + 'px'
                            }, 1000)
                        }
                    })
                })
            }
        })
    }
}
</script>
<style lang='less' scoped>
.mg20 {
    margin-top: .2rem;
}

.withdrawTotal {
    font-size: .26rem;
    color: #999;
    background: #fff;
    padding: .18rem .3rem;
    span {
        font-size: .28rem;
        color: #ed7a00;
    }
}

.mask {
    background: RGBA(0, 0, 0, .6);
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
}

.dealPasswordInput {
    font-size: 0;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    z-index: 6;
    background: #fff;
    padding-bottom: 1.14rem;
    .dealpasswordCloseAndTitle {
        text-align: left;
        border-bottom: 1px solid #d9d9d9;
        padding: .38rem;
        margin-bottom: 1.14rem;
        i {
            display: inline-block;
            background: url('../assets/dealpasswordClose.png') no-repeat 50% 50%;
            width: .48rem;
            background-size: 100%;
            height: .46rem;
            vertical-align: middle;
        }
        span {
            color: #333333;
            font-size: .38rem;
            vertical-align: middle;
            padding-left: 1.58rem;
        }
    }
    .inputflag {
        position: relative;
        overflow: hidden;
        display: inline-block;
        width: 6.9rem;
        height: 1.17rem;
        border: 2px solid #aaaaaa;
        border-radius: 10px;
        #forinput {
            height: 50%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        div {
            float: left;
            display: inline-block;
            width: 16.6%;
            height: 100%;
            background-color: #Fff;
            border-right: 1px solid #eaeaea;
            position: relative;
            span {
                display: inline-block;
                background: url(../assets/point.png) no-repeat 50% 50%;
                background-size: 75%;
                width: .3rem;
                height: .3rem;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
        div:last-child {
            border: none;
        }
    }
    .forget {
        font-size: .26rem;
        float: right;
        position: relative;
        top: .3rem;
        right: .3rem;
        color: #ed7900;
    }
}

.chargeInput-2 {
    /*float: right;*/
    color: #44b2f7 !important;
    font-size: .28rem;
    /*    position: relative;
    top: .05rem;*/
}

.chargeTips {
    color: #8a8a8a;
    padding: .15rem 0 .15rem .3rem;
    font-size: .26rem;
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

.subBTN {
    padding: .5rem 0 .4rem 0;
    font-size: 0;
    height: auto;
    text-align: center;
    button {
        background: #9ed5f8;
        color: #fff;
        font-size: .28rem;
        border-radius: 40px;
        height: .8rem;
        width: 6.9rem;
    }
}

.blueBTN {
    background: #44b2f7 !important;
}

.form-radio {
    font-size: 0;
    i {
        display: inline-block;
        width: .32rem;
        height: .32rem;
        vertical-align: middle;
        margin: 0 .16rem 0 .3rem;
    }
    .radioerror {
        background: url(../assets/radio.png) no-repeat 50% 50%;
        background-size: 100%;
    }
    .radioright {
        background: url(../assets/radio-right.png) no-repeat 50% 50%;
        background-size: 100%;
    }
    >span {
        font-size: .28rem;
        /*font-weight: bold;*/
        vertical-align: middle;
        >span {
            color: #ed7900;
        }
    }
}

.chargeInput {
    font-size: 0;
    padding: .3rem;
    background: #fff;
    position: relative;
    span {
        color: #666666;
        font-size: .28rem;
        vertical-align: middle;
        display: inline-block;
    }
    input {
        margin-left: .7rem;
        font-size: .3rem;
        width: 4rem;
        vertical-align: middle;
    }
}

.chargeGlass {
    background: #fff;
    padding: .3rem .3rem .3rem .3rem;
    font-size: 0;
    .chargeGlass-1 {
        font-size: .28rem;
        color: #666;
        vertical-align: middle;
        display: inline-block;
        width: 1rem;
    }
    .chargeGlass-2 {
        margin-left: .9rem;
        font-size: .3rem;
        color: #333;
        vertical-align: middle;
    }
    .chargeGlass-3 {
        font-size: .2rem;
        color: #fff;
        background: #ed7a00;
        text-align: center;
        float: right;
        width: .78rem;
        height: .28rem;
        line-height: 1.5;
    }
    .chargeGlass-4 {
        display: inline-block;
        margin-left: .65rem;
        vertical-align: middle;
        i {
            display: inline-block;
            width: .51rem;
            height: .5rem;
            background: url('../assets/bank-icon.png') no-repeat 50% 50%;
            background-size: 100%;
            float: left;
            position: relative;
            top: .1rem;
            right: .1rem;
        }
    }
    .chargeGlass-5 {
        font-size: .3rem;
        color: #666666;
        display: inline-block;
        vertical-align: middle;
        margin-left: .7rem;
        span {
            margin-left: .2rem;
            font-size: .24rem;
        }
    }
    .chargeGlass-7 {
        float: right;
        .chargeGlass-6 {
            font-size: .24rem;
            color: #afafaf;
        }
    }
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
        color: #44b2f7 !important;
        font-size: .28rem;
        display: inline-block;
        width: 2rem;
        height: .88rem;
        line-height: .88rem;
        padding: 0 0 0 .3rem;
        /*        color: #555;*/
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
        font-weight: normal;
    }
}
</style>
