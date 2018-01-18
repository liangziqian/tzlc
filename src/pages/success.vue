<template>
    <div class='bg'>
        <div class='successGlass' :style='{top:this.$route.query.type==7||this.$route.query.type==8?"40%":""}'>
            <div class='landBG'>
            </div>
            <div class='landFont'>{{successText}}</div>
            <button type='button' @click='enterGo' v-show='this.$route.query.type!=7&&this.$route.query.type!=8'>确定</button>
        </div>
        <div class='successList' v-show='this.$route.query.type==7'>
            <div class='cf'>
                <span>项目名称</span>
                <span>{{borrowname}}</span>
            </div>
            <div class='cf'>
                <span>投资金额</span>
                <span>{{toubiao}}元</span>
            </div>
            <div class='cf'>
                <span>预期收益</span>
                <span style='color:#ed7a00'>{{interest}}元</span>
            </div>
        </div>
        <div class='successList' v-show='this.$route.query.type==8'>
            <div class='cf'>
                <span>申请提现(元)</span>
                <span>{{withdraw}}</span>
            </div>
            <div class='cf'>
                <span>手续费(元)</span>
                <span v-if='count>0'><span>2.00</span>(免手续费)</span>
                <span v-else>2.00</span>
            </div>
            <div class='cf'>
                <span>实际到账(元)</span>
                <span style='color:#ed7a00'>{{count>0?withdraw:withdraw-2}}</span>
            </div>
            <div class='cf'>
                <span>预计到账</span>
                <span>1-3个工作日</span>
            </div>
        </div>
        <div class='toubiaobtn' v-show='this.$route.query.type==7'>
            <span @click='goAccount'>
                查看账户
            </span>
            <span @click='goBiao'>
                继续投资
            </span>
        </div>
        <div class='withdrawbtn' @click='goAccount' v-show='this.$route.query.type==8'>
            查看账户
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            successText: '',
            withdraw: this.$route.query.money,
            count: this.$route.query.count,
            borrowname: this.$route.query.borrowname,
            toubiao: this.$route.query.money,
            interest: this.$route.query.interest
        }
    },
    methods: {
        enterGo: function() {
            if (sessionStorage.getItem('borrowIndex')) {
                this.$router.push({
                    path: '/detail/' + sessionStorage.getItem('borrowIndex')
                })
            } else {
                this.$router.push({
                    path: '/index/person',
                    query: {
                        type: 3
                    }
                })
            }
        },
        goAccount: function() {
            this.$router.push({
                path: '/index/person',
                query: {
                    type: 3
                }
            })
        },
        goBiao: function() {
            this.$router.push({
                path: '/index/money',
                query: {
                    type: 2
                }
            })
        }
    },
    mounted: function() {
        let type = this.$route.query.type
        if (type == 1) {
            this.successText = '恭喜您，交易密码设置成功'
        } else if (type == 2) {
            this.successText = '恭喜您，实名认证成功'
        } else if (type == 3) {
            this.successText = '恭喜您，验证成功'
        } else if (type == 4) {
            this.successText = '恭喜您，登录密码成功'
        } else if (type == 5) {
            this.successText = '恭喜您，昵称修改成功'
        } else if (type == 6) {
            this.successText = '恭喜您，充值成功'
        } else if (type == 7) {
            this.successText = '投资成功'
        } else if (type == 8) {
            this.successText = '提现申请已提交，等待银行处理'
        }
    }
}
</script>
<style lang='less' scoped>
.toubiaobtn {
    font-size: 0;
    border-top: 1px solid #cfcfcf;
    position: absolute;
    bottom: 0;
    width: 100%;
    span {
        display: inline-block;
        width: 50%;
        height: 1rem;
        line-height: 1rem;
        font-size: .32rem;
        color: #44b2f7;
        text-align: center;
    }
    span:nth-of-type(1) {
        border-right: 1px solid #cfcfcf;
    }
}

.successList {
    color: #7d8c92;
    font-size: .28rem;
    position: absolute;
    top: 6.5rem;
    width: 100%;
    div {
        margin-left: .3rem;
        padding: .3rem .3rem .3rem 0;
        border-bottom: 1px solid #d9d9d9;
        >span:nth-of-type(1) {
            float: left;
        }
        >span:nth-of-type(2) {
            float: right;
            span {
                text-decoration: line-through;
            }
        }
    }
}

.withdrawbtn {
    height: 1rem;
    line-height: 1rem;
    font-size: .32rem;
    color: #44b2f7;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #cfcfcf;
}

.bg {
    height: 100%;
    background: #fff;
}

.successGlass {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -80%);
    text-align: center;
    .landBG {
        background: url(../assets/island.png) no-repeat 50% 50%;
        height: 3.76rem;
        width: 5rem;
        background-size: 100%;
        display: inline-block;
    }
    .landFont {
        color: #ed7a00;
        font-size: .34rem;
        text-align: center;
        padding: .15rem 0 .7rem 0;
    }
    button {
        background: #44b2f7;
        color: #fff;
        font-size: .28rem;
        border-radius: 40px;
        height: .8rem;
        width: 6.9rem;
    }
}
</style>
