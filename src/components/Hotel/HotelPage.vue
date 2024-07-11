<script setup>
import { computed, watch, h, ref, reactive, watchEffect } from 'vue';
import dayjs from 'dayjs';
import { HomeOutlined,
  CarOutlined,
  BankOutlined,
  PictureOutlined,
  DislikeOutlined,
  ScheduleOutlined,
  CalendarOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue';
import router from '../../router'
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
//设置内容显示框的上边距
const contentMargiTop = ref('0')
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
//选择菜单项后触发的事件
function selectMenuItem(item) {
  console.log(item.key);
  current.value = [item.key];
}

// watchEffect(()=>{
//   changeRouterView(current.value[0])
// })

// function changeRouterView(key) {
//   if(key != '/overview'){
//     layoutContentStyle.value.marginTop = '80px';
//     btnStyle.value = '#76EEC6'
//     if(!layoutContentStyle.value.isHeightSet){
//       layoutContentStyle.value.isHeightSet = true;
//       layoutContentStyle.value.height = '82vh';
//     }
//   }else{
//     btnStyle.value = 'transparent'
//     layoutContentStyle.value.marginTop = '0'
//     if(layoutContentStyle.value.isHeightSet){
//       delete layoutContentStyle.value.height
//       layoutContentStyle.value.isHeightSet = false
//     }
//   }
//   router.push(key);
// }

//日期时间获取
const disabledDate = currentTime => {
  // Can not select days before today and today
  return currentTime && currentTime < dayjs().endOf('day');
};

//位置区域选择
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};
const province = ref(provinceData[0]);
const secondCity = ref(cityData[province.value][0]);
const cities = computed(() => {
  return cityData[province.value];
});

watch(province, val => {
  secondCity.value = cityData[val][0];
});


//滚动条监听事件
window.addEventListener('scroll',function(){
  if(current.value[0] == '/overview'){
    const distance = this.document.documentElement.scrollTop;
    if(distance > 200 ){
      backgroundStyle.value = '#fff'
      btnStyle.value = '#76EEC6'
    }else{
      backgroundStyle.value = 'transparent'
      btnStyle.value = 'transparent'
    }
  }
})
</script>

