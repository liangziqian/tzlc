<template>
  <div class='fuli'>
    <!--<div class='space'>我的福利</div>-->
    <div class='subbar'>
      <div class='subbar-item' @click='active' :class='{fontblue:this.$route.query.type1==1}'>活动</div>|
      <div class='subbar-item' @click='hongbao1' :class='{fontblue:this.$route.query.type1==2}'>红包 </div>|
      <div class='subbar-item' @click='jiaxi' :class='{fontblue:this.$route.query.type1==3}'>加息卷</div>
      <!--<div class='subbar-item' @click='licai' :class='{fontblue:this.$route.query.type1==4}'>理财金</div>-->
    </div>
    <div class='space1'></div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class='space3'></div>
  </div>
</template>
<script>
  import {
    Toast
  } from 'mint-ui'
  export default {
    methods: {
      active: function() {
        this.$router.push({
          path: '/index/fuli/active',
          query: {
            type1: 1,
            type:3
          }
        })
      },
      hongbao1: function() {
        if (!sessionStorage.getItem('isLogin')) {
          Toast('请先登录')
          return false
        }
        this.$router.push({
          path: '/index/fuli/hongbao1',
          query: {
            type1: 2,
            type:3
          }
        })
      },
      jiaxi: function() {
        if (!sessionStorage.getItem('isLogin')) {
          Toast('请先登录')
          return false
        }
        this.$router.push({
          path: '/index/fuli/jiaxi',
          query: {
            type1: 3,
            type:3
          }
        })
      },
//      licai: function() {
//        this.$router.push({
//          path: '/index/fuli/licai',
//          query: {
//            type1: 4,
//            type:3
//          }
//        })
//      },
    },
    mounted: function() {
      this.$nextTick(function() {
        if (!this.$route.query.type1) {
          this.active1()
        }
      })
    }
  }
</script>
<style lang='less' scoped>
  .space1{
    height: 1rem;
  }
  .space3{
    height: 1rem;
  }
  .space {
    height: 1rem;
    width: 100%;
    font-size: .36rem;
    text-align: center;
    line-height: 1rem;
    background-color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
  }
  .fuli {
    height: 100%;
  }
  .subbar{
    font-size: .3rem;
    height: 1rem;
    width: 100%;
    line-height: .3rem;
    background: #fff;
    color:#e6e6e6;
    border-top: 1px solid #e6e6e6;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    .subbar-item {
      width: 31%;
      line-height: 1rem;
      display: inline-block;
      font-size: .3rem;
      text-align: center;
      color:#4b4b4b;
    }
    .fontblue{
      color:#f76568
    }
  }
</style>
