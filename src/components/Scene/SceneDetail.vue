<script setup>
import { h, ref ,defineComponent ,reactive, onBeforeMount } from 'vue';
import dayjs from 'dayjs';
import axios from 'axios';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useUserStore } from '../../store/userStore';
import { message } from 'ant-design-vue';
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
    RightCircleOutlined,
    ClockCircleOutlined
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

//读取用户信息
const userInfo = useUserStore().userInfo
// 面包屑导航
const navLast = {
    URL : '',
    name : '景区'
}
//获取路径跳转时携带的参数
const params = defineProps({
    sceneName: String,
    sceneId: Number
})
// 详情展示
const detailInstance = ref({})
const navContent = detailInstance.name;

function getImgUrl(i){
    return detailInstance.value.imageUrl[i];
}
const visible = ref(false);


// 获取评论数量
function getCommentCount() {
    return;
}
// 获取是否开放中的描述信息
function getStatusDescription() {
    return ;
}

// 游玩线路部分
const travelRoutes = ref([])

for(const route of travelRoutes.value) {
    route.routes = []
    let sections = route.content.split(/[;；]/).filter(item => item !== '')
    for(const section of sections) {
        let [ timing , content ] = section.split(/[:：]/);
        route.routes.push({
            'timing'  : timing,
            'content' : content
        })
    }
}

// 游玩攻略部分
const travelTactics = ref([])
for(const item of travelTactics.value) {
    item.tags = item.tags.split(/[,，]/)
}
function getTravelTactics() {
    return ;
}

// 用户评论部分
const commentRatingSortedData = ref([]);
const commentTimeSortedData = ref([]);

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
//切换评论页
const currentPage1 = ref(1);
const currentPage2 = ref(1);
//智能排序切换页
const onChangeByLike = pageNumber => {
  console.log('Page: ', pageNumber);
  axios({
        method: 'get',
        url: serverURL + `/scenicSpots/${pageNumber}/comment/like`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
        console.log("智能排序评论");
        console.log(result);
        if(result.data.status === 0){
            commentRatingSortedData.value = result.data.data
            console.log("评分排序评论");
            console.log(commentRatingSortedData);
            console.log(commentRatingSortedData.value);
        }else{
            message.error({
                content: () => '系统繁忙,请稍后再试',
                style: {
                    marginTop: '10vh'
                }
            })
        }
    }).catch(function(error){
        console.log(error);
    })
};
//时间排序切换页
const onChangeByTime = pageNumber => {
  console.log('Page: ', pageNumber);
  axios({
        method: 'get',
        url: serverURL + `/scenicSpots/${pageNumber}/comment/time`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
        console.log("时间排序评论");
        console.log(result);
        if(result.data.status === 0){
            commentTimeSortedData.value = result.data.data
            console.log("评分排序评论");
            console.log(commentTimeSortedData);
            console.log(commentTimeSortedData.value);
        }else{
            message.error({
                content: () => '系统繁忙,请稍后再试',
                style: {
                    marginTop: '10vh'
                }
            })
        }
    }).catch(function(error){
        console.log(error);
    })
};
// 发表评论
//弹出发表评论框
const open = ref(false);
const showDrawer = () => {
  if(localStorage.getItem('username') !== ''){
    open.value = true;
  }else{
    alert("您还未登录,请先登录")
  }
};
const onClose = () => {
  open.value = false;
};
// 提交评论
const submitCommentContent = ref('')
const submitting = ref(false);
const rating = ref(2.5);
const submitComment = () => {
  if (!submitCommentContent.value) {
    alert("输入内容不能为空")
    return;
  }
  const tempParams = {
    comment: submitCommentContent.value,
    rating: rating.value,
    sceneId: params.sceneId
  }
  axios({
    method: 'post',
    url: serverURL + `/scenicSpots/comment`,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': `${userInfo.token}`
    },
    //data: tempParams.stringfy(),
    data: JSON.stringify(tempParams),
    withCredentials: false
  }).then((result)=>{
    console.log(result);
    //请求成功
    if(result.data.status === 0){
        message.info('发表评论成功')
    }else{
        message.error('系统繁忙,请稍后再试')
    }
  }).catch(function(error){
    console.log(error);
  })
};

// 观光车列表
const trafficCars = ref([])

// 食物列表
const foods = ref([])

// 附近演出列表
const shows = ref([])

// 附近酒店列表
const hotels = ref([])