<template>
  <!-- 首页走马灯 -->
  <section class="main-wrapper">
    <div class="main-container">
      <a-carousel autoplay class="main-image">
        <div>
          <video src="../../assets/video/hotel-bg.mp4" class="hotel-bg-video" autoplay loop muted></video>
        </div>
        <div>
          <img src="../../assets/image/hotelPage1.jpg" class="hotel-main-image">
        </div>
        <div>
          <img src="../../assets/image/hotelPage2.png" class="hotel-main-image">
        </div>
        <div>
          <img src="https://www.pygmy-elephant.com/static/img/home_header.jpg" class="hotel-main-image">
        </div>
        
      </a-carousel>
    </div>
  </section>


  <!-- 出行地点时间选择 -->
  <section class="all-choice-wrapper">
    <div class="province-container">
      <h2 style="margin: 0;font-size: 20px;">
        请选择省份
      </h2>
      <a-select v-model:value="province" class="place-choice"
        :options="provinceData.map(pro => ({ value: pro }))">请选择省份</a-select>
    </div>

    <a-divider type="vertical" style="height: 100%; background-color: gainsboro" />

    <div class="city-container">
      <h2 style="margin: 0;font-size: 20px;">
        请选择城市
      </h2>
      <a-select v-model:value="secondCity" class="place-choice"
        :options="cities.map(city => ({ value: city }))"></a-select>
    </div>

    <a-divider type="vertical" style="height: 100%; background-color: gainsboro" />
    <div class="date-container">
      <div style="display: flex;justify-content: space-between;padding: 0 20%;position: relative;top: 15%">
        <span>入住</span>
        <span>退房</span>
      </div>
      <div class="divider-content">
        <a-divider style="color: grey;border-color: grey;font-size: small;">9 晚</a-divider>
      </div>
      <a-range-picker class="date-content" v-model:value="dateValue" :disabled-date="disabledDate">
      </a-range-picker>

    </div>
    <div class="calendar-icon"></div>
    <a-button class="search-container" :icon="h(SearchOutlined)">Search</a-button>
  </section>

  <!-- 地理位置介绍 -->
  <section class="introduction-wrapper">
    <div class="introduction-container">
      <h2>
        这是一个介绍的标题
      </h2>
      <p>
        这是一个介绍的内容
      </p>
    </div>
    <div class="map-container">
      这是一个地图
    </div>
  </section>

  <!-- 推荐酒店 -->
  <section class="recommendation-wrapper">
    <div style="height: 12%;margin-bottom: 0;">
      <h2 style="height: 60%; font-size: 320%;margin-bottom: 0%;">Package tour</h2>
      <p style="display: block;height: 35%;margin: 1% 0 0 0;padding: 0 20%;">这是一段关于推荐酒店内容的介绍</p>
    </div>
    <div class="recommendation-container">
      <a-card hoverable class="card-style-top">
        <template #cover>
          <img alt="first" style="height: 100%;"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
        </template>
        <a-card-meta title="Card title" description="This is the description">
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-card-meta>
      </a-card>
      <a-card hoverable class="card-style-top">
        <template #cover>
          <img alt="second" style="height: 100%;"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
        </template>
        <a-card-meta title="Card title" description="This is the description">
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-card-meta>
      </a-card>
      <a-card hoverable class="card-style-bottom">
        <template #cover>
          <img alt="example" style="height: 100%;"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
        </template>
        <a-card-meta title="Card title" description="This is the description">
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-card-meta>
      </a-card>
      <a-card hoverable class="card-style-bottom">
        <template #cover>
          <img alt="example" style="height: 100%;"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
        </template>
        <a-card-meta title="Card title" description="This is the description">
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-card-meta>
      </a-card>
      <a-card hoverable class="card-style-bottom">
        <template #cover>
          <img alt="example" style="height: 100%; padding: 0%;margin: 0;"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
        </template>
        <a-card-meta title="Card title" description="This is the description">
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-card-meta>
      </a-card>
    </div>
  </section>

  <!-- 打包旅行 -->
  <section class="package-wrapper">
    <!-- <div style="height: 12%;">
      <h2 style="height: 60%; font-size: 320%;margin-bottom: 0%;">Package tour</h2>
      <p style="display: block;height: 35%;margin: 1% 0 0 0;padding: 0 20%;">这是一段关于跟团旅游内容的介绍</p>
    </div> -->
    <div class="package-container">
      <div class="package-content">
        <a class="package-image" href="" style="background-image: url('/src/assets/image/package2.png');">
          <img style="width: 100%;height: 100%;display: none;overflow-clip-margin: content-box;overflow: clip;"
            src="../../assets/image/package2.png" alt="">
        </a>
        <div class="package-info-top">
          <p class="package-place">shanghai</p>
          <p class="package-tour">Maldives Escape incl. Airfare</p>
        </div>
        <div class="package-info-bottom">
          <span class="package-date">
            7 Days / 8 Nights
          </span>
          <a class="package-view" href="">
            View tour
          </a>
        </div>
      </div>
      <div class="package-content">
        <a class="package-image" href="" style="background-image: url('/src/assets/image/hotelPage1.jpg');">
          <img style="width: 100%;height: 100%;display: none;overflow-clip-margin: content-box;overflow: clip;"
            src="../../assets/image/hotelPage1.jpg" alt="">
        </a>
        <div class="package-info-top">
          <p class="package-place">Bangkok</p>
          <p class="package-tour">Maldives Escape incl. Airfare</p>
        </div>
        <div class="package-info-bottom">
          <span class="package-date">
            7 Days / 8 Nights
          </span>
          <a class="package-view" href="">
            View tour
          </a>
        </div>
      </div>
      <div class="package-content">
        <a class="package-image" href="" style="background-image: url('/src/assets/image/hotelPage1.jpg');">
          <img style="width: 100%;height: 100%;display: none;overflow-clip-margin: content-box;overflow: clip;"
            src="../../assets/image/hotelPage1.jpg" alt="">
        </a>
        <div class="package-info-top">
          <p class="package-place">Beijing</p>
          <p class="package-tour">Maldives Escape incl. Airfare</p>
        </div>
        <div class="package-info-bottom">
          <span class="package-date">
            7 Days / 8 Nights
          </span>
          <a class="package-view" href="">
            View tour
          </a>
        </div>
      </div>
    </div>
    <div style="height: 20%;position: relative;">
      <a class="package-button" href="#">
        learn more
      </a>
    </div>
  </section>

  <!-- 旅行指引 -->
  <section class="travel-wrapper">
    <div class="travel-container">
      <div class="guide-title">
        <h5 style="font-size: 24px;margin: 0;font-weight: 500;">
          Ready to go?
        </h5>
        <h2 style="font-size: 40px;margin: 0;font-weight: 300;transform: up;">
          Travel guides
        </h2>
        <p style="font-size: 16px;z-index: 2;margin: 20px 0;padding-right: 45%;">
          Cambodia's geography has played a substantial role in shaping its history. Its central location along the
          Indochinese Peninsula and relatively flat terrain facilitated the rise of the Khmer Empire which flourished
          from its base in Angkor for over 500 years
        </p>
      </div>

      <div style="height: 20%;position: relative;text-align: left;">
        <a class="guide-button" href="#">
          learn more
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>

