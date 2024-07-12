import { defineStore } from "pinia";
import { ref } from 'vue';
export const useRecommendDataStore = defineStore('recommendDataStore',()=>{
  //推荐信息
  const recommendDataInfo = ref({
    recommendCity: [],
    recommendScene: [],
    recommendHotel: []
  })
  //设置推荐信息
  const setRecommendDataInfo = (data)=>{
   recommendCity.value = data.popularCitiesList
   recommendScene.value = data.scenicSpotsList
   recommendHotel.value = data.hotelsList
  }

  //暴露属性以及方法
  return {
    recommendDataInfo,
    setRecommendDataInfo,
  }
})