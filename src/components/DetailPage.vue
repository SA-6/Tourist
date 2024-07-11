<script setup>
import { h, ref ,defineComponent ,reactive } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { 
    UserOutlined,
    CarryOutOutlined, 
    BellOutlined,
    PhoneOutlined,
    HomeOutlined,
    StarOutlined, 
    MessageOutlined,
    LikeFilled, 
    LikeOutlined, 
    DislikeFilled, 
    DislikeOutlined,
    RightSquareOutlined,
    RightCircleOutlined
} from '@ant-design/icons-vue';
import { styleProviderProps } from 'ant-design-vue/es/_util/cssinjs/StyleContext';
const navItems = ref([
  {
    key: 'user',
    icon: () => h(UserOutlined),
    label: '用户',
    title: '用户',
    children: [
      {
        type: 'group',
        // label: 'Item 1',
        children: [
          {
            label: '个人信息',
            key: 'info',
          },
          {
            label: '账户余额',
            key: 'account',
          },
        ],
      },
    ],
  },
  {
    key: 'order',
    icon: () => h(CarryOutOutlined),
    label: '订单',
    title: '订单',
  },
  {
    key: 'message',
    icon: () => h(BellOutlined),
    label: '消息通知',
    title: '消息通知',
  },
  {
    key: 'contact',
    icon: () => h(PhoneOutlined),
    label: '联系我们',
    title: '联系我们',
  },
]);

// 面包屑导航
const navLast = {
    URL : '',
    name : '景区'
}


// 详情展示
let detailInstance = {}
const navContent = detailInstance.name;
// 图片展示
detailInstance.imageUrl = [
    'https://raw.githubusercontent.com/vueComponent/ant-design-vue/main/components/carousel/demo/abstract01.jpg',
    'https://raw.githubusercontent.com/vueComponent/ant-design-vue/main/components/carousel/demo/abstract02.jpg',
    'https://raw.githubusercontent.com/vueComponent/ant-design-vue/main/components/carousel/demo/abstract03.jpg',
    'https://raw.githubusercontent.com/vueComponent/ant-design-vue/main/components/carousel/demo/abstract04.jpg',
]
function getImgUrl(i){
    return detailInstance.imageUrl[i];
}
const visible = ref(false);

// 开放时间
detailInstance.openTime = {
    date: '',
    clock: ''
}

// 获取评论数量
function getCommentCount() {
    return;
}
// 获取是否开放中的描述信息
function getStatusDescription() {
    return ;
}



// 游玩攻略部分
// customStyle = {
//     ''
// }
function getTravelTactics() {
    return ;
}

// 用户评论部分
const commentRatingSortedData = [];
const commentTimeSortedData = [];
// const pagination = {
//   onChange: page => {
//     console.log(page);
//   },
//   pageSize: 6,
// };

dayjs.extend(relativeTime);
const likes = ref(0);
const dislikes = ref(0);
const action = ref();
const like = () => {
  likes.value = 1;
  dislikes.value = 0;
  action.value = 'liked';
};
const dislike = () => {
  likes.value = 0;
  dislikes.value = 1;
  action.value = 'disliked';
};

const current1 = ref(1);
const current2 = ref(2);
const onChange = pageNumber => {
  console.log('Page: ', pageNumber);
};

// 发表评论
const open = ref(false);
const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};
const submitting = ref(false);
const commentContent = ref('');
const handleSubmit = () => {
  if (!value.value) {
    return;
  }
  submitting.value = true;
  setTimeout(() => {
    submitting.value = false;
    comments.value = [
      {
        author: 'Han Solo',
        avatar: 'https://joeschmoe.io/api/v1/random',
        content: commentContent.value,
        datetime: dayjs().fromNow(),
      },
      ...comments.value,
    ];
    value.value = '';
  }, 1000);
};
const rating = ref(2.5);

// 观光车列表
let trafficCars = []
trafficCars.push({
    "transportId": 2,
    "vehicleType": "叮叮車",
    "price": 0.01,
    "serviceTime": "夜间"
})

