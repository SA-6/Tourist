<script setup>
import router from '../../router';
import { reactive } from 'vue'
import { message } from 'ant-design-vue';
import axios from 'axios';
//表单数据
const userData = reactive({
  username: '',
  newPassword: '',
  confirmPassword: '',
  validateCode: ''
})
//服务器地址
const serverURL = 'http://localhost:8080'
//返回登录
function returnLogin() {
  router.push('/login')
}
//注册新用户
function registerUser() {
  router.push('register')
}
//获取验证码
function getValidateCode() {
  const params = {
    username:userData.username
  }
  axios({
    method: 'post',
    url: serverURL+'/user/verifyCode/resetPassword',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: new URLSearchParams(params).toString(),
    withCredentials: true
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
//提交修改
function postData() {
  const params = {
    username: userData.username,
    password: userData.newPassword,
    verifyCode: userData.validateCode
  }
  axios({
    method: 'post',
    url: serverURL+'/user/resetPassword',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'  
    },
    data: new URLSearchParams(params).toString(),
  }).then((result)=>{
    console.log(result);
    if(result.data.status === 0){
      message.success({
      content: ()=> "重置密码成功,3秒后跳转到登录页面",
      style: {
        marginTop: '10vh'
      }
      })
    }else{
      message.error({
        content: ()=> "重置密码失败",
        style: {
          marginTop: '10vh'
        }
      })
    }
    clearFormData()
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  }).catch(function(error){
    console.log(error);
  })
}
//清空表格数据
function clearFormData() {
  userData.username = '',
  userData.newPassword = '',
  userData.confirmPassword = '',
  userData.validateCode = ''
}

</script>

<template>
  <section>
    <!-- 背景图片 -->
    <img src="../../assets/image/bg1.jpg" class="bg">
    <!-- 登录框 -->
    <div class="login">
      <h2>重置密码</h2>
      <h3>用户名</h3>
      <div class="inputbox">
        <input type="text" placeholder="用户名" v-model="userData.username">
      </div>
      <h3>新密码</h3>
      <div class="inputbox">
        <a-input-password
          class="passwordInput"
          v-model:value="userData.newPassword"
          placeholder="新密码"
          :visibility-toggle="true"
          font-size="1.25em"
          color="#8f2c24"
        />
      </div>
      <h3>确认密码</h3>
      <div class="inputbox">
        <a-input-password
          class="passwordInput"
          v-model:value="userData.confirmPassword"
          placeholder="确认新密码"
          :visibility-toggle="true"
          font-size="1.25em"
          color="#8f2c24"
        />
      </div>
      <h3>验证码</h3>
      <div class="inputbox">
        <a-input-search class="validateCodeInput"
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
        <input type="submit" value="确认" id="btn" @click="postData">
      </div>
      <!-- 额外选项 -->
      <div class="options">
        <a @click="returnLogin">返回登录</a> | 
        <a @click="registerUser">没有账号,前往注册</a>
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
  height: 730px;
  padding: 60px;
  border-radius: 20px;
  background: rgba(255, 255, 255,0.25);
  backdrop-filter: blur(3px);
  display: flex;
  flex-direction: column;
  gap: 10px;
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

.validateCodeInput {
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
::v-deep(.validateCodeInput span) {
  height: 100%;
  margin: 0;
  line-height: 50px;
}
::v-deep(.validateCodeInput input) {
  padding: 0%;
  height: 100%;
  border: 0;
  font-size: 1.4em;
  outline:none;
  line-height: 40px;
  padding-left: 20px;
}
::v-deep(.validateCodeInput button) {
  /* padding: 0%; */
  height: 100%;
  padding-right: 10px;
  border: 0;
  
  font-size: 1.25em;
  outline: none;
  line-height: 40px;
}
::v-deep(.validateCodeInput button span) {
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

</style>
