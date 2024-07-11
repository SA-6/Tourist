<script setup>
  import { ref, reactive } from 'vue';
  import { useUserStore } from '../store/userStore'
  import { PlusOutlined } from '@ant-design/icons-vue'
  const userStore =  useUserStore();
  const componentDisabled = ref(true);
  //用户个人信息
  const userInfo = ref({
    userId : userStore.userId,
    username : userStore.username,
    password : userStore.password,
    email : userStore.email,
    phone : userStore.phone,
    nickname : userStore.nickname,
    avatar : userStore.avatar,
    gender : userStore.gender,
    address : userStore.address,
    age : userStore.age,
    bio : userStore.bio,
    token : userStore.token,
    role : userStore.role
  })
  //地区信息
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
  
  const labelCol = {
    style: {
      width: '150px',
    },
  };
  const wrapperCol = {
    span: 14,
  };
</script>

<template>
  <a-checkbox :checked="componentDisabled" @change="e => (componentDisabled = e.target.checked)">
    Form disabled
  </a-checkbox>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    :disabled="componentDisabled"
    style="max-width: 600px"
  >
    <a-form-item label="用户名">
      <a-input v-model:value="userInfo.username" />
    </a-form-item>
    <a-form-item label="昵称">
      <a-input v-model:value="userInfo.nickname" />
    </a-form-item>
    <a-form-item label="性别">
      <a-radio-group v-model:value="userInfo.gender">
        <a-radio value="男">男</a-radio>
        <a-radio value="女">女</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="年龄">
      <a-input v-model:value="userInfo.age" />
    </a-form-item>
    <a-form-item label="电话号码">
      <a-input v-model:value="userInfo.phone" />
    </a-form-item>
    <a-form-item label="描述">
      <a-input v-model:value="userInfo.bio" />
    </a-form-item>
    <a-form-item label="地区">
      <a-cascader
        v-model:value="userInfo.address"
        style="width: 100%;"
        size="large"
        :options="regionList"
        placeholder="请选择地区"
      />
    </a-form-item>
    <a-form-item label="描述">
      <a-textarea :rows="4" v-model:value="userInfo.bio"/>
    </a-form-item>
    
    <a-form-item label="Upload">
      <a-upload action="/upload.do" list-type="picture-card">
        <div>
          <PlusOutlined />
          <div style="margin-top: 8px">Upload</div>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item label="Button">
      <a-button>Button</a-button>
    </a-form-item>
  </a-form>
  <a-button>修改信息</a-button>
</template>

<style scoped>

</style>