<script setup>
import { 
    LeftCircleOutlined,
    RightCircleOutlined
 } from '@ant-design/icons-vue';
import router from '../../router';
function goToTest() {
    console.log('跳转前');
    //router.push('/mainPage/test')
    window.location.assign('http://localhost:5173/#/test')
    console.log('跳转后');
}
</script>

<template>
    <!-- 走马灯 -->
    <section class="main-wrapper">
        <div class="main-container">
            <a-carousel arrows autoplay class="main-image" :dots=false>
                <template #prevArrow>
                    <div class="custom-slick-arrow" style="left: 10px;">
                        <left-circle-outlined />
                    </div>
                </template>
                <template #nextArrow>
                    <div class="custom-slick-arrow" style="right: 10px;">
                        <right-circle-outlined />
                    </div>
                </template>
                <div>
                    <img src="../../assets/image/city/city1.png" alt="" class="city-main-image">
                </div>
                <div>
                    <img src="../../assets/image/city/city2.png" alt="" class="city-main-image">
                </div>
                <div>
                    <img src="../../assets/image/city/city3.png" alt="" class="city-main-image">
                </div>
                <div>
                    <img src="../../assets/image/city/city1.png" alt="" class="city-main-image">
                </div>
            </a-carousel>
        </div>

    </section>

    <!-- 搜索框 -->
    <section class="search-wrapper" style="top: -50%; transform: translateY(-50%);">
        <div class="search-container">
            <div class="search-content" style="background: rgba(19, 53, 123, 0.8);">
                <input class="search-input" type="text" placeholder="Eg: 北京">
                <button type="button" class="search-button"
                    style="top: 50%; right: 46px; transform: translateY(-50%);">Search</button>
            </div>
        </div>
    </section>

    <!-- 热门城市推荐 -->
    <section class="hot-city-wrapper">
        <h2 class="hot-city-title">
            热门城市推荐
        </h2>
        <!-- <div v-for="(index,item) in recommendCityList" :key="index">
            <div class="hot-city-content" v-if="index%2===0">
                <div
                    style="width: 40%;height: 100%;margin-left: 20px;margin-right: 30px;box-sizing: border-box;overflow: hidden;">
                    <a class="hot-city-image" style="background-image: url('/src/assets/image/city/city1.png');">
                    </a>
                </div>
                <div class="hot-city-description">
                    <h4 class="hot-city-name">
                        上海
                    </h4>
                    <p class="hot-city-introduction">
                        <span>l</span>orem ipsum dolor sit amet, consectetur adipiscing elit. Duis blandit et nunc id
                        pulvinar. Praesent eleifend, diam id venenatis commodo, orci mi molestie tortor, ac facilisis
                        odio magna non tortor. Nunc odio dui, fermentum vel fringilla vitae, facilisis at risus. Integer
                        eget pellentesque enim, ac laoreet dolor. Ut in lectus et risus sollicitudin convallis. Nullam
                        at vulputate tortor, quis suscipit ex. Donec nec ipsum sit amet orci blandit auctor.
                    </p>
                </div>
            </div>
            <div class="hot-city-content" v-else>
                <div class="hot-city-description">
                    <h4 class="hot-city-name" style="float: right;">
                        上海
                    </h4>
                    <p class="hot-city-introduction" style="float: right;">
                        <span>l</span>orem ipsum dolor sit amet, consectetur adipiscing elit. Duis blandit et nunc id
                        pulvinar. Praesent eleifend, diam id venenatis commodo, orci mi molestie tortor, ac facilisis
                        odio magna non tortor. Nunc odio dui, fermentum vel fringilla vitae, facilisis at risus. Integer
                        eget pellentesque enim, ac laoreet dolor. Ut in lectus et risus sollicitudin convallis. Nullam
                        at vulputate tortor, quis suscipit ex. Donec nec ipsum sit amet orci blandit auctor.
                    </p>
                </div>
                <div
                    style="width: 40%;height: 100%;margin-left: 30px;margin-right: 20px;box-sizing: border-box;overflow: hidden;">
                    <a class="hot-city-image" style="background-image: url('/src/assets/image/city/city1.png');">
                    </a>
                </div>
            </div>
        </div> -->
            <div class="hot-city-content">
                <div
                    style="width: 40%;height: 100%;margin-left: 20px;margin-right: 30px;box-sizing: border-box;overflow: hidden;">
                    <a class="hot-city-image" style="background-image: url('/src/assets/image/city/city1.png');" @click="goToTest">
                    </a>
                </div>
                <div class="hot-city-description">
                    <h4 class="hot-city-name">
                        上海
                    </h4>
                    <p class="hot-city-introduction">
                        <span>l</span>orem ipsum dolor sit amet, consectetur adipiscing elit. Duis blandit et nunc id
                        pulvinar. Praesent eleifend, diam id venenatis commodo, orci mi molestie tortor, ac facilisis
                        odio magna non tortor. Nunc odio dui, fermentum vel fringilla vitae, facilisis at risus. Integer
                        eget pellentesque enim, ac laoreet dolor. Ut in lectus et risus sollicitudin convallis. Nullam
                        at vulputate tortor, quis suscipit ex. Donec nec ipsum sit amet orci blandit auctor.
                    </p>
                </div>
            </div>
            <div class="hot-city-content">
                <div class="hot-city-description">
                    <h4 class="hot-city-name" style="float: right;">
                        上海
                    </h4>
                    <p class="hot-city-introduction" style="float: right;">
                        <span>l</span>orem ipsum dolor sit amet, consectetur adipiscing elit. Duis blandit et nunc id
                        pulvinar. Praesent eleifend, diam id venenatis commodo, orci mi molestie tortor, ac facilisis
                        odio magna non tortor. Nunc odio dui, fermentum vel fringilla vitae, facilisis at risus. Integer
                        eget pellentesque enim, ac laoreet dolor. Ut in lectus et risus sollicitudin convallis. Nullam
                        at vulputate tortor, quis suscipit ex. Donec nec ipsum sit amet orci blandit auctor.
                    </p>
                </div>
                <div
                    style="width: 40%;height: 100%;margin-left: 30px;margin-right: 20px;box-sizing: border-box;overflow: hidden;">
                    <a class="hot-city-image" style="background-image: url('/src/assets/image/city/city1.png');">
                    </a>
                </div>
            </div>
            <div class="hot-city-content">
                <div
                    style="width: 40%;height: 100%;margin-left: 20px;margin-right: 30px;box-sizing: border-box;overflow: hidden;">
                    <a class="hot-city-image" style="background-image: url('/src/assets/image/city/city2.png');">
                    </a>
                </div>
                <div class="hot-city-description">
                    <h4 class="hot-city-name">
                        上海
                    </h4>
                    <p class="hot-city-introduction">
                        <span>l</span>orem ipsum dolor sit amet, consectetur adipiscing elit. Duis blandit et nunc id
                        pulvinar. Praesent eleifend, diam id venenatis commodo, orci mi molestie tortor, ac facilisis
                        odio magna non tortor. Nunc odio dui, fermentum vel fringilla vitae, facilisis at risus. Integer
                        eget pellentesque enim, ac laoreet dolor. Ut in lectus et risus sollicitudin convallis. Nullam
                        at vulputate tortor, quis suscipit ex. Donec nec ipsum sit amet orci blandit auctor.
                    </p>
                </div>
            </div>
        <!-- </div> -->
    </section>

    <!-- 城市热门景点 -->
    <section class="city-scenenary-wrapper">
        <h2 class="city-scenenary-title">
            Gallery
        </h2>
        <div class="city-scenenary-container">
            <div class="city-scenenary-box">
                <div class="image-content" style="height: 30%;">
                    <img class="city-scenenary-image" src="../../assets/image/city/scene.jpg" alt="">
                    <div class="city-scenenary-introduction">
                        <h2 class="city-scenenary-name">
                            长城
                        </h2>
                        <button class="details-button">
                            View Details
                        </button>
                    </div>
                </div>
                <div class="image-content" style="height: 38%;">
                    <img class="city-scenenary-image" src="../../assets/image/city/scene.jpg" alt="">
                    <div class="city-scenenary-introduction">
                        <h2 class="city-scenenary-name">
                            长城
                        </h2>
                        <button class="details-button">
                            View Details
                        </button>
                    </div>
                </div>
                <div class="image-content" style="height: 24%;">
                    <img class="city-scenenary-image" src="../../assets/image/city/scene.jpg" alt="">
                    <div class="city-scenenary-introduction">
                        <h2 class="city-scenenary-name">
                            长城
                        </h2>
                        <button class="details-button">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
            <div class="city-scenenary-box">
                <div class="image-content" style="height: 60%;">
                    <img class="city-scenenary-image" src="../../assets/image/city/scene.jpg" alt="">
                    <div class="city-scenenary-introduction">
                        <h2 class="city-scenenary-name">
                            长城
                        </h2>
                        <button class="details-button">
                            View Details
                        </button>
                    </div>
                </div>
                <div class="image-content" style="height: 34%;">
                    <img class="city-scenenary-image" src="../../assets/image/city/scene.jpg" alt="">
                    <div class="city-scenenary-introduction">
                        <h2 class="city-scenenary-name">
                            长城
                        </h2>
                        <button class="details-button">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 旅游攻略 -->
    <section class="city-tactics-wrapper">
        <div class="city-tactics-container">
            <div class="city-tactics-box">
                <div class="tactics-content">
                    <div class="city-tactics-icon"></div>
                    <div class="city-tactics-introduction">
                        <h3 class="city-tactics-title">Integer tincidunt. Cras dapibus</h3>
                        <p class="city-tactics-description">
                            honcus, sem quam semper libero, sit ametadipiscing sem neque sed ipsum. sem quam semper
                            libero, sit amet adipiscing
                        </p>
                    </div>
                </div>
                <div class="tactics-content">
                    <div class="city-tactics-icon"></div>
                    <div class="city-tactics-introduction">
                        <h3 class="city-tactics-title">Integer tincidunt. Cras dapibus</h3>
                        <p class="city-tactics-description">
                            honcus, sem quam semper libero, sit ametadipiscing sem neque sed ipsum. sem quam semper
                            libero, sit amet adipiscing
                        </p>
                    </div>
                </div>
            </div>
            <div class="city-tactics-box">
                <div class="tactics-content">
                    <div class="city-tactics-icon"></div>
                    <div class="city-tactics-introduction">
                        <h3 class="city-tactics-title">Integer tincidunt. Cras dapibus</h3>
                        <p class="city-tactics-description">
                            honcus, sem quam semper libero, sit ametadipiscing sem neque sed ipsum. sem quam semper
                            libero, sit amet adipiscing
                        </p>
                    </div>
                </div>
                <div class="tactics-content">
                    <div class="city-tactics-icon"></div>
                    <div class="city-tactics-introduction">
                        <h3 class="city-tactics-title">Integer tincidunt. Cras dapibus</h3>
                        <p class="city-tactics-description">
                            honcus, sem quam semper libero, sit ametadipiscing sem neque sed ipsum. sem quam semper
                            libero, sit amet adipiscing
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 城市文化 -->
    <section class="cultural-wrapper">
        <h2 class="cultural-title">城市文化风景</h2>
        <div class="cultural-container">
            <div class="culture-introduction">
                <h2 class="culture-name">
                    打铁花
                </h2>
                <p class="culture-description">
                    这是一段对于打铁花的介绍
                </p>
            </div>
            <div class="culture-demonstration">
                <a-carousel arrows class="cultural-slick" :dots=false>
                    <template #prevArrow>
                        <div class="custom-slick-arrow" style="">
                            <LeftCircleOutlined class="arrow" style="left: 0;" />
                        </div>
                    </template>
                    <template #nextArrow>
                        <div class="custom-slick-arrow" style="">
                            <RightCircleOutlined class="arrow" style="right: 0;" />
                        </div>
                    </template>
                    <div class="culture-content">
                        <a class="culture-link" style="transform: matrix(1, 0, 0, 1, 0, 0);opacity: 1;" href="">
                            <img class="cultural-image" src="../../assets/image/city/cultural1.png" alt="">
                        </a>
                        <a class="culture-link" style="transform: matrix(1, 0, 0, 1, 0, 0);opacity: 1;
                        margin-left: -36px;margin-bottom: -56px;z-index: 1; " href="">
                            <img class="cultural-image" src="../../assets/image/city/cultural1.png" alt="">
                        </a>
                    </div>
                    <div class="culture-content">
                        <a class="culture-link" style="transform: matrix(1, 0, 0, 1, 0, 0);opacity: 1;" href="">
                            <img class="cultural-image" src="../../assets/image/city/scene.jpg" alt="">
                        </a>
                        <a class="culture-link" style="transform: matrix(1, 0, 0, 1, 0, 0);opacity: 1;
                        margin-left: -36px;margin-bottom: -56px;z-index: 1; " href="">
                            <img class="cultural-image" src="../../assets/image/city/scene.jpg" alt="">
                        </a>
                    </div>
                </a-carousel>
            </div>
        </div>
    </section>

    <!--  -->
    <section style="width: 100%;height: 40vh;background: transparent;">

    </section>
