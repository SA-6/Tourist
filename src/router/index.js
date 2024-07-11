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
import ScenePage from '../components/ScenePage.vue'
import SceneDetail from '../components/SceneDetail.vue'
import ComplainRecord from '../components/ComplainRecord.vue'
import ComplainAdd from '../components/ComplainAdd.vue'
import CityPage from '../components/CityPage.vue'
import Notice from '../components/Notice.vue'
import UserInfo from '../components/UserInfo.vue'
import Test from '../components/Test.vue'
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
