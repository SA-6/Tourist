<script setup>
import { computed, watch, h, ref, reactive, onMounted, nextTick, toRefs, watchEffect} from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  SearchOutlined,
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
  DiffFilled
} from '@ant-design/icons-vue';
import router from '../../router'
import { RouterLink, useRoute, useRouter } from 'vue-router';
const route = useRoute()

const baseURL = `http://localhost:8080`
axios.defaults.baseURL = baseURL

// defineProps([''])
//日期时间获取
const disabledDate = currentTime => {
  return currentTime && currentTime < dayjs().endOf('day');
};
let dateValue = ref()
let startDate = ref()
let endDate = ref()

// dateValue
const totalDays = computed(()=> {
  if((startDate.value===undefined && endDate.value===undefined)){
    return 0
  }else {
    return (endDate.value.getTime() - startDate.value.getTime()) / (1000*3600*24)
  }
})
function onDateLoseBlur(){
  if(dateValue.value !== undefined) {
    startDate.value = new Date(dateValue.value[0].$d)
    endDate.value = new Date(dateValue.value[1].$d)
  }
}

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
const province = ref(route.query.province);
const secondCity = ref(route.query.city);
const cities = computed(() => {
  return cityData[province.value];
});
watch(province, val => {
  secondCity.value = cityData[val][0];
});



// 获取城市对应的酒店信息
let cityHotels = reactive({
  datas:[]
})
async function getHotelsByCity(cityName,index=0,page=1,stars=-1,max=10000,min=-1) {
  const response = await axios.get('/hotels/searchHotel',{
    params: {
      city_name: cityName,
      index    : index,
      page     : page,
      stars    : stars,
      max      : max,
      min      : min
    },
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  })
  console.log(response);
  try{
    if (response.data.status !== 500) {
      return response.data.data
    }
  }catch(error){
    console.log(error)
  }
}

async function onSearchButtonClicked() {
  cityHotels.datas = await getHotelsByCity(secondCity)
}

// 酒店筛选标签页选择
const areaData = reactive([
  {
    id : 1,
    name : '热门区域'
  },
  {
    id : 2,
    name : '机场酒店'
  },
  {
    id : 3,
    name : '地铁附近'
  },
  {
    id : 4,
    name : '商业区'
  }
])
const hotelActiveKey = ref(1);

// 酒店筛选标签选择
const areaTagsData = reactive([
  ['故宫', '颐和园', '天坛公园', '鼓楼与钟楼', '北海公园', '南锣鼓巷', '798艺术区', '北京动物园', '北京奥林匹克公园', '北京大学', '中国国家图书馆', '中央电视塔(CCTV大楼)', '中国国家博物馆', '雍和宫', '五道营胡同', '北京植物园', '世界公园', '什刹海', '北京天文馆', '香山公园'],
  ['北京首都国际机场', '北京南站', '北京西站', '北京北站', '北京站', '北京东站', '北京南苑机场', '北京大兴国际机场', '北京地铁站', '北京西客站'],
  ['1号线', '2号线', '4号线', '5号线', '6号线', '7号线', '8号线', '9号线', '10号线', '13号线'],
  ['王府井商业区', '西单商业区', '三里屯商业区', '朝阳大悦城商业区', 'CBD商业区', '国贸商业区', '金融街商业区', '亚运村商业区', '中关村商业区', '双井商业区']
]);
const starTagsData = reactive(['五星(钻)级','四星(钻)级','三星(钻)级','二星(钻)级及以下'])
const costTagsData = reactive(['¥100以下','¥100-300','¥300-500','¥500-700','¥700-900','¥900-1100','¥1100-1600','¥1600以上'])

const areaSelectTags = reactive([[],[],[],[]]);
const starSelectTags = reactive([false,false,false,false]);
const costSelectTags = reactive([false,false,false,false,false,false,false,false]);

