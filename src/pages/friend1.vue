<template>
    <div>
        <!-- <div v-title>推荐有礼</div> -->
        <div class='friend' v-show='showflag'>
            <i class='arrow' v-show='friendflag'></i>
            <i class='btn' v-show='friendflag' @click='maskfriend'></i>
            <div class='showbtn' @click='maskfriend'></div>
            <i class='friendlist' @click='tofriendlist'></i>
            <i class='popshowbtn' @click='popChange'><img src="../assets/friendbtn.png"></i>
        </div>
      <div class='share' v-show='!showflag'>
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
        </div>
      </div>
        <transition enter-active-class='animated bounceIn' leave-active-class='animated bounceOut'>
            <div class='pop' v-show='popflag'>
                <div class='popTitle'>
                    <span>活动规则</span>
                    <i @click='popChange'></i>
                </div>
                <div class='popContent'>
                    1、 本次活动无上限，邀请人数越多，获得理财红包越多
                    <br>
                    <br> 2、 所有奖励红包将在完成操作后当日到账
                    <br>
                    <br> 3、邀请好友送5元红包（红包有效期7天，投资2000元（含以上）即可使用），被邀请人有效投资2000元（含以上）再送58元红包（红包有效期30天，投资8000元即可使用）。
                    <br>
                    <br> 4、投资红包不可叠加使用，有效期为一个月；
                    <br>
                    <br> 5、 若您采用某些特殊技术手段或邀请的好友身份异常，一经核实，中青网投保留拒绝支付奖励或删除相应好友的权利
                    <br>
                    <br> 6、 中青网投对本邀请规则保留最终解释权，如有任何疑问，敬请拨打中青网投客服热线400-107-9077咨询详情
                </div>
                <div class='popBTN' @click='popChange'>我已了解</div>
            </div>
        </transition>
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
            friendflag: false,
            showflag: sessionStorage.getItem('isLogin') ? true : false,
            personflag: false,
            tel: '',
            popflag: false,
            userAccount:'',
            sendcodeFlag:false,
            sendcodeStyle:true,
            sendcodeText:'获取验证码',
            telval:'',
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
        tofriendlist: function() {
            this.$router.push('friendlist')
        },
        popChange: function() {
            this.popflag = !this.popflag
        },
        maskfriend: function() {
            this.friendflag = !this.friendflag
        },
        moneyperson: function() {
            this.friendflag = !this.friendflag
            this.personflag = !this.personflag
        },
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
              $this.$router.push('/successr')
            }else if(response.code === 1){
              Toast(response.msg)
            }
          }
        )
      },
      sendcode: function(){
        const self = this
        let count = 0
        if(self.sendcodeFlag === false){
          return false
        }
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
            Toast(response.msg)
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
  .share {
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
      top: 13.2rem;
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
    }
  }

.moneyperson {
    font-size: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 7;
    .toclose {
        margin-top: 2.7rem;
        margin-bottom: .8rem;
        i {
            display: inline-block;
            width: .35rem;
            height: .35rem;
            background: url('../assets/moneypersonclose.png') no-repeat 50% 50%;
            float: right;
            position: relative;
            right: .3rem;
        }
    }
    .moneyp {
        width: 5.63rem;
        height: 2.14rem;
        background: url('../assets/moneyperson.png') no-repeat 50% 50%;
        background-size: 100%;
        margin: 0 auto;
    }
    .goinput {
        display: block;
        width: 5.2rem;
        height: .78rem;
        margin: 0 auto;
        font-size: .28rem;
        padding-left: .2rem;
        border-radius: 10px;
    }
    button {
        position: relative;
        top: .15rem;
        display: block;
        width: 5.2rem;
        height: .78rem;
        margin: 0 auto;
        font-size: .28rem;
        border-radius: 10px;
        color: #fff;
        background: #9ed5f8;
    }
}

.friend {
    height: 14rem;
    background: url('../assets/friend.png') no-repeat 50% 50%;
    background-size: 100%;
    position: relative;
    .showbtn {
        width: 6.5rem;
        height: .88rem;
        margin: 0 auto;
        position: relative;
        top: 5.2rem;
    }
    .popshowbtn {
        display: inline-block;
        width: 2rem;
        height: 1rem;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -1rem;
        img{
            max-width: 100%;
        }
    }
    .friendlist {
        display: inline-block;
        width: 3rem;
        height: .5rem;
        position: absolute;
        top: 6.2rem;
        left: 50%;
        margin-left: -1.5rem;
    }
    .arrow {
        display: inline-block;
        position: absolute;
        right: 0;
        top: 0;
        width: 2.26rem;
        height: 1.08rem;
        z-index: 7;
        background: url('../assets/friend-arrow.png') no-repeat 50% 50%;
        background-size: 100%;
    }
    .btn {
        display: inline-block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 4rem;
        z-index: 7;
        height: .9rem;
        background: url('../assets/friend-btn.png') no-repeat 50% 50%;
        background-size: 100%;
    }
}

.pop {
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -3.7rem 0 0 -3.03rem;
    display: inline-block;
    width: 6.06rem;
    height: 7.4rem;
    background: #fff;
    border-radius: 10px;
    z-index: 6;
    .popTitle {
        font-size: 0;
        padding: .36rem;
        border-bottom: 2px solid #44b2f7;
        span {
            font-size: .32rem;
            color: #44b2f7;
            display: inline-block;
        }
        i {
            display: inline-block;
            width: .28rem;
            height: .28rem;
            background: url(../assets/closePop.png) no-repeat 50% 50%;
            float: right;
            background-size: 100%;
        }
    }
    .popContent {
        font-size: .26rem;
        color: #6f6f6f;
        padding: .3rem .3rem 0 .3rem;
        line-height: 1.5;
        height: 5rem;
        overflow-y: scroll;
    }
    .popBTN {
        font-size: .28rem;
        color: #fff;
        background: #44b2f7;
        text-align: center;
        margin: .25rem .3rem 0 .3rem;
        border-radius: 40px;
        padding: .25rem 0;
    }
}
</style>
