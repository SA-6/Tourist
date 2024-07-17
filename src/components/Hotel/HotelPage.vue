<script setup>
import { computed, watch, h, ref, reactive, watchEffect, onBeforeMount, onMounted} from 'vue';
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
import axios from 'axios';

const baseURL = `http://192.168.104.141:8080`

axios.defaults.baseURL = baseURL



// 位置区域选择
const provinceData = [
  '北京', '天津', '河北', '山西', '内蒙古自治区', '辽宁', '吉林', '黑龙江','上海','江苏','浙江',
  '安徽','福建','江西','山东','河南','湖北','湖南','广东','广西壮族自治区','海南','重庆','四川','贵州','云南',
  '西藏自治区', '陕西', '甘肃', '青海', '宁夏回族自治区', '新疆维吾尔自治区', '台湾', '香港', '澳门'
];
const cityData = {
  '北京': ['北京'],
  '天津': ['天津'],
  '河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
  '山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
  '内蒙古自治区': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '兴安盟', '锡林郭勒盟', '阿拉善盟'],
  '辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
  '吉林': ['长春', '吉林市', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
  '黑龙江': ['哈尔滨', '齐齐哈尔', '鸡西', '鹤岗', '双鸭山', '大庆', '伊春', '佳木斯', '七台河', '牡丹江', '黑河', '绥化', '大兴安岭地区'],
  '上海': ['上海'],
  '江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
  '安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '六安', '亳州', '池州', '宣城'],
  '福建': ['福州', '厦门', '漳州', '泉州', '三明', '莆田', '南平', '龙岩', '宁德'],
  '江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
  '山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
  '河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
  '湖北': ['武汉', '黄石', '十堰', '宜昌', '襄阳', '鄂州', '荆门', '孝感', '荆州', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州'],
  '湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
  '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
  '广西壮族自治区': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
  '海南': ['海口', '三亚', '三沙', '儋州'],
  '重庆': ['重庆'],
  '四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
  '贵州': ['贵阳', '六盘水', '遵义', '安顺', '毕节', '铜仁', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
  '云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州', '大理白族自治州', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州'],
  '西藏自治区': ['拉萨', '日喀则', '昌都', '林芝', '山南', '那曲', '阿里'],
  '陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
  '甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '张掖', '平凉', '酒泉', '庆阳', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
  '青海': ['西宁', '海东', '海北藏族自治州', '黄南藏族自治州', '海南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
  '宁夏回族自治区': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
  '新疆维吾尔自治区': ['乌鲁木齐', '克拉玛依', '吐鲁番', '哈密', '昌吉回族自治州', '博尔塔拉蒙古自治州', '巴音郭楞蒙古自治州', '阿克苏地区', '克孜勒苏柯尔克孜自治州', '喀什地区', '和田地区', '伊犁哈萨克自治州', '塔城地区', '阿勒泰地区', '自治区直辖县级行政区划'],
  '台湾':'台湾', 
  '香港':'香港', 
  '澳门':'澳门'
};
const province = ref(provinceData[0]);
const secondCity = ref(cityData[province.value][0]);
const cities = computed(() => {
  return cityData[province.value];
});
watch(province, val => {
  secondCity.value = cityData[val][0];
});


// 需要获取的数据
let recommendHotels = reactive({
  datas:[{},{},{},{},{}]
})

// 在组件加载前获取数据
onMounted(async()=>{
  // 获取用于界面展示的5个酒店
  await getRecommendHotels()
})


// 获取推荐酒店数据
async function getRecommendHotels() {
  console.log(111111);
  const response = await axios.get('/hotels/recommendHotels')
  try{
    if (response.status === 200) {
      recommendHotels.datas = response.data.data
    }
  }catch(error){
    console.log(error)
  }
}

async function onSearchButtonClicked() {
  // console.log(secondCity.value);
  router.push({
    name: 'hotelReserve',
    query: {
      province: province.value,
      city: secondCity.value,
    }
  })
}

</script>

<template>
  <!-- 首页走马灯 -->
  <section class="main-wrapper">
    <div class="main-container">
      <a-carousel autoplay class="main-image">
        <div>
          <video src="../../assets/video/hotel-bg.mp4" class="hotel-bg-video" autoplay loop muted></video>
        </div>
        <!-- <div>
          <img src="../../assets/image/hotelPage1.jpg" class="hotel-main-image">
        </div>
        <div>
          <img src="../../assets/image/hotelPage2.png" class="hotel-main-image">
        </div>
        <div>
          <img src="https://www.pygmy-elephant.com/static/img/home_header.jpg" class="hotel-main-image">
        </div> -->

      </a-carousel>
    </div>
  </section>


  <!-- 出行地点时间选择 -->
  <section class="all-choice-wrapper">
    <div class="province-container">
      <h2 style="margin: 0;font-size: 20px;">
        请选择省份
      </h2>
      <a-select v-model:value="province" class="place-choice province-choice"
        :options="provinceData.map(pro => ({ value: pro }))">请选择省份</a-select>
    </div>

    <a-divider type="vertical" style="height: 100%; background-color: gainsboro" />

    <div class="city-container">
      <h2 style="margin: 0;font-size: 20px;">
        请选择城市
      </h2>
      <a-select v-model:value="secondCity" class="place-choice city-choice"
        :options="cities.map(city => ({ value: city }))"></a-select>
    </div>

    <a-divider type="vertical" style="height: 100%; background-color: gainsboro" />
    <a-button class="search-container" :icon="h(SearchOutlined)" @click="onSearchButtonClicked">Search</a-button>
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
      <h2 style="height: 100%; font-size: 320%;margin-bottom: 0%;padding-top: 50px;">热门酒店</h2>
      <!-- <p style="display: block;height: 35%;margin: 1% 0 0 0;padding: 0 20%;">这是一段关于推荐酒店内容的介绍</p> -->
    </div>
    <div class="recommendation-container">
      <a-card hoverable class="card-style-top" style="margin-left: 3%;">
        <template #cover>
          <img alt="first" style="height: 100%;" :src="recommendHotels.datas[0].imageUrl" />
        </template>
        <a-card-meta style="text-align: left;" :title="recommendHotels.datas[0].name"></a-card-meta>
        <div>{{ recommendHotels.datas[0].starRating }}</div>
        <div>{{ recommendHotels.datas[0].rating }}/5</div>
        <div style="display: flex;justify-content: space-between;">
          <span>联系方式:{{ recommendHotels.datas[0].contactNumber }}</span>
          <span>￥{{ recommendHotels.datas[0].averageCost }}</span>
        </div>
      </a-card>
      <a-card hoverable class="card-style-top" style="margin-right: 3%;">
        <template #cover>
          <img alt="second" style="height: 100%;" :src="recommendHotels.datas[1].imageUrl" />
        </template>
        <a-card-meta style="text-align: left;" :title="recommendHotels.datas[1].name"></a-card-meta>
        <div>{{ recommendHotels.datas[1].starRating }}</div>
        <div>{{ recommendHotels.datas[1].rating }}/5</div>
        <div style="display: flex;justify-content: space-between;">
          <span>联系方式:{{ recommendHotels.datas[1].contactNumber }}</span>
          <span>￥{{ recommendHotels.datas[1].averageCost }}</span>
        </div>
      </a-card>
      <a-card hoverable class="card-style-bottom">
        <template #cover>
          <img alt="example" style="height: 100%;" :src="recommendHotels.datas[2].imageUrl" />
        </template>
        <a-card-meta style="text-align: left;" :title="recommendHotels.datas[2].name"></a-card-meta>
        <div>{{ recommendHotels.datas[2].starRating }}</div>
        <div>{{ recommendHotels.datas[2].rating }}/5</div>
        <div style="display: flex;justify-content: space-between;">
          <span>联系方式:{{ recommendHotels.datas[2].contactNumber }}</span>
          <span>￥{{ recommendHotels.datas[2].averageCost }}</span>
        </div>
      </a-card>
      <a-card hoverable class="card-style-bottom">
        <template #cover>
          <img alt="example" style="height: 100%;" :src="recommendHotels.datas[3].imageUrl" />
        </template>
        <a-card-meta style="text-align: left;" :title="recommendHotels.datas[3].name"></a-card-meta>
        <div>{{ recommendHotels.datas[3].starRating }}</div>
        <div>{{ recommendHotels.datas[3].rating }}/5</div>
        <div style="display: flex;justify-content: space-between;">
          <span>联系方式:{{ recommendHotels.datas[3].contactNumber }}</span>
          <span>￥{{ recommendHotels.datas[3].averageCost }}</span>
        </div>
      </a-card>
      <a-card hoverable class="card-style-bottom">
        <template #cover>
          <img alt="example" style="height: 100%; padding: 0%;margin: 0;" :src="recommendHotels.datas[4].imageUrl" />
        </template>
        <a-card-meta style="text-align: left;" :title="recommendHotels.datas[4].name"></a-card-meta>
        <div>{{ recommendHotels.datas[4].starRating }}</div>
        <div>{{ recommendHotels.datas[4].rating }}/5</div>
        <div style="display: flex;justify-content: space-between;">
          <span>联系方式:{{ recommendHotels.datas[4].contactNumber }}</span>
          <span>￥{{ recommendHotels.datas[4].averageCost }}</span>
        </div>
      </a-card>
    </div>
  </section>

  <!-- 打包旅行 -->
  <section class="package-wrapper">
    <div style="height: 12%;">
      <h2 style="height: 60%; font-size: 320%;margin-bottom: 0%;margin-top: 50px;">Package tour</h2>
      <!-- <p style="display: block;height: 35%;margin: 1% 0 0 0;padding: 0 20%;">这是一段关于跟团旅游内容的介绍</p> -->
    </div>
    <div class="package-container">
      <div class="package-content" style="margin-left: 80px;">
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
      <div class="package-content" style="margin-right: 80px;">
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
  opacity: 1;
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
::v-deep(.divider-content div) {
  margin: 0;
}
::v-deep(.divider-content span) {
  padding:0 2%;
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
  height: 130vh;
  background-image: url(/src/assets/image/hotelPage3.jpg);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}
.recommendation-container {
  width: 100%;
  height: 90%;
  padding: 0 5%;
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
  text-align: left;
}
.card-style-top {
  height: 50%;
  width: 40%;
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
  margin: 1% 0 5% 0;
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
  height: 65%;
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