const allStarChoosedTags = computed(()=>{
  const selectTags = []
  starSelectTags.forEach((value, index) => {
    if (value === true) {
      selectTags.push(starTagsData[index]);
    }
  });
  if (selectTags[0])
    return selectTags[0]
  else
    return ''
})
const allCostChoosedTags = computed(()=>{
  const selectTags = []
  costSelectTags.forEach((value, index) => {
    if (value === true) {
      selectTags.push(costTagsData[index]);
    }
  });
  if (selectTags[0])
    return selectTags[0]
  else
    return ''
  
})
const allChoosedTags = computed(() => {
  const selectTags = []
  if (allStarChoosedTags.value !== '') {
    selectTags.push(allStarChoosedTags.value)
  }
  if (allCostChoosedTags.value !== '') {
    selectTags.push(allCostChoosedTags.value)
  }
  return selectTags;
});
const isShow = computed(()=>{
  console.log(allChoosedTags.value.length === 0);
  console.log(allChoosedTags.value === undefined);
  return !(allChoosedTags.value.length === 0)
})

const handleAreaChange = (tag, areaChecked) => {
  console.log(tag, areaChecked);
};
const handleStarChange = (tag, starChecked) => {
  if (starChecked === true){
    starSelectTags.forEach((value, index) => {
      if (starTagsData[index] !== tag) {
        starSelectTags[index] = false
      }
    });
  }
  // count = [1, 1, 1, 1, 1, 1]
  // let star
  // let cost
  // if (starChecked === true){
  //   star = starTagsToValue(tag)
  //   cost = costTagsToValue(allCostChoosedTags.value)
  // }else {
  //   star = -1
  //   cost = costTagsToValue(allCostChoosedTags.value)
  // }
  // cityHotels.datas = await getHotelsByCity(secondCity.value, 1, 1, star, cost.max,cost.min)
  // hotelData.value = cityHotels.datas
  // hotelList.value = cityHotels.datas
};
const handleCostChange = (tag, costChecked) => {
  if (costChecked === true){
    costSelectTags.forEach((value, index) => {
      if (costTagsData[index] !== tag) {
        costSelectTags[index] = false
      }
    });
  }
};

watch(allChoosedTags,async ()=>{
  count = [1, 1, 1, 1, 1, 1]
  const index = getControlIndex(controlValue.value)
  let star
  let cost
  if (allChoosedTags.value.length === 1) {
    star = starTagsToValue(allChoosedTags.value[0])
    cost = costTagsToValue(allChoosedTags.value[0])
  }else {
    star = starTagsToValue(allChoosedTags.value[0])
    cost = costTagsToValue(allChoosedTags.value[1])
  }
  
  console.log(isShow.value);
  console.log(111111,allChoosedTags.value);
  cityHotels.datas = await getHotelsByCity(secondCity.value, index, 1, star, cost.max,cost.min)
  hotelData.value = cityHotels.datas
  hotelList.value = cityHotels.datas
})

function starTagsToValue(tag){
  let stars
  switch(tag){
    case '五星(钻)级'       : stars = 5;break;
    case '四星(钻)级'       : stars = 4;break;
    case '三星(钻)级'       : stars = 3;break;
    case '二星(钻)级及以下'  : stars = 2;break;
    default                 : stars = -1;break;
  }
  return stars
}
function costTagsToValue(tag){
  let cost = {
    max : -1,
    min : -1
  }
  switch(tag){
    case '¥100以下'       : cost.min = 0;cost.max = 100;break;
    case '¥100-300'       : cost.min = 100;cost.max = 300;break;
    case '¥300-500'       : cost.min = 300;cost.max = 500;break;
    case '¥500-700'       : cost.min = 500;cost.max = 700;break;
    case '¥700-900'       : cost.min = 700;cost.max = 900;break;
    case '¥900-1100'      : cost.min = 900;cost.max = 1100;break;
    case '¥1100-1600'     : cost.min = 1100;cost.max = 1600;break;
    case '¥1600以上'      : cost.min = 1600;cost.max = 10000;break;
    default               : cost.min = -1;cost.max = 10000;break;
  }
  return cost
}
function closeTags(tag){
  starSelectTags.forEach((value,index)=>{
    if (starTagsData[index] === tag){
      starSelectTags[index] = false
    }
  })
  costSelectTags.forEach((value,index)=>{
    if (costTagsData[index] === tag){
      costSelectTags[index] = false
    }
  })
  console.log(222222,allChoosedTags.value);
}


//酒店详细信息列表
// 分段控制器部分
const sortData = reactive(['欢迎度排序', '好评优先', '价格(由低到高)', '距离(由近到远)', '星级(由低到高)','价格(由高到低)']);
const controlValue = ref(sortData[0]);
function getControlIndex(value) {
  return sortData.findIndex(item => item === value);
}

