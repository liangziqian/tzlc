<template>
    <div>
        <!-- <div v-title>回款详情</div> -->
        <div class='tips'><i></i><span>预期收益以实际收益为准</span></div>
        <div class='listglass'>
            <div class='listtitle cf'>
                <span>{{data.name}}</span>
            </div>
            <div class='listtitle cf'>
                <span>回款金额</span>
                <span class='orang'>{{data.repay_account}}</span>
            </div>
            <div class='listtitle cf'>
                <span>本金</span>
                <span>{{data.capital}}</span>
            </div>
            <div class='listtitle cf'>
                <span>利息</span>
                <span>{{data.interest}}</span>
            </div>
            <div class='listtitle cf'>
                <span>投资时间</span>
                <span>{{data.tender_time}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
export default {
    data: function() {
        return {
            data: {}
        }
    },
    mounted: function() {
        let $this = this
        $.post(ROOT + '/wap/myhome/collection_detail.html', {
            id: $this.$route.params.id
        }, function(response) {
            if (response.code == 0) {
                $this.data = response.data
            }
        })
    }
}
</script>
<style lang='less' scoped>
.tips {
    font-size: 0;
    padding: .2rem 0 .2rem .3rem;
    i {
        display: inline-block;
        width: .24rem;
        height: .24rem;
        background: url('../assets/amazing.png') no-repeat 50% 50%;
        vertical-align: middle;
        margin-right: .1rem;
    }
    span {
        font-size: .24rem;
        color: #88959b;
        vertical-align: middle;
    }
}

.listglass {
    background: #fff;
    .listtitle {
        font-size: .3rem;
        color: #505452;
        padding: .4rem .3rem .4rem 0;
        margin-left: .3rem;
        border-bottom: 1px solid #d9d9d9;
        span:nth-of-type(2) {
            float: right;
        }
    }
}

.orang {
    color: #ed7900 !important;
}
</style>
