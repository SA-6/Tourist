<script setup>
import router from '../router'
</script>

<template>
  <!-- 走马灯 -->
    <a-carousel autoplay effect="fade">
      <div><img src="../../src/assets/image/s1.jpg" /></div>
      <div><img src="../../src/assets/image/s2.jpg" /></div>
      <div><img src="../../src/assets/image/s3.jpg" /></div>
      <div><img src="../../src/assets/image/s4.jpg" /></div>
    </a-carousel>
  <!-- 相关简介以及推荐 -->
  <div id="components-grid-demo-flex-align">
    <!-- 系统介绍 -->
    <a-divider orientation="center" class="divider">
      <h1 class="headerTitle">About Us</h1>
    </a-divider>
    <a-row justify="center" align="top" class="row">
      <a-col :span="4">
        <!-- <p class="height-100"> -->
          <h3 class="title">Welcome to Tourist System</h3>
          <h5 class="viceTitle">Tourist System</h5>
          <p> 
            Pellentesque accumsan cursus dui, 
            sodales blandit urna sodales vitae Pellentesque accumsan cursus dui, 
            sodales blandit urna urna sodales vitae ipsum Pellentesque accumsan cursus dui, 
            sodales blan urna sodales vitaePellentesque accumsan cursus dui, 
            sodales blan sodales vitae.
          </p>
        <!-- </p> -->
      </a-col>
      <a-col :span="4">
        <p class="height-50">col-4</p>
      </a-col>
      <a-col :span="7">
        <img src="../../src/assets/image/package1.jpg">
      </a-col>
      <a-col :span="4">
        <p class="height-80">col-4</p>
      </a-col>
    </a-row>
    <!-- 酒店推荐 -->
    <a-divider orientation="center" class="divider">
      <h1 class="headerTitle">Hotel</h1>
    </a-divider>
    <a-row justify="space-around" align="middle" class="row">
      <a-col :span="4">
          <a-card hoverable style="width: 240px">
            <template #cover>
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </template>
            <a-card-meta title="Europe Street beat">
              <template #description>路易十三</template>
            </a-card-meta>
          </a-card>
      </a-col>
      <a-col :span="4">
        <a-card hoverable style="width: 240px">
            <template #cover>
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </template>
            <a-card-meta title="Europe Street beat">
              <template #description>七天快捷酒店</template>
            </a-card-meta>
          </a-card>
      </a-col>
      <a-col :span="4">
        <a-card hoverable style="width: 240px">
            <template #cover>
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </template>
            <a-card-meta title="Europe Street beat">
              <template #description>麓枫酒店</template>
            </a-card-meta>
          </a-card>
      </a-col>
      <a-col :span="4">
        <a-card hoverable style="width: 240px">
            <template #cover>
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </template>
            <a-card-meta title="Europe Street beat">
              <template #description>维也纳国际酒店</template>
            </a-card-meta>
          </a-card>
      </a-col>
    </a-row>
    <!-- 景点推荐 -->
    <a-divider orientation="center" class="divider">
      <h1 class="headerTitle">Scene</h1>
    </a-divider>
    <a-row justify="space-between" align="bottom" class="row">
      <a-col :span="4">
        <a-card hoverable style="width: 240px">
            <template #cover>
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </template>
            <a-card-meta title="Europe Street beat">
              <template #description>www.instagram.com</template>
            </a-card-meta>
          </a-card>
      </a-col>
      <a-col :span="4">
        <a-card hoverable style="width: 240px">
            <template #cover>
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </template>
            <a-card-meta title="Europe Street beat">
              <template #description>www.instagram.com</template>
            </a-card-meta>
          </a-card>
      </a-col>
      <a-col :span="4">
        <a-card hoverable style="width: 240px">
            <template #cover>
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </template>
            <a-card-meta title="Europe Street beat">
              <template #description>www.instagram.com</template>
            </a-card-meta>
          </a-card>
      </a-col>
      <a-col :span="4">
        <a-card hoverable style="width: 240px">
            <template #cover>
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </template>
            <a-card-meta title="Europe Street beat">
              <template #description>www.instagram.com</template>
            </a-card-meta>
          </a-card>
      </a-col>
    </a-row>
  </div>
  <!--  -->
</template>

<style scoped>
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  height: 90vh;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
:deep(.slick-slide h3) {
  color: #fff;
}
.height-50 {
  height: 70px;
  background-color: #1bf3cb;
}
.height-80 {
  height: 100px;
  background-color: #1bf3cb;
}
.height-100 {
  height: 120px;
  background-color: #1bf3cb;
}
.height-120 {
  height: 140px;
  background-color: #1bf3cb;
}
.title {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 2em;
}
.viceTitle {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 1em;
}
#components-grid-demo-flex-align {
  width: 100%;
  object-fit: cover;
  background: url(../../src/assets/image/stats.jpg) no-repeat;
  background-attachment: fixed;
  z-index: -1;
}
.divider {
  background: transparent;
  height:80px;
}
.row {
  background: #fff;
}
.headerTitle {
  /* font-size: 2em; */
  color: #fff;
}

</style>
