<template>
    <div class='msgdetail'>
        <!-- <div v-title>消息详情</div> -->
        <div class='detail'>
            <div>{{name}}</div>
            <div>时间:{{time}}</div>
        </div>
        <div class='content imgmax' v-html='content'></div>
    </div>
</template>
<script>
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
export default {
    data: function() {
        return {
            name: '',
            time: '',
            content: ''
        }
    },
    mounted: function() {
        let tel = this.$route.query.tel || sessionStorage.getItem('account')
        let $this = this
        $.post(ROOT + '/wap/message_detail.html', {
            id: this.$route.params.id,
            mobile: tel
        }, function(response) {
            if (response.code == 0) {
                $this.name = response.data.name
                $this.time = response.data.time2
                $this.content = response.data.content
            }
        })
    }
}
</script>
<style lang='less' scoped>
.msgdetail {
    height: 100%;
    background: #fff;
}

.detail {
    width: 6.9rem;
    margin: 0 auto;
    border-bottom: 1px solid #d9d9d9;
    div:nth-of-type(1) {
        text-align: center;
        font-size: .3rem;
        color: #505452;
        padding: .38rem 0 .24rem 0;
    }
    div:nth-of-type(2) {
        text-align: center;
        font-size: .3rem;
        color: #505452;
        padding-bottom: .18rem;
    }
}

.content {
    padding: .4rem .3rem;
    font-size: .26rem;
    color: #6f6f6f;
}
</style>
