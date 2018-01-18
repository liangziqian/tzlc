<template>
    <div id='login'>
        <!-- <div v-title>登录/注册</div> -->
        <div class='tips'>输入手机号，用来登录、注册</div>
        <div class='type-input'>
            <span class='input-title'>手机号</span>
            <input type="text" placeholder='请输入您的手机号' class='sp-input' :class='[fs]' v-model.trim='telval' maxlength='11'>
            <i v-show='showNumLock' class='clear-input' @click='clearinput'></i>
        </div>
        <div v-show='showNumLock' class='showNumLock'>
            {{telModel}}
        </div>
        <div class='subBTN'>
            <button type='button' :class='{blueBTN:colorBTN}' @click='tosub'>下一步</button>
        </div>
    </div>
</template>
<script>
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
export default {
    data: function() {
        return {
            showNumLock: false, //input清除按钮、动态同步框
            telval: '', //双绑数据
            fs: 'fs28', //input字体大小
            colorBTN: false //提交按钮颜色
        }
    },
    computed: {
        telModel: function() {
            let splitTelVal, newVal
            if (this.telval.length === 0) return false
            splitTelVal = this.telval.match(/\d+/)
            if (splitTelVal === null) return
            newVal = splitTelVal[0].substring(0, 3) + ' ' + splitTelVal[0].substring(3, 7) + ' ' + splitTelVal[0].substring(7, 11)
            newVal = newVal.trim()
            this.colorBTN = newVal.length === 13 ? true : false
            return newVal
        }
    },
    watch: {
        telval: function() {
            this.fs = this.telval === '' ? 'fs28' : 'fs32'
            this.showNumLock = this.telval === '' ? false : true
        }
    },
    methods: {
        tosub: function() {
            let subData
            let $this = this
            if (!this.telModel) return false
            subData = this.telModel.replace(/\s+/g, '')

            if (subData.length < 11) {
                return false
            } else {
                $.post(ROOT + '/wap/login_step1.html', {
                    telephone: $this.telval
                }, function(response) {
                    sessionStorage.setItem('account', subData)
                    sessionStorage.setItem('accountStar', subData.substring(0, 3) + '****' + subData.substring(7, 11))
                    if (response.code == 0) {
                    	if($this.$route.query.productId){
					        $this.$router.push({
				                path: '/loginpassword',
				                query: {
				                    productId: $this.$route.query.productId
				                }
				            })
				        }else{
				        	$this.$router.push('/loginpassword')
				        }
                    } else if (response.code == 1) {
                        if($this.$route.query.productId){
					        $this.$router.push({
				                path: '/registry',
				                query: {
				                    productId: $this.$route.query.productId
				                }
				            })
				        }else{
				        	$this.$router.push('/registry')
				        }
                    }
                })
            }
        },
        clearinput: function() {
            this.telval = ''
        }
    },
    mounted: function() {
        let $this = this
        let localTel = localStorage.getItem('telephone')
        let localpw = localStorage.getItem('password')

        //自动登录

        if (!sessionStorage.getItem('isLogin') && localTel && localpw) {
            $.post(ROOT + '/wap/login_step2.html', {
                telephone: localTel,
                password: localpw
            }, function(response) {
                console.log(response)
                if (response.code == 0) {
                    sessionStorage.setItem('isLogin', true)
                    sessionStorage.setItem('account', localTel)
                    sessionStorage.setItem('accountStar', localTel.substring(0, 3) + '****' + localTel.substring(7, 11))
                    $this.$router.push({
                        path: '/index/person',
                        query: {
                            type: 3
                        }
                    })
                }
            })
        }
    }
}
</script>
<style lang='less' scoped>
.tips {
    font-size: .28rem;
    text-align: center;
    padding: .4rem 0 .3rem 0;
    color: #999;
    /*font-weight: bold;*/
}

.type-input {
    font-size: 0;
    position: relative;
    height: .88rem;
    font-family: 'PingFang SC Medium' !important;
    .clear-input {
        display: inline-block;
        width: .28rem;
        height: .88rem;
        background: url(../assets/clearinput.png) no-repeat 50% 50%;
        position: absolute;
        background-size: 100%;
        right: .5rem;
    }
    .input-title {
        font-size: .3rem;
        display: inline-block;
        width: 2.1rem;
        height: .88rem;
        line-height: .88rem;
        padding: 0 0 0 .3rem;
        color: #555;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        /*font-weight: bold;*/
    }
    .sp-input {
        width: 100%;
        height: .88rem;
        position: absolute;
        left: 0;
        top: 0;
        padding: 0 .78rem 0 2.1rem;
    }
    .fs28 {
        font-size: .28rem;
    }
    .fs32 {
        font-size: .32rem;
    }
}

.showNumLock {
    font-size: .32rem;
    font-family: 'Miscrosoft YaHei';
    color: #44b2f7;
    background: #d8e9f3;
    height: .7rem;
    line-height: .7rem;
    text-align: center;
    border-top: 1px solid #b7ddf6;
    border-bottom: 1px solid #b7ddf6;
}

.subBTN {
    padding: .7rem 0 0 0;
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
</style>
