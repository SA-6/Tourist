<script setup>
import { h, ref ,defineComponent ,toRefs, onBeforeMount, reactive, onMounted, watch, watchEffect } from 'vue';
import dayjs from 'dayjs';
import axios from 'axios';
import relativeTime from 'dayjs/plugin/relativeTime';
import { message } from 'ant-design-vue';
import { styleProviderProps } from 'ant-design-vue/es/_util/cssinjs/StyleContext';
import {
    HomeOutlined,
    RightCircleOutlined,
    LikeFilled,
    LikeOutlined,
    DislikeFilled,
    DislikeOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    DownOutlined,
    UserOutlined,
    CarryOutOutlined,
    BellOutlined

} from  '@ant-design/icons-vue';
import router from '../../router'
import { useRoute } from 'vue-router';
const route = useRoute()

const baseURL = `http://localhost:8080`
axios.defaults.baseURL = baseURL


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
    name : '酒店'
}

function onHomeLinkClicked() {
    router.push({
        name : 'overview'
    })
}
function onLastLinkClicked() {
    router.push({
        name : 'hotelPage'
    })
}

// 详情展示
const navContent = route.query.name;

const visible = ref(false);

// 获取评论数量
function getCommentCount() {
    return;
}
// 获取是否开放中的描述信息
function getStatusDescription() {
    return ;
}

console.log(route.query);
// 获取酒店的数据
const hotelName = route.query.name
const hotelId   = route.query.hotelId
let hotelData = reactive({
    datas : []
})
let facilities
let nearbyAttractions

async function getHotelInfo(hotelId) {
    const response = await axios.get('/hotels/hotelInfo',{
        params : {
            hotel_id : hotelId
        }
    })
    console.log(response.data);
    try {
        if (response.data.status !== 500){
            return response.data.data.hotel
        }
    } catch (error) {
        console.log(error);
    }
}
async function getRoomList(hotelId,category='全部',max=10000,min=-1) {
    const response = await axios('/rooms/selectRoomsByConditions',{
        params : {
            hotel_id : hotelId,
            category : category,
            max      : max,
            min      : min
        }
    })
    console.log(response.data);
    try {
        if (response.data.status === 0) {
            return response.data.data
        }
    } catch (error) {
        console.log(error);
    }
}

// 筛选部分
const roomsData = reactive(['单人房','双人房','套房','经济房','商务房','行政套房','豪华大床房','标准双床房','湖景房','山景套房'])
const costData  = reactive(['¥100以下','¥100-300','¥300-500','¥500-700','¥700-900','¥900-1100','¥1100-1600','¥1600以上'])

let choosedRoom = ref()
let choosedCost = ref()


watch(choosedRoom,async ()=>{
    const room = choosedRoom.value
    const cost = costTagToValue(choosedCost.value)
    roomList.value = await getRoomList(hotelId,room,cost.max,cost.min)
    roomData.value = await getRoomList(hotelId,room,cost.max,cost.min)
    console.log(roomList.value);
})

watch(choosedCost,async ()=>{
    const room = choosedRoom.value
    const cost = costTagToValue(choosedCost.value)
    console.log(cost);
    roomList.value = await getRoomList(hotelId,room,cost.max,cost.min)
    roomData.value = await getRoomList(hotelId,room,cost.max,cost.min)
    console.log(roomList.value);
})

function handleRoomMenuClick(key) {
    choosedRoom.value = roomsData[key]
    console.log(choosedRoom.value);
}
function handleCostMenuClick(key) {
    choosedCost.value = costData[key]
}
function costTagToValue(tag) {
    let cost = {
        max: -1,
        min: -1
    }
    switch (tag) {
        case '¥100以下': cost.min = 0; cost.max = 100; break;
        case '¥100-300': cost.min = 100; cost.max = 300; break;
        case '¥300-500': cost.min = 300; cost.max = 500; break;
        case '¥500-700': cost.min = 500; cost.max = 700; break;
        case '¥700-900': cost.min = 700; cost.max = 900; break;
        case '¥900-1100': cost.min = 900; cost.max = 1100; break;
        case '¥1100-1600': cost.min = 1100; cost.max = 1600; break;
        case '¥1600以上': cost.min = 1600; cost.max = 10000; break;
        default         : cost.min = -1; cost.max = 10000; break;
    }
    return cost
}

