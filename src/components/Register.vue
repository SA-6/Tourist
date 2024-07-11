<script setup>
import { reactive, ref } from 'vue';
import router from "../router"
import { message } from 'ant-design-vue';
import { LoadingOutlined } from '@ant-design/icons-vue'
import axios from 'axios'
//定义省市信息
const regionList = [
  {
    value: '北京',
    label: '北京',
  },
  {
    value: '天津',
    label: '天津',
  },
  {
    value: '上海',
    label: '上海',
  },
  {
    value: '重庆',
    label: '重庆',
  },
  {
    value: '河北',
    label: '河北',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '山西',
    label: '山西',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '辽宁',
    label: '辽宁',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '吉林',
    label: '吉林',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '黑龙江',
    label: '黑龙江',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '江苏',
    label: '江苏',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '浙江',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '安徽',
    label: '安徽',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '福建',
    label: '福建',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '江西',
    label: '江西',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '山东',
    label: '山东',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '河南',
    label: '河南',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '湖北',
    label: '湖北',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '湖南',
    label: '湖南',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '广东',
    label: '广东',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '海南',
    label: '海南',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '四川',
    label: '四川',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '贵州',
    label: '贵州',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '云南',
    label: '云南',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '陕西',
    label: '陕西',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '甘肃',
    label: '甘肃',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '青海',
    label: '青海',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '中国台湾',
    label: '中国台湾',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '内蒙古',
    label: '内蒙古',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '广西',
    label: '广西',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '西藏',
    label: '西藏',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '宁夏',
    label: '宁夏',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '新疆',
    label: '新疆',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '中国香港',
    label: '中国香港',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '中国澳门',
    label: '中国澳门',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
]
//接收表单数据
const registerUserData = reactive({
  username: '',
  nickname: '',
  password: '',
  gender: '男',
  age: '',
  confirmPassword: '',
  email: '',
  bio: '',
  address: '北京',
  phone: '',
  // avatar: '',
  validateCode: ''
})
const usernameMsg = ref('')
const passwordMsg = ref('')
const validateCodeMsg = ref('')
const emailMsg = ref('')
//请求服务器地址
const serverURL = 'http://192.168.104.72:8080'
//注册
function register() {
  axios({
    method: 'post',
    url: serverURL+'/user/register',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(registerUserData)
  }).then((result)=>{
    //注册成功
    if(result.data.status === '200'){
      message.success({
        content: () => '登录成功',
        style: {
          marginTop: '10vh',
        }
      })
      router.push("/mainPage");
    }else{
      //注册失败
      message.error({
        content:()=> '验证码错误',
        style: {
          marginTop: '10vh',
        }
      })
    }
    
  }).catch(function(error){
    console.log(error);
  })
}
//返回登录界面
function returnLogin() {
  router.push('/login')
}
//检查用户名是否已经存在
function isUsernameExit() {
  const params = {
    username: registerUserData.username
  }
  axios({
    method: 'post',
    url: serverURL+'/user/checkUser',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: new URLSearchParams(params).toString()
  }).then((result)=>{
    console.log(result);
    //请求成功
    if(result.data.status === 12){
      usernameMsg.value =  result.data.msg
    }else{
      console.log("请求失败,"+result);
    }
  }).catch(function(error){
    console.log(error);
  })
}
//检查两次密码是否一致
function checkPassword() {
  if(registerUserData.value.password !== registerUserData.value.confirmPassword){
    passwordMsg.value = '两次输入密码不一致'
  }
}

//重置表单信息
function resetForm() {
  registerUserData.value.username = '';
  registerUserData.value.nickname = '';
  registerUserData.value.password = '';
  registerUserData.value.gender = '';
  registerUserData.value.age = '';
  registerUserData.value.address = '';
  registerUserData.value.confirmPassword= '';
  registerUserData.value.email = '';
  registerUserData.value.phone = '';
  // registerUserData.value.avatar = '';
  registerUserData.value.bio = '';
  registerUserData.value.validateCode = '';
}
//获取验证码
function getValidateCode() {
  const params = {
    email:registerUserData.email
  }
  axios({
    method: 'post',
    url: serverURL+'/user/verifyCode',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: new URLSearchParams(params).toString()
  }).then((result)=>{
    console.log(result);
    if(result.status === 0){
      message.success({
      content: ()=> `${result.data.msg}`,
      style: {
        marginTop: '10vh'
      }
      })
    }else{
      message.error({
        content: ()=> `${result.data.msg}`,
        style: {
          marginTop: '10vh'
        }
      })
    }
  }).catch(function(error){
    console.log(error);
  })
}
//上传图片
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
const fileList = ref([]);
const loading = ref(false);
const imageUrl = ref('');
const handleChange = info => {
  if (info.file.status === 'uploading') {
    loading.value = true;
    return;
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, base64Url => {
      imageUrl.value = base64Url;
      loading.value = false;
    });
  }
  if (info.file.status === 'error') {
    loading.value = false;
    message.error('upload error');
  }
};
const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

