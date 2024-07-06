<script setup>
import { ref } from 'vue';
const activeKey = ref([]);
const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
const noticeList = ref([
  {
    header: '《关于都江堰水位预警的通知》',
    content: '111111111'
  },
  {
    header: '《关于峨眉山山体滑坡预警的通知》',
    content: '2222222222222'
  },
  {
    header: '《关于xx酒店违规的处罚通知》',
    content: '333333333333333333'
  },
  {
    header: '《关于xx景点闭馆休整的通知》',
    content: '44444444444444444444444'
  }
])

</script>

<template>
  <a-collapse v-model:activeKey="activeKey" accordion>
    <!-- <a-collapse-panel key="1" header="This is panel header 1">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="This is panel header 2">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="This is panel header 3">
      <p>{{ text }}</p>
    </a-collapse-panel> -->
    <a-collapse-panel v-for="(item,index) in noticeList" :key="index" :header="item.header">
      <p>{{item.content}}</p>
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped>

</style>