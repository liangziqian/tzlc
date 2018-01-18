<template>
    <div class='turn'>
        <!-- <div v-title>大转盘</div> -->
        <div class='turntableBG'>
            <div class='turn-bg'>
                <div class='points' @click='clickPoint'></div>
                <div class='turn-in'>
                    <div class='lottery-item' v-for='p in productList' :data-productid='p.id'>
                        <div class='item-name'>{{p.awardName}}</div>
                        <img :src="p.awardImage" alt="">
                    </div>
                </div>
            </div>
            <div class='turnsCounts'>剩余抽奖次数<span>{{turnsCounts}}</span>次</div>
            <div class='beach'></div>
            <ul class='winner-list'>
                <li class='cf' v-for='w in winnerlist'>
                    <span>{{w.mobile}}</span>
                    <span>{{w.awardName}}</span>
                </li>
            </ul>
        </div>
        <div class='active-introduce'>
            <div class='title'>活动介绍</div>
            <div class='content' v-html='turnsTableContent'></div>
        </div>
    </div>
</template>
<script>
import {
    Toast
} from 'mint-ui'
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
import arctext from '../config/jquery.arctext.js'
window.turnTableComputedFlag = true

function turnTableAnimate() {
    if (!window.turnTableComputedFlag) return false
    window.turnTableComputedFlag = false
    setInterval(function() {
        let animateUl = $('.winner-list')
        if ($('.winner-list li').length <= 6) return false
        let firstLi = $('.winner-list li:eq(0)')
        let firstLiWidth = $('.winner-list li:eq(0)').outerWidth(true) / 750
        firstLi.animate({
            marginTop: -firstLiWidth + 'rem'
        }, 1000, function() {
            firstLi.appendTo(animateUl).css({
                marginTop: 0
            })
        })
    }, 1000)
}

export default {
    data: function() {
        return {
            winnerlist: [],
            productList: [],
            turnsTableId: -1,
            turnsTableContent: '',
            turnsRotate: 1800,
            turnsflag: true,
            turnsCounts: 0,
            jsessionid: ''
        }
    },
    methods: {
        clickPoint: function() {
            if (!this.turnsflag) return false
            let $this = this
            let data = {}
            $this.turnsflag = false
            if (this.jsessionid && this.jsessionid.length > 0) {
                data = {
                    productId: 1,
                    JSESSIONID: this.jsessionid
                }
            } else {
                data = {
                    productId: 1
                }
            }
            
            $.post(ROOT + '/activity/acticleDraw.html', data, function(response) {
                
                if (response.code == 0) {
                
                   if ($this.turnsCounts == 0) {
                        Toast('您的剩余抽奖次数不足')
                        $this.turnsflag = true
                        return false
                    }
                    
                	//$this.getCounts()
                    let turnsIndex
                    $('.lottery-item').each(function(index) {
                        if ($(this).data('productid') == response.data.id) {
                            turnsIndex = index
                        }
                    })
                    $('.turn-in').css('transform', 'rotate(' + ($this.turnsRotate + (360 - 20 - 40 * turnsIndex)) + 'deg)')
                    $this.turnsRotate += 1800
                    setTimeout(function() {
                        $this.turnsflag = true
                        Toast(response.data.awardName)
                    }, 5500)
                     //重新计算次数
                  $this.getCounts()
                }else if(response.code == -2){
                     Toast('活动还没有开始哦！')
                     $this.turnsflag = true
                     return false;
                } else {
                    Toast('请先登录')
                    $this.$router.push('/login')
                }
            })
           
            //重新查看中奖名单
            $.post(ROOT + '/activity/logs.html', {
                productId: 1
            }, function(response) {
                if (response.code == 0) {
                    $this.winnerlist = response.data
                    $this.$nextTick(function() {
                        turnTableAnimate()
                    })
                }
            })
        },
        getCounts: function() {
            let $this = this
            let data = {}
            if (this.jsessionid && this.jsessionid.length > 0) {
                data = {
                    productId: 1,
                    JSESSIONID: this.jsessionid
                }
            } else {
                data = {
                    productId: 1
                }
            }
            $.post(ROOT + '/activity/draw_count.html', data, function(response) {
                if (response.code == 0) {
                    $this.turnsCounts = response.data
                }else{
                    Toast('请先登录')
                    $this.$router.push('/login')
                }
            })
        }
    },
    mounted: function() {
        let $this = this
        this.jsessionid = this.$route.query.jsessionid
      
        this.$nextTick(function() {

            // 中奖名单

            $.post(ROOT + '/activity/logs.html', {
                productId: 1
            }, function(response) {
                if (response.code == 0) {
                    $this.winnerlist = response.data
                    $this.$nextTick(function() {
                        turnTableAnimate()
                    })
                }
            })

            // 抽奖次数

            $this.getCounts()

            // 转盘信息

            $.post(ROOT + '/activity/list.html', {
                productId: 1
            }, function(response) {
                if (response.code == 0) {
                    $this.turnsTableId = response.data.id
                    $this.turnsTableContent = response.data.introduce
                }
            })

            // 转盘商品

            $.post(ROOT + '/activity/acticleList.html', {
                productId: 1
            }, function(response) {
                if (response.code == 0) {
                    $this.productList = response.data
                    $this.$nextTick(function() {
                        arctext($)
                        $('.item-name').arctext({
                            radius: $('.turn-in').width() / 2 - 10
                        })
                        for (var i = 0; i < 9; i++) {
                            var rotate = 20 + 40 * i
                            var x = 2 + (2 - 1) * Math.sin(rotate / 180 * Math.PI) - 1;
                            var y = 2 - (2 - 1) * Math.cos(rotate / 180 * Math.PI) - 1;
                            $('.lottery-item').eq(i).css({
                                'left': x + 'rem',
                                'top': y + 'rem',
                                'transform': 'rotate(' + rotate + 'deg)',
                                '-webkit-transform': 'rotate(' + rotate + 'deg)'
                            })
                        }
                    })
                }
            })
        })
    }
}
</script>
<style lang='less' scoped>
.turn {
    background: #85dbf4;
}

