//创建应用整个APP的路由器
import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
//导入组件
import MainPage from '../components/MainPage.vue'
<<<<<<< HEAD
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
import Notice from '../components/Notice/Notice.vue'
import UserInfo from '../components/User/UserInfo.vue'
import Test from '../components/Test.vue'
=======
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Overview from '../components/Overview.vue'

import HotelPage from '../components/Hotel/HotelPage.vue'
import HotelReserve from '../components/Hotel/HotelReserve.vue'
// import HotelDetail from '../components/Hotel/HotelDetail.vue'

import ScenePage  from '../components/Scene/ScenePage.vue'
import ScenePlay from '../components/ScenePlay.vue'
import SceneEat from '../components/SceneEat.vue'

import CityPage from '../components/City/CityPage.vue'

import DetailPage from '../components/DetailPage.vue'

import ComplainRecord from '../components/ComplainRecord.vue'
import ComplainAdd from '../components/ComplainAdd.vue'
import TripTraffic from '../components/TripTraffic.vue'
import TripWeather from '../components/TripWeather.vue'
import Notice from '../components/Notice.vue'

>>>>>>> 87f84481658645b33cd44ac8bc7743593db62342
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
    path: '/hotelPage',
    name : 'hotelPage',
    component: HotelPage
  },
  {
    path: '/hotelReserve',
    name: 'hotelReserve',
    component: HotelReserve
  },
  {
    path: '/scenePage',
    name: 'scenePage',
    component: ScenePage
  },
  {
    path: '/cityPage',
    name: 'cityPage',
    component: CityPage
  },
  {
    path: '/DetailPage',
    name: 'detailPage',
    component: DetailPage
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
<<<<<<< HEAD
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
=======
      // {
      //   path: '/hotelReserve',
      //   name: 'hotelReserve',
      //   component: HotelReserve
      // },
      // {
      //   path: '/hotelDetail',
      //   name: 'hotelDetail',
      //   component: HotelDetail
      // },
>>>>>>> 87f84481658645b33cd44ac8bc7743593db62342
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
        path: 'test',
        name: 'test',
        component: Test
      }
    ]
  },
<<<<<<< HEAD
  {
    path: '/hotel/page',
    name : 'hotelPage',
    component: HotelPage
    
  }
=======
  
>>>>>>> 87f84481658645b33cd44ac8bc7743593db62342
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