// 食物列表
let foods = []
foods.push({
    "foodId": 1,
    "name": "北京烤鸭",
    "type": "特色美食",
    "cuisine": "北京菜",
    "description": "皮脆肉嫩，色泽金黄，风味独特",
    "priceRange": "高",
    "rating": 4.8,
    "number": 3,
    "address": "北京市烤鸭店",
    "openingHours": "每日 10:00-22:00",
    "contactNumber": "010-12345678",
    "imageUrl": "https://n.sinaimg.cn/sinakd10117/732/w2048h1084/20200627/086d-ivmqpck3629916.jpg",
    "averageCost": 200,
    "features": "享誉世界的传统美食"
})
// 附近演出列表
let shows = []
shows.push({
    "eventId": 1,
    "name": "春之韵音乐会",
    "type": "音乐会",
    "description": "一场庆祝春天到来的户外音乐会，由著名指挥家和交响乐团演出。",
    "location": "北京中山公园音乐堂",
    "time": "2024-07-20 19:30:00",
    "ticketPrice": 480,
    "imageUrl": "http://image.com/spring-concert.jpg"
})

// 附近酒店列表
let hotels = []
hotels.push({

})
</script>

<template>
    <a-layout class="layout">
        <a-layout-header class="detail-header">
            <div class="project-logo">
                <img src="" alt="">
            </div>
            <div class="project-name">
                <span style="font-size: 28px;">TouristSystem</span>
            </div>
            <div class="search-box">
                <a-input-search v-model:value="value" placeholder="input search text" size="medium" enter-button
                    @search="onSearch" />
            </div>
            <a-menu class="detail-menu" v-model:selectedKeys="current" mode="horizontal" :items="navItems" />
        </a-layout-header>
        <a-layout-content style="padding: 0 50px;display: flex;flex-wrap: wrap;">
            <a-breadcrumb style="height: 80px;display: flex;align-items: center;padding-left: 100px;">
                <a-breadcrumb-item href="">
                    <home-outlined />
                </a-breadcrumb-item>
                <a-breadcrumb-item :href="navLast.URL">
                    <span>{{ navLast.name }}</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item>{{ navContent }}</a-breadcrumb-item>
            </a-breadcrumb>
            <section class="info-wrapper">
                <div class="info-image-container">
                    <a-carousel arrows dots-class="slick-dots slick-thumb" dot-position="right">
                        <template #customPaging="props">
                            <a>
                                <img :src="getImgUrl(props.i)" />
                            </a>
                        </template>
                        <div v-for="imageItem in detailInstance.imageUrl.length" :key="imageItem">
                            <img :src="getImgUrl(imageItem - 1)" />
                        </div>
                        <!-- <a-image :preview="{ visible: false }" v-for="item in imgUrl.length" :key="item"
                                class="img-preview" :src="getImgUrl(item - 1)" @click="visible = true" />
                            <div >
                                <a-image-preview-group :preview="{ visible, onVisibleChange: vis => (visible = vis) }">
                                    <a-image v-for="item in imgUrl.length" :key="item" class="img-preview"
                                        :src="getImgUrl(item - 1)" />
                                </a-image-preview-group>
                            </div> -->
                    </a-carousel>
                </div>
                <div class="info-content-container">
                    <div style="display: flex;justify-content: space-between;margin: 10px 0;">
                        <h2>{{ detailInstance.name }}</h2>

                        <!-- 这里展示风景区级别 -->
                        <div style="position: absolute;right: 0;">
                            <!-- <img src="" alt=""> -->
                        </div>

                    </div>
                    <div style="display: flex;margin: 10px 0;">
                        <div style="margin-right: 30px;">
                            <span>{{ detailInstance.rating }}</span>
                            /5分
                        </div>
                        <a href="">{{ getCommentCount() }}条点评</a>
                    </div>
                    <div style="text-align: left;margin: 10px 0;">
                        <span style="margin-right: 20px;width: 80px;display: inline-block;">地址</span>
                        <span>{{ detailInstance.address }}</span>
                    </div>
                    <div style="text-align: left;margin: 10px 0;">
                        <span style="margin-right: 20px;width: 80px;display: inline-block;">开放时间</span>
                        <span :style="{color : status?'green' : 'black'}"> {{ getStatusDescription() }} 111</span>
                        <span>{{ detailInstance.openTime.clock }}</span>
                    </div>
                    <div style="text-align: left;margin: 10px 0;">
                        <span style="margin-right: 20px;width: 80px;display: inline-block;">票价</span>
                        <span>{{ detailInstance.ticketPrice }}</span>
                    </div>
                    <div style="text-align: left;margin: 10px 0;">
                        <span style="margin-right: 20px;width: 80px;display: inline-block;">联系方式</span>
                        <span>{{ detailInstance.contactNumber }}</span>
                    </div>
                    <div style="text-align: left;margin: 10px 0;">
                        <span style="margin-right: 20px;width: 80px;display: inline-block;">特色</span>
                        <span>{{ detailInstance.features }}</span>
                    </div>
                    <div style="position: absolute;bottom: 0;">
                        打分
                    </div>
                </div>
            </section>

            <!-- 左部区域 -->
            <section class="left-area-wrapper">
                <!-- 描述信息 -->
                <section class="description-wrapper">
                    <div class="description-container">
                        <div class="introduction-container">
                            <h2>介绍</h2>
                            <p>{{ detailInstance.description }}</p>
                        </div>
                        <div class="time-container">
                            <h2>开放时间</h2>
                            <p style="min-height: 4vh;margin: 0;">{{ detailInstance.openTime.date }} &nbsp; {{
                                detailInstance.openTime.clock }}</p>
                        </div>
                    </div>
                </section>

                <!-- 游玩线路 -->
                <section class="route-wrapper">
                    <div class="route-container">

                    </div>
                </section>

                <!-- 游玩攻略 -->
                <section class="tactics-wrapper">
                    <h2 style="margin: 0;text-align: left;padding: 20px;padding-bottom: 0;">游玩攻略</h2>
                    <div class="tactics-container">
                        <a-collapse v-model:activeKey="activeKey" :bordered="false"
                            style="background: rgb(255, 255, 255)">
                            <template #expandIcon="{ isActive }">
                                <RightCircleOutlined :rotate="isActive ? 90 : 0"/>
                            </template>
                            <a-collapse-panel key="1" header="This is panel header 1" :style="customStyle">
                                <p>{{ text }}</p>
                            </a-collapse-panel>
                            <a-collapse-panel key="2" header="This is panel header 2" :style="customStyle">
                                <p>{{ text }}</p>
                            </a-collapse-panel>
                            <a-collapse-panel key="3" header="This is panel header 3" :style="customStyle">
                                <p>{{ text }}</p>
                            </a-collapse-panel>
                        </a-collapse>
                    </div>
                </section>

                <!-- 用户评论 -->
                <section class="comment-wrapper">
                    <div class="comment-container">
                        <div class="comment-share">
                            <div style="display: flex;height: 5vh;position: relative;">
                                <h2>用户点评({{ getCommentCount() }})</h2>
                                <a-button type="primary" @click="showDrawer">写点评</a-button>
                                <a-drawer :width="500" title="Basic Drawer" placement="bottom" :open="open"
                                    @close="onClose">
                                    <template #extra>
                                        <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
                                        <a-button type="primary" @click="onClose">Submit</a-button>
                                    </template>
                                    <a-comment>
                                        <template #avatar>
                                            <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
                                        </template>
                                        <template #content>
                                            <a-form-item>
                                                <a-textarea v-model:value="value" :rows="4" />
                                            </a-form-item>
                                            <!-- <a-form-item>
                                                <a-button html-type="submit" :loading="submitting" type="primary"
                                                    @click="handleSubmit">
                                                    Add Comment
                                                </a-button>
                                            </a-form-item> -->
                                        </template>
                                        <a-rate v-model:value="rating" allow-half :allowClear="true" />
                                    </a-comment>
                                </a-drawer>
                            </div>
                            <div style="margin-right: 30px;text-align: left;">
                                <span>{{ detailInstance.rating }}</span>
                                /5分
                            </div>
                        </div>
                        <!-- 展示评论 -->
                        <a-tabs v-model:activeKey="activeKey">
                            <a-tab-pane key="1" tab="智能排序">
                                <a-comment v-for="comment in commentTimeSortedData">
                                    <template #actions>
                                        <span key="comment-basic-like">
                                            <a-tooltip title="Like">
                                                <template v-if="action === 'liked'">
                                                    <LikeFilled @click="like" />
                                                </template>
                                                <template v-else>
                                                    <LikeOutlined @click="like" />
                                                </template>
                                            </a-tooltip>
                                            <span style="padding-left: 8px; cursor: auto">
                                                {{ likes }}
                                            </span>
                                        </span>
                                        <span key="comment-basic-dislike">
                                            <a-tooltip title="Dislike">
                                                <template v-if="action === 'disliked'">
                                                    <DislikeFilled @click="dislike" />
                                                </template>
                                                <template v-else>
                                                    <DislikeOutlined @click="dislike" />
                                                </template>
                                            </a-tooltip>
                                            <span style="padding-left: 8px; cursor: auto">
                                                {{ dislikes }}
                                            </span>
                                        </span>
                                        <span key="comment-basic-reply-to">Reply to</span>
                                    </template>
                                    <template #author><a>Han Solo</a></template>
                                    <template #avatar>
                                        <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
                                    </template>
                                    <template #content>
                                        <p>
                                            We supply a series of design principles, practical patterns and high quality
                                            design
                                            resources (Sketch and Axure), to help people create their product prototypes
                                            beautifully and
                                            efficiently.
                                        </p>
                                    </template>
                                    <template #datetime>
                                        <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
                                            <span>{{ dayjs().fromNow() }}</span>
                                        </a-tooltip>
                                    </template>
                                </a-comment>
                                <a-pagination v-model:current="current1" show-quick-jumper :total="500"
                                    @change="onChange" />
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="时间排序" force-render>
                                <a-comment v-for="comment in commentTimeSortedData">
                                    <template #actions>
                                        <span key="comment-basic-like">
                                            <a-tooltip title="Like">
                                                <template v-if="action === 'liked'">
                                                    <LikeFilled @click="like" />
                                                </template>
                                                <template v-else>
                                                    <LikeOutlined @click="like" />
                                                </template>
                                            </a-tooltip>
                                            <span style="padding-left: 8px; cursor: auto">
                                                {{ likes }}
                                            </span>
                                        </span>
                                        <span key="comment-basic-dislike">
                                            <a-tooltip title="Dislike">
                                                <template v-if="action === 'disliked'">
                                                    <DislikeFilled @click="dislike" />
                                                </template>
                                                <template v-else>
                                                    <DislikeOutlined @click="dislike" />
                                                </template>
                                            </a-tooltip>
                                            <span style="padding-left: 8px; cursor: auto">
                                                {{ dislikes }}
                                            </span>
                                        </span>
                                        <span key="comment-basic-reply-to">Reply to</span>
                                    </template>
                                    <template #author><a>Han Solo</a></template>
                                    <template #avatar>
                                        <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
                                    </template>
                                    <template #content>
                                        <p>
                                            We supply a series of design principles, practical patterns and high quality
                                            design
                                            resources (Sketch and Axure), to help people create their product prototypes
                                            beautifully and
                                            efficiently.
                                        </p>
                                    </template>
                                    <template #datetime>
                                        <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
                                            <span>{{ dayjs().fromNow() }}</span>
                                        </a-tooltip>
                                    </template>
                                </a-comment>
                                <a-pagination v-model:current="current1" show-quick-jumper :total="500"
                                    @change="onChange" />
                            </a-tab-pane>
                        </a-tabs>
                    </div>
                </section>
            </section>


            <!-- 右部区域 -->
            <section class="right-area-wrapper">
                <!-- 景区内部交通车 -->
                <section v-if="displayer='scene'" class="traffic-wrapper">
                    <h2 style="margin: 0;text-align: left;padding: 20px;padding-bottom: 0;">景区交通</h2>
                    <div class="traffic-container">
                        <div v-for="trafficCar in trafficCars" :key="trafficCar.transportId"
                            style="display: flex;height: 10vh;width: 100%;margin-bottom: 10px;color: #000;">
                            <img :src="trafficCar.imageUrl" alt="" style="width: 10vh;height: 100%;object-fit: fill;">
                            <div
                                style="width: calc(100% - 10vh);height: 100%;padding-left: 10px;text-align: left;display: flex;flex-direction: column;">
                                <h2>{{ trafficCar.vehicleType }}</h2>
                                <div>
                                    <span>￥{{ trafficCar.price }}/人</span>
                                </div>
                                <div>
                                    <span>服务时间:{{ trafficCar.serviceTime }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- 食物推荐 -->
                <section class="food-wrapper">
                    <h2 style="margin: 0;text-align: left;padding: 20px;padding-bottom: 0;">附近美食</h2>
                    <div class="food-container">
                        <a href="" class="food-item" v-for="food in foods" :key="food.foodId"
                            style="display: flex;height: 12vh;width: 100%;margin-bottom: 10px;color: #000;">
                            <img :src="food.imageUrl" alt="" style="width: 12vh;height: 100%;object-fit: fill;">
                            <div
                                style="width: calc(100% - 12vh);height: 100%;padding-left: 10px;text-align: left;display: flex;flex-direction: column;">
                                <h2>{{ food.name }}</h2>
                                <div style="display: flex;width: 100%;justify-content: space-between;">
                                    <div>
                                        <span>{{ food.type }}</span>&nbsp;
                                        <span>{{ food.cuisine }}</span>
                                    </div>
                                    <div>
                                        <span>￥{{ food.averageCost }}/人</span>&nbsp;
                                        <span>{{ food.priceRange }}</span>
                                    </div>
                                </div>
                                <div style="display: flex;justify-content: space-between;width: 100%;">
                                    <span class="score">{{ food.rating }}分</span>
                                    <span style="padding-right: 20px;">{{ food.number }}条点评</span>
                                </div>
                                <div style="display: flex;width: 100%;">
                                    <span>营业时间: {{ food.openingHours }}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </section>
                <!-- 演出推荐 -->
                <section class="show-wrapper">
                    <h2 style="margin: 0;text-align: left;padding: 20px;padding-bottom: 0;">附近演出</h2>
                    <div class="show-container">
                        <a href="" class="show-item" v-for="show in shows" :key="show.eventId"
                            style="display: flex;height: 12vh;width: 100%;margin-bottom: 10px;color: #000;">
                            <img :src="show.imageUrl" alt="" style="width: 12vh;height: 100%;object-fit: fill;">
                            <div
                                style="width: calc(100% - 12vh);height: 100%;padding-left: 10px;text-align: left;display: flex;flex-direction: column;">
                                <h2>{{ show.name }}</h2>
                                <div style="display: flex;width: 100%;justify-content: space-between;">
                                    <span>{{ show.type }}</span>
                                    <span>￥{{ show.ticketPrice }}/人</span>
                                </div>
                                <div style="display: flex;width: 100%;">
                                    <span>地点: {{ show.location }}</span>
                                </div>
                                <div style="display: flex;width: 100%;">
                                    <span>时间: {{ show.time }}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </section>
                <!-- 酒店推荐 -->
                <section class="hotel-wrapper">
                    <h2 style="margin: 0;text-align: left;padding: 20px;padding-bottom: 0;">附近酒店</h2>
                    <div class="hotel-container">
                        <a href="" class="hotel-item" v-for="hotel in hotels" :key="hotel.eventId"
                            style="display: flex;height: 12vh;width: 100%;margin-bottom: 10px;color: #000;">
                            <img :src="hotel.imageUrl" alt="" style="width: 12vh;height: 100%;object-fit: fill;">
                            <div
                                style="width: calc(100% - 12vh);height: 100%;padding-left: 10px;text-align: left;display: flex;flex-direction: column;">
                                <h2>{{ hotel.name }}</h2>
                                <div style="display: flex;width: 100%;justify-content: space-between;">
                                    <span>{{ hotel.type }}</span>
                                    <span>￥{{ hotel.ticketPrice }}/人</span>
                                </div>
                                <div style="display: flex;width: 100%;">
                                    <span>地点: {{ hotel.location }}</span>
                                </div>
                                <div style="display: flex;width: 100%;">
                                    <span>时间: {{ hotel.time }}</span>hotel
                                </div>
                            </div>
                        </a>
                    </div>
                </section>
            </section>

        </a-layout-content>

        <a-layout-footer :style="{ textAlign: 'center' }">
            Tourist System ©2024 Created by CSU-SoftwareEngineer-2204
        </a-layout-footer>
    </a-layout>

</template>

<style scoped>

.detail-header {
    padding: 0 150px 0 100px;
    position: relative;
    background: #fff;
    width: 100%;
    height: 72px;
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
}
.project-logo {
    width: 50px;
    height: 100%;
}
.project-name {
    height: 100%;
    width: auto;
    line-height: 52px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.search-box {
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 40px;
}
::v-deep(.search-box input) {
    border: 0;
    margin-top: 4px;
    height: 36px;
    width: 200px;
}
::v-deep(.search-box button) {
    border: 0;
    height: 40px;
    margin-top: 2px;
}
.detail-menu {
    background: transparent;
    border: 0;
    padding-left: 50px;
    display: flex;
    align-items: center;
    float: right;
    position: absolute;
    right: 100px;
}
::v-deep(.detail-menu span) {
    transform: scale(1.5);
}

/* 面包屑 */
nav span{
    transform: scale(1.2);
}
nav li {
    transform: scale(1.3);
}
::v-deep(nav .ant-breadcrumb-separator) {
    font-size: 15px;
    position: relative;
    left: 5px;
}
::v-deep(nav .ant-breadcrumb-link) {
    transform: translateX(10px) !important;
}
::v-deep(nav span.ant-breadcrumb-link) {
    position: relative;
    left: 10px;
}

/* 详情信息展示 */
.info-wrapper {
    margin: 0 4%;
    width: 92%;
    height: 60vh;
    padding: 44px;
    min-height: 400px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
}
.info-image-container {
    width: 55%;
    height: 100%;
}
.info-content-container {
    width: 40%;
    height: 100%;
    position: relative;
}
/* 图像走马灯 */
:deep(.slick-dots) {
  position: relative;
  height: auto;
}
:deep(.slick-slide img) {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
  /*  */
  position: absolute;
  left: 0;
}
:deep(.slick-arrow) {
  display: none !important;
}
:deep(.slick-thumb) {
  bottom: 0px;
}
:deep(.slick-thumb li) {
  width: 60px;
  height: 45px;
}
:deep(.slick-thumb li img) {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
  display: block;
}
:deep .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
::v-deep(.info-image-container div) {
    width: 100% !important;
    height: 100% !important;
    transition: all .5s ease-in-out;
}
::v-deep(.info-image-container img) {
    width: 100% !important;
    height: 100% !important;
    margin: 0;
    border: 1px;
}
::v-deep(.info-image-container li.slick-active) {
    width: 100px !important;
    height: 20%;
    border: #2e5bba;
    border-style: solid;
}
::v-deep(.info-image-container ul) {
    position: absolute;
    width: 120px;
    right: 0;
    height: 80%;
    overflow: hidden;
}
::v-deep(.info-image-container li) {
    /* position: absolute; */
    width: 80px;
    height: 60px;
    transition: all .5s ease-in-out;
    margin: 6px 0;
}
::v-deep(.info-image-container .ant-image-mask) {
    max-width: 80%;
    padding: 0;
    border: 1px;
}


/**
 *左部区域 
**/
.left-area-wrapper {
    margin-top: 4vh;
    width: calc(60% - 4vh);
    background-color: transparent;
    margin-left: 4%;
    margin-right: 4vh;
}
/* 景点介绍 */
.description-wrapper {
    /* display: inline-block; */
    
    width: 100%;
    height: 30vh;
    background-color: #fff
}
.description-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    text-align: left;
}
.description-container h2 {

}
.description-container p {
    width: 100%;
    height: 30%;
    min-height: 10vh;
    margin-bottom: 30px ;
}
/* 游玩线路 */
.route-wrapper {
    margin-top: 4vh;
    width: 100%;
    height: 80vh;
    background-color: #fff;
}
.route-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    text-align: left;
}

