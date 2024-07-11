import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//引入样式
import 'ant-design-vue/dist/reset.css';
import 'font-awesome/css/font-awesome.min.css'
//使用路由
import router from './router'
//使用pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
createApp(App).use(router).use(pinia).mount('#app')
