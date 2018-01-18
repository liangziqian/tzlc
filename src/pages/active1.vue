<template>
    <div>
        <!-- <div v-title>活动中心</div> -->
        <div v-for='a in active' class='active mg20' @click='bannerlink(a.id,a.url)'>
            <div class='wmask' @click='showToast' v-show='a.status!=1'></div>
            <a>
                <img :src="a.picture" alt="">
            </a>
            <div class="text">
                <h3 :class="a.status==1 ? '': 'grey'">注册即送888元现金礼包</h3>
                <p :class="a.status==1 ? '': 'grey'">2017.11.6-11.30 </p>
                <span v-if='a.status==1'>进行中...</span>
                <span v-else class='grey'>已下线...</span>
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
            active: []
        }
    },
    methods: {
        bannerlink: function(bannerid,bannerurl){
            if(bannerid==290){
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
            }else{
                if(bannerurl){
                    window.location.href = bannerurl;
                }
            }
        },
        showToast: function() {
            Toast('活动已经结束')
        }
    },
    mounted: function() {
        let $this = this
        $.post(ROOT + '/wap/activities.html', function(response) {
            if (response.code == 0) {
                for (let i of response.data) {
                    $this.active.push(i)
                }
            }
        })
    }
}
</script>
<style lang='less' scoped>
.mg20 {
    margin-bottom: .3rem !important;
    margin-top: 0 !important;
}

.active {
    display: block;
    width: 100%;
    height: 3.98rem;
    font-size: 0;
    margin: 0 auto;
    background-color: #fff;
    position: relative;
    img {
        width: 100%;
        height: 3rem;
    }
    .wmask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        opacity: .5;
    }
    .text{
      height:.98rem;
      position: relative;
      padding-left: .42rem;
      h3{
        padding-top: .1rem;
        font-size: .24rem;
        line-height: .41rem;
        height: .41rem;
      }
      p{
        font-size: .18rem;
        line-height: .37rem;
        height: .37rem;
      }
      span {
        font-size: .24rem;
        display: inline-block;
        position: absolute;
        right: .47rem;
        top: .1rem;
        color: #f76568;
        height: .41rem;
        line-height: .41rem;
        text-align: center;
      }
      .grey {
        color: #a6a6a6 !important;
      }
    }
}
</style>