//表单布局
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};
</script>

<template>
  <section style="height: 150%">
    <!-- 背景图片 -->
    <img src="../../src/assets/image/bg1.jpg" class="bg">
    <!-- 注册框 -->
    <div class="login">
      <h2>注册</h2>
      <a-form
        ref="formRef"
        :model="registerUserData"
        labelAlign="right"
        v-bind="layout"
        style="height: 100%;"
      >
        <a-form-item ref="name" label="用户名" name="name" class="formitemStyle">
          <a-input v-model:value="registerUserData.username" @blur="isUsernameExit" placeholder="请输入用户名" style="height: 40px;"/>
          <div><p style="color: #f51427;">{{ usernameMsg }}</p></div>
        </a-form-item>
        
        <a-form-item ref="name" label="昵称" name="name" class="formitemStyle">
          <a-input v-model:value="registerUserData.nickname"  placeholder="请输入昵称" style="height: 40px;"/>
        </a-form-item>

        <a-form-item ref="name" label="bio" name="name" class="formitemStyle">
          <a-input v-model:value="registerUserData.bio"  placeholder="请输入bio" style="height: 40px;"/>
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          class="formitemStyle"
        >
          <a-input-password v-model:value="registerUserData.password" placeholder="请输入密码" style="height: 40px;"/>
        </a-form-item>

        <a-form-item
          label="确认密码"
          name="password"
          class="formitemStyle"
        >
          <a-input-password v-model:value="registerUserData.confirm" placeholder="再次输入密码" style="height: 40px;" @blur="checkPassword"/>
          <div><p style="color: #f51427;">{{ passwordMsg }}</p></div>
        </a-form-item>

        <!-- <a-form-item label="头像" class="formitemStyle">
          <a-upload
            v-model:file-list="fileList"
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :before-upload="beforeUpload"
            @change="handleChange"
            style="height:80px;"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <loading-outlined v-if="loading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item> -->

        <a-form-item label="性别" class="formitemStyle">
          <a-radio-group v-model:value="registerUserData.gender" style="align-items: flex-start;">
            <a-radio value="男">男</a-radio>
            <a-radio value="女">女</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item ref="name" label="年龄" name="name" class="formitemStyle">
          <a-input v-model:value="registerUserData.age" size="large" placeholder="请输入年龄" style="height: 40px;"/>
        </a-form-item>

        <a-form-item ref="name" label="地区" name="name" class="formitemStyle">
          <a-cascader
            v-model:value="registerUserData.address"
            style="width: 100%;"
            size="large"
            :options="regionList"
            placeholder="请选择地区"
          />
        </a-form-item>

        <a-form-item ref="name" label="邮箱" name="name" class="formitemStyle">
          <a-input v-model:value="registerUserData.email" size="large" placeholder="请输入邮箱" style="height: 40px;"/>
          <div><p style="color: #f51427;">{{ emailMsg }}</p></div>
        </a-form-item>

        <a-form-item label="验证码" class="formitemStyle">
          <a-input-search
            v-model:value="registerUserData.validateCode"
            placeholder="请输入验证码"
            size="large"
            @search="getValidateCode"
          >
            <template #enterButton>
              <a-button>获取验证码</a-button>
            </template>
          </a-input-search>
          <div><p style="color: #f51427;">{{ validateCodeMsg }}</p></div>
        </a-form-item>
        
        <a-form-item :wrapper-col="{ span: 14, offset: 5 }">
          <a-button type="primary" @click="register" >注册用户</a-button>
          <a-button style="margin-left: 10px" @click="resetForm" >重置信息</a-button>
        </a-form-item>
      </a-form>
      <a @click="returnLogin" style="margin-top: 50px;">已有账户,返回登录</a>
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
  height: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
}
section .bg {
  position: absolute;
  background-size: cover;
  background-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%;
  object-fit: cover;
}
.login {
  position: relative;
  width: 500px;
  height: 130%;
  padding: 30px;
  margin-top: 30%;
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
  margin-bottom: 3px;
}
.login h3 {
  position: relative;
  width: 100%;
  text-align: left;
  font-size: 1em;
  font-weight: 100;
  color: #8f2c24;
  margin-bottom: 3px;
}
span .ant-input-wrapper {
  height:100%
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
  margin-bottom: 3px;
}
.login .inputbox input {
  position: relative;
  width: 100%;
  height: 80%;
  padding: 15px 20px;
  outline: none;
  font-size:1.25em;
  color:#8f2c24;
  border-radius: 5px;
  background: #fff;
  border:none;
}
.login .option {
  position: relative;
}
.formitemStyle {
  margin: 2px 0 2px 0;
  height: 9%
}

:deep(.ant-upload) {
  height: 40px;
}

.avatar-uploader > .ant-upload {
  background: #8f2c24;
  width: 128px;
  height: 30px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #8f2c24;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #8f2c24;
}
</style>