/* 首页走马灯 */
.main-wrapper {
  height: 80vh;
  width: 100%;
}
.main-container {
  height: 100%;
  width: 100%;
}
.main-image {
  height: 100%;
  width: 100%;
}
::v-deep(.main-image div){
  height: 100%;
}
::v-deep(.slick-slide) {
  text-align: center;
  height: 100%;
  /* line-height: 160px; */
  background: #364d79;
  overflow: hidden;
}
::v-deep(.slick-slide h3) {
  color: #fff;
}
.hotel-bg-video {
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter: brightness(0.5) contrast(0.8);
}
.hotel-main-image {
  height: 100%;
  width: 100%;
  object-fit: fill;
}

/* 地点，时间搜索 */
.all-choice-wrapper {
  height: 15vh;
  width: 100%;
  padding: 3vh;
  padding-bottom: 25px;
  display: flex;
  justify-content: space-around;
  position: relative;
}
/* 地点部分 */
.province-container {
  height: 100%;
  width: 28%;
  padding: 0 10px;
  /* display: flex;
  justify-content: space-around; */
  /* align-items: center; */
}
.place-choice {
  width: 100%;
  height: 50%;
  padding: 1% 0;
  border-style: none;
}
.city-container {
  height: 100%;
  width: 28%;
  padding: 0 10px;
}
::v-deep(.province-container input) {
  height: 100% !important;
}
::v-deep(.province-container span) {
  line-height: 38px !important;
  display: inline-block !important;
}
::v-deep(.city-container input) {
  height: 100% !important;
}
::v-deep(.city-container span) {
  line-height: 38px !important;
  display: inline-block !important;
}
::v-deep(.place-choice .ant-select-selector) {
  height: 100%;
  border-style: none;
}
::v-deep(.ant-select-seletcor span) {
  text-align: center;
}
::v-deep(.place-choice .ant-select-arrow) {
  top: 30%;
}
::v-deep(.place-choice svg) {
  color: #bd1e2d;
  font-size: 20px;
}
/* 日期部分 */
.date-container{
  height: 100%;
  width: 30%;
  padding: 0 0 2% 0;
  /* margin-bottom: 2%; */
}
.divider-content {
  margin-left: 40%;
  margin-right: 37%;
  width: 20%;
  height: 30%;
  padding: 0 3%;
  position: relative;
  top: 10%;
  z-index: 1;
}
.date-content {
  border-style: none;
  size: large;
  height: 80%;
  width: 100%;
  padding: 0;
  /* position: relative;
  left: 1%; */
}
::v-deep(.date-content input) {
  text-align: center;
  font-size: medium;
}
::v-deep(.divider-content div) {
  margin: 0;
}
::v-deep(.divider-content span) {
  padding:0 2%;
}
::v-deep(.date-container .ant-picker) {
  height: 60% !important;
}
::v-deep(.date-container .ant-picker-suffix) {
  display: none;
}
::v-deep(.date-container .ant-picker-clear) {
  position: absolute;
  right: 0;
}
.calendar-icon {
  width: 3%;
  height: 100%;
  position: relative;
}
.calendar-icon::before {
  content: "\F073";
  font-family: Fontawesome;
  position: absolute;
  top: 32%;
  right: 20px;
  color: #bd1e2d;
  /* z-index: 100; */
  font-size: 20px;
}
.search-container {
  width: 20%;
  height: 65%;
  margin-left: 2%;
  margin-right: 2%;
  border-radius: 50px;
  align-self: center;
  background-color: #bd1e2d;
  border-style: none;
}
::v-deep(.search-container span) {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  /* text-transform: uppercase; */
}
.search-container:hover {
  background-color: #000;
}

/* 地理位置介绍部分 */
.introduction-wrapper {
  width: 100%;
  height: 60vh;
  padding: 5% 0 5% 0;
}
.introduction-container {
  width: 100%;
  height: auto;
}
.map-container {
  width: 80%;
  height: 80%;
  padding: 0 10%;
  margin: 0 10% 0 10%;
}

