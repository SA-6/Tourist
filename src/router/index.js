//创建应用整个APP的路由器
import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
//导入组件
import MainPage from '../components/MainPage.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Overview from '../components/Overview.vue'
import HotelReserve from '../components/HotelReserve.vue'
import HotelDetail from '../components/HotelDetail.vue'
import ScenePlay from '../components/ScenePlay.vue'
import SceneEat from '../components/SceneEat.vue'
import ComplainRecord from '../components/ComplainRecord.vue'
import ComplainAdd from '../components/ComplainAdd.vue'
import TripTraffic from '../components/TripTraffic.vue'
import TripWeather from '../components/TripWeather.vue'
import Notice from '../components/Notice.vue'

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
        path: 'hotelReserve',
        name: 'hotelReserve',
        component: HotelReserve
      },
      {
        path: 'hotelDetail',
        name: 'hotelDetail',
        component: HotelDetail
      },
      {
        path: 'scenePlay',
        name: 'scenePlay',
        component: ScenePlay
      },
      {
        path: 'sceneEat',
        name: 'sceneEat',
        component: SceneEat
      },
      {
        path: 'tripTraffic',
        name: 'tripTraffic',
        component: TripTraffic
      },
      {
        path: 'tripWeather',
        name: 'tripWeather',
        component: TripWeather
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
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
