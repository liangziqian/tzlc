import c_login from '../pages/Login'
import c_registry from '../pages/Registry'
import c_forgetpassword from '../pages/ForgetPassword'
import c_index from '../pages/Index'
import c_loginpassword from '../pages/LoginPassword'
import c_home from '../pages/home'
import c_money from '../pages/money'
import c_person from '../pages/person'
import c_find from '../pages/find'
import c_detail from '../pages/detail'
import c_setup from '../pages/setup'
import c_date from '../pages/date'
import c_dealPassword from '../pages/dealPassword'
import c_detailtobuy from '../pages/detailToBuy'
import c_bindbank from '../pages/bindBank'
import c_success from '../pages/success'
import c_realname from '../pages/realname'
import c_capital from '../pages/myCapital'
import c_changePassword from '../pages/changePassword'
import c_bindTelphone from '../pages/bindTelphone'
import c_nickname from '../pages/nickname'
import c_cash from '../pages/cash'
import c_invest from '../pages/invest'
import c_transactionRecord from '../pages/transactionRecord'
import c_profit from '../pages/profit'
import c_charge from '../pages/charge'
import c_withdraw from '../pages/withdraw'
import c_investDetail from '../pages/investDetail'
import c_soldout from '../pages/soldOut'
import c_hongbao from '../pages/hongbao'
import c_hongbaodetail from '../pages/hongbaodetail'
import c_hongbiaodown from '../pages/redpackageused'
import c_noob from '../pages/noob'
import c_safe from '../pages/safe'
import c_aboutus from '../pages/aboutus'
import c_friend from '../pages/friend'
import c_friend1 from '../pages/friend1'
import c_msg from '../pages/msg'
import c_question from '../pages/question'
import c_suggest from '../pages/suggest'
import c_active from '../pages/active'
import c_msgdetail from '../pages/msgdetail'
import c_questiondetail from '../pages/questiondetail'
import c_datedetail from '../pages/datedetail'
import c_turntable from '../pages/turntable'
import c_turntablesj from '../pages/turntablesj'
import c_friendlist from '../pages/friendlist'
import c_guid from '../pages/guid'
import c_guid11 from '../pages/guid11'
import c_guid22 from '../pages/guid22'
import c_guid33 from '../pages/guid33'
import c_guid44 from '../pages/guid44'
import c_guid88 from '../pages/guid88'
import c_shangyeh5 from '../pages/shangyeh5'
import c_successr from '../pages/successr'
import c_noop from '../pages/noop'
import c_active11 from '../pages/active11'
import c_active1 from '../pages/active1'
import c_fuli from '../pages/fuli'
import c_jiaxi from '../pages/jiaxi'
import c_hongbao1 from '../pages/hongbao1'
import c_licai from '../pages/licai'
import c_zcxy from '../pages/zcxy'
import c_zzzm from '../pages/zzzm'
import c_christmas from '../pages/christmas'
import c_qcjiaxi from '../pages/qcjiaxi'
import c_gqptai from '../pages/gqptai'
import c_kaimendaji from '../pages/kaimendaji'

export default [
    { path: '/', component: c_index }, {
        path: '/index',
        component: c_index,
        children: [
            { path: '/index/home', component: c_home },
            { path: '/index/money', component: c_money },
            { path:'/index/fuli',component:c_fuli,
              children:[
                {path:'/index/fuli/active',component:c_active},
                {path:'/index/fuli/hongbao1',component:c_hongbao1},
                {path:'/index/fuli/jiaxi',component:c_jiaxi},
                {path:'/index/fuli/licai',component:c_licai},
              ]
            },
            { path: '/index/person', component: c_person },
            { path: '/index/find', component: c_find }
        ]
    },
    { path: '/registry', component: c_registry },
    { path: '/dealpassword', component: c_dealPassword },
    { path: '/forgetpassword', component: c_forgetpassword },
    { path: '/loginpassword', component: c_loginpassword },
    { path: '/detail/:id', component: c_detail },
    { path: '/setup', component: c_setup },
    { path: '/date', component: c_date },
    { path: '/detailtobuy', component: c_detailtobuy },
    { path: '/mybank', component: c_bindbank },
    { path: '/login', component: c_login },
    { path: '/success', component: c_success },
    { path: '/realname', component: c_realname },
    { path: '/myCapital', component: c_capital },
    { path: '/changePassword', component: c_changePassword },
    { path: '/bindTelphone', component: c_bindTelphone },
    { path: '/nickName', component: c_nickname },
    { path: '/cash', component: c_cash },
    { path: '/invest', component: c_invest },
    { path: '/transactionRecord', component: c_transactionRecord },
    { path: '/profit', component: c_profit },
    { path: '/charge', component: c_charge },
    { path: '/withdraw', component: c_withdraw },
    { path: '/investdetail/:id/:tid', component: c_investDetail },
    { path: '/soldout', component: c_soldout },
    { path: '/redpackage', component: c_hongbao1 },
    { path: '/redpackagedetail', component: c_hongbaodetail },
    { path: '/redpackageused', component: c_hongbiaodown },
    { path: '/noob', component: c_noob },
    { path: '/safe', component: c_safe },
    { path: '/aboutus', component: c_aboutus },
    { path: '/friend', component: c_friend },
    { path: '/friend1', component: c_friend1 },
    { path: '/msg', component: c_msg },
    { path: '/question', component: c_question },
    { path: '/suggest', component: c_suggest },
    { path: '/active', component: c_active },
    { path: '/msgdetail:id', component: c_msgdetail },
    { path: '/questiondetail:id', component: c_questiondetail },
    { path: '/datedetail:id', component: c_datedetail },
    { path: '/turntable', component: c_turntable },
    { path: '/turntablesj', component: c_turntablesj },
    { path: '/friendlist', component: c_friendlist },
    { path: '/guid', component: c_guid },
    { path: '/guid11', component: c_guid11 },
    { path: '/guid22', component: c_guid22 },
    { path: '/guid33', component: c_guid33 },
    { path: '/guid44', component: c_guid44 },
    { path: '/guid88', component: c_guid88 },
    { path: '/shangyeh5', component: c_shangyeh5 },
    { path: '/successr', component: c_successr },
    { path: '/noop', component: c_noop },
    { path: '/active11', component: c_active11 },
    { path: '/zcxy', component: c_zcxy },
    { path: '/zzzm', component: c_zzzm },
    { path: '/christmas', component: c_christmas },
    { path: '/qcjiaxi', component: c_qcjiaxi },
    { path: '/gqptai', component: c_gqptai },
    { path: '/kaimendaji', component: c_kaimendaji}
]