/* 游玩攻略 */
.tactics-wrapper {
    margin-top: 4vh;
    width: 100%;
    min-height: 40vh;
    background-color: #fff;
}
.tactics-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    text-align: left;
}

/* 用户评论 */
.comment-wrapper {
    margin-top: 4vh;
    width: 100%;
    background-color: #fff;
}
.comment-container {
    width: 100%;
    height: 100%;
    padding: 20px;
}


::v-deep(.comment-container .ant-tabs-nav-list) {
    left: 75%;
}
/* 右部区域 */
.right-area-wrapper {
    width: 32%;
    margin: 0 ;
    margin-top: 4vh;
}
/* 景区内部观光车 */
.traffic-wrapper {
    /* display: inline-block; */
    width: 100%;
    height: 50vh;
    background-color: #fff;
}
.traffic-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    padding-top: 10px;
}

/* 食物推荐 */
.food-wrapper {
    width: 100%;
    height: 60vh;
    margin-top: 4vh;
    background-color: #fff;
}
.food-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    padding-top: 10px;
}
.food-item:hover {
    cursor: pointer;
}

/* 演出推荐 */
.show-wrapper {
    width: 100%;
    height: 60vh;
    margin-top: 4vh;
    background-color: #fff;
}
.show-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    padding-top: 10px;
}
.show-item:hover {
    cursor: pointer;
}

/* 附近酒店推荐 */
.hotel-wrapper {
    width: 100%;
    height: 60vh;
    margin-top: 4vh;
    background-color: #fff;
}
.hotel-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    padding-top: 10px;
}
.hotel-item:hover {
    cursor: pointer;
}
</style>