</template>

<style scoped>
/* 走马灯 */
.main-wrapper {
    width: 100%;
    height: 85vh;
}
.main-container {
    width: 100%;
    height: 100%;
}
.main-image {
    width: 100%;
    height: 100%;
}
::v-deep(.main-image div){
    height: 100%;
}
::v-deep(.slick-slide) {
    text-align: center;
    height: 100%;
    background: transparent;
    overflow: hidden;
}
::v-deep(.slick-arrow.custom-slick-arrow) {
    margin: 0;
    width: 50px;
    height: 50px;
    font-size: 25px;
    color: #fff;
    /* background-color: rgba(31, 45, 61, 0.11); */
    background: transparent;
    transition: ease all 0.3s;
    opacity: 0.3;
    z-index: 1;
}
::v-deep(.slick-arrow.custom-slick-arrow:before) {
    display: none;
}
::v-deep(.slick-arrow.custom-slick-arrow:hover) {
    color: #fff;
    opacity: 0.5;
}
::v-deep(.main-container svg) {
    transform: scale(2);
    /* background-color: ; */
}
/* ::v-deep(.slick-slider ul) {
    display: none;
} */
.city-main-image {
    width: 100%;
    height: 100%;
    object-fit: fill;
}

/* 搜索框 */
.search-wrapper {
    width: 100%;
    height: 20vh;
    padding:0 2%
}
.search-container {
    width: 80%;
    height: 100%;
    margin: 0 100px;
    padding: 15px 0;
}
.search-content {
    height: 100%;
    width: 100%;
    border-radius: 150px;
    padding: 3rem;
    position: relative;
}
.search-input {
    width: 100%;
    height: 100%;
    border-style: none;
    border-radius: 50px;
    padding-left: 1.5rem;
    padding-right: 3rem;
    text-align: left;
    appearance: none;
    outline: none;
}
.search-button {
    position: absolute;
    margin-right: 10px;
    border-radius: 30px;
    background-color:#13357b;
    border-color: #13357b;
    outline: none;
    color: #fff;
    transition: .5s;
}
.search-button:hover {
    background-color: #fff;
    color: #13357b;
}