const initLoading = ref(true);
const loading = ref(false);
let roomData = ref([]);
let roomList = ref([]);


// 导航跳转
function onAreaClicked(key) {
    console.log(1);
    let active,inActive
    if (key === 1){
        active = document.querySelector('.room')
        inActive = document.querySelector('.comment')
    }else if (key === 2){
        active = document.querySelector('.comment')
        inActive = document.querySelector('.room')
    }

    console.log(active);
    if (active) {
        active.style.borderBottom = '2px solid rgb(38, 129, 255)'; // 设置下边界颜色
    }
    if (inActive) {
        inActive.style.borderBottom = 'none'
    }
}

// 用户评论部分
const commentRatingSortedData = ref([]);
commentRatingSortedData.value.push(
    {
        avatar : "https://zhangyee.oss-cn-chengdu.aliyuncs.com/avatar/%E5%BC%A0%E4%BA%A6.jpg?Expires=1721827166&OSSAccessKeyId=LTAI5tR6aF8xNZS783uiHP4w&Signature=sxFv1iU39tPZFurUK23euUbAAKA%3D",
        hotelReview : {
            comment : '这酒店不错',
            likeNum : 16154,
            rating  : 5,
            reviewId : 1,
            hotelSpotId : 14,
            time : "2024-07-11T16:46:28",
            userId : 6
        },
        username : '张亦驰'
    },
    {
        avatar : "https://zhangyee.oss-cn-chengdu.aliyuncs.com/avatar/%E5%BC%A0%E4%BA%A6.jpg?Expires=1721827166&OSSAccessKeyId=LTAI5tR6aF8xNZS783uiHP4w&Signature=sxFv1iU39tPZFurUK23euUbAAKA%3D",
        hotelReview : {
            comment : '这酒店不错',
            likeNum : 16154,
            rating  : 5,
            reviewId : 1,
            hotelSpotId : 14,
            time : "2024-07-11T16:46:28",
            userId : 6
        },
        username : '张亦驰'
    },
    {
        avatar : "https://zhangyee.oss-cn-chengdu.aliyuncs.com/avatar/%E5%BC%A0%E4%BA%A6.jpg?Expires=1721827166&OSSAccessKeyId=LTAI5tR6aF8xNZS783uiHP4w&Signature=sxFv1iU39tPZFurUK23euUbAAKA%3D",
        hotelReview : {
            comment : '这酒店不错',
            likeNum : 16154,
            rating  : 5,
            reviewId : 1,
            hotelSpotId : 14,
            time : "2024-07-11T16:46:28",
            userId : 6
        },
        username : '张亦驰'
    },
    {
        avatar : "https://zhangyee.oss-cn-chengdu.aliyuncs.com/avatar/%E5%BC%A0%E4%BA%A6.jpg?Expires=1721827166&OSSAccessKeyId=LTAI5tR6aF8xNZS783uiHP4w&Signature=sxFv1iU39tPZFurUK23euUbAAKA%3D",
        hotelReview : {
            comment : '这酒店不错',
            likeNum : 16154,
            rating  : 5,
            reviewId : 1,
            hotelSpotId : 14,
            time : "2024-07-11T16:46:28",
            userId : 6
        },
        username : '张亦驰'
    },
    {
        avatar : "https://zhangyee.oss-cn-chengdu.aliyuncs.com/avatar/%E5%BC%A0%E4%BA%A6.jpg?Expires=1721827166&OSSAccessKeyId=LTAI5tR6aF8xNZS783uiHP4w&Signature=sxFv1iU39tPZFurUK23euUbAAKA%3D",
        hotelReview : {
            comment : '这酒店不错',
            likeNum : 16154,
            rating  : 5,
            reviewId : 1,
            hotelSpotId : 14,
            time : "2024-07-11T16:46:28",
            userId : 6
        },
        username : '张亦驰'
    },
    {
        avatar : "https://zhangyee.oss-cn-chengdu.aliyuncs.com/avatar/%E5%BC%A0%E4%BA%A6.jpg?Expires=1721827166&OSSAccessKeyId=LTAI5tR6aF8xNZS783uiHP4w&Signature=sxFv1iU39tPZFurUK23euUbAAKA%3D",
        hotelReview : {
            comment : '这酒店不错',
            likeNum : 16154,
            rating  : 5,
            reviewId : 1,
            hotelSpotId : 14,
            time : "2024-07-11T16:46:28",
            userId : 6
        },
        username : '张亦驰'
    }
)
const commentTimeSortedData = ref([]);
commentTimeSortedData.value.push(
    {
        avatar : "https://zhangyee.oss-cn-chengdu.aliyuncs.com/avatar/%E5%BC%A0%E4%BA%A6.jpg?Expires=1721827166&OSSAccessKeyId=LTAI5tR6aF8xNZS783uiHP4w&Signature=sxFv1iU39tPZFurUK23euUbAAKA%3D",
        hotelReview : {
            comment : '这酒店不错',
            likeNum : 16154,
            rating  : 5,
            reviewId : 1,
            hotelSpotId : 14,
            time : "2024-07-11T16:46:28",
            userId : 6
        },
        username : '张亦驰'
    },
    {
        avatar : "https://zhangyee.oss-cn-chengdu.aliyuncs.com/avatar/%E5%BC%A0%E4%BA%A6.jpg?Expires=1721827166&OSSAccessKeyId=LTAI5tR6aF8xNZS783uiHP4w&Signature=sxFv1iU39tPZFurUK23euUbAAKA%3D",
        hotelReview : {
            comment : '这酒店不错',
            likeNum : 16154,
            rating  : 5,
            reviewId : 1,
            hotelSpotId : 14,
            time : "2024-07-11T16:46:28",
            userId : 6
        },
        username : '张亦驰'
    },
    {
        avatar : "https://zhangyee.oss-cn-chengdu.aliyuncs.com/avatar/%E5%BC%A0%E4%BA%A6.jpg?Expires=1721827166&OSSAccessKeyId=LTAI5tR6aF8xNZS783uiHP4w&Signature=sxFv1iU39tPZFurUK23euUbAAKA%3D",
        hotelReview : {
            comment : '这酒店不错',
            likeNum : 16154,
            rating  : 5,
            reviewId : 1,
            hotelSpotId : 14,
            time : "2024-07-11T16:46:28",
            userId : 6
        },
        username : '张亦驰'
    },
    {
        avatar : "https://zhangyee.oss-cn-chengdu.aliyuncs.com/avatar/%E5%BC%A0%E4%BA%A6.jpg?Expires=1721827166&OSSAccessKeyId=LTAI5tR6aF8xNZS783uiHP4w&Signature=sxFv1iU39tPZFurUK23euUbAAKA%3D",
        hotelReview : {
            comment : '这酒店不错',
            likeNum : 16154,
            rating  : 5,
            reviewId : 1,
            hotelSpotId : 14,
            time : "2024-07-11T16:46:28",
            userId : 6
        },
        username : '张亦驰'
    },
    {
        avatar : "https://zhangyee.oss-cn-chengdu.aliyuncs.com/avatar/%E5%BC%A0%E4%BA%A6.jpg?Expires=1721827166&OSSAccessKeyId=LTAI5tR6aF8xNZS783uiHP4w&Signature=sxFv1iU39tPZFurUK23euUbAAKA%3D",
        hotelReview : {
            comment : '这酒店不错',
            likeNum : 16154,
            rating  : 5,
            reviewId : 1,
            hotelSpotId : 14,
            time : "2024-07-11T16:46:28",
            userId : 6
        },
        username : '张亦驰'
    },
    {
        avatar : "https://zhangyee.oss-cn-chengdu.aliyuncs.com/avatar/%E5%BC%A0%E4%BA%A6.jpg?Expires=1721827166&OSSAccessKeyId=LTAI5tR6aF8xNZS783uiHP4w&Signature=sxFv1iU39tPZFurUK23euUbAAKA%3D",
        hotelReview : {
            comment : '这酒店不错',
            likeNum : 16154,
            rating  : 5,
            reviewId : 1,
            hotelSpotId : 14,
            time : "2024-07-11T16:46:28",
            userId : 6
        },
        username : '张亦驰'
    }
)


