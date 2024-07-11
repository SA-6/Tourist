<script setup>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import { ref, onBeforeMount } from 'vue';
import { message } from 'ant-design-vue';
import router from '../../router';
import axios from 'axios';
import { useRecommendDataStore } from '../../store/recommendDataStore';
const items = ref([
  {
    title: 'Finished',
    description: 'This is a description.',
  },
  {
    title: 'In Progress',
    description: 'This is a description.',
  },
  {
    title: 'Waiting',
    description: 'This is a description.',
  },
]);
//搜索目的景区
const destinationScene = ref('');
function onSearch(){
  console.log("Search");
}
// 推荐景区相关信息
const recommendData = useRecommendDataStore.recommendDataInfo
// 背景图
const imgList = ref([])
// 评分
const rateList = ref([3.5, 4.5,4.0]);
// 跳转景区详情页
function showDetail() {
  console.log("跳转前");
  router.push("/mainPage/scenePage/sceneDetail")
  console.log("跳转后");
}
// 计算三个随机数
// function getRandomNumbers() {
//   const uniqueNumbers = new Set();
//   while (uniqueNumbers.size < 3) {
//     uniqueNumbers.add(Math.floor(Math.random() * 21));
//   }
//   return Array.from(uniqueNumbers);
// }
// 请求服务器地址
// const serverURL = 'http://192.168.0.1:8080/travelGuides'
// onBeforeMount(()=>{
//   // 发送异步请求获取数据
//   axios({
//     method: 'get',
//     url: serverURL
//   }).then((result)=>{
//     if(result.status === '0'){
//       // 请求成功
//       const randomNumbers = getRandomNumbers();
//       recommandData.value.data = result.data;
//       imgList.value = [result.data[randomNumbers[0]].imageUrl, result.data[randomNumbers[1]].imageUrl, result.data[randomNumbers[2]].imageUrl]
//       rateList.value = [result.data[randomNumbers[0]].recommandation, result.data[randomNumbers[1]].recommandation, result.data[randomNumbers[2]].recommandation]
//     }else{
//       // 请求失败
//       message.error({
//         content: ()=> `${recommandData.value.msg}`,
//         style: {
//           marginTop: '10vh',
//         }
//       })
//     }
//   }).catch(function(error){
//     console.log(error);
//   })
// })
</script>

