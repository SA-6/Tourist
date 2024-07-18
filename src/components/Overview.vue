<script setup>
import router from '../router'
import { onBeforeMount, ref, onMounted } from 'vue';
import { useRecommendDataStore } from '../store/recommendDataStore'
import axios from 'axios';
// 推荐信息存储
const recommendInfoStore = useRecommendDataStore()
// 推荐城市
const recommendCity = ref([])
// 推荐景点
const recommendScene = ref([])
// 推荐酒店
const recommendHotel = ref([])
// 服务器请求路径
const serverURL = 'http://localhost:8080'
//获取推荐信息并将信息存入store
function getRecommendInfo() {
  axios({
    method: 'get',
    url: serverURL+'/cities/recommendations',
    header: {
      'Content-Type':'application/json'
    },
  }).then((result)=>{
    console.log(result);
    if(result.data.status === 0){
      // console.log("BBBBB");
      recommendCity.value = result.data.data.popularCitiesList;
      recommendScene.value = result.data.data.scenicSpotsList;
      recommendHotel.value = result.data.data.hotelsList;
      //处理酒店图片列表
      // 将每个城市的 imageUrl 属性更新为实际的 URL 列表
      const updatedRecommendCity = recommendCity.value.map(city => {
        // 分割字符串并返回新的数组
        const imageUrl = city.imageUrl.split(",")[0].slice(1);
        // console.log(imageUrl);
        // 返回更新后的对象
        return {
          ...city,
          imageUrl  // 更新属性名（如果需要）
        };
      });
      //处理景点图片列表
      // 将每个景点的 imageUrl 属性更新为实际的 URL 列表
      const updatedRecommendScene = recommendScene.value.map(scene => {
        // 分割字符串并返回新的数组
        const imageUrl = scene.imageUrl.split(",")[0].slice(1);
        // console.log(imageUrl);
        // 返回更新后的对象
        return {
          ...scene,
          imageUrl  // 更新属性名（如果需要）
        };
      });
      // 如果你想更新原始的 reactive ref，可以直接赋值
      recommendCity.value = updatedRecommendCity;
      recommendScene.value = updatedRecommendScene;
      console.log("ddd");
      console.log(result.data.data);
      recommendInfoStore.setRecommendDataInfo(recommendCity,recommendHotel,recommendScene)
      console.log(recommendInfoStore.recommendDataInfo);
    }else{
      message.error({
        content: ()=> '获取失败',
        style: {
          marginTop: '10vh'
        }
      })
    }
  }).catch(function(error){
    console.log(error);
  })
}
//跳转城市详情页
function getCityInfo(cityId,cityName) {
  router.push({ name : 'cityDetail', params: { cityName : cityName, cityId : cityId } })
}
//跳转酒店详情页
function getHotelInfo(hotelId,hotelName) {
  router.push({ name : 'hotelDetail', query: { hotelId : hotelId } })
}
//跳转景区详情页
function getSceneInfo(sceneId,sceneName) {
  router.push({ name : 'sceneDetail', params: { sceneName : sceneName, sceneId : sceneId } })
}
onMounted(()=>{
  getRecommendInfo();
})
</script>