watch(controlValue,async ()=>{
  count = [1,1,1,1,1,1]
  const index = getControlIndex(controlValue.value)

  let star = starTagsToValue(allStarChoosedTags.value)
  let cost = costTagsToValue(allCostChoosedTags.value)

  cityHotels.datas = await getHotelsByCity(secondCity.value,index,1,star,cost.max,cost.min)
  // console.log(cityHotels.datas);
  hotelData.value = cityHotels.datas
  hotelList.value = cityHotels.datas
})

// 酒店列表内容
let count = [1,1,1,1,1,1];
const initLoading = ref(true);
const loading = ref(false);
const hotelData = ref([]);
const hotelList = ref([]);

// 详情按钮点击事件
function onDetailButtonClicked(name,hotelId){
  router.push({
    name : 'hotelDetail',
    query : {
      name : name,
      hotelId : hotelId
    }
  })
  historyData.value.push(()=>{
    hotelData.value.forEach((item,index)=>{
      if (item.id === id){
        return item
      }
    })
  })
}
// loadMore按钮点击事件
async function onLoadMore(controlIndex) {
  count[controlIndex] += 1
  loading.value = true;
  
  let star = starTagsToValue(allStarChoosedTags.value)
  let cost = costTagsToValue(allCostChoosedTags.value)

  const newData = await getHotelsByCity(secondCity.value,controlIndex,count[controlIndex],star,cost.max,cost.min)
  loading.value = false;
  hotelData.value = hotelData.value.concat(newData)
  hotelList.value = hotelList.value.concat(newData)

  await nextTick(() => {
    // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    // In real scene, you can using public method of react-virtualized:
    // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    window.dispatchEvent(new Event('resize'));
  });
  console.log(hotelData.value);
};
function onLinkClicked(name,id) {
  router.push({
    name : 'hotelDetail',
    query : {
      name : name,
      hotelId : id
    }
  })
}


onMounted(async() => {
  initLoading.value = false;
  cityHotels.datas = await getHotelsByCity(secondCity.value)
  hotelData.value = cityHotels.datas
  hotelList.value = cityHotels.datas
  
  console.log("AAAA",hotelData.value);
});


// 酒店历史记录
// 需要从pinia中引入
let historyData = ref([])
const historyActiveKey = ref(['1']);

</script>

