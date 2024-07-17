<script setup>
import { h, ref, reactive, watchEffect, onMounted } from 'vue';
import { 
  HomeOutlined,
  EnvironmentOutlined,
  BankOutlined,
  PictureOutlined,
  DislikeOutlined,
  ScheduleOutlined,
  UserOutlined,
  ContactsOutlined,
  BarsOutlined,
  VerticalAlignTopOutlined,
  CommentOutlined
 } from '@ant-design/icons-vue';
import router from '../router'
import { useUserStore } from '../store/userStore'
import { message } from 'ant-design-vue';
import axios from 'axios';
import { RouterView } from 'vue-router';
//使用pinia中定义的store
const userStore = useUserStore()
//读取用户数据
const userInfo = userStore.userInfo
// 选中的菜单项
const current = ref(['/mainPage/overview']);
// 用户输入的消息
const question = ref('')
// 存储消息记录
const infoList = ref([])
// 定义菜单项
const items = reactive([
  {
    key: '/mainPage/overview',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/mainPage/hotelPage',
    icon: () => h(BankOutlined),
    label: '酒店',
    title: '酒店',
  },
  {
    key: '/mainPage/scenePage',
    icon: () => h(PictureOutlined),
    label: '景区',
    title: '景区',
  },
  {
    key: '/mainPage/cityPage',
    icon: () => h(EnvironmentOutlined),
    label: '城市',
    title: '城市',
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
// 设置内容显示框的样式
const layoutContentStyle = ref({ 
  padding: '0 0 0 0', 
  marginTop: '0',
  isHeightSet: false
})
// 设置头部导航栏的背景样式
const backgroundStyle = ref('transparent');
// 设置登录按钮的背景样式
const btnStyle = ref('transparent')
//设置布局的高度
const ALayOutHeight = ref('300%')
// 服务器请求路径
const serverURL = 'http://192.168.40.121:8080'
//选择菜单项后触发的事件
function selectMenuItem(item) {
  current.value = [item.key];
  console.log(111111,current.value);
}

// watchEffect(() => {
//   changeRouterView(current.value[0])
// })

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
    ALayOutHeight.value = '500%'
    if(layoutContentStyle.value.isHeightSet){
      delete layoutContentStyle.value.height
      layoutContentStyle.value.isHeightSet = false
    }
  }
  router.push(key);
}

// 滚动条监听事件
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

// 跳转登录界面 
function login() {
  router.push("/login")
}

onMounted(()=>{
  console.log(userInfo);
})
const handleMenuClick = e => {
  console.log(e);
  if(e.key === '0'){
    console.log("跳转登录页面");
    router.push("/login")
  }else if(e.key === '1'){
    //跳转个人信息页面
    console.log("跳转个人信息页面");
    router.push("/mainPage/userInfo")
  }else{
    //退出登录 清空用户信息
    userStore.clearUserInfo()
  }
};
// 显示聊天机器人
const open = ref(false)
function showChatBot() {
  open.value = true
}
//回到顶部
function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
// 发送问题给chatGPT
async function query(data) {
  const response = await fetch(
      "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B",
      {
          headers: {
              Authorization: "Bearer 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",
              "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
      }
  );
  const result = await response.json();
  return result;
}
function sendInfoToBot() {
  infoList.value.push(question.value)
  question.value = ''
  query({"inputs": question.value}).then((response) => {
      console.log(JSON.stringify(response));
  });
}

</script>

<template>
  <!-- 页面整体布局 -->
  <a-layout :style="{height: ALayOutHeight}">
    
    <a-layout-content :style="layoutContentStyle">
      <div :style="{ background: '#fff', padding: '0', minHeight: '100%'}">

        <router-view></router-view>

        <!-- 悬浮按钮 -->
        <a-float-button-group trigger="hover" type="primary" :style="{ right: '24px' }">
          <template #icon>
            <BarsOutlined />
          </template>
          <a-float-button @click="backToTop">
            <template #icon>
              <VerticalAlignTopOutlined />
            </template>
          </a-float-button>
          <a-float-button @click="showChatBot">
            <template #icon>
              <CommentOutlined />
            </template>
          </a-float-button>
        </a-float-button-group>
        <!-- 抽屉 -->
        <a-drawer
          v-model:open="open"
          class="custom-class"
          root-class-name="root-class-name"
          :root-style="{ color: 'blue' }"
          style="color: red"
          title="旅游推荐助手"
          placement="right"
        >
          <div class="chatBox">
            <div class="infoBox">

            </div>
            <div class="btnBox">
              <input v-model="question">
              <button @click="sendInfoToBot">发送</button>
            </div>
          </div>
        </a-drawer>
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

.avatarBtn {
  width: 100px;
  padding: 0;
  margin: 8px 10px 0 10px;
  width: 150px;
  height: 70px;
  position: relative;
}

.avatarBtn :deep(button){
  height:60px;
}

.avatarBtn :deep(.ant-dropdown-trigger) {
  width: 50px;
}

.chatBox {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.infoBox {
  height:95%;
  width:90%
}
.btnBox {
  display: inline-block;
  width: 100%
}
.btnBox input {
  width: 80%;
  height: 100%;
  margin-right: 3px;
}
</style>