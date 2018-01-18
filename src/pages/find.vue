<template>
    <div>
        <!--<div class="title">更多</div>-->
        <!--<div class="swiper-container" style='height: 1.6rem;'>-->
            <!--<div class="swiper-wrapper">-->
                <!--<div class="swiper-slide" v-for='b in banner'>-->
                    <!--<a :href="b.url">-->
                        <!--<img :src="b.picture">-->
                    <!--</a>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="swiper-pagination"></div>-->
        <!--</div>-->
        <div class='divwapper cf mg20' @click='toactive'>
            <i class='star'></i>
            <span>活动中心</span>
            <i></i>
            <span class='active'>点击查看最新活动</span>
        </div>
        <div class='line'>
            <div></div>
        </div>
        <div class='divwapper cf' @click='tofriend'>
            <i class='starY'></i>
            <span>推荐有礼</span>
            <i></i>
            <div class='invete'><span>推荐最高可享百万红包</span></div>
        </div>
        <div class='divwapper cf mg20' @click='tomsg'>
            <i class='session'></i>
            <span>消息中心</span>
            <i></i>
        </div>
        <div class='line'>
            <div></div>
        </div>
        <!--<div class='divwapper cf'>-->
          <!--<i class='gzh'></i>-->
          <!--<span>点击下载APP</span>-->
          <!--<i></i>-->
        <!--</div>-->
        <!--<div class='line'>-->
          <!--<div></div>-->
        <!--</div>-->
        <div class='divwapper cf' @click='toquestion'>
            <i class='QandA'></i>
            <span>常见问题</span>
            <i></i>
        </div>
        <div class='line'>
            <div></div>
        </div>
        <div class='divwapper cf' @click='toaboutus'>
            <i class='findfind'></i>
            <span>关于我们</span>
            <i></i>
        </div>
        <div class='divwapper cf mg20' @click='tosuggest'>
            <i class='pen'></i>
            <span>意见反馈</span>
            <i></i>
        </div>
        <div class='line'>
            <div></div>
        </div>
        <div class='divwapper cf'>
            <i class='version'></i>
            <span>当前版本</span>
            <span class='versionNum'>1.1.2</span>
        </div>
        <div class='divwapper cf mg20' @click='todial'>
          <i class='rexian'></i>
          <span>客服热线</span>
          <i></i>
          <span class='active' >400-107-9077（9:00-22:00）</span>
        </div>
    </div>
</template>
<script>
import {
    Toast
} from 'mint-ui'
import Swiper from '../config/swiper.min.js'
import '../config/swiper.min.css'
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
export default {
    data: function() {
        return {
            mySwiper: '',
            banner: [],
        }
    },
    methods: {
        toaboutus: function() {
            this.$router.push('/aboutus')
        },
        tofriend: function() {
            if (!sessionStorage.getItem('isLogin')) {
                Toast('请先登录')
                this.$router.push('/login')
                return false
            }
            this.$router.push({
                path: '/friend',
                query: {
                    m: sessionStorage.getItem('account')
                }
            })
        },
        tomsg: function() {
            if (!sessionStorage.getItem('isLogin')) {
                Toast('请先登录')
                this.$router.push('/login')
                return false
            }
            this.$router.push('/msg')
        },
        tosuggest: function() {
            this.$router.push('/suggest')
        },
        toquestion: function() {
            this.$router.push('/question')
        },
        toactive: function() {
            this.$router.push('/active')
        },
        todial:function(){
          window.location.href = 'tel:400-107-9077';
        }
    },
    mounted: function() {
        let $this = this
        this.$nextTick(function() {
            $this.mySwiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                observer: true,
                observeParents: true,
                autoplay: 5000,
                autoplayDisableOnInteraction: false
            })
        })

        $.post(ROOT + '/wap/banner_list.html', {
            id: 58
        }, function(response) {
            if (response.code == 0) {
                for (let i of response.data) {
                    $this.banner.push(i)
                }
            }
        })

    }
}
</script>
<style lang='less' scoped>
.swiper-slide {
    img {
        width: 100%;
        height: 1.6rem;
    }
}
.title{
  font-size: .32rem;
  padding: .2rem 0;
  color: #060606;
  text-align: center;
  background-color: #fff;
}
.contentus {
    margin-top: .25rem;
    line-height: 1.5;
    text-align: center;
    font-size: .27rem;
    color: #d0d4d5;
    span:nth-of-type(1) {
        color: #afafaf;
        font-size: .32rem;
    }
    span:nth-of-type(2) {
        color: #d2d6d7;
        font-size: .19rem;
    }
}

