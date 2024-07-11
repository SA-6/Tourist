<script setup>
import { computed, watch, h, ref, reactive, watchEffect, onMounted, nextTick} from 'vue';
import dayjs from 'dayjs';
import {
  SearchOutlined,
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
  DiffFilled
} from '@ant-design/icons-vue';
import router from '../../router'

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


//酒店筛选标签页选择
const activeKey = ref('1');

//酒店筛选标签选择
const tagsData = reactive(['Movies', 'Books', 'Music', 'Sports']);
const selectTags = reactive([false, true, false, false]);
const handleChange = (tag, checked) => {
  console.log(tag, checked);
};


//酒店详细信息列表
// 分段控制器部分
const sortData = reactive(['欢迎度排序', '好评优先', '价格(由低到高)', '距离(由近到远)', '星级(由低到高)','价格(由高到低)']);
const value = ref(sortData[0]);
// 酒店列表内容
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const initLoading = ref(true);
const loading = ref(false);
const data = ref([]);
const list = ref([]);

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}
const actions = [
  {
    icon: StarOutlined,
    text: '156',
  },
  {
    icon: LikeOutlined,
    text: '156',
  },
  {
    icon: MessageOutlined,
    text: '2',
  },
];

onMounted(() => {
  fetch(fakeDataUrl)
    .then(res => res.json())
    .then(res => {
      initLoading.value = false;
      data.value = res.results;
      list.value = res.results;
    });
});
const onLoadMore = () => {
  loading.value = true;
  list.value = data.value.concat(
    [...new Array(count)].map(() => ({
      loading: true,
      name: {},
      picture: {},
    })),
  );
  fetch(fakeDataUrl)
    .then(res => res.json())
    .then(res => {
      const newData = data.value.concat(res.results);
      loading.value = false;
      data.value = newData;
      list.value = newData;
      nextTick(() => {
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
    });
};
// 酒店历史记录
let historyData = listData;
console.log(historyData);

 
</script>

<template>
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

  <!-- 筛选区域 -->
  <section class="filter-wrapper">
    <div class="filter-container">
      <div class="filter-description">
        <div class="location-description">
          <h4>位置区域</h4>
        </div>
        <div class="star-price-description">
          <h4>星级价格</h4>
        </div>
      </div>
      <div class="filter-area">
        <div class="location-area">
          <a-tabs class="location-tab" v-model:activeKey="activeKey"
            :tabBarStyle="{ width : '100%', textAlign : 'center'}">
            <a-tab-pane key="1" tab="热门区域">
              <a-space :size="[0, 8]" wrap>
                <a-checkable-tag v-for="(tag, index) in tagsData" :key="tag" v-model:checked="selectTags[index]"
                  @change="checked => handleChange(tag, checked)">
                  {{ tag }}
                </a-checkable-tag>
              </a-space>
            </a-tab-pane>
            <a-tab-pane class="tab-area" key="2" tab="机场车站">
              Tab 2
            </a-tab-pane>
            <a-tab-pane class="tab-area" key="3" tab="地铁">
              Tab 3
            </a-tab-pane>
            <a-tab-pane class="tab-area" key="4" tab="行政区">
              Tab 4
            </a-tab-pane>
          </a-tabs>
        </div>
        <div class="star-price-area">
          <div class="star-area">
            <a-space :size="[0, 8]" wrap>
              <a-checkable-tag v-for="(tag, index) in tagsData" :key="tag" v-model:checked="selectTags[index]"
                @change="checked => handleChange(tag, checked)">
                {{ tag }}
              </a-checkable-tag>
            </a-space>
          </div>
          <div class="price-area">
            <a-space :size="[0, 8]" wrap>
              <a-checkable-tag v-for="(tag, index) in tagsData" :key="tag" v-model:checked="selectTags[index]"
                @change="checked => handleChange(tag, checked)">
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
        <div class="sort-area">
          <a-segmented v-model:value="value" block :options="sortData"
            style="height: 100%;display: flex;align-items: center;" />
        </div>
        <div class="list-area">
          <a-list class="demo-loadmore-list" :loading="initLoading" item-layout="vertical" :data-source="listData">
            <template #loadMore>
              <div v-if="!initLoading && !loading"
                :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
                <a-button @click="onLoadMore">loading more</a-button>
              </div>
            </template>
            <template #renderItem="{ item }">
              <a-list-item key="item.title">
                <template #actions>
                  <span v-for="{ icon, text } in actions" :key="icon">
                    <component :is="icon" style="margin-right: 8px" />
                    {{ text }}
                  </span>
                </template>
                <!-- <template #extra>
                    <img width="272" alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
                  </template> -->
                <a-list-item-meta :description="item.description">
                  <template #title>
                    <a :href="item.href">{{ item.title }}</a>
                  </template>
                  <template #avatar><a-avatar :src="item.avatar" /></template>
                </a-list-item-meta>
                {{ item.content }}
              </a-list-item>
            </template>
          </a-list>
        </div>
      </div>

      <div class="fixed-area">
        <div class="map-area">
          这是一个地图
        </div>
        <div class="history-area">
          <a-collapse v-model:activeKey="activeKey" ghost expandIconPosition="end">
            <a-collapse-panel header="查看过的酒店">

              <div class="history-list-area">
                <a-list item-layout="horizontal" :data-source="historyData">
                <template #renderItem="{ item }">
                  <a-list-item key="item.title">
                    <a-list-item-meta description="星级">
                      <template #title>
                        <a :href="item.href">{{ "酒店名" }}</a>
                      </template>
                      <template #avatar><a-avatar :src="item.avatar" /></template>
                    </a-list-item-meta>
                    {{ "评分" }}
                  </a-list-item>
                </template>
              </a-list>
              </div>
            
            </a-collapse-panel>
          </a-collapse>
        </div>
      </div>
    </div>
  </section>

  <section style="height: 40vh;">

  </section>
</template>

<style scoped>
/* 地点，时间搜索 */
.all-choice-wrapper {
  height: 15vh;
  width: 100%;
  padding: 3vh 5vw;
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
/* ::v-deep(.calendar-icon svg) {
  content: "\F073";
  font-family: Fontawesome;
  position: absolute;
  right: 15px;
  top: 10px;
  color: #bd1e2d;
  font-size: 20px;
} */
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
  height: 40vh;
  padding-top: 10px;
  padding-bottom: 20px;
}
.filter-container {
  width: 100%;
  height: 100%;
  padding: 0 10vh;
  display: flex;
}
.filter-description {
  width: 10%;
  height: 100%;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  border-width: 1;  
  /* border-color: #000;
  border-style: groove; */
}
.location-description {
  width: 100%;
  height: 60%;
  border-style: ridge;
}
.star-price-description {
  width: 100%;
  height: 40%;
  border-style: ridge;
}

.filter-area {
  width: 90%;
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
}
.location-area {
  width: 100%;
  height: 60%;
}
.location-tab {
  height: 100%;
  border-style: ridge; 
}
::v-deep(.location-tab .ant-tabs-nav-wrap) {
  margin-left: 32px;
}

.star-price-area {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
}
.star-area {
  width: 35%;
  height: 100%;
  border-style: ridge;
  padding-right: 20px;
}
.price-area {
  width: 65%;
  height: 100%;
  border-style: ridge;
  padding-left: 20px;
}

/* 酒店列表 */
.hotel-list-wrapper {
  width: 100%;
  margin-top: 5vh;
  padding-top: 2vh;
}
.hotel-list-container {
  width: 100%;
  padding: 0 10vh;
  display: flex;
}
.hotel-list-area {
  width: 70%;
  padding-right: 10px;
}
.sort-area {
  height: 5vh;
}
::v-deep(.sort-area div) {
  height: 100%;
  line-height: 40px;
  text-align: center;
}
.list-area {
  width: 100%;
  padding-top: 20px;
}
.fixed-area {
  width: 30%;
  height: 90vh;
}
.map-area {
  width: 90%;
  height: 45vh;
  margin-left: 20px;
  border-style: solid;
  margin-bottom: 20px;
}
.history-area {
  width: 90%;
  height: 45vh;
  margin-left: 20px;
  border-style: solid;
  margin-bottom: 20px;
}
/* ::v-deep(.history-area svg) {
  transform: rotate(90deg);
} */
 .history-list-area {
  width: 100%;
  height: 30%;
  padding-bottom: 20px;
 }
</style>