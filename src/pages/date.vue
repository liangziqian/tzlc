<template>
    <div>
        <!-- <div v-title>回款日历</div> -->
        <div class='swiperTurn'>
            <i class='toleft' @click='swiperToleft'></i><span class='timer'>{{dateNow}}</span><i class='toright' @click='swiperToright'></i><span class='toToday' @click='toToday'>今天</span>
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <table class="calendar-table1 calendar-table">
                        <thead>
                            <tr>
                                <th>日</th>
                                <th>一</th>
                                <th>二</th>
                                <th>三</th>
                                <th>四</th>
                                <th>五</th>
                                <th>六</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="swiper-slide">
                    <table class="calendar-table2 calendar-table">
                        <thead>
                            <tr>
                                <th>日</th>
                                <th>一</th>
                                <th>二</th>
                                <th>三</th>
                                <th>四</th>
                                <th>五</th>
                                <th>六</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="swiper-slide">
                    <table class="calendar-table3 calendar-table">
                        <thead>
                            <tr>
                                <th>日</th>
                                <th>一</th>
                                <th>二</th>
                                <th>三</th>
                                <th>四</th>
                                <th>五</th>
                                <th>六</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="swiper-slide">
                    <table class="calendar-table4 calendar-table">
                        <thead>
                            <tr>
                                <th>日</th>
                                <th>一</th>
                                <th>二</th>
                                <th>三</th>
                                <th>四</th>
                                <th>五</th>
                                <th>六</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="swiper-slide">
                    <table class="calendar-table5 calendar-table">
                        <thead>
                            <tr>
                                <th>日</th>
                                <th>一</th>
                                <th>二</th>
                                <th>三</th>
                                <th>四</th>
                                <th>五</th>
                                <th>六</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="swiper-slide">
                    <table class="calendar-table6 calendar-table">
                        <thead>
                            <tr>
                                <th>日</th>
                                <th>一</th>
                                <th>二</th>
                                <th>三</th>
                                <th>四</th>
                                <th>五</th>
                                <th>六</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <div v-if='biaoflag' class='moneyTIP'><i class='backMoney'></i><span>预计当天回款<span>{{moneyTIPALL}}</span>元，其中本金<span>{{moneyTIPIN}}</span>元</span>
        </div>
        <div v-else class='moneyTIP'><i class='goMoney'></i><span>马上投资，赚取丰厚收益，</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <router-link :to='{path: "/index/money",query: {type: 2}}'>去投资&gt;</router-link>
        </div>
        <div v-if='biaoflag' class='biaoList'>
            <div v-for='b in biao'>
                <router-link :to='{path:"/datedetail"+b.id}'>
                    <span>{{b.name}}</span><i></i><span>+{{b.interest.toFixed(2)}}</span>
                </router-link>
            </div>
        </div>
        <div v-else class='biaoBG'>
        </div>
    </div>
</template>
<script>
import Swiper from '../config/swiper.min.js'
import Calendar from '../config/calendar.js'
import '../config/swiper.min.css'
import $ from '../config/jquery.min.js'
import ROOT from '../config/ROOT'