.line {
    text-align: right;
    font-size: 0;
    background: #fff;
    div {
        display: inline-block;
        width: 6.5rem;
        border-top: 1px solid #d9d9d9;
    }
}

.mg20 {
    margin-top: .2rem;
}
.tanchuang{
  position: fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background:rgba(0,0,0,.5) url("../assets/kefu.png") no-repeat center 30%;
  z-index: 11;
  .close{
    position: fixed;
    left:2rem;
    top:60%;
    background:url("../assets/close.png") no-repeat center top;
    width:1.03rem;
    padding-top:1.38rem;
    font-size:.3rem;
    color: #fff;
    text-align: center;
  }
  .dial{
    position: fixed;
    left:4.27rem;
    top:60%;
    background:url("../assets/dial.png") no-repeat center top;
    width:1.03rem;
    padding-top:1.38rem;
    font-size:.3rem;
    color: #fff;
    text-align: center;
  }
}
.divwapper {
    font-size: 0;
    background: #fff;
    padding: .32rem 0 .3rem 0;
    i:nth-of-type(1) {
        display: inline-block;
        width: .4rem;
        height: .43rem;
        margin-left: .2rem;
        margin-right: .27rem;
        float: left;
        position: relative;
        top: .02rem;
    }
    .invete {
        color: #a6a6a6;
        font-size: .24rem;
        float: right;
        margin-top: .08rem;
        >span {
            color: #a6a6a6;
        }
    }
    .star {
        background: url(../assets/star.png) no-repeat 50% 50%;
        background-size: 100%;
    }
    .starY {
        background: url(../assets/starY.png) no-repeat 50% 50%;
        background-size: 100%;
    }
    .pen {
        background: url(../assets/pen.png) no-repeat 50% 50%;
        background-size: 100%;
    }
    .gzh {
      background: url(../assets/gzh.png) no-repeat 50% 50%;
      background-size: 100%;
    }
    .session {
        background: url(../assets/session.png) no-repeat 50% 50%;
        background-size: 100%;
    }
    .QandA {
        background: url(../assets/QandA.png) no-repeat 50% 50%;
        background-size: 100%;
    }
    .findfind {
        background: url(../assets/findfind.png) no-repeat 50% 50%;
        background-size: 100%;
    }
    .version {
        background: url(../assets/version.png) no-repeat 50% 50%;
        background-size: 100%;
    }
    .rexian {
      background: url(../assets/rexian.png) no-repeat 50% 50%;
      background-size: 100%;
    }
    i:nth-of-type(2) {
        display: inline-block;
        width: .2rem;
        height: .43rem;
        float: right;
        background: url(../assets/blink.png) no-repeat 50% 50%;
        background-size: 100%;
        margin-right: .3rem;
        margin-left: .15rem;
    }
    >span:nth-of-type(1) {
        font-size: .3rem;
        color: #555555;
        float: left;
        margin-top: .08rem;
        margin-left: .1rem !important;
    }
    .active {
        font-size: .24rem;
        color: #a6a6a6;
        float: right;
        margin-top: .08rem;
    }
    .versionNum {
        float: right;
        font-size: .24rem;
        color: #acacac;
        margin-right: .3rem;
        margin-top: .08rem;
    }
}
</style>
