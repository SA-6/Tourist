import { defineStore } from "pinia";
import { ref } from 'vue';
export const useUserStore = defineStore('userStore',()=>{
  //用户信息
  const userInfo = ref({
    userId: '',
    username: '',
    password: '',
    gender: '',
    age: 0,
    phone: '',
    identity: '',
    token:'',
    email: '',
    address: '',
    nickname: '',
    bio: '',
    avatar : '',
    role: ''
  })
  //设置用户信息
  const setUserInfo = (user)=>{
    userInfo.value.userId = user.userId;
    userInfo.value.username = user.username;
    userInfo.value.password = user.password;
    userInfo.value.email = user.email;
    userInfo.value.phone = user.phone;
    userInfo.value.nickname = user.nickname;
    userInfo.value.avatar = user.avatar;
    userInfo.value.gender = user.gender;
    userInfo.value.address = user.address;
    userInfo.value.age = user.age;
    userInfo.value.bio = user.bio;
    userInfo.value.token = user.token;
    userInfo.value.role = user.role;
  }
  //清空用户信息
  const clearUserInfo = ()=>{
    userInfo.value.userId = '';
    userInfo.value.username = '';
    userInfo.value.password = '';
    userInfo.value.email = '';
    userInfo.value.phone = '';
    userInfo.value.nickname = ''
    userInfo.value.avatar = '';
    userInfo.value.gender = '';
    userInfo.value.address = '';
    userInfo.value.age = '';
    userInfo.value.bio = '';
    userInfo.value.token = '';
    userInfo.value.role = '';
  }

  //暴露属性以及方法
  return {
    userInfo,
    setUserInfo,
    clearUserInfo
  }
})