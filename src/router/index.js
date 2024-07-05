//创建应用整个APP的路由器
import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
//导入组件
import MainPage from '../components/MainPage.vue'
import Login from '../components/Login.vue'
//设置路由
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path:'/login',
    name:'login',
    component: Login
  },
  {
    path: '/mainPage',
    name: 'mainPage',
    component: MainPage,
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
