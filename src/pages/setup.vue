<template>
    <div>
        <!-- <div v-title>设置</div> -->
        <div class='divwapper cf mg20 pd20'>
            <label for='uploadImage' id='uploadLabel' class='cf'>
                <input id='uploadImage' type="file" accept="image/*;capture=camera" style='display:none;'>
            </label>
            <span class='mg20'>头像</span>
            <i class='mg20'></i>
            <span class='touxiang' v-if='!captureFlag'><img src="../assets/touxiang.png"></span>
            <span class='touxiang' v-else><img :src="capture"></span>
        </div>
        <div class='line'>
            <div></div>
        </div>
        <div class='divwapper cf' @click='toNickname'>
            <span>昵称</span>
            <i></i>
            <span :class='[nicknameFlag?"versionNum":"active"]'>{{nickname}}</span>
        </div>
        <div class='divwapper cf mg20' @click='bindrealname'>
            <span>实名认证</span>
            <i></i>
            <span :class='[realnameFlag?"versionNum":"active"]'>{{realname}}</span>
        </div>
        <div class='line'>
            <div></div>
        </div>
        <div class='divwapper cf' @click='bindTelphone'>
            <span>手机绑定</span>
            <i></i>
            <span class='versionNum'>{{account}}</span>
        </div>
        <div class='divwapper cf mg20' @click='bindbank'>
            <span>我的银行卡</span>
            <i></i>
            <span :class='[cardBindFlag?"versionNum":"active"]'>{{cardBind}}</span>
        </div>
        <div class='divwapper cf mg20' @click='changePassword'>
            <span>修改登录密码</span>
            <i></i>
        </div>
        <div class='line'>
            <div></div>
        </div>
        <div class='divwapper cf' @click='dealpassword'>
            <span>{{dealpasswordContent}}</span>
            <i></i>
        </div>
        <div class='mask' v-if='validata' style='z-index:11;'></div>
        <div class='validataPop' v-if='validata'>
            <div class='poptitle'>提示</div>
            <div class='popcontent'>{{validataContent}}</div>
            <div class='popBTN'>
                <span @click='closeValidataPop'>取消</span>
                <span @click='pathtoValidata'>{{validataBTNcontent}}</span>
            </div>
        </div>
        <div class='loginOut mg20' @click='loginOut'>
            退出登录
        </div>
    </div>
</template>
<script>
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
import {
    Toast
} from 'mint-ui'
import {
    Indicator
} from 'mint-ui'
export default {
    data: function() {
        return {
            account: sessionStorage.getItem('accountStar'),
            nicknameFlag: false,
            nickname: '',
            realnameFlag: false,
            realname: '',
            cardBindFlag: false,
            cardBind: '',
            captureFlag: false,
            capture: '',
            dealpasswordContent: '',
            //以下验证使用
            validata: false,
            validataContent: '',
            validataBTNcontent: '',
            errorIndexArray: ''
        }
    },
    methods: {
        closeValidataPop: function() {
            this.validata = false
        },
        pathtoValidata: function() {
            if (this.errorIndexArray == 0) {
                this.$router.push('/realname')
            } else if (this.errorIndexArray == 1) {
                this.$router.push('/dealpassword')
            } else if (this.errorIndexArray == 2) {
                this.$router.push('/mybank')
            }
        },
        dealpassword: function() {
            let indexArray = []
            indexArray.push(sessionStorage.getItem('realname'))
            indexArray.push(sessionStorage.getItem('paypassword'))
            indexArray.push(sessionStorage.getItem('bankbind'))
            this.errorIndexArray = indexArray.indexOf('0')

            if (this.errorIndexArray == 0) {
                this.validata = true
                this.validataContent = '您尚未通过实名认证'
                this.validataBTNcontent = '去认证'
            } else {
                this.$router.push({
                    path: '/dealpassword',
                    query: {
                        type: 0
                    }
                })
            }
        },
        bindbank: function() {
            let indexArray = []
            indexArray.push(sessionStorage.getItem('realname'))
            indexArray.push(sessionStorage.getItem('paypassword'))
            indexArray.push(sessionStorage.getItem('bankbind'))
            this.errorIndexArray = indexArray.indexOf('0')

            if (this.errorIndexArray == 0) {
                this.validata = true
                this.validataContent = '您尚未通过实名认证'
                this.validataBTNcontent = '去认证'
            } else if (this.errorIndexArray == 1) {
                this.validata = true
                this.validataContent = '您尚未设置交易密码'
                this.validataBTNcontent = '去设置'
            } else {
                this.$router.push('/mybank')
            }
        },
        bindrealname: function() {
            this.$router.push('/realname')
        },
        changePassword: function() {
            this.$router.push('/changePassword')
        },
        bindTelphone: function() {
            this.$router.push('/bindTelphone')
        },
        toNickname: function() {
            this.$router.push('/nickName')
        },
        loginOut: function() {
            let $this = this
            $.post(ROOT + '/wap/loginout.html', function(response) {
                if (response.code == 0) {
                    sessionStorage.clear()
                    localStorage.clear()
                    $this.$router.push({
                        path: '/index/person',
                        query: {
                            type: 3
                        }
                    })
                } else {
                    Toast(response.msg)
                }
            })
        }
    },
    mounted: function() {
        let $this = this
        this.dealpasswordContent = sessionStorage.getItem('paypassword') == 1 ? '修改交易密码' : '设置交易密码'
        this.$nextTick(function() {
            let reader = new FileReader()
            reader.onload = function(e) {
                if (e.total / 1024 > 300) {
                    Toast('图片大小超过300KB')
                    Indicator.close()
                    return false
                }
                $.post(ROOT + '/wap/myhome/litpic_setting.html', {
                    litpic: e.target.result.split(',')[1]
                }, function(response) {
                    if (response.code == 0) {
                        Indicator.close()
                        Toast('头像上传成功')
                        $.post(ROOT + '/wap/myhome/setting.html', function(response) {
                            let data = response.data
                            if (!!data.litpic) {
                                $this.capture = data.litpic
                                $this.captureFlag = true
                            }
                        })
                    }
                })
            }
            $('#uploadImage').on('change', function() {
                if ($(this).val() == '') return false
                Indicator.open()
                reader.readAsDataURL($(this)[0].files[0])

            })
        })
        $.post(ROOT + '/wap/myhome/setting.html', function(response) {
            let data = response.data
            $this.nickname = data.username || '未设置'
            $this.nicknameFlag = !!data.username
            $this.realname = data.realname ? '已认证' : '立即认证'
            $this.realnameFlag = !!data.realname
            $this.cardBind = data.cardBindingStatus == 1 ? '已绑定' : '立即绑定'
            $this.cardBindFlag = !!data.cardBindingStatus
            if (!!data.litpic) {
                $this.capture = data.litpic
                $this.captureFlag = true
            }
        })
    }
}
</script>
<style lang='less' scpoed>
.line {
    text-align: right;
    font-size: 0;
    background: #fff;
    div {
        display: inline-block;
        width: 7.1rem;
        border-top: 1px solid #d9d9d9;
    }
}

