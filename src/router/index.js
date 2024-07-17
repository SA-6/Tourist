//创建应用整个APP的路由器
import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import { message } from 'ant-design-vue';
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
import UserDetail from '../components/User/UserDetail.vue'
// import Test from '../components/Test.vue'
import ResetPassword from '../components/User/ResetPassword.vue'
//设置路由
const routes = [
  {
    path: '/',
    redirect: '/mainPage/overview'
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
        path: 'scene/scenePage',
        name: 'scenePage',
        component: ScenePage,
      },
      {
        path: 'scene/sceneDetail/:sceneName/:sceneId',
        name: 'sceneDetail',
        component: SceneDetail,
        props: true
      },
      // {
      //   path: 'scene/sceneDetail',
      //   name: 'sceneDetail',
      //   component: SceneDetail,
      // },
      {
        path: 'city/cityPage',
        name: 'cityPage',
        component: CityPage
      },
      {
        path: 'city/cityDetail/:cityName',
        name: 'cityDetail',
        component: CityDetail,
        props: true
      },
      {
        path: 'notice',
        name: 'notice',
        component: Notice
      },
      {
        path: 'complain/complainRecord',
        name: 'complainRecord',
        component: ComplainRecord,
      },
      {
        path: 'complain/complainAdd',
        name: 'complainAdd',
        component: ComplainAdd
      },
      {
        path: 'user/userDetail',
        name: 'userDetail',
        component: UserDetail
      },
      {
        path: 'hotel/hotelPage',
        name : 'hotelPage',
        component: HotelPage
      },
      {
        path: 'hotel/hotelReserve',
        name: 'hotelReserve',
        component: HotelReserve
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

//设置全局路由守卫，在登录后才能查看投诉信息
router.beforeEach((to, from, next) => {
  const username = localStorage.getItem('username')
  // 检查特定的路由路径
  if (['/mainPage/complain/complainRecord','/mainPage/complain/complainAdd','/mainPage/user/userDetail'].includes(to.path)) {
    // 检查 username 是否为空
    if (!username) {
      // 如果为空，则不跳转或根据需要重定向到其他页面
      alert('您还未登录,请先登录后查看!');
      next(false); // 阻止跳转
      window.location.reload();
    } else {
      next(); // 允许跳转
    }
  } else {
    // 对其他页面的跳转没有影响
    next();
  }
});
export default router;