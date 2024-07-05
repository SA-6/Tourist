<script setup>
import { icons } from 'ant-design-vue/es/image/PreviewGroup';
import { reactive } from 'vue';
import router from "../router"
const userData = reactive({
  username:'',
  password:''
})
// const visiblel = reactive(true)

function login() {
  router.push("/mainPage");
}
</script>

<template>
  <section>
    <!-- 背景图片 -->
    <img src="../../src/assets/image/bg.png" class="bg">
    <!-- 登录框 -->
    <div class="login">
      <h2>Sign In</h2>
      <h3>用户名</h3>
      <div class="inputbox">
        <input type="text" placeholder="Phone Number" v-model="userData.username">
      </div>
      <h3>密码</h3>
      <div class="inputbox">
        <input type="password" placeholder="Password" v-model="userData.password">
        <!-- <font-awesome-icon :icon="['far', 'eye']" :hidden="visible"/>
        <font-awesome-icon :icon="['far', 'eye-slash']" :hidden="!visible"/> -->
      </div>
      
      <div class="inputbox">
        <input type="submit" value="登录" id="btn" @click="login()">
      </div>
      <!-- 额外选项 -->
      <div class="options">
        <a href="" @click="resetPassword()">忘记密码</a> | 
        <a href="" @click="registerUser()">注册新用户</a>
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
  height: 600px;
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
  margin-bottom: 10px;
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
.login .inputbox {
  position: relative;
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


.navbar {
  position: relative;
  width:500px;
  height:500px;
}
</style>
