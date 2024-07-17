<script setup>
import { icons } from 'ant-design-vue/es/image/PreviewGroup';
import { reactive } from 'vue';
import { message } from 'ant-design-vue';
import axios from 'axios';
import router from "../../router"

import { useUserStore } from '../../store/userStore'
const userData = reactive({
  username: '',
  password: '',
  validateCode: ''
})
const userStore = useUserStore()

const serverURL = `http://localhost:8080`
//登录
function login() {
  console.log(userData);
  const params = {
    username: userData.username,
    password: userData.password,
    verifyCode: userData.validateCode
  }
  axios({
    //请求的相关配置
    method: 'post',
    url: serverURL+'/user/login/user',
    headers: {  
      'Content-Type': 'application/x-www-form-urlencoded'  
    },
    data: new URLSearchParams(params).toString(),
    withCredentials: false
  }).then((result)=>{
    console.log(result);
    //登录成功
    if(result.data.status === 0){
      message.success({
        content: ()=> `${result.data.msg}`,
        style: {
          marginTop: '10vh',
        }
      })
      //登录成功后存储用户信息
      userStore.setUserInfo(result.data.data);
      localStorage.setItem("username",result.data.data.username)
      //登录成功后跳转到主页面
      router.push("/mainPage/overview");
    }else{
      //登录失败
      message.error({
        content:()=> `${result.data.msg}`,
        style: {
          marginTop: '10vh',
        }
      })
    }
  }).catch(function (error){
    console.log(error);
  })
}
//跳转注册界面
function registerUser(){
  router.push("/register")
}
//重置密码
function resetPassword(){
  router.push("/resetPassword")
}
//获取验证码
function getValidateCode() {
  const params = {
    username:userData.username
  }
  axios({
    method: 'post',
    url: serverURL+'/user/verifyCode/login',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: new URLSearchParams(params).toString(),
    withCredentials: false
  }).then((result)=>{
    console.log(result);
    if(result.data.status === 0){
      message.success({
      content: ()=> `${result.data.data}`,
      style: {
        marginTop: '10vh'
      }
      })
    }else{
      message.error({
        content: ()=> `${result.data.data}`,
        style: {
          marginTop: '10vh'
        }
      })
    }
  }).catch(function(error){
    console.log(error);
  })
}
</script>

<template>
  <section>
    <!-- 背景图片 -->
    <img src="../../assets/image/bg1.jpg" class="bg">
    <!-- 登录框 -->
      <div class="login">
        <h2>登录</h2>
        <h3>账号</h3>
        <div class="inputbox">
          <input type="text" placeholder="Username" v-model="userData.username">
        </div>
        <h3>密码</h3>
      <div class="inputbox">
        <a-input-password
          class="passwordInput"
          v-model:value="userData.password"
          placeholder="Input Password"
          :visibility-toggle="true"
          font-size="1.25em"
          color="#8f2c24"
        />
      </div>
      <h3>验证码</h3>
      <div class="inputbox">
        <a-input-search
            class="validateCode-input"
            v-model:value="userData.validateCode"
            placeholder="请输入验证码"
            size="large"
            @search="getValidateCode"
          >
            <template #enterButton>
              <a-button>获取验证码</a-button>
            </template>
          </a-input-search>
      </div>
      <div class="inputbox">
        <input type="submit" value="登录" id="btn" @click="login">
      </div>
      <!-- 额外选项 -->
      <div class="options">
        <a @click="resetPassword">忘记密码</a> | 
        <a @click="registerUser">注册新用户</a>
      </div>
    </div>
     
  </section>
</template>

<style scoped>

* {
  margin: 0 0 0 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
section {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
}
section .bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.login {
  position: relative;
  width: 500px;
  height: 700px;
  padding: 60px;
  border-radius: 20px;
  background: rgba(255, 255, 255,0.25);
  backdrop-filter: blur(3px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
}
.login h2 {
  position: relative;
  width:100%;
  text-align: center;
  font-size: 2.5em;
  font-weight:600;
  color:#8f2c24;
  margin-bottom: 0px;
}
.login h3 {
  position: relative;
  width: 100%;
  text-align: left;
  font-size: 1em;
  font-weight: 100;
  color: #8f2c24;
  margin-bottom: 1px;
}

.login .passwordInput {
  height: 80%;
  position: relative;
  width: 100%;
  padding: 10px 20px;
  outline: none;
  font-size:1.25em;
  color:#8f2c24;
  border-radius: 5px;
  background: #fff;
  border:none;
  margin-bottom: 20px;
}
.validateCode-input {
  height: 80%;
  position: relative;
  width: 100%;
  outline: none;
  font-size:1.25em;
  color:#8f2c24;
  border-radius: 5px;
  background: #fff;
  border:none;
  margin-bottom: 20px;
}
::v-deep(.validateCode-input input) {
  padding: 0%;
  height: 100%;
  border: 0;
  font-size: 1.25em;
  outline:none;
  line-height: 40px;
  padding-left: 20px;
}
::v-deep(.validateCode-input button) {
  /* padding: 0%; */
  height: 100%;
  padding-right: 10px;
  border: 0;
  
  font-size: 1.25em;
  outline: none;
  line-height: 40px;
}
::v-deep(.validateCode-input button span) {
  /* padding: 0%; */
  height: 50%;
  /* margin-top: 15px; */
  border: 0;
  font-size: 1em;
  outline: none;
  line-height: 30px;
}

.login .inputbox input {
  position: relative;
  width: 100%;
  padding: 15px 20px;
  outline: none;
  font-size:1.25em;
  color:#8f2c24;
  border-radius: 5px;
  background: #fff;
  border:none;
  margin-bottom: 20px;
}
.login .option {
  position: relative;
}

.validateCodeInput {
  height: 70%;
  position: relative;
  width: 100%;
  padding: 0px 20px;
  outline: none;
  font-size:1.25em;
  color:#8f2c24;
  border-radius: 5px;
  background: #fff;
  border:none;
  margin-bottom: 20px;
}

.inputbox :deep(span) {
  height: 100%
}

.validateCodeInput :deep(.ant-input-group) {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.validateCodeInput :deep(.ant-input-group :deep(input)) {
  height: 60px;
}
::v-deep(.inputbox span)
{
  line-height: 40px;
}
</style>
