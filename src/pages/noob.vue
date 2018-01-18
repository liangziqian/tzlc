<template>
    <div>
        <!-- <div v-title>新手乐园</div> -->
        <div class='noob'>
            <span @click='tologin'>立即注册</span>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        tologin: function() {
            this.$router.push('/login')
        }
    },
    created: function() {
        this.channel = sessionStorage.setItem('channel', this.$route.query.channel)
    }
}
</script>
<style lang='less' scoped>
.noob {
    height: 16.14rem;
    background: url('../assets/noobdetail.png') no-repeat 50% 50%;
    background-size: 100%;
    position: relative;
    span {
        position: absolute;
        display: inline-block;
        width: 6.76rem;
        height: 1.02rem;
        background: url('../assets/registryBTN.png') no-repeat 50% 50%;
        left: .37rem;
        top: 8.25rem;
        text-align: center;
        font-size: .34rem;
        line-height: 1.02rem;
        color: #af6200;
    }
}
</style>