<template>
  <!-- 出行地点时间选择 -->
  <section class="all-choice-wrapper">
    <div class="province-container">
      <h2 style="margin: 0;font-size: 20px;">
        请选择省份
      </h2>
      <a-select v-model:value="province" class="place-choice province-choice"
        :options="provinceData.map(pro => ({ value: pro }))"></a-select>
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
    <div class="date-container">
      <div style="display: flex;justify-content: space-between;padding: 0 20%;position: relative;top: 15%">
        <span>入住</span>
        <span>退房</span>
      </div>
      <div class="divider-content">
        <a-divider style="color: grey;border-color: grey;font-size: small;">{{ totalDays }} 晚</a-divider>
      </div>
      <a-range-picker class="date-content" @blur="onDateLoseBlur" v-model:value="dateValue"
        :disabled-date="disabledDate">
      </a-range-picker>

    </div>
    <div class="calendar-icon"></div>
    <a-button class="search-container" :icon="h(SearchOutlined)" @click="onSearchButtonClicked">Search</a-button>
  </section>

  <!-- 筛选区域 -->
  <section class="filter-wrapper">
    <div class="filter-container">
      <div class="filter-description">
        <div class="location-description">
          <h4>位置区域</h4>
        </div>
        <div style="border-bottom: 1px solid black;border-color: rgb(218, 223, 230);"></div>
        <div class="star-price-description">
          <h4>星级价格</h4>
        </div>
      </div>
      <div class="filter-area">
        <div class="location-area">
          <a-tabs class="location-tab" v-model:activeKey="hotelActiveKey"
            :tabBarStyle="{ width : '100%', textAlign : 'left'}">
            <a-tab-pane :key="tab.id" :tab="tab.name" v-for="tab in areaData">
              <a-space :size="[0, 20]" wrap>
                <a-checkable-tag v-for="(tag, index) in areaTagsData[tab.id-1]" :key="tag"
                  v-model:checked="areaSelectTags[tab.id-1][index]" @change="checked => handleAreaChange(tag, checked)">
                  {{ tag }}
                </a-checkable-tag>
              </a-space>
            </a-tab-pane>
          </a-tabs>
        </div>
        <div style="border-bottom: 1px solid black;border-color: rgb(218, 223, 230);"></div>
        <div class="star-price-area">
          <div class="star-area">
            <a-space :size="[0, 8]" wrap>
              <a-checkable-tag v-for="(tag, index) in starTagsData" :key="tag" v-model:checked="starSelectTags[index]"
                @change="checked => handleStarChange(tag, checked)">
                {{ tag }}
              </a-checkable-tag>
            </a-space>
          </div>

          <div class="price-area">
            <a-space :size="[0, 8]" wrap>
              <a-checkable-tag v-for="(tag, index) in costTagsData" :key="tag" v-model:checked="costSelectTags[index]"
                @change="checked => handleCostChange(tag, checked)">
                {{ tag }}
              </a-checkable-tag>
            </a-space>
          </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  </section>


  <!-- 酒店列表 -->
  <section class="hotel-list-wrapper">
    <div class="hotel-list-container">
      <div class="hotel-list-area">
        <!-- 已选择的所有标签区域 -->
        <div class="all-choosed-tags-area"
          style="width: 100%;height: 5vh;display: flex;background-color: #fff;margin-bottom: 10px;padding: 10px;"
          v-show="isShow">
          <span style="margin-left: 10px;">已选标签：</span>
          <a-tag closable v-for="(tag, index) in allChoosedTags" :key="index" @close="closeTags(tag)"
            style="border-radius: 0;background-color: rgb(233, 242, 254);color: rgb(40, 125, 250);border: none;">
            {{ tag }}
          </a-tag>
        </div>
        <!-- 排序区域 -->
        <div class="sort-area">
          <a-segmented v-model:value="controlValue" block :options="sortData"
            style="height: 100%;display: flex;align-items: center;" />
        </div>
        <div class="list-area">
          <a-list class="demo-loadmore-list" :loading="initLoading" item-layout="horizontal" :data-source="hotelList">
            <template #loadMore>
              <div v-if="!initLoading && !loading"
                :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
                <a-button @click="onLoadMore(getControlIndex(controlValue))">loading more</a-button>
              </div>
            </template>
            <template #renderItem="{ item }">
              <a-list-item class="hotel-item">
                <a-skeleton avatar :title="false" :loading="!!item.loading" active>
                  <a-list-item-meta class="hotel-list-content" style="text-align: left;" :key="item.hotelId">
                    <template #title>
                      <!-- 这里换成router-link随后导到详情界面 -->
                      <a @click="onLinkClicked(item.name,item.hotelId)" style="font-size: 20px;margin: 0;font-weight: 800;">
                        {{ item.name }}
                      </a>
                    </template>
                    <template #avatar>
                      <!-- 使用router-link包裹 -->
                      <a @click="onLinkClicked(item.name,item.hotelId)">
                        <a-avatar :src="item.imageUrl" style="height: 200px;width: 200px;border-radius: 0;" />
                      </a>

                    </template>
                    <template #description>
                      <div class="hotel-stars" style="font-size: 6px">
                        <a-rate v-model:value="item.starRating" disabled />
                      </div>
                      <div style="margin: 5px 0;">
                        {{ item.address }}
                      </div>
                      <div style="font-size: 13px;margin-bottom: 10px;">
                        {{ item.description }}
                      </div>
                      <div v-for="tag of item.facilities.split(/[,，]/)" style="display: inline;">
                        <a-tag color="orange" style="margin-bottom: 3px;">{{ tag }}</a-tag>
                      </div>
                    </template>

                  </a-list-item-meta>

                  <div style="border-left: 1px solid black;height: 200px;border-color: rgb(218, 223, 230);"></div>

                  <div class="hotel-list-info"
                    style="width: 35%;height: 200px;display: flex;flex-direction: column;justify-content: space-between;">
                    <div class="hotel-info-review" style="width: 100%;height: 70%;display: flex;padding-top: 10px;">
                      <div style="width: 80%; text-align: right;">
                        <h4 style="margin:0;font-weight: 600;color: rgb(73, 120, 206);">{{ }}很好</h4>
                        <div style="font-size: 12px;color: rgb(133, 146, 166);">{{ item.reviewAmounts }}条点评</div>
                      </div>
                      <div style="width: 20%;margin-left:10px;margin-bottom: 70px;margin-top: 8px;font-size: 17px;
                          background-color: rgb(73, 120, 206);color: #fff;font-weight: 800px;">
                        {{ item.rating }}
                      </div>
                    </div>
                    <div class="hotel-info-price" style="text-align: right;padding-bottom: 10px;">
                      <div style="text-align: right;">
                        <h2 style="display: inline;color: rgb(40, 125, 250);font-weight: 700;">￥{{ item.averageCost }}
                        </h2>起
                      </div>
                      <div></div>
                      <button style="border-radius: 0;background-color: rgb(40, 125, 250);color: #fff;font-weight:600;"
                        @click="onDetailButtonClicked(item.name,item.hotelId)">查看详情</button>
                    </div>
                  </div>
                </a-skeleton>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </div>


      <div class="fixed-area">
        <a-affix :offset-top="10" style="width: 100%;">
          <div class="map-area">
            这是一个地图
          </div>
          <!-- 酒店历史记录 -->
          <div class="history-area">
            <a-collapse v-model:activeKey="historyActiveKey" ghost expandIconPosition="end">
              <a-collapse-panel style="background-color: #fff;" header="查看过的酒店">
                <div class="history-list-area">
                  <a-list item-layout="horizontal" :data-source="historyData">
                    <template #renderItem="{ item }">
                      <a-list-item class="hotel-item">
                        <a-skeleton avatar :title="false" :loading="!!item.loading" active>
                          <a-list-item-meta class="hotelHistory-list-content" style="text-align: left;"
                            :key="item.hotelId">
                            <template #title>
                              <!-- 这里换成router-link随后导到详情界面 -->
                              <a @click="onLinkClicked(item.name,item.hotelId)" style="font-size: 16px;margin: 0;font-weight: 800;">
                                {{ item.name }}
                              </a>
                            </template>
                            <template #avatar>
                              <!-- 使用router-link包裹 -->
                              <a @click="onLinkClicked(item.name,item.hotelId)">
                                <a-avatar :src="item.imageUrl" style="height: 88px;width: 88px;border-radius: 0;" />
                              </a>
                            </template>
                            <template #description>
                              <div class="history-hotel-stars" style="font-size: 6px;">
                                <a-rate v-model:value="item.starRating" disabled />
                              </div>
                              <div
                                style="width: 100%;text-align: right;position: relative;display: flex;flex-direction: column;">
                                <div style="height: 30px;"></div>
                                <div style="display: flex;margin-top: 3px;">
                                  <div style="width: 20%;font-size: 17px;padding: 0 10px;text-align: center;
                                   background-color: rgb(73, 120, 206);color: #fff;font-weight: 800px;">
                                    {{ item.rating }}
                                  </div>
                                  <h4
                                    style="margin:0;font-weight: 600;color: rgb(73, 120, 206);margin-left: 10px;margin-top: 2px;">
                                    {{ }}很好</h4>
                                </div>
                              </div>
                              <!-- <div v-for="tag of item.facilities.split(/[,，]/)" style="display: inline;">
                              <a-tag color="orange" style="margin-bottom: 3px;">{{ tag }}</a-tag>
                            </div> -->
                            </template>

                          </a-list-item-meta>
                        </a-skeleton>
                      </a-list-item>
                    </template>
                  </a-list>
                </div>

              </a-collapse-panel>
            </a-collapse>
          </div>
        </a-affix>
      </div>
    </div>
  </section>


