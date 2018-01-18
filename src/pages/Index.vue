<template>
    <div class='glass'>
        <router-view></router-view>
        <div class='space'></div>
        <div class='tabbar'>
            <div class='tabbar-item' @click='home'>
                <!--<div class='tabbar-img' v-if='this.$route.query.type==1'><img src="../assets/bluehome.png"></div>-->
                <!--<div class='tabbar-img' v-else><img src="../assets/home.png"></div>-->
                <div class='tabbar-img'><img src="../assets/znian_1.png"></div>
                <div class='tabbar-content' :class='{fontblue:this.$route.query.type==1}'>中青</div>
            </div>
            <div class='tabbar-item' @click='money'>
                <!--<div class='tabbar-img' v-if='this.$route.query.type==2'><img src="../assets/bluemoney.png"></div>-->
                <!--<div class='tabbar-img' v-else><img src="../assets/money.png"></div>-->
                <div class='tabbar-img'><img src="../assets/znian_2.png"></div>
                <div class='tabbar-content' :class='{fontblue:this.$route.query.type==2}'>理财</div>
            </div>
            <div class='tabbar-item' @click='fuli' style="margin-top: -1.1rem;" :class='{fontblue:this.$route.query.type==3}'>
              <img src="../assets/fuli.png">
            </div>
            <div class='tabbar-item' @click='person'>
                <!--<div class='tabbar-img' v-if='this.$route.query.type==4'><img src="../assets/blueperson.png"></div>-->
                <!--<div class='tabbar-img' v-else><img src="../assets/person.png"></div>-->
              <div class='tabbar-img'><img src="../assets/znian_3.png"></div>
                <div class='tabbar-content' :class='{fontblue:this.$route.query.type==4}'>账户</div>
            </div>
            <div class='tabbar-item' @click='find'>
                <!--<div class='tabbar-img' v-if='this.$route.query.type==5'><img src="../assets/bluefind.png"></div>-->
                <!--<div class='tabbar-img' v-else><img src="../assets/find.png"></div>-->
                <div class='tabbar-img'><img src="../assets/znian_4.png"></div>
                <div class='tabbar-content' :class='{fontblue:this.$route.query.type==5}'>更多</div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    Toast
} from 'mint-ui'
export default {
    methods: {
        home: function() {
            this.$router.push({
                path: '/index/home',
                query: {
                    type: 1
                }
            })
        },
        money: function() {
            this.$router.push({
                path: '/index/money',
                query: {
                    type: 2
                }
            })
        },
        fuli: function() {
          this.$router.push({
            path: '/index/fuli/active',
            query: {
              type: 3,
              type1:1
            }
          })
        },
        person: function() {
            this.$router.push({
                path: '/index/person',
                query: {
                    type: 4
                }
            })
        },
        find: function() {
            this.$router.push({
                path: '/index/find',
                query: {
                    type: 5
                }
            })
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            if (!this.$route.query.type) {
                this.home()
            }
        })
    }
}
</script>
<style lang='less' scoped>
.space {
    height: 1rem;
}

.glass {
    height: 100%;
}

.tabbar {
    font-size: 0;
    height: 1rem;
    background: #fff;
    border-top: 1px solid #cfcfcf;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 10;
    .tabbar-item {
        padding: .1rem 0 0 0;
        width: 20%;
        height: 100%;
        display: inline-block;
        font-size: .2rem;
        text-align: center;
        .tabbar-img {
            text-align: center;
            img {
                width: .55rem;
            }
        }
        .tabbar-content {
            text-align: center;
            color: #969696;
        }
        .fontblue {
            color: #d859dc !important;
            /*color: #44b2f7 !important;*/
        }
    }
}
</style>
