import { Descriptions } from "ant-design-vue";
import { defineStore } from "pinia";
import { ref } from 'vue';
export const useCityStore = defineStore('cityStore',()=>{
  //用户信息
  const cityInfo = ref({
    cityId: '',
    name: '',
    imageUrl: [],
    description: '',
    mustVisit: ''
  })
  //设置目标城市信息
  const setCityInfo = (city)=>{
    cityInfo.value.cityId = city.cityId;
    cityInfo.value.name = city.name;
    cityInfo.value.imageUrl = city.imageUrl;
    cityInfo.value.description = city.description;
    cityInfo.value.mustVisit = city.mustVisit;
  }
  //清空用户信息
  // const clearcityInfo = ()=>{
  //   cityInfo.value.userId = '';
  //   cityInfo.value.username = '';
  //   cityInfo.value.password = '';
  //   cityInfo.value.email = '';
  //   cityInfo.value.phone = '';
  //   cityInfo.value.nickname = ''
  //   cityInfo.value.avatar = '';
  //   cityInfo.value.gender = '';
  //   cityInfo.value.address = '';
  //   cityInfo.value.age = '';
  //   cityInfo.value.bio = '';
  //   cityInfo.value.token = '';
  //   cityInfo.value.role = '';
  // }

  //暴露属性以及方法
  return {
    cityInfo,
    setCityInfo,
    // clearcityInfo
  }
})