export default {
    data: function() {
        return {
            mySwiper: '',
            dateNow: (function() {
                return new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + '月'
            })(),
            moneyTIPALL: 0,
            moneyTIPIN: 0,
            biaoflag: false,
            biao: []
        }
    },
    methods: {
        swiperToright: function() {
            let $this = this
            this.mySwiper.slideNext()
            $this.dateNow = (function() {
                let nextDate = new Date().setMonth(new Date().getMonth() + $this.mySwiper.activeIndex)
                return new Date(nextDate).getFullYear() + '年' + (new Date(nextDate).getMonth() + 1) + '月'
            })()
        },
        swiperToleft: function() {
            let $this = this
            this.mySwiper.slidePrev()
            $this.dateNow = (function() {
                let nextDate = new Date().setMonth(new Date().getMonth() + $this.mySwiper.activeIndex)
                return new Date(nextDate).getFullYear() + '年' + (new Date(nextDate).getMonth() + 1) + '月'
            })()
        },
        toToday: function() {
            let $this = this
            this.mySwiper.slideTo(0, 1000, false)
            $this.dateNow = (function() {
                let nextDate = new Date().setMonth(new Date().getMonth() + $this.mySwiper.activeIndex)
                return new Date(nextDate).getFullYear() + '年' + (new Date(nextDate).getMonth() + 1) + '月'
            })()
        },
        getLeftDay: function(date) {
            return new Date(new Date(date).setDate(1)).getDay()
        }
    },
    mounted: function() {
        let $this = this
        this.$nextTick(function() {
            let index = new Date().getDate() + new Date(new Date().setDate(1)).getDay() - 1
            new Calendar({
                controller: '.calendar-table1'
            })
            new Calendar({
                controller: '.calendar-table2',
                addMonth: 1
            })
            new Calendar({
                controller: '.calendar-table3',
                addMonth: 2
            })
            new Calendar({
                controller: '.calendar-table4',
                addMonth: 3
            })
            new Calendar({
                controller: '.calendar-table5',
                addMonth: 4
            })
            new Calendar({
                controller: '.calendar-table6',
                addMonth: 5
            })
            $('.calendar-table1 td:eq(' + index + ')')
                .css({
                    background: '#f2f7ff'
                })
                .append('<span style="position:absolute;top:.45rem;left:.09rem;font-size:.22rem;">今天</span>')

            //按月份发送ajax
            //第1个月

            $.post(ROOT + '/wap/myhome/collection_calendar.html', {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1
            }, function(response) {
                sessionStorage.setItem(new Date().getMonth(), JSON.stringify(response.data))
                const $calendarTable1 = $('.calendar-table1 td')
                const leftValue1 = $this.getLeftDay(new Date().getTime()) - 1
                for (let i = 0; i < response.data.length; i++) {
                    let index = parseInt(response.data[i].time.split('-')[2])
                    if ($calendarTable1.eq(leftValue1 + index).find('.total').length > 0) {
                        let total = $calendarTable1.eq(leftValue1 + index).find('.total')
                        total.text(parseFloat(total.text()) + parseFloat((response.data[i].interest).toFixed(2)) + '元')
                    } else {
                        $calendarTable1.eq(leftValue1 + index).append('<span class="total" style="position:absolute;bottom:.07rem;left:.09rem;font-size:.24rem;color:#ed7900;">' + (response.data[i].interest).toFixed(2) + '元</span>')
                    }
                }
            })

            // 第2个月

            $.post(ROOT + '/wap/myhome/collection_calendar.html', {
                year: new Date(new Date().setMonth(new Date().getMonth() + 2)).getFullYear(),
                month: (new Date().getMonth() + 2 > 12 ? new Date().getMonth() + 2 - 12 : new Date().getMonth() + 2)
            }, function(response) {
                sessionStorage.setItem(new Date().getMonth() + 1, JSON.stringify(response.data))
                const $calendarTable2 = $('.calendar-table2 td')
                const leftValue2 = $this.getLeftDay(new Date().setMonth(new Date().getMonth() + 1)) - 1
                for (let i = 0; i < response.data.length; i++) {
                    let index = parseInt(response.data[i].time.split('-')[2])
                    if ($calendarTable2.eq(leftValue2 + index).find('.total').length > 0) {
                        let total = $calendarTable2.eq(leftValue2 + index).find('.total')
                        total.text(parseFloat(total.text()) + parseFloat((response.data[i].interest).toFixed(2)) + '元')
                    } else {
                        $calendarTable2.eq(leftValue2 + index).append('<span class="total" style="position:absolute;bottom:.07rem;left:.09rem;font-size:.24rem;color:#ed7900;">' + (response.data[i].interest).toFixed(2) + '元</span>')
                    }
                }
            })

            //第3个月

            $.post(ROOT + '/wap/myhome/collection_calendar.html', {
                year: new Date(new Date().setMonth(new Date().getMonth() + 3)).getFullYear(),
                month: (new Date().getMonth() + 3 > 12 ? new Date().getMonth() + 3 - 12 : new Date().getMonth() + 3)
            }, function(response) {
                sessionStorage.setItem(new Date().getMonth() + 2, JSON.stringify(response.data))
                const $calendarTable3 = $('.calendar-table3 td')
                const leftValue3 = $this.getLeftDay(new Date().setMonth(new Date().getMonth() + 2)) - 1
                for (let i = 0; i < response.data.length; i++) {
                    let index = parseInt(response.data[i].time.split('-')[2])
                    if ($calendarTable3.eq(leftValue3 + index).find('.total').length > 0) {
                        let total = $calendarTable3.eq(leftValue3 + index).find('.total')
                        total.text(parseFloat(total.text()) + parseFloat((response.data[i].interest).toFixed(2)) + '元')
                    } else {
                        $calendarTable3.eq(leftValue3 + index).append('<span class="total" style="position:absolute;bottom:.07rem;left:.09rem;font-size:.24rem;color:#ed7900;">' + (response.data[i].interest).toFixed(2) + '元</span>')
                    }
                }
            })

            //第4个月

            $.post(ROOT + '/wap/myhome/collection_calendar.html', {
                year: new Date(new Date().setMonth(new Date().getMonth() + 4)).getFullYear(),
                month: (new Date().getMonth() + 4 > 12 ? new Date().getMonth() + 4 - 12 : new Date().getMonth() + 4)
            }, function(response) {
                sessionStorage.setItem(new Date().getMonth() + 3, JSON.stringify(response.data))
                const $calendarTable4 = $('.calendar-table4 td')
                const leftValue4 = $this.getLeftDay(new Date().setMonth(new Date().getMonth() + 3)) - 1
                for (let i = 0; i < response.data.length; i++) {
                    let index = parseInt(response.data[i].time.split('-')[2])
                    if ($calendarTable4.eq(leftValue4 + index).find('.total').length > 0) {
                        let total = $calendarTable4.eq(leftValue4 + index).find('.total')
                        total.text(parseFloat(total.text()) + parseFloat((response.data[i].interest).toFixed(2)) + '元')
                    } else {
                        $calendarTable4.eq(leftValue4 + index).append('<span class="total" style="position:absolute;bottom:.07rem;left:.09rem;font-size:.24rem;color:#ed7900;">' + (response.data[i].interest).toFixed(2) + '元</span>')
                    }
                }
            })

            //第5个月

            $.post(ROOT + '/wap/myhome/collection_calendar.html', {
                year: new Date(new Date().setMonth(new Date().getMonth() + 5)).getFullYear(),
                month: (new Date().getMonth() + 5 > 12 ? new Date().getMonth() + 5 - 12 : new Date().getMonth() + 5)
            }, function(response) {
                sessionStorage.setItem(new Date().getMonth() + 4, JSON.stringify(response.data))
                const $calendarTable5 = $('.calendar-table5 td')
                const leftValue5 = $this.getLeftDay(new Date().setMonth(new Date().getMonth() + 4)) - 1
                for (let i = 0; i < response.data.length; i++) {
                    let index = parseInt(response.data[i].time.split('-')[2])
                    if ($calendarTable5.eq(leftValue5 + index).find('.total').length > 0) {
                        let total = $calendarTable5.eq(leftValue5 + index).find('.total')
                        total.text(parseFloat(total.text()) + parseFloat((response.data[i].interest).toFixed(2)) + '元')
                    } else {
                        $calendarTable5.eq(leftValue5 + index).append('<span class="total" style="position:absolute;bottom:.07rem;left:.09rem;font-size:.24rem;color:#ed7900;">' + (response.data[i].interest).toFixed(2) + '元</span>')
                    }
                }
            })

            //第6个月

            $.post(ROOT + '/wap/myhome/collection_calendar.html', {
                year: new Date(new Date().setMonth(new Date().getMonth() + 6)).getFullYear(),
                month: (new Date().getMonth() + 6 > 12 ? new Date().getMonth() + 6 - 12 : new Date().getMonth() + 6)
            }, function(response) {
                sessionStorage.setItem(new Date().getMonth() + 5, JSON.stringify(response.data))
                const $calendarTable6 = $('.calendar-table6 td')
                const leftValue6 = $this.getLeftDay(new Date().setMonth(new Date().getMonth() + 5)) - 1
                for (let i = 0; i < response.data.length; i++) {
                    let index = parseInt(response.data[i].time.split('-')[2])
                    if ($calendarTable6.eq(leftValue6 + index).find('.total').length > 0) {
                        let total = $calendarTable6.eq(leftValue6 + index).find('.total')
                        total.text(parseFloat(total.text()) + parseFloat((response.data[i].interest).toFixed(2)) + '元')
                    } else {
                        $calendarTable6.eq(leftValue6 + index).append('<span class="total" style="position:absolute;bottom:.07rem;left:.09rem;font-size:.24rem;color:#ed7900;">' + (response.data[i].interest).toFixed(2) + '元</span>')
                    }
                }
            })

            const tableTD = $('.calendar-table td div')
            tableTD.on('click', function() {
                let self = $(this)
                tableTD.css({
                    border: ''
                })
                $(this).css({
                    border: '1px solid #338fff'
                })
                let moneyData = JSON.parse(sessionStorage.getItem(new Date().getMonth() + $this.mySwiper.activeIndex))
                let day = self.next().text()
                let accountALL = 0
                let capital = 0
                $this.biao = []
                for (let i = 0; i < moneyData.length; i++) {
                    // accountALL += moneyData[i].account * 10000
                    // capital += moneyData[i].capital * 10000
                    if (day == parseInt(moneyData[i].time.split('-')[2])) {
                        accountALL += moneyData[i].account * 10000
                        capital += moneyData[i].capital * 10000
                        $this.biao.push(moneyData[i])
                    }
                }
                $this.moneyTIPALL = (accountALL / 10000).toFixed(2)
                $this.moneyTIPIN = (capital / 10000).toFixed(2)
                if ($this.biao.length <= 0) {
                    $this.biaoflag = false
                    return false
                }
                $this.biaoflag = true

                // switch ($this.mySwiper.activeIndex) {
                //     case 0:
                //         {
                //             let moneyData = JSON.parse(sessionStorage.getItem(new Date().getMonth()))
                //             let day = self.next().text()
                //             let accountALL = 0
                //             let capital = 0
                //             $this.biao = []
                //             for (let i = 0; i < moneyData.length; i++) {
                //                 accountALL += moneyData[i].account * 10000
                //                 capital += moneyData[i].capital * 10000
                //                 if (day == parseInt(moneyData[i].time.split('-')[2])) {
                //                     $this.biao.push(moneyData[i])
                //                 }
                //             }
                //             $this.moneyTIPALL = (accountALL / 10000).toFixed(2)
                //             $this.moneyTIPIN = (capital / 10000).toFixed(2)
                //             if ($this.biao.length <= 0) {
                //                 $this.biaoflag = false
                //                 break
                //             }
                //             $this.biaoflag = true
                //             break
                //         }
                //     case 1:
                //         {
                //             let moneyData = JSON.parse(sessionStorage.getItem(new Date().getMonth() + 1))
                //             let day = self.next().text()
                //             let accountALL = 0
                //             let capital = 0
                //             $this.biao = []
                //             for (let i = 0; i < moneyData.length; i++) {
                //                 accountALL += moneyData[i].account * 10000
                //                 capital += moneyData[i].capital * 10000
                //                 if (day == parseInt(moneyData[i].time.split('-')[2])) {
                //                     $this.biao.push(moneyData[i])
                //                 }
                //             }
                //             $this.moneyTIPALL = (accountALL / 10000).toFixed(2)
                //             $this.moneyTIPIN = (capital / 10000).toFixed(2)
                //             if ($this.biao.length <= 0) {
                //                 $this.biaoflag = false
                //                 break
                //             }
                //             $this.biaoflag = true
                //             break
                //         }
                //     case 2:
                //         {
                //             let moneyData = JSON.parse(sessionStorage.getItem(new Date().getMonth() + 2))
                //             let day = self.next().text()
                //             let accountALL = 0
                //             let capital = 0
                //             $this.biao = []
                //             for (let i = 0; i < moneyData.length; i++) {
                //                 accountALL += moneyData[i].account * 10000
                //                 capital += moneyData[i].capital * 10000
                //                 if (day == parseInt(moneyData[i].time.split('-')[2])) {
                //                     $this.biao.push(moneyData[i])
                //                 }
                //             }
                //             $this.moneyTIPALL = (accountALL / 10000).toFixed(2)
                //             $this.moneyTIPIN = (capital / 10000).toFixed(2)
                //             if ($this.biao.length <= 0) {
                //                 $this.biaoflag = false
                //                 break
                //             }
                //             $this.biaoflag = true
                //             break
                //         }
                //     case 3:
                //         {
                //             let moneyData = JSON.parse(sessionStorage.getItem(new Date().getMonth() + 3))
                //             let day = self.next().text()
                //             let accountALL = 0
                //             let capital = 0
                //             $this.biao = []
                //             for (let i = 0; i < moneyData.length; i++) {
                //                 accountALL += moneyData[i].account * 10000
                //                 capital += moneyData[i].capital * 10000
                //                 if (day == parseInt(moneyData[i].time.split('-')[2])) {
                //                     $this.biao.push(moneyData[i])
                //                 }
                //             }
                //             $this.moneyTIPALL = (accountALL / 10000).toFixed(2)
                //             $this.moneyTIPIN = (capital / 10000).toFixed(2)
                //             if ($this.biao.length <= 0) {
                //                 $this.biaoflag = false
                //                 break
                //             }
                //             $this.biaoflag = true
                //             break
                //         }
                //     case 4:
                //         {
                //             let moneyData = JSON.parse(sessionStorage.getItem(new Date().getMonth() + 4))
                //             let day = self.next().text()
                //             let accountALL = 0
                //             let capital = 0
                //             $this.biao = []
                //             for (let i = 0; i < moneyData.length; i++) {
                //                 accountALL += moneyData[i].account * 10000
                //                 capital += moneyData[i].capital * 10000
                //                 if (day == parseInt(moneyData[i].time.split('-')[2])) {
                //                     $this.biao.push(moneyData[i])
                //                 }
                //             }
                //             $this.moneyTIPALL = (accountALL / 10000).toFixed(2)
                //             $this.moneyTIPIN = (capital / 10000).toFixed(2)
                //             if ($this.biao.length <= 0) {
                //                 $this.biaoflag = false
                //                 break
                //             }
                //             $this.biaoflag = true
                //             break
                //         }
                //     case 5:
                //         {
                //             let moneyData = JSON.parse(sessionStorage.getItem(new Date().getMonth() + 5))
                //             let day = self.next().text()
                //             let accountALL = 0
                //             let capital = 0
                //             $this.biao = []
                //             for (let i = 0; i < moneyData.length; i++) {
                //                 accountALL += moneyData[i].account * 10000
                //                 capital += moneyData[i].capital * 10000
                //                 if (day == parseInt(moneyData[i].time.split('-')[2])) {
                //                     $this.biao.push(moneyData[i])
                //                 }
                //             }
                //             $this.moneyTIPALL = (accountALL / 10000).toFixed(2)
                //             $this.moneyTIPIN = (capital / 10000).toFixed(2)
                //             if ($this.biao.length <= 0) {
                //                 $this.biaoflag = false
                //                 break
                //             }
                //             $this.biaoflag = true
                //             break
                //         }
                // }
            })
        })
        this.mySwiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            onSlideChangeEnd: function(swiper) {
                $this.dateNow = (function() {
                    let nextDate = new Date().setMonth(new Date().getMonth() + swiper.activeIndex)
                    return new Date(nextDate).getFullYear() + '年' + (new Date(nextDate).getMonth() + 1) + '月'
                })()
            }
        })
    }
}
</script>
<style lang='less' scoped>
/*日历swiper相关*/

