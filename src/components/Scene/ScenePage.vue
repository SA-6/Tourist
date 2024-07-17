<script setup>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import { ref, onBeforeMount, onMounted, reactive } from 'vue';
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
// const sceneNumber = ref('')
const serverURL = 'http://localhost:8080'
function onSearch(){
  console.log(destinationScene);
  console.log(destinationScene.value);
  axios({
    method: 'get',
    url: serverURL+`/scenicSpots/searchByName?scene_name=${destinationScene.value}`,
    headers: {  
      'Content-Type': 'application/x-www-form-urlencoded'  
    },
  }).then((result)=>{
    console.log(result);
    if(result.data.status === 0){
      console.log("成功跳转");
      // sceneNumber.value = result.data.data.id;
      // console.log("景点编号");
      // console.log(sceneNumber.value);
      router.push({ name : 'sceneDetail', params: { sceneName : destinationScene.value, sceneId : result.data.data.id+'' } })
    }
  }).catch(function(error){
    console.log(error);
  })
}
// 推荐景区相关信息存储的读取
const recommendData = useRecommendDataStore().recommendDataInfo
// 推荐景区列表
const sceneList = ref([])
// 跳转景区详情页
function showDetail(sceneName,scenicSpotId) {
  console.log("跳转前");
  console.log("sceneName:"+sceneName);
  console.log("scenicSpotId:"+scenicSpotId);
  router.push({ name : 'sceneDetail', params: { sceneName : sceneName, sceneId : scenicSpotId } })
  console.log("跳转后");
}
//请求地址
// season相关（获取各个季节的景点图片）
const seasonScenes = ref([])
function getSeasonScene() {
  axios({
    method: 'get',
    url: serverURL + '/scenicSpots/season',
    headers: {  
      'Content-Type': 'application/x-www-form-urlencoded'  
    },
  }).then((result)=>{
    console.log(result);
    if(result.data.status === 0){
      seasonScenes.value = result.data.data
    }else{
      message.error({
        content: ()=> '系统繁忙,请稍后再试',
        style: {
          marginTop:'10vh'
        }
      })
    }
  }).catch(function(error){
    console.log(error);
  })
}
// 导游相关
const guidePersons = reactive([
  {
    image         : 'http://demo.mobanwang.com/mb/lo202307/202307003/html/img/team_02.jpg',
    name          : '张亦弛',
    instroduction : '张亦弛是我们的文化遗产专家,他有超过十年的旅行策划经验,擅长设计深度文化探索之旅。无论是探访古老的遗址还是参观世界级博物馆,张亦弛都能为您提供深入的历史和文化背景,让您的旅行充满教育性和启发性'
  },
  {
    image         : 'http://demo.mobanwang.com/mb/lo202307/202307003/html/img/team_02.jpg',
    name          : '张博栋',
    instroduction : '张博栋是我们的自然探险导游,他热爱户外活动和大自然。他已经带领过多个团队穿越峡谷、攀登山峰和探索偏远地区。无论您是想徒步穿越壮丽山脉还是享受原始丛林的静谧，张博栋都能为您规划出一段难忘的自然之旅。'
  },
  {
    image         : 'http://demo.mobanwang.com/mb/lo202307/202307003/html/img/team_02.jpg',
    name          : '王昱凯',
    instroduction : '王昱凯是我们的美食和葡萄酒顾问，他对于各地的美食文化充满热情。他有丰富的厨艺和品酒经验，精通不同国家和地区的独特口味和风味。让王昱凯带领您体验地道的美食之旅，探索当地的餐馆、市场和酒庄。'
  }
])

