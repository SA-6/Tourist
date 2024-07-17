<script setup>
import { cloneDeep } from 'lodash-es';
import { reactive, ref, onBeforeMount } from 'vue';
import axios from 'axios';
import { useUserStore } from '../../store/userStore'
const userInfo = useUserStore();
const columns = [
  {
    title: '订单序号',
    dataIndex: 'id',
    width: '100px',
    fixed: 'left'
  },
  {
    title: '用户号',
    dataIndex: 'uid',
    width: '100px',
  },
  {
    title: '订单类型',
    dataIndex: 'attachment',
    width: '150px',
  },
  {
    title: '下单日期',
    dataIndex: 'date',
    width: '250px',
  },
  {
    title: '付款日期',
    dataIndex: 'checkInTime',
    width: '250px',
  },
  {
    title: '订单详情',
    dataIndex: 'content',
    width: '300px',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: '150px',
  },
];
const data = ref([]);
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i.toString(),
//     id: `Edrward ${i}`,
//     uid: `User100${i}`,
//     attachment: `London Park no. ${i}`,
//     date: new Date().toISOString(),
//     content: 'Pellentesque accumsan cursus dui,'+ 
//     'sodales blandit urna sodales vitae Pellentesque accumsan cursus dui,'+
//     ' sodales blandit urna urna sodales vitae ipsum Pellentesque accumsan cursus dui,'+
//     'sodales blan urna sodales vitaePellentesque accumsan cursus dui, sodales blan sodales vitae.',
//     status: 'finished'
//   });
// }
//获取投诉记录信息
//请求服务器资源的路径
const serverURL = 'http://localhost:8080'
onBeforeMount(()=>{
  axios({
    method: 'get',
    url: serverURL + '/orders/list/',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': `${userInfo.token}`
    },
  }).then((result)=>{
    console.log(result.data);
    data.value = result.data.data;
  }).catch(function(error){
    console.log(error);
  })
})
const dataSource = ref(data);
</script>

<template>
  <!-- columns属性设置表格的列的相关信息 -->
  <!-- data-source属性设置表格中的数据 -->
  <!-- bordered属性设置表格的边框是否显示 -->
  <div class="tableDiv">
    <a-select
      v-model:value="selectType"
      :options="options"
      mode="tags"
      size="large"
      placeholder="选择订单类型"
      style="width: 200px"
    ></a-select>
    <a-select
      v-model:value="selectDate"
      :options="options"
      mode="tags"
      size="large"
      placeholder="选择日期"
      style="width: 200px"
    ></a-select>
    <a-table :columns="columns" :data-source="dataSource" :scroll="{ x:1300, y:520 }" bordered>
    
    </a-table>
  </div>
</template>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>