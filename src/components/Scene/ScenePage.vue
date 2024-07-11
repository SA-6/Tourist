<script setup>
import { 
    LeftCircleOutlined,
    RightCircleOutlined
 } from '@ant-design/icons-vue';

</script>

<template>
    <section class="main-wrapper">
        <div class="main-container">
            <a-carousel arrows class="main-image">
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
                    <img src="" alt="" class="city-main-image">
                </div>
                <div>
                    <img src="" alt="" class="city-main-image">
                </div>
                <div>
                    <img src="" alt="" class="city-main-image">
                </div>
                <div>
                    <img src="" alt="" class="city-main-image">
                </div>
            </a-carousel>
        </div>

    </section>
</template>

<style scoped>
.main-wrapper {
    width: 100%;
    height: 80vh;
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
    background: #364d79;
    overflow: hidden;
}
::v-deep(.slick-slide h3) {
    color: #fff;
}

::v-deep(.slick-arrow.custom-slick-arrow) {
    /* position: relative; */
    /* top: 50%; */
    margin: 0;
    width: 50px;
    height: 50px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
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
</style>