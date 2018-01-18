/*js*/
import Vue from 'vue'
import App from './App'
import fastClick from 'fastclick'
import autoRem from './config/auto-rem'
import vueRouter from 'vue-router'
import routes from './config/routes'
import TrackingIO from './config/reyunh5.min1.1.0'
// import { InfiniteScroll } from 'mint-ui'
// import { Indicator } from 'mint-ui'

/*css*/
import './config/reset.css'
import 'mint-ui/lib/style.css'
import 'animate.css'
/*global function*/
Vue.use(vueRouter)
    // Vue.use(InfiniteScroll)


/*factclick*/
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        fastClick.attach(document.body)
    }, false)
}



/*global set title*/
// Vue.directive('title', {
//     inserted: function(el, binding) {
//         //利用iframe的onload事件刷新页面
//         document.title = el.innerText
//         el.remove()
//         var iframe = document.createElement('iframe')
//         iframe.style.visibility = 'hidden'
//         iframe.style.width = '1px'
//         iframe.style.height = '1px'
//         iframe.onload = function() {
//             setTimeout(function() {
//                 document.body.removeChild(iframe);
//             }, 0)
//         }
//         document.body.appendChild(iframe)
//     }
// })

/*router reset*/
const router = new vueRouter({ routes })

/*vue reset*/
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