table {
    width: 100%;
}

th {
    font-size: .3rem;
    color: #525452;
    text-align: center;
    background: #fff;
}

td {
    font-size: .28rem;
    border: 1px solid #ebebeb;
    background: #fff;
    height: 1rem;
    color: #7d8c92;
    position: relative;
}

.blueBorder {
    border: 1px solid #338fff;
}

th,
td div {
    padding: .35rem 0;
}

th:nth-of-type(1) {
    color: #338fff;
}

.swiper-container {
    position: relative;
}

.swiper-container-horizontal>.swiper-pagination-bullets {
    height: .67rem;
    bottom: .06rem;
    font-size: 0;
    line-height: .9rem;
    background: #fff;
    position: absolute;
}

.swiper-container {
    font-size: 0;
    overflow: hidden;
    height: 7.73rem;
    background: #fff;
}


/*其他*/

.moneyTIP {
    font-size: 0;
    padding: .2rem 0 .2rem .3rem;
    .backMoney {
        display: inline-block;
        width: .24rem;
        height: .24rem;
        background: url(../assets/amazing.png) no-repeat 50% 50%;
        background-size: 100%;
        vertical-align: middle;
        margin-right: .1rem;
    }
    .goMoney {
        display: inline-block;
        width: .28rem;
        height: .22rem;
        background: url(../assets/noBackMoneyTip.png) no-repeat 50% 50%;
        background-size: 100%;
        vertical-align: middle;
        margin-right: .1rem;
    }
    >span {
        color: #88959b;
        font-size: .24rem;
        vertical-align: middle;
        >span {
            color: #ed7900;
        }
    }
    a {
        display: inline-block;
        vertical-align: middle;
        font-size: .24rem;
        color: #ed7900;
    }
}

