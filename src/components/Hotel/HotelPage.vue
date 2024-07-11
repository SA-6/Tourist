<script setup>
import {DownOutlined} from '@ant-design/icons-vue' 
 
 
</script>

<template>
    <a-layout id="components-layout-demo-fixed">
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">

        </a-layout-header>

        <div>

        </div>

        <a-layout-content :style="{ padding: '0 50px', marginTop: '60px', height:'100%'}">
            <div :style="{ background: '#fff', padding: '24px',height:'1200px',width:'1500px',display :'flex' }">
                <div class="hotel-page-left-area">
                    <div class="reserve-place">
                        <h2 :style="{ color: '#FFFFFF'}">预订酒店</h2>
                        <div class="target-name">
                            目的地/酒店名称
                        </div>
                        <div class="room-and-customer-count">
                            房间及主客
                        </div>
                    </div>
                    <div class="hotel-page-advertisement">
                        <a-carousel autoplay class="advertisement-autoplay">
                            <div>
                                <img src="https://dimg04.c-ctrip.com/images/0zg5a12000deswhzb7E02.jpg"
                                    class="advertisement-image">
                            </div>
                            <div>
                                <img src="https://dimg04.c-ctrip.com/images/0zg2712000eigyp174294.jpg"
                                    class="advertisement-image">
                            </div>
                            <div>
                                <img src="https://dimg04.c-ctrip.com/images/0zg1u12000enjumc804E3.jpg"
                                    class="advertisement-image">
                            </div>
                            <div>
                                <img src="https://dimg04.c-ctrip.com/images/0zg5a12000deswhzb7E02.jpg"
                                    class="advertisement-image">
                            </div>
                        </a-carousel>
                    </div>
                    <div class="recommendation-button">
                        <h2>酒店推荐</h2>
                        <div>
                            <a-space>
                                <a-button type="primary">Primary</a-button>
                                <a-button>secondary</a-button>
                                <a-dropdown>
                                    <template #overlay>
                                        <a-menu @click="handleMenuClick">
                                            <a-menu-item key="1">1st item</a-menu-item>
                                            <a-menu-item key="2">2nd item</a-menu-item>
                                            <a-menu-item key="3">3rd item</a-menu-item>
                                        </a-menu>
                                    </template>
                                    <a-button>
                                        Actions
                                        <DownOutlined />
                                    </a-button>
                                </a-dropdown>
                            </a-space>
                        </div>
                    </div>
                    <div class="recommendation-content">
                        <a-card hoverable class="recommend-card">
                            <template #cover class="recommendation-image">
                                <img alt="example" class="recommendation-image"
                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                            </template>
                            <a-card-meta title="Europe Street beat">
                                <template #description>www.instagram.com</template>
                            </a-card-meta>
                        </a-card>
                        <a-card hoverable class="recommend-card">
                            <template #cover>
                                <img alt="example" class="recommendation-image"
                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                            </template>
                            <a-card-meta title="Europe Street beat">
                                <template #description>www.instagram.com</template>
                            </a-card-meta>
                        </a-card>
                        <a-card hoverable class="recommend-card">
                            <template #cover>
                                <img alt="example" class="recommendation-image"
                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                            </template>
                            <a-card-meta title="Europe Street beat">
                                <template #description>www.instagram.com</template>
                            </a-card-meta>
                        </a-card>
                    </div>
                </div>
                <div class="hotel-page-popularity-ranking">
                    <a-carousel autoplay class="ranking-autoplay">
                        <div>
                            <img src="https://dimg04.c-ctrip.com/images/0zg2p120009h0zvjyB44F.jpg"
                                class="ranking-image">
                        </div>
                        <div>
                            <img src="https://dimg04.c-ctrip.com/images/0zg2p120009h0zvjyB44F.jpg"
                                class="ranking-image">
                        </div>
                        <div>
                            <img src="https://dimg04.c-ctrip.com/images/0zg2p120009h0zvjyB44F.jpg"
                                class="ranking-image">
                        </div>
                        <div>
                            <img src="https://dimg04.c-ctrip.com/images/0zg5a12000deswhzb7E02.jpg"
                                class="ranking-image">
                        </div>
                    </a-carousel>
                </div>
            </div>

        </a-layout-content>



        <a-layout-footer :style="{ textAlign: 'center' }">
            Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
    </a-layout>
</template>

<style scoped>
#components-layout-demo-fixed .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
}
.hotel-page-left-area {
    height: 60%;
    width : 60%;
    margin-left: 5%;
}
.hotel-page-left-area .reserve-place {
    padding: 10px;
    padding-top: 15px;
    margin-bottom: 20px;
    height: 28%;
    background-color: rgb(147, 147, 191);
    border-radius: 20px;
    text-align: left;
    font-size: large;
    /* display: flex; */
}
.reserve-place .target-name {
    background-color: white;
    border-radius: 10px;
    height: 20%;
    margin-top: 20px;
    padding: 2px 10px;
    font-size: medium;
}
.reserve-place .room-and-customer-count{
    background-color: white;
    border-radius: 10px;
    height: 20%;
    margin-top: 20px;
    padding: 2px 10px;
    font-size: medium;
}

.hotel-page-advertisement {
    height: 20%;
    padding: 5px;
    border-radius: 10px;
}
.hotel-page-advertisement .advertisement-autoplay {
    height: 100%;
}
::v-deep(.hotel-page-advertisement .advertisement-autoplay div){
    height: 100%;
    border-radius: 15px;
}
::v-deep(.advertisement-autoplay .slick-slide) {
    text-align: center;
    height: 100%;
    /* line-height: 120px; */
    background: #364d79;
    overflow: hidden;
}
.advertisement-image {
    padding: 0px;
    margin: 0px;
    
    height: 100%;
    width: 100%;
    object-fit: fill;
    border-radius: 15px;
}


/* 酒店推荐部分 */
.hotel-page-left-area .recommendation-button {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.hotel-page-left-area .recommendation-content {
    display: flex;
    /* align-items: center; */
    justify-content: space-around;
    height: 40%;
    margin-top: 20px;
}
.recommendation-content .recommend-card {
    margin: 0px 5px;
    width: 33%;
    height: 100%;
}
::v-deep(.recommend-card .ant-card-cover) {
    width: 100%;
    height: 70%;
    object-fit:fill;
}
::v-deep(.recommend-card .ant-card-body) {
    width: 100%;
    height: 20%;
}
.recommendation-image {
    padding: 0px;
    margin: 0px;
    
    height: 100%;
    width: 100%;
    object-fit: cover;
}

/* 口碑磅部分 */
.hotel-page-popularity-ranking {
    margin-left: 10px;
    width: 35%;
    height: 70%;
    padding: 0px 20px;
}
.hotel-page-popularity-ranking .ranking-autoplay {
    height: 100%;
}
::v-deep(.hotel-page-popularity-ranking .ranking-autoplay div){
    height: 100%;
    border-radius: 15px;
}
::v-deep(.ranking-autoplay .slick-slide) {
    text-align: center;
    height: 100%;
    /* line-height: 120px; */
    background: #364d79;
    overflow: hidden;
}
.ranking-image {
    padding: 0px;
    margin: 0px;
    
    height: 100%;
    width: 100%;
    object-fit: fill;
    border-radius: 15px;
}
</style>