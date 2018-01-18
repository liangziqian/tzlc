<template>
    <div>
        <!-- <div v-title>活动中心</div> -->
        <div v-for='a in active' class='active mg20' @click='bannerlink(a.id,a.url)'>
            <div class='wmask' @click='showToast' v-show='a.status!=1'></div>
            <a>
                <img :src="a.picture" alt="">
            </a>
            <span v-if='a.status==1'>进行中</span>
            <span v-else class='grey'>已结束</span>
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
    margin-top: .2rem;
}

.active {
    display: block;
    width: 6.9rem;
    height: 3.68rem;
    font-size: 0;
    margin: 0 auto;
    position: relative;
    img {
        width: 6.9rem;
        height: 3.68rem;
    }
    span {
        font-size: .26rem;
        display: inline-block;
        position: absolute;
        right: 0;
        top: .18rem;
        background: #78cc00;
        color: #fff;
        width: 1rem;
        height: .4rem;
        line-height: .4rem;
        text-align: center;
        border-top-left-radius: 40px;
        border-bottom-left-radius: 40px;
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
    .grey {
        background: #999999 !important;
    }
}
</style>
