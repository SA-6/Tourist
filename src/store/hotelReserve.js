import { defineStore } from "pinia";
import { ref } from 'vue';
export const useHotelReserve = defineStore('hotelReserve',()=>{
  
  

  //暴露属性以及方法
  return {
    recommendDataInfo,
    setRecommendDataInfo,
  }
})