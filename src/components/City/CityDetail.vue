<script setup>
import { h, ref ,defineComponent ,toRefs, onBeforeMount } from 'vue';
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

} from  '@ant-design/icons-vue';
// 面包屑导航
const navLast = {
    URL : '',
    name : '景区'
}
//接收CityPage传递来的参数
const cityName = defineProps(['cityName'])
// 详情展示
const detailInstance = ref({})
const navContent = detailInstance.value.name;

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
    let sections = route.content.split(/[;]/).filter(item => item !== '')
    for(const section of sections) {
        let [ timing , content ] = section.split(/[:]/);
        route.routes.push({
            'timing'  : timing,
            'content' : content
        })
    }
}

// 游玩攻略部分
const travelTactics = ref([])

for(const item of travelTactics.value) {
    item.tags = item.tags.split(/[,]/)
}
function getTravelTactics() {
    return ;
}

// 用户评论部分
const commentRatingSortedData = ref([]);
const commentTimeSortedData = ref([]);

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
// 城市推荐景区
const sceneList = ref([])
// 食物列表
const foods = ref([])
// 附近演出列表
const shows = ref([])
// 附近酒店列表
const hotels = ref([])
//选中展示游玩路线/游玩攻略中的一栏
const activeRouteKey = ref()
const activeTacticsKey = ref()
//搜索目标城市
const targetCity = ref('')
function onSearch() {
    axios({
        method: 'post',
        url: `http://localhost:8080/cities/city?city_name=${targetCity.value}`,
        headers: {  
            'Content-Type': 'application/x-www-form-urlencoded'  
        },
    }).then((result)=>{
        //可能有点问题  还没测试
        if(result.data.status === '0'){
            router.push({ name : 'cityDetail', params: { cityName : cityName } })
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
//评论排序类型
const commentOrderType = ref()
//在加载页面前获取数据
onBeforeMount(()=>{
    //根据城市名获取城市信息
    axios({
        method: 'get',
        url: `http://localhost:8080/cities/city?city_name=${cityName.cityName}`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
        detailInstance.value = result.data.data
        //必玩景点数组处理
        detailInstance.value.mustVisit = detailInstance.value.mustVisit.replace(/[\[\]]/,'').split('、')
        // 图片数组处理
        let pattern = /[\[\]]/g
        detailInstance.value.imageUrl = detailInstance.value.imageUrl.replace(pattern,'').split(',')
    }).catch(function(error){
        console.log(error);
    })
    //根据城市名获取城市相关景区
    axios({
        method: 'get',
        url: `http://localhost:8080/cities/scenicSpots?city_name=${cityName.cityName}`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
        sceneList.value = result.data.data
        //处理列表中各个景点的imageUrl的值
        let pattern = /[\[\]]/g
        for(let i = 0; i < sceneList.value.length; i++){
            sceneList.value[i].imageUrl = sceneList.value[i].imageUrl.replace(pattern,'').split(',')[0]
        }
    }).catch(function(error){
        console.log(error);
    })
    //根据城市名获取附近酒店
    axios({
        method: 'get',
        url: `http://localhost:8080/hotels/searchHotelByCity?city_name=${cityName.cityName}`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
        console.log(result);
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
    //根据城市名获取附近美食
    axios({
        method: 'get',
        url: `http://localhost:8080/cities/foods?city_name=${cityName.cityName}`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
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
    //根据城市名查询附近演出
    axios({
        method: 'get',
        url: `http://localhost:8080/events/findByCity?city_name=${cityName.cityName}`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
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
    //根据城市名查询城市游玩路线
    axios({
        method: 'get',
        url: `http://localhost:8080/route/city?city_name=${cityName.cityName}`,
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
    //根据城市名查询游玩攻略
    axios({
        method: 'get',
        url: `http://localhost:8080/travelGuides/city?city_name=${cityName.cityName}`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
        if(result.data.status === 0){
            travelTactics.value = result.data.data
            console.log("游玩攻略");
            console.log(travelTactics);
            console.log(travelTactics.value);
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
    //根据城市名获取用户评论(默认评论排序是智能排序)
    axios({
        method: 'get',
        url: `http://localhost:8080/travelGuides/city?city_name=${cityName.cityName}`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
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
    //根据城市名获取用户评论(按时间排序)
    axios({
        method: 'get',
        url: `http://localhost:8080/travelGuides/city?city_name=${cityName.cityName}`,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
    }).then((result)=>{
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
                <a-input-search v-model:value="targetCity" placeholder="请输入目标城市" size="medium" enter-button
                    @search="onSearch" />
            </div>
        </a-layout-header>
        <a-layout-content style="padding: 0 50px;display: flex;flex-wrap: wrap;">
            <!-- 面包屑导航栏 -->
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
                    <a-carousel arrows dots-class="slick-dots slick-thumb" dot-position="right" autoplay>
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

                    <div style="text-align: left;margin: 10px 0;">
                        <!-- <span style="margin-right: 20px;width: 80px;display: inline-block;">地址</span> -->
                        <span>{{ detailInstance.description }}</span>
                    </div>

                    <div style="text-align: left;margin: 10px 0;">
                        <span style="margin-right: 20px;width: 80px;display: inline-block;">必逛景点:</span>
                        <span v-for="(mustItem,index) of detailInstance.mustVisit" :key="index" style="margin-right: 10px;">
                            {{ mustItem }}
                        </span>
                    </div>

                    <div style="position: absolute;bottom: 0;">
                        打分
                    </div>
                </div>

            </section>

            <!-- 左部区域 -->
            <section class="left-area-wrapper">
                <!-- 游玩线路 -->
                <section class="route-wrapper">
                    <h2 style="margin: 0;text-align: left;padding: 20px;padding-bottom: 0;">相关游玩路线</h2>
                    <div class="route-container">
                        <a-collapse v-model:activeKey="activeRouteKey" :bordered="false"
                            style="background: rgb(255, 255, 255)">
                            <template #expandIcon="{ isActive }">
                                <RightCircleOutlined :rotate="isActive ? 90 : 0" />
                            </template>
                            <a-collapse-panel v-for="routeItem in travelRoutes" :key="routeItem.id"
                                :header="routeItem.involvedAttractions" style="position: relative;">
                                <a-tag color="#f50"
                                    style="height: 20px;line-height: 20px;position: absolute;right: 10px;top: 13px;">{{
                                    routeItem.days }}天</a-tag>
                                <div class="route-content" style="height: 100%;width: 100%;display: flex;">
                                    <div style="width: 20%;height: 100%;">
                                        {{ routeItem.description }}
                                    </div>
                                    <div>
                                        <a-timeline mode="alternate">
                                            <a-timeline-item v-for="(item,index) in routeItem.routes" :key="index">
                                                {{ item.timing }}:{{item.content }}
                                            </a-timeline-item>
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
                        <a-collapse v-model:activeKey="activeTacticsKey" :bordered="false"
                            style="background: rgb(255, 255, 255)">
                            <template #expandIcon="{ isActive }">
                                <RightCircleOutlined :rotate="isActive ? 90 : 0" />
                            </template>
                            <a-collapse-panel v-for="tacticsItem in travelTactics" :key="tacticsItem.id"
                                :header="tacticsItem.attractionName">
                                <div class="tactics-content">
                                    <div
                                        style="height: 10vh;width: calc(60% - 20px - 0.5em);display: inline-block;margin-right: 20px;">
                                        <div
                                            style="height: 50%;width: 100%;display: flex;justify-content: space-between;">
                                            <h2>{{ tacticsItem.title }}</h2>
                                            <div style="padding-top: 5px;">
                                                <a-tag color="#f50" v-for="(item,index) in tacticsItem.tags" :key="index"
                                                    style="height: 25px;line-height: 25px;">{{ item }}</a-tag>
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
                        <a-tabs v-model:activeKey="commentOrderType">
                            <a-tab-pane key="1" tab="智能排序">
                                <a-comment v-for="(comment,index) in commentRatingSortedData" :key="index">
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
                                <a-comment v-for="(comment,index) in commentTimeSortedData" :key="index">
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
                <!-- 城市著名景点推荐 -->
                <section class="scene-wrapper">
                    <h2 style="margin: 0;text-align: left;padding: 20px;padding-bottom: 0;">著名景点</h2>
                    <div class="scene-container">
                        <a href="" class="scene-item" v-for="(scene,index) in sceneList" :key="index"
                            style="display: flex;height: 12vh;width: 100%;margin-bottom: 10px;color: #000;">
                            <img :src="scene.imageUrl" alt="" style="width: 12vh;height: 100%;object-fit: fill;">
                            <div
                                style="width: calc(100% - 12vh);height: 100%;padding-left: 10px;text-align: left;display: flex;flex-direction: column;">
                                <h2>{{ scene.name }}</h2>
                                <div style="display: flex;width: 100%;justify-content: space-between;">
                                    <div>
                                        <span>{{ scene.type }}</span>&nbsp;
                                        <span>{{ scene.features }}</span>
                                    </div>
                                    <div>
                                        <span>￥{{ scene.ticketPrice }}/人</span>&nbsp;
                                        <span>{{ scene.priceRange }}</span>
                                    </div>
                                </div>
                                <div style="display: flex;justify-content: space-between;width: 100%;">
                                    <span class="score">{{ scene.rating }}分</span>
                                    <span style="padding-right: 20px;">{{ scene.number }}条点评</span>
                                </div>
                                <div style="display: flex;width: 100%;">
                                    <span>营业时间: {{ scene.openingHours }}</span>
                                </div>
                            </div>
                        </a>
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
                                    <span>{{ hotel.rating }}</span>
                                    <span>￥{{ hotel.averageCost }}/人</span>
                                </div>
                                <div style="display: flex;width: 100%;">
                                    <span>地点: {{ hotel.address }}</span>
                                </div>
                                <div style="display: flex;width: 100%;">
                                    <span>时间: 全天</span>
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
.scene-wrapper {
    /* display: inline-block; */
    width: 100%;
    height: 60vh;
    background-color: #fff;
}
.scene-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    padding-top: 10px;
    max-height: 485px;
    overflow-y: auto;
}
.scene-item:hover {
    cursor: pointer;
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
    overflow-y: auto;
    max-height: 485px;
}
.food-item:hover {
    cursor: pointer;
}

/* 演出推荐 */
.show-wrapper {
    width: 100%;
    height: 40vh;
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
    overflow-y: auto;
    max-height: 485px;
}
.hotel-item:hover {
    cursor: pointer;
}
</style>