/* 热门城市推荐 */
.hot-city-wrapper {
    width: 100%;
    height: 120vh;
}
.hot-city-title {
    width: 100%;
    height: 7%;
    padding: 0 ;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
    font-size: 45px;
    font-weight: 300;
}
.hot-city-container {
    width: 100%;
    height: 90%;
    padding: 0 30px;
}
.hot-city-content {
    width: 100%;
    height: 33%;
    margin: 10px 0;
    display: flex;
}
.hot-city-image {
    width: 100%;
    height: 100%;
    display: inline-block;
    background-size: cover;
    box-sizing: border-box;
    overflow: hidden;
    transition: all .5s ease-in-out;
}
.hot-city-image:hover {
    transform: scale(1.2);
    cursor: pointer;
    overflow: hidden;
}
.hot-city-description {
    width: 60%;
    height: 100%;
    display: inline-block;
    padding: 10px 10px 10px 10px;
    text-align: left;
}
.hot-city-name {
    width: 100%;
    height: 20%;
    margin-bottom: 15px;
    font-size: 47px;
    font-weight: 800;
    color: #383838;
    max-width: 546px;
}
.hot-city-introduction {
    width: 100%;
    height: 80%;
    padding: 20px 0;
    margin: 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.93;
    color: #9a9a9a;
    max-width: 546px;
}
.hot-city-introduction span {
    font-size: 48px;
    text-transform: capitalize;
    line-height: 1;
}

