<template>
    <div>
        <!-- <div v-title>常见问题</div> -->
        <div class='warpper'>
            <div class='cf'>
                <router-link :to='{path:"/questiondetail"+47}'>
                    <span>安全问题</span>
                    <i></i>
                </router-link>
            </div>
            <div class='cf'>
                <router-link :to='{path:"/questiondetail"+48}'>
                    <span>注册问题</span>
                    <i></i>
                </router-link>
            </div>
            <div class='cf'>
                <router-link :to='{path:"/questiondetail"+49}'>
                    <span>充值问题</span>
                    <i></i>
                </router-link>
            </div>
            <div class='cf'>
                <router-link :to='{path:"/questiondetail"+50}'>
                    <span>提现问题</span>
                    <i></i>
                </router-link>
            </div>
            <div class='cf'>
                <router-link :to='{path:"/questiondetail"+51}'>
                    <span>赎回问题</span>
                    <i></i>
                </router-link>
            </div>
            <div class='cf'>
                <router-link :to='{path:"/questiondetail"+52}'>
                    <span>变更问题</span>
                    <i></i>
                </router-link>
            </div>
            <div class='cf'>
                <router-link :to='{path:"/questiondetail"+53}'>
                    <span>投标问题</span>
                    <i></i>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang='less' scoped>
.warpper {
    background: #fff;
    div {
        a {
            display: inline-block;
            width: 100%;
            height: 100%;
        }
        border-bottom: 1px solid #d9d9d9;
        padding: .25rem 0;
        font-size: .3rem;
        color: #333333;
        margin-left: .3rem;
        span {
            color: #333333;
        }
        i {
            display: inline-block;
            width: .2rem;
            height: .36rem;
            background: url('../assets/blink.png') no-repeat 50% 50%;
            background-size: 100%;
            float: right;
            position: relative;
            right: .25rem;
        }
    }
}
</style>