.biaoBG {
    height: 3.3rem;
    background: url(../assets/noBackMoney.png) no-repeat 50% 50%;
    background-size: 30%;
}

.biaoList {
    div:last-child {
        border: none;
    }
    div {
        a {
            display: inline-block;
            height: 100%;
            width: 100%;
        }
        background: #fff;
        border-bottom: 1px solid #d9d9d9;
        padding: .4rem 0 .4rem .3rem;
        font-size: 0;
        span:nth-of-type(1) {
            font-size: .32rem;
            color: #505452;
        }
        span:nth-of-type(2) {
            font-size: .26rem;
            color: #ed7900;
            float: right;
            margin-top: .08rem;
        }
        i:nth-of-type(1) {
            display: inline-block;
            width: .2rem;
            height: .36rem;
            float: right;
            background: url(../assets/blink.png) no-repeat 50% 50%;
            background-size: 100%;
            margin-right: .3rem;
            margin-left: .3rem;
        }
    }
}

.swiperTurn {
    font-size: 0;
    background: #fff;
    text-align: center;
    padding: .3rem;
    position: relative;
    .toright {
        display: inline-block;
        width: 0;
        height: 0;
        border: 24px solid transparent;
        border-left-color: #338fff;
        vertical-align: middle;
        margin-left: .24rem;
    }
    .toleft {
        display: inline-block;
        width: 0;
        height: 0;
        border: 24px solid transparent;
        border-right-color: #338fff;
        vertical-align: middle;
        margin-right: .24rem;
    }
    .timer {
        color: #338fff;
        font-size: .3rem;
        vertical-align: middle;
    }
    .toToday {
        color: #505452;
        font-size: .3rem;
        position: absolute;
        right: 0;
        top: .3rem;
        right: .3rem;
    }
}
</style>
