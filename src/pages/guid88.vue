<template>
    <div>
        <div class='guid88'>
        	<div class='zhuce'>
	        	<div class='type-input'>
	        		<i v-show='sendcodeFlag' class='clear-input'></i>
		            <input type="text" placeholder='请输入手机号' class='sp-input'  v-model.trim='telval' maxlength='11'>
	        	</div>
	 			      <div class='type-input'>
		            <input type="text" placeholder='请输入短信验证码' class='sp-input pr153'  v-model.trim='codeval'>
		            <span class='sendcode' :class='{sendcodegray:sendcodeStyle}' @click='sendcode'>{{sendcodeText}}</span>
	            </div>
	           <div class='type-input'>
		            <input type="password" placeholder='请输入登录密码' class='sp-input'  v-model.trim='passtelval'>
	        	</div>
		        <span @click='tosuccessr' class="spa"></span>
            <p>已有账户，<span @click='tologin'>前往登录</span></p>
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
		return{
			userAccount:'',
			sendcodeFlag:false,
			sendcodeStyle:true,
			sendcodeText:'获取验证码',
			telval:'',
      passtelval:'',
			channel:'',//通道数据绑定
      signKey:'',
      friendval: '' //邀请码双绑数据
		}
	},
	watch:{
		telval:function(){
			this.sendcodeFlag = (/^0?(13|14|15|17|18)[0-9]{9}$/.test(this.telval))
		}

	},

    methods: {
        tosuccessr: function() {
        	let $this = this
        	 if(!(/^[0-9a-zA-Z]{6,15}$/g.test(this.passtelval))){
        		Toast('密码格式错误(6-15位数字，字母)')
        		return false
        	}
        	$.post(ROOT + '/wap/signup.html', {
                telephone: this.telval,
                password: $this.passtelval,
                code: $this.codeval,
                referee: $this.friendval,
                channel:$this.$route.query.channel
            },function(response){
            	if(response.code === 0){
            		Toast('注册成功')
                window.TrackingIO.register($this.telval)
                $.post(ROOT + '/wap/login_step2.html', {
                  telephone: $this.telval,
                  password: $this.passtelval,
                }, function(response) {
                  if (response.code == 0) {
                    sessionStorage.setItem('isLogin', true)
                    sessionStorage.setItem('account', $this.telval)
                    sessionStorage.setItem('accountStar', $this.telval.substring(0, 3) + '****' + $this.telval.substring(7, 11))
                    $.post(ROOT + '/wap/myhome/user-index.html', function(response) {
                      if (response.code == 0) {
                        sessionStorage.setItem('paypassword', response.data.pay_password_status)
                        sessionStorage.setItem('bankbind', response.data.card_binding_status)
                        sessionStorage.setItem('realname', response.data.real_verify_status)
                        $this.$router.push({
                          path: '/index/money',
                          query: {
                            type: 2
                          }
                        })
                      }
                    })
                  }
                })
            	}else if(response.code === 1){
            	 	 Toast(response.msg)
            		}
			    }
            )
        },
        tologin:function(){
          this.$router.push('/login')
        },
        sendcode: function(){
    		const self = this
    		let count = 0
    		if(self.sendcodeFlag === false){
    		 		return false
    			 }
          self.sendcodeFlag=false;
    			 ++count
    		 $.post(ROOT + '/wap/send_code.html', {
                telephone: self.telval,
                signKey:self.signKey
            },function(response){
           		 	let time = 60
           		 	if(response.code == 0){
    			 	const timer = setInterval(function(){
    				if(time === 0){
    					clearInterval(timer)
    					self.sendcodeFlag = true
    					self.sendcodegray = false
    					self.sendcodeText = '重新发送'
    				}else{
    					if(count === 1){
    					self.sendcodeText = '重新发送('+time+')'
    					time--
    					}
    						self.sendcodeFlag = false
    						return false
    			}
    		},1000)
    			}else if(response.code == 1){
    				Toast(response.msg);
            self.sendcodeFlag=true
    			}
          })
    	}
    },
    created: function() {
      this.friendval = this.$route.query.m ? this.$route.query.m : ''
      $.post(ROOT + '/wap/webappsign.html',function(res){
        this.signKey=res.data
      })
    }
}
</script>
<style lang='less' scoped>
.guid88 {
    height: 25rem;
    background: url('../assets/guid.png') no-repeat 50% 50%;
    background-size: 100%;
    position: relative;
    .zhuce {
        position: absolute;
        display: inline-block;
        width: 6.76rem;
        height: 6.02rem;
        left: .37rem;
        top: 13rem;
        text-align: center;
        color: #af6200;
        .type-input{
            font-size: 0;
            margin-bottom: .3rem;
            .sp-input{
              height: .88rem;
              width: 5.1rem;
              border-radius: .5rem;
              text-indent: .5rem;
              font-size: .3rem;
              background:#fff url(../assets/guid-phone.png) no-repeat .2rem center;
              &.pr153{
                width: 3.5rem;
                margin: 0 .2rem 0 0;
                background:#fff url(../assets/guid-yz.png) no-repeat .2rem center;
              }
          }
          .sendcode{
            width: 1.5rem;
            font-size: .25rem;
            height: .78rem;
            background-color: rgba(0,0,0,.2);
            display: inline-block;
            line-height: .78rem;
            border-radius: .5rem;
            color:#fff;
          }
        }
        .spa{
        	display: inline-block;
	        width: 5.4rem;
	        height: .9rem;
	        background:url(../assets/regist-bar.png) no-repeat center;
	        background-size: contain;
        }
        p{
          font-size: .3rem;
          text-align: right;
          padding-right: 1rem;
          margin-top: .1rem;
          span{
            font-size: .3rem;
            color: red;
            cursor: pointer;
          }
        }
    }
}
</style>