</template>

<style scoped>
/* 地点，时间搜索 */
.all-choice-wrapper {
  height: 15vh;
  width: 100%;
  padding: 3vh;
  padding-bottom: 25px;
  display: flex;
  justify-content: space-around;
  position: relative;
  background-color: #fff;
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

/* 筛选区域 */
.filter-wrapper {
  width: 100%;
  height: 36vh;
  padding-top: 10px;  
  padding-bottom: 10px;
  background-color: rgb(245, 247, 250);
}
.filter-container {
  width: calc(100% - 25vw);
  height: 100%;
  margin: 0 12.5vw;
  display: flex;
  box-shadow: -1px 2px 6px 0 rgba(15, 41, 77, .12);
}
.filter-description {
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* border-width: 1; */
  background-color: rgb(240, 242, 245);

}
.location-description {
  width: 100%;
  height: calc(70% - 2.5px);
  border-color: rgb(218, 223, 230);
  /* border-style: ridge; */
}
.star-price-description {
  width: 100%;
  height: calc(30% - 2.5px);
  border-color: rgb(218, 223, 230);
  /* border-style: ridge; */
}

.filter-area {
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
.location-area {
  width: 100%;
  height: 70%;
}
.location-tab {
  height: 100%;
}
::v-deep(.location-tab .ant-tabs-content-holder){
  padding: 0 20px;
  padding-bottom: 20px ;
  align-self: start;
}
::v-deep(.location-tab .ant-tabs-nav){
  margin-bottom: 10px;
}
::v-deep(.location-tab .ant-tabs-nav-wrap) {
  margin-left: 32px;
}
.star-price-area {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
}
.star-area {
  width: 35%;
  height: 100%;
  padding: 10px;
}
.price-area {
  width: 65%;
  height: 100%;
  padding: 10px;
}

::v-deep(.ant-space-item){
  border-radius: 0;
  padding: 2px;
}
::v-deep(.ant-space-item span){
  padding-top: 2px;
  padding-bottom: 2px;
  font-size: 14px;
  border-radius: 0;
  margin-right: 6px;
  background-color: rgb(245, 247, 250);
}
::v-deep(.ant-space-item .ant-tag-checkable-checked){
  
  background-color: rgb(40, 125, 250);
}

/* 酒店列表 */
.hotel-list-wrapper {
  width: 100%;
  padding-top: 1vh;
  background-color: rgb(245, 247, 250);
}
.hotel-list-container {
  width: 100%;
  padding: 0 12.5vw;
  display: flex;
}
.hotel-list-area {
  width: 70%;
  padding-right: 10px;
}
.sort-area {
  height: 5vh;
  background-color: #fff;
}
::v-deep(.sort-area .ant-segmented-item-selected) {
  color: rgb(40, 125, 250);
}
::v-deep(.sort-area .ant-segmented-item-label:hover) {
  color: rgb(40, 125, 250);
}
::v-deep(.sort-area .ant-segmented) {
  font-weight: 800px !important;
}
::v-deep(.sort-area div) {
  height: 100%;
  line-height: 40px;
  text-align: center;
  background-color: #fff;
  font-weight: 800px !important;
}
.list-area {
  width: 100%;
  padding-top: 5px;
}
.hotel-item:hover {
  box-shadow: -1px 2px 6px 0 rgba(15, 41, 77, .12);
}
::v-deep(.list-area .ant-list-item) {
  background-color: #fff;
  margin: 5px 0;
}
::v-deep(.hotel-stars li){
  margin-right: 3px !important;
}
::v-deep(.hotel-stars svg){
  transform: scale(0.8);
}
::v-deep(.hotel-list-content h4) {
  font-weight: 900px !important;
  margin: 0 !important;
}

.fixed-area {
  width: 30%;
  height: 90vh;
}
.map-area {
  width: calc(100% - 10px);
  height: 40vh;
  margin-left: 10px;
  /* border-style: solid; */
  margin-bottom: 10px;
}
.history-area {
  width: calc(100% - 10px);
  height: 45vh;
  margin-left: 10px;
  /* border-style: solid; */
  margin-bottom: 10px;
}
/* ::v-deep(.history-area svg) {
  transform: rotate(90deg);
} */
.history-list-area {
  width: 100%;
  height: 30%;
  padding-bottom: 20px;
  min-height: 53vh;
}

::v-deep(.history-area .ant-list-item-meta-description).ant-list-item-meta-description {
  /* display: flex;
  flex-direction: column;
  justify-content: flex-start; */
  position: relative;
}
::v-deep(.history-area .ant-collapse-content-box) {
  padding: 0 !important;
}
::v-deep(.history-area li) {
  padding: 10px;
}
::v-deep(.history-area .ant-rate-star) {
  padding: 0;
  margin: 0;
}
::v-deep(.history-area .ant-list-item-meta-avatar) {
  margin-right: 5px !important;
}
::v-deep(.history-area .history-hotel-stars) {
  transform: scale(0.5);
  position: absolute;
  left: -25px;
  top: -10px;
}
</style>