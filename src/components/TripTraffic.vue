<script setup>
import MapContainer from './MapContainer.vue';
import { computed, ref, watch} from 'vue';
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};
const regionData = {
  Hangzhou: ['上城区','下城区','江干区','拱墅区','西湖区','滨江区','萧山区','余杭区','富阳区','临安区','桐庐县','淳安县','建德市']
} 
const province = ref(provinceData[0]);
const secondCity = ref(cityData[province.value][0]);
const thirdRegion = ref(regionData[secondCity.value][0]);
const cities = computed(() => {
  return cityData[province.value];
});
const regions = computed(()=>{
  return regionData[secondCity.value];
})
watch(province, val => {
  secondCity.value = cityData[val][0];
});
</script>

<template>
  <!-- 当前位置 -->
  <div class="current-position-div">
    <p style="margin-top: 15px;">当前位置信息</p>
    <a-space>
    <a-select
      v-model:value="province"
      style="width: 120px"
      :options="provinceData.map(pro => ({ value: pro }))"
    ></a-select>
    <a-select
      v-model:value="secondCity"
      style="width: 120px"
      :options="cities.map(city => ({ value: city }))"
    ></a-select>
    <a-select
      v-model:value="thirdRegion"
      style="width: 120px"
      :options="regions.map(region => ({ value: region }))"
    ></a-select>
  </a-space>
  </div>
  <!-- 目的地 -->
  <div class="destination-div">
    <p style="margin-top: 15px;">目的地位置信息</p>
    <a-space>
    <a-select
      v-model:value="province"
      style="width: 120px"
      :options="provinceData.map(pro => ({ value: pro }))"
    ></a-select>
    <a-select
      v-model:value="secondCity"
      style="width: 120px"
      :options="cities.map(city => ({ value: city }))"
    ></a-select>
    <a-select
      v-model:value="thirdRegion"
      style="width: 120px"
      :options="regions.map(region => ({ value: region }))"
    ></a-select>
  </a-space>
  </div>
  <div class="mapContainer">
    <MapContainer></MapContainer>
  </div>
</template>

<style scoped>
.mapContainer{
  display: flex;
  /* 垂直居中 */ 
  align-items: center;
  /* 水平居中 */ 
  justify-content: center; 
  padding: 15px;
}
.current-position-div {
  display: flex;
  margin: 20px,100px,20px,100px;
  align-content: center;
  justify-content: center;
}
.current-position-div p {
  font-size: 0.5cm;
  margin-right: 10px;
}

.destination-div {
  display: flex;
  margin: 20px,100px,20px,100px;
  align-content: center;
  justify-content: center;
}
.destination-div p {
  font-size: 0.5cm;
  margin-right: 10px;
}
</style>