<template>
    <div class='question'>
        <!-- <div v-title>问题详情</div> -->
        <div v-html='content' class='content imgmax'></div>
    </div>
</template>
<script>
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'
export default {
    data: function() {
        return {
            content: ''
        }
    },
    mounted: function() {
        let $this = this
        $.post(ROOT + "/wap/problems.html", {
            id: $this.$route.params.id
        }, function(response) {
            if (response.code == 0) {
                $this.content = response.data.content
            }
        })
    }

}
</script>
<style lang='less' scoped>
.question {
    height: 100%;
    background: #fff;
}

.content {
    background: #fff;
    height: auto;
    font-size: .26rem;
    color: #888888;
    padding: .3rem;
}
</style>