//搜索目标景区
const targetScene = ref('')
function onSearch() {
    axios({
        method: 'post',
        url: `serverURL/cities/scenicSpots/searchByName?scene_name=${targetScene.value}`,
        headers: {  
            'Content-Type': 'application/x-www-form-urlencoded'  
        },
    }).then((result)=>{
        if(result.data.status === '0'){
            router.push({ name : 'sceneDetail', params: { sceneName : sceneName } })
        }else{
            message.error({
                content:()=> `${result.data.msg}`,
                style: {
                marginTop: '10vh',
                }
            })
        }
    }).catch(function(error){
        console.log(error);
    })
}
//Ovo
const activeKeyOfRoute = ref('1')
const activeKeyOfTactics = ref('1')
const activeKeyOfComment = ref('1')

const status = ref(true)
const current = ref()
//切换评论页

//根据景区名获取景区信息
function getSceneInfoBySceneName() {
    axios({
        method: 'get',
        url: serverURL+`/scenicSpots/searchByName?scene_name=${params.sceneName}`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
        console.log("获取景区信息");
        console.log(result);
        detailInstance.value = result.data.data
        // 图片数组处理
        let pattern = /[\[\]]/g
        detailInstance.value.imageUrl = detailInstance.value.imageUrl.replace(pattern,'').split(',')
    }).catch(function(error){
        console.log(error);
    })
}
//根据景区名获取附近酒店
function getHotelBySceneName() {
    axios({
        method: 'get',
        url: serverURL + `/scenicSpots/nearbyHotels?scene_name=${params.sceneName}`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
        if(result.data.status === 0){
            hotels.value = result.data.data
        }else{
            message.error({
                content: () => '系统繁忙,请稍后再试',
                style: {
                    marginTop: '10vh'
                }
            })
        }
    }).catch(function(error){
        console.log(error);
    })
}
//根据景区名获取附近美食
function getFoodBySceneName() {
    axios({
        method: 'get',
        url: serverURL + `/foods/getFoodsByAttractionAndConditions?scene_id=${params.sceneId}`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
        console.log("景区美食");
        console.log(result);
        if(result.data.status === 0){
            foods.value = result.data.data
        }else{
            message.error({
                content: () => '系统繁忙,请稍后再试',
                style: {
                    marginTop: '10vh'
                }
            })
        }
    }).catch(function(error){
        console.log(error);
    })
}
//根据景区名查询附近演出
function getShowBySceneName() {
    axios({
        method: 'get',
        url: serverURL + `/events/findByScenicSpot?scene_id=${params.sceneId}`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
        console.log("景区演出");
        console.log(result);
        if(result.data.status === 0){
            shows.value = result.data.data
        }else{
            message.error({
                content: () => '系统繁忙,请稍后再试',
                style: {
                    marginTop: '10vh'
                }
            })
        }
    }).catch(function(error){
        console.log(error);
    })
}
//根据景区名查询景区游玩路线
function getRouteBySceneName() {
    axios({
        method: 'get',
        url: serverURL + `/route/involvedScenic?scene_name=${params.sceneName}`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
        if(result.data.status === 0){
            travelRoutes.value = result.data.data
        }else{
            message.error({
                content: () => '系统繁忙,请稍后再试',
                style: {
                    marginTop: '10vh'
                }
            })
        }
    }).catch(function(error){
        console.log(error);
    })
}
//根据景区名查询游玩攻略
function getTacticsBySceneName() {
    axios({
        method: 'get',
        url: serverURL + `/travelGuides/scenicSpot?scene_name=${params.sceneName}`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
        if(result.data.status === 0){
            travelTactics.value = result.data.data
        }else{
            message.error({
                content: () => '系统繁忙,请稍后再试',
                style: {
                    marginTop: '10vh'
                }
            })
        }
    }).catch(function(error){
        console.log(error);
    })
}
//查询景点的交通车
function getTrafficBySceneName() {
    axios({
        method: 'get',
        url: serverURL + `/transport/scenicSpot?scene_name=${params.sceneName}`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
        console.log("游玩交通车");
        console.log(result);
        if(result.data.status === 0){
            trafficCars.value = result.data.data
        }else{
            message.error({
                content: () => '系统繁忙,请稍后再试',
                style: {
                    marginTop: '10vh'
                }
            })
        }
    }).catch(function(error){
        console.log(error);
    })
}
//根据景区名获取用户评论(默认评论排序是智能排序--高赞优先)
function getUserCommentByRating() {
    axios({
        method: 'get',
        url: serverURL + `/scenicSpots/${params.sceneId}/comment/like`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
        console.log("智能排序评论");
        console.log(result);
        if(result.data.status === 0){
            commentRatingSortedData.value = result.data.data
            //likes.value = result.data.data.scenicReview.likeNum
            console.log("评分排序评论");
            console.log(commentRatingSortedData);
            console.log(commentRatingSortedData.value);
        }else{
            message.error({
                content: () => '系统繁忙,请稍后再试',
                style: {
                    marginTop: '10vh'
                }
            })
        }
    }).catch(function(error){
        console.log(error);
    })
}
//根据景区名获取用户评论(按发布时间排序)
function getUserCommentByTime() {
    axios({
        method: 'get',
        url: serverURL + `/scenicSpots/${params.sceneId}/comment/time`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
        console.log("按时间排序评论");
        console.log(result);
        if(result.data.status === 0){
            commentTimeSortedData.value = result.data.data
            //likes.value = result.data.data.scenicReview.likeNum
            console.log("评分排序评论");
            console.log(commentTimeSortedData);
            console.log(commentTimeSortedData.value);
        }else{
            message.error({
                content: () => '系统繁忙,请稍后再试',
                style: {
                    marginTop: '10vh'
                }
            })
        }
    }).catch(function(error){
        console.log(error);
    })
}
const serverURL = 'http://localhost:8080'
//在加载页面前获取数据
onBeforeMount(()=>{
    console.log("sceneName:"+params.sceneName);
    console.log('sceneId:'+params.sceneId);
    //根据景区名获取景区信息
    getSceneInfoBySceneName()
    //根据景区名获取附近酒店
    getHotelBySceneName()
    //根据景区名获取附近美食
    getFoodBySceneName()
    //根据景区名查询附近演出
    getShowBySceneName()
    //根据景区名查询景区游玩路线
    getRouteBySceneName()
    //根据景区名查询游玩攻略
    getTacticsBySceneName()
    //查询景点的交通车
    getTrafficBySceneName()
    //根据景区名获取用户评论(默认评论排序是智能排序--高赞优先)
    getUserCommentByRating()
    //根据景区名获取用户评论(按发布时间排序)
    getUserCommentByTime()
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
                <a-input-search v-model:value="targetScene" placeholder="请输入目标景区" size="medium" enter-button
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
                        <div v-for="(imageItem,index) in detailInstance.imageUrl" :key="index">
                            <img :src="imageItem" />
                        </div>
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
                        <span :style="{color : status?'green' : 'black'}"> {{ getStatusDescription() }} </span>
                        <span>{{ detailInstance.openTime?.openHours }}</span>
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
                            <p style="min-height: 4vh;margin: 0;">{{ detailInstance.openTime?.openDays }} &nbsp; {{
                                detailInstance.openTime?.openHours }}</p>
                        </div>
                    </div>
                </section>

                <!-- 游玩线路 -->
                <section class="route-wrapper">
                    <h2 style="margin: 0;text-align: left;padding: 20px;padding-bottom: 0;">相关游玩路线</h2>
                    <div class="route-container">
                        <a-collapse v-model:activeKey="activeKeyOfRoute" :bordered="false"
                            style="background: rgb(255, 255, 255)">
                            <template #expandIcon="{ isActive }">
                                <RightCircleOutlined :rotate="isActive ? 90 : 0" />
                            </template>
                            <a-collapse-panel v-for="routeItem in travelRoutes" :key="routeItem.id"
                                :header="routeItem.involvedAttractions" style="position: relative;">
                                <a-tag color="#f50" style="height: 20px;line-height: 20px;position: absolute;right: 10px;top: 13px;">{{ routeItem.days }}天</a-tag>
                                <div class="route-content" style="height: 100%;width: 100%;display: flex;">
                                    <div style="width: 20%;height: 100%;">
                                        {{ routeItem.description }}
                                    </div>
                                    <div>
                                        <a-timeline mode="alternate">
                                            <a-timeline-item v-for="route of routeItem.routes">{{ route.timing }}:{{ route.content }}</a-timeline-item>
                                        </a-timeline>
                                    </div>
                                </div>
                            </a-collapse-panel>
                        </a-collapse>
                    </div>
                </section>

                <!-- 游玩攻略 -->
                <section class="tactics-wrapper">
                    <h2 style="margin: 0;text-align: left;padding: 20px;padding-bottom: 0;">游玩攻略</h2>
                    <div class="tactics-container">
                        <a-collapse v-model:activeKey="activeKeyOfTactics" :bordered="false"
                            style="background: rgb(255, 255, 255)">
                            <template #expandIcon="{ isActive }">
                                <RightCircleOutlined :rotate="isActive ? 90 : 0" />
                            </template>
                            <a-collapse-panel v-for="tacticsItem in travelTactics" :key="tacticsItem.guideId"
                                :header="tacticsItem.attractionName">
                                <div class="tactics-content">
                                    <div
                                        style="height: 10vh;width: calc(60% - 20px - 0.5em);display: inline-block;margin-right: 20px;">
                                        <div
                                            style="height: 50%;width: 100%;display: flex;justify-content: space-between;">
                                            <h2>{{ tacticsItem.title }}</h2>
                                            <div style="padding-top: 5px;">
                                                <a-tag color="#f50" v-for="(tag,index) in tacticsItem.tags" :key="index"
                                                    style="height: 25px;line-height: 25px;">{{ tag }}</a-tag>
                                            </div>
                                        </div>
                                        <div
                                            style="height: 10%;width: 100%;display: flex;justify-content: space-between;">
                                            <span>共计{{ tacticsItem.days }}天</span>
                                            <span>￥{{ tacticsItem.avgCost }}/人</span>
                                            <span style="padding-right: 30px;">推荐程度:{{ tacticsItem.recommendation
                                                }}</span>
                                        </div>
                                    </div>
                                    <img :src="tacticsItem.imageUrl" alt=""
                                        style="height: 20vh;width: 40%;float: right;margin-left: 0.5em;">
                                    <div class="tactics-description">
                                        {{ tacticsItem.guideContent }}{{ tacticsItem.guideContent }}
                                        {{ tacticsItem.guideContent }}{{ tacticsItem.guideContent }}
                                        {{ tacticsItem.guideContent }}{{ tacticsItem.guideContent }}
                                    </div>
                                </div>

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
                                <a-drawer :width="500" title="发表评论" placement="bottom" :open="open"
                                    @close="onClose">
                                    <template #extra>
                                        <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
                                        <a-button type="primary" @click="submitComment">提交</a-button>
                                    </template>
                                    <a-comment>
                                        <template #avatar>
                                            <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
                                        </template>
                                        <template #content>
                                            <a-form-item>
                                                <a-textarea v-model:value="submitCommentContent" :rows="4"/>
                                            </a-form-item>
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
                        <a-tabs v-model:activeKey="activeKeyOfComment">
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
                                                {{ action[index] === 'disliked' ? comment.scenicReview.likeNum : comment.scenicReview.likeNum + 1 }}
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
                                            {{ comment.scenicReview.comment }}
                                        </p>
                                    </template>
                                    <template #datetime>
                                        <a-tooltip :title="comment.time">
                                            <span>{{ comment.time }}</span>
                                        </a-tooltip>
                                    </template>
                                </a-comment>
                                <a-pagination v-model:current="currentPage1" show-quick-jumper :total="500"
                                    @change="onChangeByLike" />
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
                                                {{ action[index] === 'disliked' ? comment.scenicReview.likeNum : comment.scenicReview.likeNum + 1 }}
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
                                            {{ comment.comment }}
                                        </p>
                                    </template>
                                    <template #datetime>
                                        <a-tooltip :title="comment.time">
                                            <span>{{ dayjs().fromNow() }}</span>
                                        </a-tooltip>
                                    </template>
                                </a-comment>
                                <a-pagination v-model:current="currentPage2" show-quick-jumper :total="500"
                                    @change="onChangeByTime" />
                            </a-tab-pane>
                        </a-tabs>
                    </div>
                </section>
            </section>


            <!-- 右部区域 -->
            <section class="right-area-wrapper">
                <!-- 景区内部交通车 -->
                <section class="traffic-wrapper">
                    <h2 style="margin: 0;text-align: left;padding: 20px;padding-bottom: 0;">景区交通</h2>
                    <div class="traffic-container">
                        <div v-for="(trafficCar,index) in trafficCars" :key="index"
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
                                    <span>￥{{ hotel.averageCost }}/人</span>
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
    min-height: 40vh;
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
.tactics-description::first-letter {
    font-size: 40px;
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
    max-height: 485px;
    overflow-y: auto;
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
    max-height: 485px;
    overflow-y: auto;
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
    max-height: 485px;
    overflow-y: auto;
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
    max-height: 485px;
    overflow-y: auto;
}
.hotel-item:hover {
    cursor: pointer;
}
</style>