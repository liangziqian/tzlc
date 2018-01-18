<template>
    <div>
       <!--  <div v-title>关于我们</div> -->
        <div class='safe1'></div>
        <div class='detail'>
            <div class='imgs'>
                <div @click='toperson1'>
                    <i class='person1b' v-show='person1>0' style='background-size:100%;'></i>
                    <i class='person1w' v-show='person1==0'></i>
                </div>
                <div @click='toperson2'>
                    <i class='person2b' v-show='person2>0' style='background-size:100%;'></i>
                    <i class='person2w' v-show='person2==0'></i>
                </div>
                <div @click='toperson3'>
                    <i class='person3b' v-show='person3>0' style='background-size:100%;'></i>
                    <i class='person3w' v-show='person3==0'></i>
                </div>
                <div @click='toperson4'>
                    <i class='person4b' v-show='person4>0' style='background-size:100%;'></i>
                    <i class='person4w' v-show='person4==0'></i>
                </div>
            </div>
        </div>
        <div class='pdetail' v-show='person1>0'>
            <div class='ptitle'>瞿承信<span>董事长</span></div>
            <div class='pcontent'>深耕金融、互联网多年，在金融风控、产品设计运营、企业管理方面有着深刻的认识和建树。曾任联想控股企业翼龙贷浙江执行董事，负责浙江地区的翼龙贷整体运营工作；中信证券（浙江）有限责任公司高级经理人；先后在浙江省技术监督局、养生堂、方大通信等知名企业任要职。</div>
        </div>
        <div class='pdetail' v-show='person2>0'>
            <div class='ptitle'>吴疆<span>CEO</span></div>
            <div class='pcontent'>10年IT软件开发、多年互联网金融运营管理经验，擅长大数据分析与处理。曾任翼龙贷浙江技术总监，并先后在养生堂、日立电梯（中国）等知名企业任技术总监。</div>
        </div>
        <div class='pdetail' v-show='person3>0'>
            <div class='ptitle'>唐超<span>风控总监</span></div>
            <div class='pcontent'>翼龙贷淳安区域总监，超讯金融董事长。线下信贷实战经验丰富，擅长风险判断、风险应对。具有较强的的业务渠道开发能力和丰富的市场营销经验。</div>
        </div>
        <div class='pdetail' v-show='person4>0'>
            <div class='ptitle'>季建真<span>股东；特约顾问</span></div>
            <div class='pcontent'>工艺美术大师、中国龙泉青瓷学院副院长、浙江龙泉披云青瓷文化园有限公司（中国青瓷小镇）创始人，浙江披云食品股份有限公司创始人、董事长，华东林交所龙泉青瓷交易中心董事长。</div>
        </div>
        <div class='safe2'></div>
        <div class='safe3'></div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            person1: 1,
            person2: 0,
            person3: 0,
            person4: 0
        }
    },
    methods: {
        toperson1: function() {
            this.person1 = 1
            this.person2 = 0
            this.person3 = 0
            this.person4 = 0
        },
        toperson2: function() {
            this.person1 = 0
            this.person2 = 1
            this.person3 = 0
            this.person4 = 0
        },
        toperson3: function() {
            this.person1 = 0
            this.person2 = 0
            this.person3 = 1
            this.person4 = 0
        },
        toperson4: function() {
            this.person1 = 0
            this.person2 = 0
            this.person3 = 0
            this.person4 = 1
        }
    }
}
</script>
<style lang='less' scoped>
.safe1 {
    height: 8.96rem;
    background: url('../assets/about1.png') no-repeat 50% 50%;
    background-size: 100%;
}

.safe2 {
    height: 7.78rem;
    background: url('../assets/about2.png') no-repeat 50% 50%;
    background-size: 100%;
}

.safe3 {
    height: 6rem;
    background: url('../assets/about3.png') no-repeat 50% 50%;
    background-size: 100%;
}

.detail {
    background: #fff;
    font-size: 0;
    padding-top: .4rem;
    .imgs {
        div {
            display: inline-block;
            width: 25%;
            overflow: hidden;
            text-align: center;
        }
        i {
            display: block;
            width: 1.8rem;
            height: 1.8rem;
        }
        .person1b {
            background: url(../assets/person1b.png) no-repeat 50% 50%;
            background-size: 80%;
        }
        .person1w {
            background: url(../assets/person1w.png) no-repeat 50% 50%;
            background-size: 80%;
        }
        .person2b {
            background: url(../assets/person2b.png) no-repeat 50% 50%;
            background-size: 80%;
        }
        .person2w {
            background: url(../assets/person2w.png) no-repeat 50% 50%;
            background-size: 80%;
        }
        .person3b {
            background: url(../assets/person3b.png) no-repeat 50% 50%;
            background-size: 80%;
        }
        .person3w {
            background: url(../assets/person3w.png) no-repeat 50% 50%;
            background-size: 80%;
        }
        .person4b {
            background: url(../assets/person4b.png) no-repeat 50% 50%;
            background-size: 80%;
        }
        .person4w {
            background: url(../assets/person4w.png) no-repeat 50% 50%;
            background-size: 80%;
        }
    }
}

.pdetail {
    background: #fff;
    font-size: 0;
    .ptitle {
        padding-top: .42rem;
        text-align: center;
        font-size: .3rem;
        color: #333;
        span {
            color: #999999;
            font-size: .24rem;
            margin-left: .1rem;
        }
    }
    .pcontent {
        padding: .3rem .2rem .6rem .2rem;
        font-size: .24rem;
        color: #9a9a9a;
        line-height: 1.5;
        text-align: justify;
    }
}
</style>
