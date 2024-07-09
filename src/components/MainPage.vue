<script setup>
import { h, ref, reactive, watchEffect } from 'vue';
import { HomeOutlined,
  EnvironmentOutlined,
  BankOutlined,
  PictureOutlined,
  DislikeOutlined,
  ScheduleOutlined
 } from '@ant-design/icons-vue';
 import router from '../router'
//选中的菜单项
const current = ref(['/mainPage/overview']);
//定义菜单项
const items = reactive([
  {
    key: '/mainPage/overview',
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
        key: '/mainPage/hotelReserve',
        label: '预订',
        title: '预订'
      },
      {
        key: '/mainPage/hotelDetail',
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
        key:'/mainPage/scenePlay',
        label:'娱乐',
        title:'娱乐'
      },
      {
        key:'/mainPage/sceneEat',
        label:'餐饮',
        title:'餐饮'
      }
    ]
  },
  {
    key: 'option4',
    icon: () => h(EnvironmentOutlined),
    label: '城市',
    title: '城市',
    children: [
      {
        key: '/mainPage/tripTraffic',
        label: '交通',
        title: '交通',
      },
      {
        key: '/mainPage/tripWeather',
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
        key: '/mainPage/complainRecord',
        label: '记录',
        title: '记录',
      },
      {
        key: '/mainPage/complainAdd',
        label: '添加',
        title: '添加',
      },
    ],
  },
  {
    key: '/mainPage/notice',
    icon: () => h(ScheduleOutlined),
    label: '公告',
    title: '公告',
  },
]);
//设置内容显示框的样式
const layoutContentStyle = ref({ 
  padding: '0 0 0 0', 
  marginTop: '0',
  isHeightSet: false
})
//设置头部导航栏的背景样式
const backgroundStyle = ref('transparent');
//设置登录按钮的背景样式
const btnStyle = ref('transparent')
//设置布局的高度
const ALayOutHeight = ref('300%')
//选择菜单项后触发的事件
function selectMenuItem(item) {
  console.log(item.key);
  current.value = [item.key];
}

watchEffect(()=>{
  changeRouterView(current.value[0])
})

function changeRouterView(key) {
  if(['/mainPage/complainRecord', '/mainPage/complainAdd', '/mainPage/notice'].includes(key)){
    console.log("进入判断，调整高度");
    layoutContentStyle.value.marginTop = '80px';
    ALayOutHeight.value = '100%';
    btnStyle.value = '#76EEC6'
    if(!layoutContentStyle.value.isHeightSet){
      layoutContentStyle.value.isHeightSet = true;
      layoutContentStyle.value.height = '90%';
    }
  }else{
    btnStyle.value = 'transparent';
    layoutContentStyle.value.marginTop = '0';
    ALayOutHeight.value = '800%'
    if(layoutContentStyle.value.isHeightSet){
      delete layoutContentStyle.value.height
      layoutContentStyle.value.isHeightSet = false
    }
  }
  router.push(key);
}

//滚动条监听事件
// window.addEventListener('scroll',function(){
//   if(current.value[0] == '/mainPage/overview'){
//     const distance = this.document.documentElement.scrollTop;
//     if(distance > 200 ){
//       console.log(current.value[0]);
//       backgroundStyle.value = '#fff'
//       btnStyle.value = '#76EEC6'
//     }else{
//       backgroundStyle.value = 'transparent'
//       btnStyle.value = 'transparent'
//     }
//   }
// })
//登录
function login() {
  router.push("/login")
}
</script>

<template>
  <!-- 页面整体布局 -->
  <a-layout :style="{height: ALayOutHeight}">
    <a-layout-header :style="{ position: 'fixed', zIndex: 10, width: '100%', height: '80px', background: 'transparent', padding: '0 0 0 0', display: 'flex', background: 'transparent', backdropFilter: 'blur(10px)'}">
      <!-- LOGO -->
      <div class="logo">
        <img src="../../src/assets/image/mtfy.jpg" />
      </div>
      <div class="name">
        <h2>TouristSystem</h2>
      </div>
      <!-- 菜单栏 -->
      <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" style="height: 80px; background: transparent; backdrop-filter: blur(10px); width: 80%" @click="selectMenuItem"/>
      <!-- 登录按钮 -->
      <a-button ghost :style="{padding: '0', margin: '0', width: '80px', height: '60px', position: 'relative', marginTop: '8px', background:btnStyle}" @click="login">
        Sign In
      </a-button>
    </a-layout-header>
    <a-layout-content :style="layoutContentStyle">
      <div :style="{ background: '#fff', padding: '0', minHeight: '100%'}">
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

.name {
  font-family:'Times New Roman', Times, serif;
}
</style>