dayjs.extend(relativeTime);
const likes = ref(0);
const action = ref([]);
//评论点赞
const like = (index) => {
  if(action.value[index]  === 'liked'){
    likes.value = likes.value - 1;
    action.value[index] = '';
  }else{
    likes.value = likes.value + 1;
    action.value[index] = 'liked';
  }
};
//不喜欢评论
const dislike = (index) => {
    if(action.value[index] === 'disliked'){
        action.value[index] = ''
    }else{
        action.value[index] = 'disliked';
    }
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

// //在加载页面前获取数据
onMounted(async ()=>{
    console.log("请求加载详情页");
    initLoading.value = false;

    hotelData.datas = await getHotelInfo(hotelId)
    console.log(hotelData.datas);
    facilities = hotelData.datas.facilities.split(/[,，]/)
    nearbyAttractions = hotelData.datas.nearbyAttractions.split(/[,，]/)
    roomData.value = await getRoomList(hotelId)
    roomList.value = await getRoomList(hotelId)
    
    console.log(roomList.value);
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
                <a-input-search v-model:value="targetScene" placeholder="请输入目标酒店" size="medium" enter-button
                    @search="onSearch" />
            </div>
            <a-menu class="detail-menu" v-model:selectedKeys="current" mode="horizontal" :items="navItems" />
        </a-layout-header>
        <a-layout-content style="padding: 0 50px;display: flex;flex-wrap: wrap;">
            <!-- 面包屑导航栏 -->
            <a-breadcrumb style="height: 80px;display: flex;align-items: center;padding-left: 100px;">
                <a-breadcrumb-item @click="onHomeLinkClicked()">
                    <home-outlined class="home-link" />
                </a-breadcrumb-item>
                <a-breadcrumb-item @click="onLastLinkClicked()">
                    <span class="last-link">{{ navLast.name }}</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item>{{ navContent }}</a-breadcrumb-item>
            </a-breadcrumb>
            <section class="info-wrapper">
                <div class="info-image-container">
                    <div
                        style="width: 100%;height: 20% !important;padding-bottom:10px;display: flex;flex-direction: column; ">
                        <div style="display: flex;">
                            <h2 style="margin-right: 20px;margin-bottom: 5px;">{{ hotelData.datas.name }}</h2>
                            <div style="">
                                <a-rate :value="hotelData.datas.starRating" disabled />
                            </div>
                        </div>
                        <div style="display: flex;flex-direction: column;">
                            <div style="text-align: left;margin-bottom: 3px;">
                                <EnvironmentOutlined style="margin-right: 5px;" />
                                <span>{{ hotelData.datas.address }}</span>
                                <!-- 显示地图 -->
                            </div>
                            <div style="text-align: left;">
                                <PhoneOutlined style="margin-right: 5px;" />
                                <span>{{ hotelData.datas.contactNumber }}</span>
                            </div>
                        </div>
                    </div>
                    <a-carousel arrows class="carousel-wrapper" dots-class="slick-dots slick-thumb" dot-position="right"
                        autoplay style="height: 80% !important;">
                        <img :src="hotelData.datas.imageUrl" alt="">
                        <!-- 这里酒店只有一张图片 -->
                        <!-- <div v-for="(imageItem,index) in detailInstance.imageUrl" :key="index">
                            <img :src="imageItem" />
                        </div> -->
                    </a-carousel>
                </div>
                <div class="info-content-container">
                    <div
                        style="height: 20%;display: flex;text-align: right;justify-content: flex-end;padding: 5px;align-items: flex-end;">
                        <div style="text-align: right;padding-bottom: 5px;margin-right: 8px;">
                            <h2 style="display: inline;color: rgb(40, 125, 250);font-weight: 700;">￥{{
                                hotelData.datas.averageCost }}&nbsp
                            </h2>起
                        </div>
                        <a href="#room-list" style="height: 50%;border-radius: 3px;background-color: rgb(40, 125, 250);color: #fff;font-weight: 700;font-size: 18px;
                            display: flex;align-items: center; padding: 10px;outline: none;">选择房间</a>
                    </div>
                    <div
                        style="height: 30%;display: flex;text-align: left;padding-top: 20px;padding-bottom: 5px;margin-top: 10px;">
                        <div style="display: flex;flex-direction: column;width: 50%;">
                            <div style="display: flex;justify-content: flex-start;height: 30%;line-height: 20px;">
                                <span
                                    style="height: 100%;width: 35%;background-color: rgb(73, 120, 206);color: #fff;
                                    font-weight: 800;font-size: 20px;display: flex;align-items: center;justify-content: center;">{{
                                    hotelData.datas.rating }}</span>
                            </div>
                            <div style="margin:7px;">
                                <div style="font-size: 14px;color: rgb(133, 146, 166);">共{{
                                    hotelData.datas.reviewAmounts }}条点评</div>
                            </div>
                            <div>
                                <a-tag color="orange" v-for="(tag,index) in facilities" :key="index"
                                    style="border-radius: 2px;height: 25px;line-height: 25px;">{{ tag }}</a-tag>
                            </div>
                        </div>
                        <div style="display: flex;justify-content: center;align-items: center;width: 50%;">
                            <div style="height: 30px;width: 30px;transform: rotate(45deg);z-index: -1;
                                position: relative;left: 14px;background-color: rgb(245, 249, 255);">
                            </div>
                            <div style="height: 80%;width: 80%;">
                                <span
                                    style="background-color: rgb(245, 249, 255);display: block; width: 100%;height: 100%;padding: 15px 10px;border-radius: 3px;z-index: 3;">
                                    {{ hotelData.datas.description }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div style="width: 100%;padding: 5px;display: flex;">
                        <div style="width: 150px;height: 150px;border: solid;">
                            这是一个地图
                        </div>
                        <div
                            style="display: flex;flex-direction: column;justify-content: space-between;width: calc(100% - 150px);margin-left: 10px;">
                            <div style="height: 40%;width: 100%;text-align: left;">
                                <span style="display: block;height: 50%;">附近景点：</span>
                                <a-tag color="#87d068" v-for="(tag,index) in nearbyAttractions"
                                    style="border-radius: 2px;height: 25px;line-height: 25px;">{{ tag }}</a-tag>
                            </div>
                            <div style="height: 20%;width: 100%;text-align: left;">
                                <a
                                    style="height: 100%;border-radius: 3px;background: transparent;color: rgb(40, 125, 250);font-weight: 700;font-size: 15px;line-height: 15px;">查看地图</a>
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>

            </section>

            <!-- 左部区域 -->
            <section class="left-area-wrapper">
                <section class="choice-wrapper"
                    style="height: 5vh;width: 100%;background-color: #fff;text-align: left;padding-left: 20px;display: flex;">
                    <a class="room" style="display: inline-block;height: 100%;width: 10%;margin-right: 20px;background: transparent;
                        display: flex;justify-content: center;align-items: center;font-size: 20px;color: #000;" href="#room-list"
                        @click="onAreaClicked(1)">房间</a>
                    <a class="comment" style="display: inline-block;height: 100%;width: 10%;margin-right: 20px;background: transparent;
                        display: flex;justify-content: center;align-items: center;font-size: 20px;color: #000;" href="#comment-list"
                        @click="onAreaClicked(2)">点评</a>
                </section>
                <div style="height: 0.2vh;background-color: rgb(240, 242, 245);"></div>
                <!-- 房间列表 -->
                <section class="room-wrapper" id="room-list"
                    style="width: 100%;background-color: #fff;background-color: rgb(240, 242, 245);">
                    <div class="room-header"
                        style="width: 100%;height: 10vh;display: flex;justify-content: flex-start;background-color: #fff;">
                        <div
                            style="border-left: solid;height: 20px;margin-left: 20px;align-self: center;border-color: rgb(218, 223, 230);">
                        </div>
                        <a-dropdown class="drop-down" style="height: 100%;" :trigger="['click']">
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item v-for="(room,index) in roomsData" :key="index"
                                        @click="handleRoomMenuClick(index)">{{ room }}
                                    </a-menu-item>
                                </a-menu>
                            </template>
                            <a style="display: flex;align-items: center;justify-content: center; background-color: #fff;height: 100%;
                                width: 20%;font-size: 16px;font-weight: 600;color: #000;">
                                房型
                                <DownOutlined style="margin-left: 20px;" />
                            </a>
                        </a-dropdown>
                        <div
                            style="border-left: solid;height: 20px;align-self: center;border-color: rgb(218, 223, 230);">
                        </div>
                        <a-dropdown class="drop-down" style="height: 100%;" :trigger="['click']">
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item v-for="(cost,index) of costData" :key="index"
                                        @click="handleCostMenuClick(index)">{{ cost }}
                                    </a-menu-item>
                                </a-menu>
                            </template>
                            <a style="display: flex;align-items: center;justify-content: center; background-color: #fff;height: 100%;
                                width: 20%;font-size: 16px;font-weight: 600;color: #000;">
                                价格区间
                                <DownOutlined style="margin-left: 20px;" />
                            </a>
                        </a-dropdown>
                        <div
                            style="border-left: solid;height: 20px;align-self: center;border-color: rgb(218, 223, 230);">
                        </div>
                    </div>
                    <div style="height: 1vh;background-color: rgb(240, 242, 245);"></div>
                    <div class="room-list" style="width: 100%;padding-top: 5px;">
                        <a-list class="demo-loadmore-list" item-layout="horizontal" :loading="initLoading"
                            :data-source="roomList">
                            <template #renderItem="{ item }">
                                <a-list-item class="room-item">
                                    <a-skeleton avatar :title="false" :loading="!!item.loading" active>
                                        <a-list-item-meta class="room-list-content" style="text-align: left;"
                                            :key="item.roomId">
                                            <template #title>
                                                <a style="font-size: 20px;margin: 0;font-weight: 800;">{{ item.roomType
                                                    }}</a>
                                            </template>
                                            <template #avatar>
                                                <a><a-avatar :src="item.imageUrl"
                                                        style="height: 200px;width: 200px;border-radius: 0;" /></a>
                                            </template>
                                            <template #description>
                                                <div class="hotel-stars" style="font-size: 6px">
                                                    <a-rate v-model:value="item.starRating" disabled />
                                                </div>
                                                <div style="font-size: 13px;margin-bottom: 10px;">
                                                    {{ item.description }}
                                                </div>

                                            </template>
                                        </a-list-item-meta>
                                        <div
                                            style="border-left: 1px solid black;height: 200px;border-color: rgb(218, 223, 230);">
                                        </div>
                                        <div class="room-list-info"
                                            style="width: 50%;height: 200px;display: flex;justify-content: space-between;">
                                            <div class="room-info-review"
                                                style="width: 50%;height: 100%;display: flex;padding-top: 10px;flex-direction: column;">
                                                <div
                                                    style="height: 30%;display: flex;align-items: center;justify-content: center;">
                                                    <span
                                                        style="font-size: 20px;display: flex;align-items: center;justify-content: center;font-weight: 400;">数量</span>
                                                </div>
                                                <div style="width: 40%;height: 40%; font-size: 17px;align-self: center;margin-top: 20px;
                                                    color: rgb(238, 59, 40);font-weight: 800px;">
                                                    剩余{{ item.availability }}间
                                                </div>
                                            </div>
                                            <div class="room-info-price"
                                                style="text-align: right;padding-bottom: 10px;display: flex;justify-content: flex-end;align-items: center; padding: 20px;width:50%;">
                                                <div style="text-align: right;margin-right: 30px;">
                                                    <h2
                                                        style="display: inline;color: rgb(40, 125, 250);font-weight: 700;">
                                                        ￥{{ item.price }}
                                                    </h2>
                                                </div>
                                                <button
                                                    style="border-radius: 5px;background-color: rgb(40, 125, 250);color: #fff;font-weight:600;width: 50%;height: 40%;font-size: 20px;"
                                                    @click="onReserveButtClicked(item.hotelId)">预订</button>
                                            </div>
                                        </div>
                                    </a-skeleton>
                                </a-list-item>
                            </template>
                        </a-list>
                    </div>
                </section>

                <!-- 用户评论 -->
                <section class="comment-wrapper" id="comment-list">
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
                            <!-- <div style="margin-right: 30px;text-align: left;">
                                <span>{{ detailInstance.rating }}</span>
                                /5分
                            </div> -->
                        </div>
                        <!-- 展示评论 -->
                        <a-tabs v-model:activeKey="commentOrderType">
                            <a-tab-pane key="1" tab="智能排序">
                                <a-comment v-for="(comment,index) in commentRatingSortedData" :key="index">
                                    <template #actions>
                                        <span key="comment-basic-like">
                                            <a-tooltip title="Like">
                                                <template v-if="action[index] === 'liked'">
                                                    <LikeFilled @click="like(index)" />
                                                </template>
                                                <template v-else>
                                                    <LikeOutlined @click="like(index)" />
                                                </template>
                                            </a-tooltip>
                                            <span style="padding-left: 8px; cursor: auto">
                                                {{ action[index] === 'disliked' ? comment.hotelReview.likeNum : comment.hotelReview.likeNum + 1 }}
                                            </span>
                                        </span>
                                        <span key="comment-basic-dislike">
                                            <a-tooltip title="Dislike">
                                                <template v-if="action[index] === 'disliked'">
                                                    <DislikeFilled @click="dislike(index)" />
                                                </template>
                                                <template v-else>
                                                    <DislikeOutlined @click="dislike(index)" />
                                                </template>
                                            </a-tooltip>
                                            <!-- <span style="padding-left: 8px; cursor: auto">
                                                {{ dislikes }}
                                            </span> -->
                                        </span>
                                        <span key="comment-basic-reply-to">Reply to</span>
                                    </template>
                                    <template #author><a>{{ comment.username }}</a></template>
                                    <template #avatar>
                                        <a-avatar :src="comment.avatar" alt="Han Solo" />
                                    </template>
                                    <template #content>
                                        <p>
                                            {{ comment.hotelReview.comment }}
                                        </p>
                                    </template>
                                    <template #datetime>
                                        <a-tooltip :title="comment.hotelReview.time">
                                            <span>{{ comment.hotelReview.time }}</span>
                                        </a-tooltip>
                                    </template>
                                </a-comment>
                                <a-pagination v-model:current="current1" show-quick-jumper :total="500"
                                    @change="onChange" />
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="时间排序" force-render>
                                <a-comment v-for="(comment,index) in commentTimeSortedData" :key="index">
                                    <template #actions>
                                        <span key="comment-basic-like">
                                            <a-tooltip title="Like">
                                                <template v-if="action[index] === 'liked'">
                                                    <LikeFilled @click="like(index)" />
                                                </template>
                                                <template v-else>
                                                    <LikeOutlined @click="like(index)" />
                                                </template>
                                            </a-tooltip>
                                            <span style="padding-left: 8px; cursor: auto">
                                                {{ action[index] === 'disliked' ? comment.hotelReview.likeNum : comment.hotelReview.likeNum + 1 }}
                                            </span>
                                        </span>
                                        <span key="comment-basic-dislike">
                                            <a-tooltip title="Dislike">
                                                <template v-if="action[index] === 'disliked'">
                                                    <DislikeFilled @click="dislike(index)" />
                                                </template>
                                                <template v-else>
                                                    <DislikeOutlined @click="dislike(index)" />
                                                </template>
                                            </a-tooltip>
                                            <!-- <span style="padding-left: 8px; cursor: auto">
                                                {{ dislikes }}
                                            </span> -->
                                        </span>
                                        <span key="comment-basic-reply-to">Reply to</span>
                                    </template>
                                    <template #author><a>{{ comment.username }}</a></template>
                                    <template #avatar>
                                        <a-avatar :src="comment.avatar" alt="Han Solo" />
                                    </template>
                                    <template #content>
                                        <p>
                                            {{ comment.hotelReview.comment }}
                                        </p>
                                    </template>
                                    <template #datetime>
                                        <a-tooltip :title="comment.time">
                                            <span>{{ comment.time }}</span>
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

        </a-layout-content>
    </a-layout>

</template>

<style scoped>
.layout {
    margin-top: 80px;
}
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
    height: 55vh;
    padding: 44px;
    padding-top: 20px;
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
    width: 50%;
    height: 100%;
    position: relative;
    margin-right: 100px;
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
::v-deep(.carousel-wrapper div) {
    width: 100% !important;
    height: 100% !important;
    transition: all .5s ease-in-out;
}
::v-deep(.carousel-wrapper img) {
    width: 100% !important;
    height: 100% !important;
    margin: 0;
    border: 1px;
}
::v-deep(.carousel-wrapper li.slick-active) {
    width: 100px !important;
    height: 20%;
    border: #2e5bba;
    border-style: solid;
}
::v-deep(.carousel-wrapper ul) {
    position: absolute;
    width: 120px;
    right: 0;
    height: 80%;
    overflow: hidden;
}
::v-deep(.carousel-wrapper li) {
    /* position: absolute; */
    width: 80px;
    height: 60px;
    transition: all .5s ease-in-out;
    margin: 6px 0;
}
::v-deep(.carousel-wrapper .ant-image-mask) {
    max-width: 80%;
    padding: 0;
    border: 1px;
}


/**
 *左部区域 
**/
.left-area-wrapper {
    margin-top: 4vh;
    width: 92%;
    background-color: transparent;
    margin-left: 4%;
    margin-right: 4%;
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

/* 筛选区域 */

/* 酒店房间列表展示 */

.room-item:hover {
  box-shadow: -1px 2px 6px 0 rgba(15, 41, 77, .12);
}
::v-deep(.room-wrapper .ant-list-item) {
  background-color: #fff;
  margin: 5px 0;
}
::v-deep(.hotel-stars li){
  margin-right: 3px !important;
}
::v-deep(.hotel-stars svg){
  transform: scale(0.8);
}
::v-deep(.room-list-content h4) {
  font-weight: 900px !important;
  margin: 0 !important;
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


/* 面包屑 */
.home-link:hover {
    cursor: pointer;
}
.last-link:hover {
    cursor: pointer;
}
</style>