.turnsCounts {
    font-size: .28rem;
    color: #fff;
    position: absolute;
    top: 2.5rem;
    left: 3.5rem;
    span {
        font-size: .32rem;
        color: #f54646;
        padding: 0 .1rem;
    }
}

.turn-bg {
    display: inline-block;
    position: absolute;
    height: 5.47rem;
    width: 4.87rem;
    background: url('../assets/turn.png') no-repeat 50% 50%;
    background-size: 100%;
    z-index: 1;
    top: 3.14rem;
    right: .53rem;
    .points {
        background: url('../assets/turn-btn.png') no-repeat 50% 50%;
        background-size: 100%;
        position: absolute;
        width: 1.63rem;
        height: 1.8rem;
        z-index: 3;
        top: 1.8rem;
        left: 1.57rem;
    }
    .turn-in {
        position: absolute;
        width: 3.99rem;
        height: 3.98rem;
        background: url('../assets/turn-in.png') no-repeat 50% 50%;
        background-size: 100%;
        top: .81rem;
        left: .38rem;
        z-index: 2;
        transition: transform 5s ease-out;
        font-size: 0;
        .lottery-item {
            text-align: center;
            position: absolute;
            width: 2rem;
            height: 2rem;
            .item-name {
                color: #fff;
                font-size: 0.32rem;
                white-space: nowrap;
                text-align: center;
                transform: scale(0.6);
            }
            img {
                width: .65rem;
                height: .65rem;
                margin-top: .1rem;
            }
        }
    }
}

.winner-list {
    width: 6.7rem;
    height: 4.3rem;
    position: absolute;
    left: 50%;
    bottom: .9rem;
    margin-left: -3.35rem;
    padding: 0 .72rem;
    overflow: hidden;
    li {
        font-size: .28rem;
        color: #666666;
        padding-top: .5rem;
        span:nth-of-type(1) {
            float: left;
        }
        span:nth-of-type(2) {
            float: right;
        }
    }
}

.turntableBG {
    height: 17.37rem;
    position: relative;
    background: url('../assets/turntableBG.png') no-repeat 50% 50%;
    background-size: 100%;
    .beach {
        height: 2.9rem;
        width: 100%;
        background: url('../assets/beach.png') no-repeat 50% 50%;
        background-size: 100%;
        position: absolute;
        top: 7.27rem;
        z-index: 2;
    }
}

.active-introduce {
    width: 6.9rem;
    margin: 0 auto;
    padding: 0 .1rem;
    .title {
        width: 2.05rem;
        font-size: .36rem;
        color: #022a6b;
        padding-bottom: .15rem;
        border-bottom: 1px solid #022a6b;
    }
    .content {
        padding: .25rem 0 1.1rem 0;
        font-size: .26rem;
        color: #022a6b;
        line-height: 1.5;
    }
}
</style>