.mg20 {
    margin-top: .2rem !important;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .6;
    z-index: 5;
}

.validataPop {
    width: 5.4rem;
    height: 2.5rem;
    background: #f8f8f9;
    border-radius: 40px;
    position: absolute;
    z-index: 11;
    top: 50%;
    left: 50%;
    margin-top: -1.25rem;
    margin-left: -2.7rem;
    overflow: hidden;
    font-size: 0;
    .poptitle {
        margin-top: .45rem;
        font-size: .32rem;
        font-weight: bold;
        color: #000;
        text-align: center;
    }
    .popcontent {
        margin-top: .1rem;
        font-size: .24rem;
        color: #000;
        text-align: center;
    }
    .popBTN {
        height: .88rem;
        border-top: 1px solid #d6d6de;
        position: absolute;
        width: 100%;
        bottom: 0;
        span {
            display: inline-block;
            width: 50%;
            height: 100%;
            line-height: .88rem;
            font-size: .32rem;
            text-align: center;
            color: #007aff;
        }
        span:first-child {
            border-right: 1px solid #d6d6de;
        }
    }
}

.loginOut {
    padding: .25rem 0;
    color: #44b2f7;
    font-size: .3rem;
    text-align: center;
    background: #fff;
}

.touxiang {
    display: inline-block;
    width: .7rem;
    height: .7rem;
    border-radius: 50%;
    float: right;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
    }
}

.pd20 {
    padding: .2rem 0 !important;
}

.divwapper {
    font-size: 0;
    background: #fff;
    padding: .3rem 0;
    position: relative;
    .invete {
        color: #acacac;
        font-size: .24rem;
        float: right;
        margin-top: .08rem;
        >span {
            color: #ed7a00;
        }
    }
    label {
        display: inline-block;
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        >span:nth-of-type(1) {
            font-size: .3rem;
            color: #555555;
            float: left;
            margin-top: .08rem;
            margin-left: .35rem;
        }
    }
    i:nth-of-type(1) {
        display: inline-block;
        width: .2rem;
        height: .36rem;
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
        margin-left: .35rem;
    }
    .active {
        font-size: .24rem;
        color: #ed7a00;
        float: right;
        margin-top: .08rem;
    }
    .versionNum {
        float: right;
        font-size: .24rem;
        color: #acacac;
        margin-top: .08rem;
    }
}
</style>
