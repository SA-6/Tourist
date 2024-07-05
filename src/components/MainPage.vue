<script setup>
import { h, ref, watch, reactive } from 'vue';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  CarOutlined,
  BankOutlined,
  PictureOutlined,
  DislikeOutlined,
  ScheduleOutlined
} from '@ant-design/icons-vue';
const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1'],
});
const items = reactive([
  {
    key: 'option1',
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
        key: 'option2-1',
        label: '预订',
        title: '预订'
      },
      {
        key: 'option2-2',
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
        key:'option3-1',
        label:'娱乐',
        title:'娱乐'
      },
      {
        key:'option3-2',
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
        key: 'option4-1',
        label: '交通',
        title: '交通',
      },
      {
        key: 'option4-2',
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
        key: 'option5-1',
        label: '记录',
        title: '记录',
      },
      {
        key: 'option5-2',
        label: '添加',
        title: '添加',
      },
    ],
  },
  {
    key: 'option6',
    icon: () => h(ScheduleOutlined),
    label: '公告',
    title: '公告',
  },
]);
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  },
);
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};
// 在JS中写页面布局的CSS样式
const mainStyle = ref({
  positon: 'relative',
  height: '100vh',
})
const siderStyle = ref({
  textAlign: 'center',
  height: '100vh'
})
const headerStyle = ref({
  positon: 'relative',
  backgroundColor: '#454545',
  color: '#ffffff'         //设置字体的颜色
})
const contentStyle = ref({
  position: 'relative'
})
const footerStyle = ref({
  position: 'relative'
})
</script>

<template>
  <!-- 页面整体布局 -->
    <a-layout>
      <a-layout-header :style="headerStyle">
        <h1>Tourist System</h1>
      </a-layout-header>
      <a-layout>
        <a-layout-sider :style="siderStyle" collapsible= 'true' :collapsed="state.collapsed">
          <div style="width: 100%">
            <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
              <MenuUnfoldOutlined v-if="state.collapsed" />
              <MenuFoldOutlined v-else />
            </a-button>
            <a-menu
              v-model:openKeys="state.openKeys"
              v-model:selectedKeys="state.selectedKeys"
              mode="inline"
              theme="dark"
              :items="items"
            ></a-menu>
          </div>
        </a-layout-sider>
        <a-layout-content :style="contentStyle">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
      <a-layout-footer :style="footerStyle">CopyRight @CSU-SoftwareEngineer-2204</a-layout-footer>
    </a-layout>
</template>

<style scoped>

</style>