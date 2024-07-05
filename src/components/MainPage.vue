<script setup>
import { h, ref, reactive, watchEffect } from 'vue';
import { HomeOutlined,
  CarOutlined,
  BankOutlined,
  PictureOutlined,
  DislikeOutlined,
  ScheduleOutlined
 } from '@ant-design/icons-vue';
 import router from '../router'
//选中的菜单项
const current = ref(['/overview']);
//定义菜单项
const items = reactive([
  {
    key: '/overview',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: 'option2',
    icon: () => h(BankOutlined),
    label: '酒店',
    title: '酒店',
    children: [
      {
        key: '/hotelReserve',
        label: '预订',
        title: '预订'
      },
      {
        key: '/hotelDetail',
        label: '详情',
        title: '详情'
      },
    ]
  },
  {
    key: 'option3',
    icon: () => h(PictureOutlined),
    label: '景区',
    title: '景区',
    children: [
      {
        key:'/scenePlay',
        label:'娱乐',
        title:'娱乐'
      },
      {
        key:'/sceneEat',
        label:'餐饮',
        title:'餐饮'
      }
    ]
  },
  {
    key: 'option4',
    icon: () => h(CarOutlined),
    label: '出行',
    title: '出行',
    children: [
      {
        key: '/tripTraffic',
        label: '交通',
        title: '交通',
      },
      {
        key: '/tripWeather',
        label: '天气',
        title: '天气',
      },
    ],
  },
  {
    key: 'option5',
    icon: () => h(DislikeOutlined),
    label: '投诉',
    title: '投诉',
    children: [
      {
        key: '/complainRecord',
        label: '记录',
        title: '记录',
      },
      {
        key: '/complainAdd',
        label: '添加',
        title: '添加',
      },
    ],
  },
  {
    key: '/notice',
    icon: () => h(ScheduleOutlined),
    label: '公告',
    title: '公告',
  },
]);
//选择菜单项后触发的事件
function selectMenuItem(item) {
  console.log(item.key);
  current.value = [item.key];
}

watchEffect(()=>{
  changeRouterView(current.value[0])
})

function changeRouterView(key) {
  router.push(key);
}

const backgroundStyle = ref('transparent');
//滚动条监听事件
window.addEventListener('scroll',function(){
  const distance = this.document.documentElement.scrollTop;
  if(distance > 200 ){
    backgroundStyle.value = '#fff'
  }else{
    backgroundStyle.value = 'transparent'
  }
})
</script>

<template>
  <!-- 页面整体布局 -->
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%', height: '80px', background: backgroundStyle, padding: '0 0 0 0', display: 'flex'}">
      <!-- LOGO -->
      <div class="logo">
        <img src="../../src/assets/image/mtfy.jpg" />
      </div>
      <!-- 菜单栏 -->
      <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" style="height: 80px; background: transparent; width: 80%" @click="selectMenuItem"/>
      <!-- 登录按钮 -->
      <a-button ghost style="padding: 0; margin: 0; width: 80px; height: 60px; position: relative; margin-top: 5px;">Sign In</a-button>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 0 0 0', marginTop: '0' }">
      <div :style="{ background: '#fff', padding: '0', minHeight: '100%' }">
        <router-view></router-view>
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Tourist System ©2024 Created by CSU-SoftwareEngineer-2204
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.logo {
  position: relative;
  width: 120px;
  height: 80px;
  background: #141414;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo img {
  padding: 0 0 0 0;
  margin: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: transparent;
}
.site-layout .site-layout-background {
  background: #fff;
}

.site-layout .site-layout-background {
  background: transparent;
}

</style>