/* 城市景点 */
.city-scenenary-wrapper {
    width: 100%;
    height: 140vh;
    padding: 4% 0;
}
.city-scenenary-title {
    height: 10%;
    width: 100%;
    font-size: 50px;
    background: transparent;
    background-color: #fff;
    color: #000;
    padding: 0 30%;
    margin: 0;
    margin-top: 50px;
}
.city-scenenary-container {
    width: 80%;
    height: 90%;
    margin: 0 8%;
    padding: 0 2%;
    display: flex;
}
.city-scenenary-box {
    /* display: inline-block; */
    width: 50%;
    height: 100%;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
}
.image-content {
    width: 100%;
    height: 30%;
    position: relative;
    margin-bottom: 30px;
}
.city-scenenary-image {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
.city-scenenary-introduction {
    position: absolute;
    bottom: auto;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    background: rgba(113, 114, 115, 0.5);
    transform: scale(0);
    transition: .5s;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.image-content:hover .city-scenenary-introduction{
    transform: scale(1);
}
.city-scenenary-name {
    color: #fff;
    margin-bottom: 35px;
    font-size: 28px;
    font-weight: 500;
    text-transform: capitalize;
    line-height: 1.2;
}
.details-button {
    width: 175px;
    height: 60px;
    display: inline-block;

    font-weight: 400;
    color: #fff;
    line-height: 1.5;


    background-color: #000000be;
    box-shadow: none;
    border-radius: 0;
    border: 1px solid transparent;
    outline: none;
    white-space: nowrap;

    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
.details-button:hover {
    background-color: #000;
}

/* 旅游攻略 */
.city-tactics-wrapper {
    width: 100%;
    height: 65vh;
    padding: 10% 0 4% 0;
}
.city-tactics-container {
    width: 80%;
    height: 90%;
    margin: 0 8%;
    padding: 0 2%;
    display: flex;
}
.city-tactics-box {
    width: 50%;
    height: 100%;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
}
.tactics-content {
    width: 100%;
    height: 50%;
    position: relative;
    padding: 47px 0 32px 45px;
    display: flex;
    text-align: left;
    transition: .5s ease-in-out;
}
.tactics-content:hover {
    background-color: antiquewhite;
}
.city-tactics-icon {
    width: 20px;
    height: 15px;
    background: #2a2a2b;
    margin-right: 12px;
}
.city-tactics-introduction {
    position: relative;
    top: -4px;
}
.city-tactics-title {
    margin: 0;
    font-size: 14px;
    font-weight: 800;
    text-transform: initial;
    line-height: 1.5;
    color: #2a2a2b;
}
.city-tactics-description {
    margin: 0;
    font-size: 15px;
    font-weight: normal;
    line-height: 1.8;
    color: #9a9a9a;
    max-width: 396px;
    margin-top: 15px;
}

/* 城市文化 */
.cultural-wrapper {
    width: 100%;
    height: 50vh;
    margin-top: 14vh;
    background-image: url("/src/assets/image/city/city1.png");
    background-size: fill;
    z-index: -100;
}
.cultural-title {
    width: 100%;
    height: 10vh;
    margin-bottom: 0;
    font-size: 47px;
    font-weight: 800;
    color: #fff;
    opacity: 1;
}
.cultural-container {
    width: 100%;
    height: 80%;
    padding: 0 30px;
    display: flex;
}
.culture-introduction {
    width: 35%;
    height: 100%;
    display: inline-block;
    text-align: left;
    padding: 100px 20px 40px 80px;
    opacity: 1;
}
.culture-name {
    width: 100%;
    height: 40%;
    margin-bottom: 0;
    font-size: 47px;
    font-weight: 800;
    color: #383838;
    max-width: 546px;
}
.culture-description {
    width: 100%;
    height: 60%;
    padding: 20px 0;
    margin: 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.93;
    color: #9a9a9a;
    max-width: 546px;
}
.culture-demonstration {
    width: 65%;
    height: 80%;
    position: relative;
    top: 20%;
    display: inline-block;
    /* display: flex; */
    padding-left: 7%;
    padding-right: 5%;
}
.cultural-slick {
    width: 100%;
    height: 100%;
    border: 0;
    border-style: none;
    /* overflow: visible !important */
}
::v-deep(.cultural-slick div){
    height: 100%;
    border: 0;
    border-style: none;
    background: transparent;
    overflow: visible !important
}
::v-deep(.cultural-slick .slick-track){
    width: 100% !important;
    transform: none !important;
}
::v-deep(.cultural-slick .slick-slide){
    display: none;
}
::v-deep(.cultural-slick .slick-current){
    display: block;
}
::v-deep(.cultural-slick .slick-prev) {
    left: -50px !important;
    top: 41%;
}
::v-deep(.cultural-slick .slick-next) {
    right: -50px !important;
    top: 60%;
}
.arrow {
    font-size: 50px; 
    position: absolute;
}
.culture-content {
    background: transparent;
    width: 100%;
    height: 100%;
    position: relative;
    
    /* padding-left: 9%;
    padding-right: 7%; */
}
.culture-link {
    width: 50%;
    height: 310px;
    display: inline-block;
    position: relative;
    color: #FFFFFF;
    text-decoration: none;
    z-index: 2;
    -moz-box-shadow: 0px 5px 12px -3px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 5px 12px -3px rgba(0, 0, 0, 0.5);
    margin-bottom: -16px;
}
.cultural-image {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    bottom: 0%;
    z-index: 2;
    object-fit: cover;
}

</style>