/* 酒店推荐部分 */
.recommendation-wrapper {
  width: 100%;
  height: 120vh;

}
.recommendation-container {
  width: 100%;
  height: 90%;
  padding: 0 5%;
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
}
.card-style-top {
  height: 50%;
  width: 45%;
  margin: 1%;
}
::v-deep(.card-style-top .ant-card-cover){
  height: 75%;
}
::v-deep(.card-style-top .ant-card-body){
  height: 25%;
  
}
.card-style-bottom {
  height: 38%;
  width: 30%;
  margin: 1% 0 0 0;
}
::v-deep(.card-style-bottom .ant-card-cover){
  height: 75%;
}
::v-deep(.card-style-bottom .ant-card-body){
  height: 25%;
}


/* 打包旅行部分 */
.package-wrapper {
  width: 100%;
  height: 110vh;
  padding-top: 45px;
  padding-bottom: 75px;
}
.package-container {
  position: relative;
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: space-around;
  transition-property: transform;
  /* margin: 0 5%; */
  padding: 0 2%;
}
.package-content {
  width: 32%;
  max-width: 400px;
  /* min-width: 364px */
  min-width: 200px;
  height: 100%;
  min-height: 400px;
  margin-right:33px;
  overflow: hidden;
  position: relative;
}
.package-content:hover .package-image{
  transform: scale(1);
}
.package-content:hover .package-image:before {
  height: 30%;
}
.package-image {
  /* position: relative; */
  height: 100%;
  width: 100%;
  display: block;
  background-size: cover;
  background-color: transparent;
  /* background-image: url('../../assets/image/hotelPage1.jpg'); */
  transform: scale(1.2);
  outline: none;
  transition: all .3s ease;
  cursor: pointer;
  color: #bd1e2d;
}
.package-image:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, .5), black);
    transition: all .5s ease-in-out;
    z-index: 99;
}
.package-content:hover .package-info-top {
  padding: 10px 30px;
  top: 71%;
}
.package-info-top {
  /* width: 100%; */
  /* display: block; */
  padding: 30px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(0);
  transition: all .5s ease-in-out;
  box-sizing: border-box;
  /* unicode-bidi: isolate; */
}
.package-place {
  margin-bottom: 10px;
  color: #fff;
  font-size: medium;
  letter-spacing: .3px;
  text-align: left;
  box-sizing: border-box;
}
.package-tour {
  color: #fff;
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 0;
  /* letter-spacing: .3px; */
  text-align: left;
  box-sizing: border-box;
}
.package-info-bottom {
  padding: 30px;
  position: absolute;
  /* top: 0; */
  bottom: 0;
  left: 0;
  right: 0;
  transition: all .5s ease-in-out;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.package-info-bottom::before {
  content: "";
  position: absolute;
  height: 1px;
  background: #fff;
  top: 0;
  left: 30px;
  right: 30px;
  margin: auto;
  opacity: .5;
  transition: all .5s ease-in-out;
}
.package-content:hover .package-info-bottom {
  padding: 15px 30px;
}
.package-date {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
.package-view {
  color: #fff;
  position: relative;
  font-size: 16px;
  padding-right: 30px;
}
.package-view::before {
  content: "\F061";
  font-family: Fontawesome;
  font-size: 10px;
  position: absolute;
  top: 4px;
  right: 0;
  border: 2px solid;
  height: 20px;
  width: 20px;
  line-height: 14px;
  text-align: center;
  border-radius: 4px;
}
.package-button {
  margin-top: 70px;
  margin-right: 20px;

  background-color:#bd1e2d;
  border-radius: 40px;
  border: none;
  line-height: 80px;
  padding: 0 60px;

  text-transform: uppercase;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  /* z-index: 0; */
  position: relative;
  display: inline-block;

  box-shadow: none;
  outline: none;
  /* background-color: transparent; */
  transition: all .3s ease;
  vertical-align: middle;
  overflow: hidden;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  letter-spacing: 1px;
}
.package-button:hover {
  background-color: #000;
}

/* 旅行指引部分 */
.travel-wrapper {
  background-image: url('/src/assets/image/hotelTravel.png');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  width: 100%;
  height: 90vh;
  padding: 180px 0;
  position: relative;
  z-index: 9;
}
.travel-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
  z-index: -1;
}
.travel-container {
  height: 100%;
  width: 95%;
  margin: 0 2.5%;
  padding: 0 1%;
}
.guide-title {
  height: 70%;
  padding-bottom: 5%;
  color: #fff;
  text-align: left;
  font-family: "Roboto", sans-serif;
  z-index: 2;
}
.guide-button {
  background-color:#bd1e2d;
  border-radius: 30px;
  border: none;
  line-height: 60px;
  padding: 0 40px;

  text-transform: uppercase;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  position: relative;
  display: inline-block;

  transition: all .3s ease;
  /* vertical-align: middle; */
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  letter-spacing: 1px;
}
.guide-button:hover {
  background-color: #000;
}
</style>