<template>
  <div class="pictureShow">
    <!-- 走马灯 -->
    <a-carousel autoplay effect="fade">
      <div><img src="../../src/assets/image/s1.jpg" style="object-fit: fill; width: 100%;"/></div>
      <div><img src="../../src/assets/image/s2.jpg" style="object-fit: fill; width: 100%;"/></div>
      <div><img src="../../src/assets/image/s3.jpg" style="object-fit: fill; width: 100%;"/></div>
      <div><img src="../../src/assets/image/s4.jpg" style="object-fit: fill; width: 100%;"/></div>
    </a-carousel>
  </div>
  
  <!-- 相关简介以及推荐 -->
  <div id="components-grid-demo-flex-align">
    <!-- 系统介绍 -->
    <a-divider orientation="center" class="divider">
      <h1 class="headerTitle">About Us</h1>
    </a-divider>
    <a-row justify="center" align="top" class="row">
      <a-col :span="4">
          <h3 class="title">Welcome to Tourist System</h3>
          <h5 class="viceTitle">Tourist System</h5>
          <p> 
            Pellentesque accumsan cursus dui, 
            sodales blandit urna sodales vitae Pellentesque accumsan cursus dui, 
            sodales blandit urna urna sodales vitae ipsum Pellentesque accumsan cursus dui, 
            sodales blan urna sodales vitaePellentesque accumsan cursus dui, 
            sodales blan sodales vitae.
          </p>
      </a-col>
      <a-col :span="4">
      </a-col>
      <a-col :span="7">
        <img src="../../src/assets/image/package1.jpg">
      </a-col>
    </a-row>
    <!-- 城市推荐 -->
    <a-divider orientation="center" class="divider">
      <h1 class="headerTitle">热门城市</h1>
    </a-divider>
    <a-row justify="space-around" align="middle" class="row">
      <div v-for="(item,index) in recommendCity" :key="index" class="hotel-card-wrapper">
        <a-col :span="4">
          <a-card hoverable style="width: 260px;height: 400px" @click="getCityInfo(item.cityId,item.name)">
            <template #cover>
              <img alt="example" :src="item.imageUrl" />
            </template>
            <a-card-meta :title="item.name">
              <template #description>{{item.description.length > 50 ? item.description.slice(0,51)+'...':item.description}}</template>
            </a-card-meta>
          </a-card>
        </a-col>
      </div>
    </a-row>
    <!-- 酒店推荐 -->
    <a-divider orientation="center" class="divider">
      <h1 class="headerTitle">推荐酒店</h1>
    </a-divider>
    <a-row justify="space-around" align="middle" class="row">
      <div v-for="(item,index) in recommendHotel" :key="index" class="hotel-card-wrapper">
        <a-col :span="4">
          <a-card hoverable style="width: 240px; height: 400px" @click="getHotelInfo(item.hotelId,item.name)">
            <template #cover>
              <img alt="example" :src="item.imageUrl" />
            </template>
            <a-card-meta :title="item.name">
              <template #description>{{item.description.length > 50 ? item.description.slice(0,51)+'...':item.description}}</template>
            </a-card-meta>
          </a-card>
        </a-col>
      </div>
    </a-row>
    <!-- 景点推荐 -->
    <a-divider orientation="center" class="divider" id="dividerHeader">
      <h1 class="headerTitle">热门景点</h1>
    </a-divider>
    <a-row justify="space-between" align="bottom" class="row">
      <div v-for="(item,index) in recommendScene" :key="index" class="hotel-card-wrapper">
        <a-col :span="4">
          <a-card hoverable style="width: 240px;height: 400px" @click="getSceneInfo(item.scenicSpotId,item.name)">
            <template #cover>
              <img alt="example" :src="item.imageUrl" />
            </template>
            <a-card-meta :title="item.name">
              <template #description>{{item.description.length > 50 ? item.description.slice(0,51)+'...':item.description}}</template>
            </a-card-meta>
          </a-card>
        </a-col>
      </div>
    </a-row>
  </div>
  <!--  -->
</template>

<style scoped>
.pictureShow {
  width: 100%;
  height: 50%;
}
:deep(.slick-slide) {
  text-align: center;
  height: 100%;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
:deep(.slick-slide h3) {
  color: #fff;
}
.height-50 {
  height: 70px;
  background-color: #fff;
}
.title {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 2em;
}
.viceTitle {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 1em;
}
#components-grid-demo-flex-align {
  width: 100%;
  background: url(../../src/assets/image/stats.jpg) no-repeat;
  background-attachment: fixed;
  z-index: -1;
  background-size: cover;
}
.divider {
  margin-top: 0px;
  background: transparent;
  height: 150px;
  width: 100%s
}
#dividerHeader {
  margin-top: 0px;
}
.row {
  background: #fff;
  height:500px;
  margin-top: 20px;
  padding-top: 50px;
}
.headerTitle {
  margin-top: 25px;
  color: #fff;
}
.recommandDiv {
  display: flex;
  margin-top: 10px;
  max-height: 100%;
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
</style>