onMounted(()=>{
  getSeasonScene()
  console.log(recommendData);
  console.log(recommendData.recommendScene);
  sceneList.value = recommendData.recommendScene
})
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
      <div class="div1">
        <p class="cityName">北京</p>
      </div>
      <div class="div2">
        <p class="cityName">上海</p>
      </div>
      <div class="div3">
        <p class="cityName">广州</p>
      </div>
      <div class="div4">
        <p class="cityName">深圳</p>
      </div>
    </a-carousel>
  </div>
  <!-- 搜索框 -->
  <div style="display: flex;margin-top: 10px;">
    <p style="margin-left: 38%; margin-top: 5px;font-size: 1.5em;">目的景点</p>
    <a-input-search v-model:value="destinationScene" placeholder="输入目的景点" enter-button @search="onSearch"
      style="width: 20%;margin-left: 20px;margin-top: 8px;" />
  </div>

  <!-- 景点探索部分 -->
  <section class="explore-wrapper" style="margin-top: 50px;height: 200vh; width: 100%;">
    <div class="explore-container" style="margin: 0 15vw;padding:15px 15px 0 15px;height: 100%;">
      <div class="explore-header" style="padding: 2rem 4rem;height: 20%;">
        <h2 style="font-size: 60px;">
          景点推荐
        </h2>
        <p>
          中国是一个历史悠久、文化灿烂的国家，拥有众多令人叹为观止的景点。
          从雄伟的长城到壮丽的黄山，从古典的故宫到现代的上海外滩，每个地方都有其独特的魅力。
          无论是探索古代文明的遗迹，还是体验现代化都市的繁华，中国的多样性为全世界的旅行者提供了丰富的选择。
          这些景点不仅是自然与人文的完美结合，也是中华民族智慧与精神的体现。
        </p>
      </div>

      <div class="explore-content" style="display: flex;height: 70%;flex-direction:column;">
        <div v-for="(scene,index) in sceneList" :key="index" >
          <div style="display: flex; flex-direction: row;" v-if="index%2==0">
            <div style="width: 100%;flex: 0 0 50%;height: 40%;" class="explore-image">
              <img :src="scene.imageUrl" alt=""
                style="width: 100%;height: 100%;">
            </div>
            <div style="padding: 30px;text-align: left;position: relative;flex: 0 0 50%;height: 50%;"
              class="explore-introduction">
              <div style="height: 90%;">
                <h1>{{ scene.name }}</h1>
                <p>
                  {{ scene.features }}
                </p>
                <p>
                  {{ scene.description }}
                </p>
              </div>
              <hr>
              <div style="display: flex;justify-content: space-between; width: 100%;position: absolute;bottom: 20px;">
                <span>{{ scene.openingDays }}-{{ scene.openingHours }}</span>
                <a style="position: relative;right: 70px;" @click="showDetail(scene.name,scene.scenicSpotId)">Read More
                  <RightCircleOutlined style="position: relative;left: 5px;top: 2px;" />
                </a>
              </div>
            </div>
          </div>
          <div style="display: flex; flex-direction: row;" v-else>
            <div style="padding: 30px;text-align: left;position: relative;flex: 0 0 50%;height: 50%;"
              class="explore-introduction">
              <div style="height: 90%;">
                <h1>{{ scene.name }}</h1>
                <p>
                  {{ scene.features }}
                </p>
                <p>
                  {{ scene.description }}
                </p>
              </div>
              <hr>
              <div style="display: flex;justify-content: space-between; width: 100%;position: absolute;bottom: 20px;">
                <span>{{ scene.openingDays }}-{{ scene.openingHours }}</span>
                <a style="position: relative;right: 70px;">Read More
                  <RightCircleOutlined style="position: relative;left: 5px;top: 2px;" />
                </a>
              </div>
            </div>
            <div style="width: 100%;flex: 0 0 50%;height: 50%;" class="explore-image">
              <img :src="scene.imageUrl" alt=""
                style="width: 100%;height: 100%;">
            </div>
          </div>
        </div>
      </div>
      </div>
  </section>

  <!-- 季节特色部分 -->
  <section class="season-wrapper" style="width: 100%;margin-top: 100px;">
    <div class="season-container" style="margin: 0 13vw;padding: 20px;height: 100%;">
      <div class="season-header" style="padding: 0 50px">
        <h2 style="font-size: 60px;">四季风光</h2>
        <p>
          四季的变换是大自然最迷人的奇迹之一。
          春天，万物复苏，鲜花盛开，空气中弥漫着新生的气息。
          夏天，阳光灿烂，绿树成荫，是户外活动和海滨度假的理想时节。
          天，树叶渐黄，硕果累累，为人们带来收获的喜悦和宁静的美景。
          冬天，白雪皑皑，银装素裹，为大地披上宁静而纯洁的外衣。
          每个季节都有其独特的风光和魅力，吸引着人们去探索和体验。
        </p>
      </div>
      <div class="season-content">
        <div style="display: flex;padding: 15px;flex-wrap: wrap;width: 100%;text-align: left;">
          <a-card v-for="(seasonScene,index) in seasonScenes" hoverable :key="index"
            style="width: 30%;margin: auto;margin-bottom: 25px;min-height: 420px;border-radius: 5px;">
            <template #cover>
              <img alt="example" :src="seasonScene.imageUrl"
                width="100%" />
            </template>
            <a-card-meta :title="seasonScene.presentType+'-'+seasonScene.name">
              <template #description>{{ seasonScene.description }}</template>
            </a-card-meta>
          </a-card>
        </div>
      </div>
    </div>
  </section>

  <!-- 导游介绍部分 -->
  <section class="guide-wrapper" style="margin-top: 50px;width: 100%;">
    <div class="guide-container" style="width: 100%;padding: 0 200px">
      <div class="guide-header" style="width: 100%;padding: 30px">
        <h2 style="font-size: 60px;">旅行专家团队</h2>
        <p>
          在我们的旅行专家团队中，我们汇集了一群充满激情和经验丰富的旅行者，
          他们致力于为您打造无与伦比的旅行体验。无论您是寻求探险之旅、文化之旅还是放松度假，
          我们的专家团队将为您提供个性化的建议和专业的服务。
          不仅如此，我们不只是导游和策划者，更是您旅行路上的朋友和支持者。
          无论您的旅行目的是什么，我们都会用心为您设计出一次难忘的旅行体验，让您在旅途中感受到真正的享受和放松。
          加入我们，开始您的旅行冒险吧！
        </p>
      </div>
      <div class="guide-content" style="margin-top: 30px;display: flex;justify-content: space-around;">
        <div class="guide-person" style="padding: 0 10px;" v-for="(guidePerson,index) in guidePersons" :key="index">
          <span style="border-radius: 50%;overflow: hidden;margin-bottom: 30px;">
            <img :src="guidePerson.image"
              style="border-radius: 50%;margin-bottom: 30px;" alt="">
          </span>
          <h2 style="margin-bottom: 30px;">{{ guidePerson.name }}</h2>
          <p>{{ guidePerson.instroduction }}</p>
        </div>
      </div>
    </div>
  </section>
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