<template>
  <div class="sceneShow">
    <!-- 走马灯 -->
    <a-carousel autoplay arrows effect="fade">
      <template #prevArrow>
      <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
        <LeftCircleOutlined />
      </div>
    </template>
    <template #nextArrow>
      <div class="custom-slick-arrow" style="right: 10px">
        <RightCircleOutlined />
      </div>
    </template>
      <div class="div1"><p class="cityName">北京</p></div>
      <div class="div2"><p class="cityName">上海</p></div>
      <div class="div3"><p class="cityName">广州</p></div>
      <div class="div4"><p class="cityName">深圳</p></div>
    </a-carousel>
  </div>
  <div style="display: flex;margin-top: 10px;">
    <p style="margin-left: 38%; margin-top: 5px;font-size: 1.5em;">目的景点</p>
    <a-input-search
      v-model:value="destinationScene"
      placeholder="输入目的景点"
      enter-button
      @search="onSearch"
      style="width: 20%;margin-left: 20px;margin-top: 8px;"
    />
  </div>
  <div>
    <p style="font-size: 1.5em;margin-top: 20px;">景区推荐及相关攻略</p>
    <div v-for="(item,index) in recommendData.recommendScene" :key="index">
      <div class="recommendDiv" v-if="index%2===0?true:false">
        <a-card hoverable style="width: 20%;margin-left: 15%;" >
          <template #cover>
            <img alt="example" :src="item.imageUrl" />
          </template>
          <a-card-meta :title="item.name">
            <template #description>
              <span>
                <a-rate :value="item.rating"  disabled allow-half/>
                <span class="ant-rate-text">{{ item.rating }}</span>
                <br/>
                <a @click="showDetail()" preventDefault>查看详情</a>
              </span>
            </template>
          </a-card-meta>
        </a-card>
        <p class="recommandStyle1">
          {{ item.description }}
        </p>
      </div>
      <div class="recommandDiv" v-else>
        <p class="recommandStyle2">
          {{ item.description }}
        </p>
        <a-card hoverable style="width: 20%;margin-left: 40px;">
          <template #cover>
            <img alt="example" :src="item.imageUrl" />
          </template>
          <a-card-meta :title="item.name">
            <template #description>
              <span>
                <a-rate :value="item.rating"  disabled allow-half/>
                <span class="ant-rate-text">{{ item.rating }}</span>
              </span>
            </template>
          </a-card-meta>
        </a-card>
      </div>
    </div>
  </div>

  <div>
    <p style="font-size: 1.5em;margin-top: 20px;">路线推荐</p>
    <div>
      <a-steps :current="1" label-placement="vertical" :items="items" />
    </div>
  </div>
  <div>
    <p style="font-size: 1.5em;margin-top: 20px;">近期演出</p>
    <div style="display: flex;">
      <a-card hoverable class="concertCard">
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>www.instagram.com</template>
        </a-card-meta>
      </a-card>
      <a-card hoverable class="concertCard">
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>www.instagram.com</template>
        </a-card-meta>
      </a-card>
      <a-card hoverable class="concertCard">
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>www.instagram.com</template>
        </a-card-meta>
      </a-card>
    </div>
  </div>
  <div>
    <p style="font-size: 1.5em;margin-top: 20px;">附近美食</p>
    <div>
      <a-card title="Delicacies">
        <a-card-grid style="width: 25%; text-align: center;">
          <img src="../../src/assets/image/hotpot.jpg" style="width: 100%; height: 100%;">
        </a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">
          <img src="../../src/assets/image/hotpot.jpg" style="width: 100%; height: 100%;">
        </a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">
          <img src="../../src/assets/image/hotpot.jpg" style="width: 100%; height: 100%;">
        </a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">
          <img src="../../src/assets/image/hotpot.jpg" style="width: 100%; height: 100%;">
        </a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">
          <img src="../../src/assets/image/hotpot.jpg" style="width: 100%; height: 100%;">
        </a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">
          <img src="../../src/assets/image/hotpot.jpg" style="width: 100%; height: 100%;">
        </a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">
          <img src="../../src/assets/image/hotpot.jpg" style="width: 100%; height: 100%;">
        </a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">
          <img src="../../src/assets/image/hotpot.jpg" style="width: 100%; height: 100%;">
        </a-card-grid>
      </a-card>
    </div>
  </div>
</template>

<style scoped>
.sceneShow {
  height:90vh;
  width:100%
}
:deep(.slick-slide) {
  text-align: center;
  height: 100%;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.5;
}
:deep(.slick-slide h3) {
  color: #fff;
}
.div1 {
  background: url(../../src/assets/image/s1.jpg) no-repeat;
  background-size: cover;
  height: 90vh;
}
.div2 {
  background: url(../../src/assets/image/s2.jpg) no-repeat;
  background-size: cover;
  height: 90vh;
}
.div3 {
  background: url(../../src/assets/image/s3.jpg) no-repeat;
  background-size: cover;
  height: 90vh;
}
.div4 {
  background: url(../../src/assets/image/s4.jpg) no-repeat;
  background-size: cover;
  height: 90vh;
}
.cityName {
  margin-top: 40px;
  font-size: 2em;
  font-family: 'Times New Roman', Times, serif;
}
.recommandDiv {
  display: flex;
  margin-top: 30px;
}
.recommandStyle1 {
  width: 50%;
  font-family: "Arial", sans-serif;
  line-height: 3;
  margin-left: 40px;
  padding-top: 30px;
}
.recommandStyle2 {
  width: 50%;
  font-family: "Arial", sans-serif;
  line-height: 3;
  margin-left: 15%;
  padding-top: 30px;
}
.concertCard {
  width:30%;
  height: 100%;
  margin: 20px 5% 0 5%;
}
</style>