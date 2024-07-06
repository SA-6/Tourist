import { createApp } from 'vue'
// import { Button, Menu, Dropdown } from 'ant-design-vue';
import './style.css'
import App from './App.vue'
//引入样式
import 'ant-design-vue/dist/reset.css';
import 'font-awesome/css/font-awesome.min.css'

//使用路由
import router from './router'

createApp(App).use(router).mount('#app')

// App.use(Icon);


