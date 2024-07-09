<script setup>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
const items = ref([
  {
    title: 'Finished',
    description: 'This is a description.',
  },
  {
    title: 'In Progress',
    description: 'This is a description.',
  },
  {
    title: 'Waiting',
    description: 'This is a description.',
  },
]);
const destinationCity = ref('');
function onSearch(){
  console.log("Search");
}
const rateList = ref([4,3,5]);
const desc = ref(['terrible', 'bad', 'normal', 'good', 'wonderful']);
console.log(rateList.value);
console.log(rateList.value[0]);
</script>

<template>
  <div class="sceneShow">
    <!-- 走马灯 -->
    <a-carousel autoplay arrows effect="fade">
      <template #prevArrow>
      <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
        <LeftCircleOutlined />
      </div>
    </template>
    <template #nextArrow>
      <div class="custom-slick-arrow" style="right: 10px">
        <RightCircleOutlined />
      </div>
    </template>
      <div class="div1"><p class="cityName">北京</p></div>
      <div class="div2"><p class="cityName">上海</p></div>
      <div class="div3"><p class="cityName">广州</p></div>
      <div class="div4"><p class="cityName">深圳</p></div>
    </a-carousel>
  </div>
  <div style="display: flex;margin-top: 10px;">
    <p style="margin-left: 38%; margin-top: 5px;font-size: 1.5em;">目的城市</p>
    <a-input-search
      v-model:value=destinationCity
      placeholder="输入目的城市"
      enter-button
      @search="onSearch"
      style="width: 20%;margin-left: 20px;margin-top: 8px;"
    />
  </div>
  <div>
    <p style="font-size: 1.5em;margin-top: 20px;">景区推荐及相关攻略</p>
    <div class="recommandDiv">
      <!-- <img src="../../src/assets/image/package1.jpg" style="margin-left: 20%; margin-top: 10px;"> -->
      <a-card hoverable style="width: 20%;margin-left: 15%;">
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>
            <span>
              <a-rate v-model:value="rateList[0]" :tooltips="desc" />
              <span class="ant-rate-text">{{ desc[rateList[0] - 1] }}</span>
            </span>
          </template>
        </a-card-meta>
      </a-card>
      <p class="recommandStyle1">
        匾额为“汉昭烈庙”。大门内浓荫丛中，矗立着六通石碑  成都武侯祠，两侧各有一碑廊，其中最大的一通在东侧碑廊内，
        唐代“蜀汉丞相诸葛武侯祠堂碑”，唐宪宗元和四年（公元809年）立，有很高的文物价值，为国家一级文物，
        因文章、书法、刻技俱精被称为“三绝碑”。唐朝著名宰相裴度撰碑文，书法家柳公绰（柳公权之兄）书写，名匠鲁建刻字，
        都出自名家，因此被后世称为三绝碑。 碑文对诸葛亮的一生，作了重点褒评；竭力赞颂诸葛亮的高风亮节，文治武功，
        并以此激励唐代的执政者。碑文特别褒奖诸葛亮的法治思想，马谡因失街亭被诸葛亮依法处斩，临刑，
        马谡哭着表示自己死而无怨。李严与廖立，两人都是被诸葛亮削职流放的罪人，但他们也自甘服罪。
        当他们得知诸葛亮病逝，“闻之痛之，或泣或绝”。这些均属史实，裴度据史褒评，令人信服碑文通篇辞句甚切，文笔酣畅，
        使人百读不厌。诸葛亮之所以为后人所敬仰，还因为他有着高尚的思想和作风，不利用职权谋私。
      </p>
    </div>
    <div class="recommandDiv">
      <p class="recommandStyle2">
        匾额为“汉昭烈庙”。大门内浓荫丛中，矗立着六通石碑  成都武侯祠，两侧各有一碑廊，其中最大的一通在东侧碑廊内，
        唐代“蜀汉丞相诸葛武侯祠堂碑”，唐宪宗元和四年（公元809年）立，有很高的文物价值，为国家一级文物，
        因文章、书法、刻技俱精被称为“三绝碑”。唐朝著名宰相裴度撰碑文，书法家柳公绰（柳公权之兄）书写，名匠鲁建刻字，
        都出自名家，因此被后世称为三绝碑。 碑文对诸葛亮的一生，作了重点褒评；竭力赞颂诸葛亮的高风亮节，文治武功，
        并以此激励唐代的执政者。碑文特别褒奖诸葛亮的法治思想，马谡因失街亭被诸葛亮依法处斩，临刑，
        马谡哭着表示自己死而无怨。李严与廖立，两人都是被诸葛亮削职流放的罪人，但他们也自甘服罪。
        当他们得知诸葛亮病逝，“闻之痛之，或泣或绝”。这些均属史实，裴度据史褒评，令人信服碑文通篇辞句甚切，文笔酣畅，
        使人百读不厌。诸葛亮之所以为后人所敬仰，还因为他有着高尚的思想和作风，不利用职权谋私。
      </p>
      <!-- <img src="../../src/assets/image/package1.jpg" style="margin-left: 20px; margin-top: 10px;"> -->
      <a-card hoverable style="width: 20%;margin-left: 40px;">
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>
            <span>
              <a-rate v-model:value="rateList[1]" :tooltips="desc" />
              <span class="ant-rate-text">{{ desc[rateList[1] - 1] }}</span>
            </span>
          </template>
        </a-card-meta>
      </a-card>
    </div>
    <div class="recommandDiv">
      <!-- <img src="../../src/assets/image/package1.jpg" style="margin-left: 20%; margin-top: 10px;"> -->
      <a-card hoverable style="width: 20%;margin-left: 15%;">
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>
            <span>
              <a-rate v-model:value="rateList[2]" :tooltips="desc" />
              <span class="ant-rate-text">{{ desc[rateList[2] - 1] }}</span>
            </span>
          </template>
        </a-card-meta>
      </a-card>
      <p class="recommandStyle1">
        匾额为“汉昭烈庙”。大门内浓荫丛中，矗立着六通石碑  成都武侯祠，两侧各有一碑廊，其中最大的一通在东侧碑廊内，
        唐代“蜀汉丞相诸葛武侯祠堂碑”，唐宪宗元和四年（公元809年）立，有很高的文物价值，为国家一级文物，
        因文章、书法、刻技俱精被称为“三绝碑”。唐朝著名宰相裴度撰碑文，书法家柳公绰（柳公权之兄）书写，名匠鲁建刻字，
        都出自名家，因此被后世称为三绝碑。 碑文对诸葛亮的一生，作了重点褒评；竭力赞颂诸葛亮的高风亮节，文治武功，
        并以此激励唐代的执政者。碑文特别褒奖诸葛亮的法治思想，马谡因失街亭被诸葛亮依法处斩，临刑，
        马谡哭着表示自己死而无怨。李严与廖立，两人都是被诸葛亮削职流放的罪人，但他们也自甘服罪。
        当他们得知诸葛亮病逝，“闻之痛之，或泣或绝”。这些均属史实，裴度据史褒评，令人信服碑文通篇辞句甚切，文笔酣畅，
        使人百读不厌。诸葛亮之所以为后人所敬仰，还因为他有着高尚的思想和作风，不利用职权谋私。
      </p>
    </div>
  </div>
  <div>
    <p style="font-size: 1.5em;margin-top: 20px;">路线推荐</p>
    <div>
      <a-steps :current="1" label-placement="vertical" :items="items" />
    </div>
  </div>
  <div>
    <p style="font-size: 1.5em;margin-top: 20px;">近期演出</p>
    <div style="display: flex;">
      <a-card hoverable class="concertCard">
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>www.instagram.com</template>
        </a-card-meta>
      </a-card>
      <a-card hoverable class="concertCard">
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>www.instagram.com</template>
        </a-card-meta>
      </a-card>
      <a-card hoverable class="concertCard">
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>www.instagram.com</template>
        </a-card-meta>
      </a-card>
    </div>
  </div>
  <div>
    <p style="font-size: 1.5em;margin-top: 20px;">附近美食</p>
    <div>
      <a-card title="Card Title">
        <a-card-grid style="width: 25%; text-align: center;">
          <img src="../../src/assets/image/hotpot.jpg" style="width: 100%; height: 100%;">
        </a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">
          <img src="../../src/assets/image/hotpot.jpg" style="width: 100%; height: 100%;">
        </a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">
          <img src="../../src/assets/image/hotpot.jpg" style="width: 100%; height: 100%;">
        </a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">
          <img src="../../src/assets/image/hotpot.jpg" style="width: 100%; height: 100%;">
        </a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">
          <img src="../../src/assets/image/hotpot.jpg" style="width: 100%; height: 100%;">
        </a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">
          <img src="../../src/assets/image/hotpot.jpg" style="width: 100%; height: 100%;">
        </a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">
          <img src="../../src/assets/image/hotpot.jpg" style="width: 100%; height: 100%;">
        </a-card-grid>
        <a-card-grid style="width: 25%; text-align: center">
          <img src="../../src/assets/image/hotpot.jpg" style="width: 100%; height: 100%;">
        </a-card-grid>
      </a-card>
    </div>
  </div>
