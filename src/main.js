import { createApp } from 'vue'
// import { Button, Menu, Dropdown } from 'ant-design-vue';
import './style.css'
import App from './App.vue'
//引入样式
import 'ant-design-vue/dist/reset.css';
import 'font-awesome/css/font-awesome.min.css'

//使用路由
import router from './router'
<<<<<<< HEAD
//使用pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
createApp(App).use(router).use(pinia).mount('#app')
=======

createApp(App).use(router).mount('#app')




>>>>>>> 87f84481658645b33cd44ac8bc7743593db62342
