import { defineStore } from "pinia";
import { ref } from 'vue';
export const useUserStore = defineStore('userStore',()=>{
  //用户信息
  const userInfo = ref({
    username:'',
    token:'',
  })
  //设置用户信息
  const setUserInfo = (user)=>{
    userInfo.value.username = user.username;
    userInfo.value.token = user.token;
  }
})