</template>

<style scoped>
.sceneShow {
  height:90vh;
  width:100%
}
:deep(.slick-slide) {
  text-align: center;
  height: 100%;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.5;
}
:deep(.slick-slide h3) {
  color: #fff;
}
.div1 {
  background: url(../../src/assets/image/s1.jpg) no-repeat;
  background-size: cover;
  height: 90vh;
}
.div2 {
  background: url(../../src/assets/image/s2.jpg) no-repeat;
  background-size: cover;
  height: 90vh;
}
.div3 {
  background: url(../../src/assets/image/s3.jpg) no-repeat;
  background-size: cover;
  height: 90vh;
}
.div4 {
  background: url(../../src/assets/image/s4.jpg) no-repeat;
  background-size: cover;
  height: 90vh;
}
.cityName {
  margin-top: 40px;
  font-size: 2em;
  font-family: 'Times New Roman', Times, serif;
}
.recommandDiv {
  display: flex;
  margin-top: 30px;
}
.recommandStyle1 {
  width: 50%;
  font-family: "Arial", sans-serif;
  line-height: 3;
  margin-left: 40px;
  padding-top: 30px;
}
.recommandStyle2 {
  width: 50%;
  font-family: "Arial", sans-serif;
  line-height: 3;
  margin-left: 15%;
  padding-top: 30px;
}
.concertCard {
  width:30%;
  height: 100%;
  margin: 20px 5% 0 5%;
}
</style>