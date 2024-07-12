//创建应用整个APP的路由器
import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
//导入组件
import MainPage from '../components/MainPage.vue'
import Login from '../components/User/Login.vue'
import HotelPage from '../components/Hotel/HotelPage.vue'
import Register from '../components/User/Register.vue'
import Overview from '../components/Overview.vue'
import HotelReserve from '../components/Hotel/HotelReserve.vue'
import HotelDetail from '../components/Hotel/HotelDetail.vue'
import ScenePage from '../components/Scene/ScenePage.vue'
import SceneDetail from '../components/Scene/SceneDetail.vue'
import ComplainRecord from '../components/Complain/ComplainRecord.vue'
import ComplainAdd from '../components/Complain/ComplainAdd.vue'
import CityPage from '../components/City/CityPage.vue'
import CityDetail from '../components/City/CityDetail.vue'
import Notice from '../components/Notice/Notice.vue'
import UserInfo from '../components/User/UserInfo.vue'
import Test from '../components/Test.vue'
import DetailPage from '../components/DetailPage.vue'
import ResetPassword from '../components/User/ResetPassword.vue'
//设置路由
const routes = [
  {
    path: '/',
    redirect: '/mainPage'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: ResetPassword
  },
  // 将test换成detailPage  显示酒店、景区或城市的详情页
  {
      path: '/test',
      name: 'test',
      component: Test
  },
  {
    path: '/mainPage',
    name: 'mainPage',
    component: MainPage,
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: Overview
      },
      {
        path: 'scenePage',
        name: 'scenePage',
        component: ScenePage,
      },
      {
        path: 'sceneDetail',
        name: 'sceneDetail',
        component: SceneDetail
      },
      {
        path: 'cityPage',
        name: 'cityPage',
        component: CityPage
      },
      {
        path: 'cityDetail',
        name: 'cityDetail',
        component: CityDetail
      },
      {
        path: 'notice',
        name: 'notice',
        component: Notice
      },
      {
        path: 'complainRecord',
        name: 'complainRecord',
        component: ComplainRecord
      },
      {
        path: 'complainAdd',
        name: 'complainAdd',
        component: ComplainAdd
      },
      {
        path: 'userInfo',
        name: 'userInfo',
        component: UserInfo
      },
      {
        path: 'hotelPage',
        name : 'hotelPage',
        component: HotelPage
      },
      {
        path: 'hotelReserve',
        name: 'hotelReserve',
        component: HotelReserve
      },
      {
        path: 'DetailPage',
        name: 'detailPage',
        component: DetailPage
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
