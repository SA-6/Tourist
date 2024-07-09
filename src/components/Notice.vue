<script setup>
import { onBeforeMount, ref } from 'vue';
const activeKey = ref([]);
const noticeList = ref([
  {
    header: '《关于都江堰水位预警的通知》',
    content: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    header: '《关于峨眉山山体滑坡预警的通知》',
    content: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    header: '《关于xx酒店违规的处罚通知》',
    content: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  },
  {
    header: '《关于xx景点闭馆休整的通知》',
    content: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.'
  }
])
//在挂载组件之前获取数据
//请求服务器的路径
const serverURL = '';

// onBeforeMount(()=>{
//   //发送异步请求
//   axios({
//     method: 'get',
//     url: serverURL,
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `${localStorage.getItem("token")}`
//     }
//   }).then((result)=>{
//     //读取响应中携带的数据
//     noticeList.value = result.data
//   }).catch(function(error){
//     //打印错误信息
//     console.log(error);
//   })
// })
</script>

<template>
  <a-collapse v-model:activeKey="activeKey" accordion>
    <a-collapse-panel v-for="(item,index) in noticeList" :key="index" :header="item.header">
      <p>{{item.content}}</p>
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped>

</style>