<script setup>
import { reactive } from 'vue';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons-vue';
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
//收集到的表单信息
const formState = reactive({
  'input-number': 3,
  'checkbox-group': ['A', 'B'],
  rate: 3.5,
  uid: '',
  attachment: '',
  date: new Date().toISOString(),
  content: '',
  status: 'unfinished'
});
const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <a-form
    :model="formState"
    name="validate_other"
    v-bind="formItemLayout"
    @finishFailed="onFinishFailed"
    @finish="onFinish"
  >
  <!-- 显示投诉日期，数据为静态地获取当前时间 -->
    <a-form-item label="当前日期" class="ant-form-item-style">
      <span class="ant-form-text">{{ formState.date }}</span>
    </a-form-item>
  <!-- 上传附件 -->
    <a-form-item name="upload" label="Upload" extra="longgggggggggggggggggggggggggggggggggg" class="ant-form-item-style">
      <a-upload
        v-model:fileList="formState.upload"
        name="logo"
        action="/upload.do"
        list-type="picture"
      >
        <a-button>
          <template #icon><UploadOutlined /></template>
          Click to upload
        </a-button>
      </a-upload>
    </a-form-item>

    <a-form-item label="Dragger" class="ant-form-item-style">
      <a-form-item name="dragger" no-style>
        <a-upload-dragger v-model:fileList="formState.dragger" name="files" action="/upload.do">
          <p class="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p class="ant-upload-text">Click or drag file to this area to upload</p>
          <p class="ant-upload-hint">Support for a single or bulk upload.</p>
        </a-upload-dragger>
      </a-form-item>
    </a-form-item>
    <!-- 投诉内容 -->
    <a-form-item label="投诉内容" class="ant-form-item-style">
      <a-textarea v-model:value="formState.content" placeholder="请输入投诉内容" :rows="4" />
    </a-form-item>
    <!-- 提交投诉按钮 -->
    <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped>
.ant-form-text {
  text-align: left;
}
.ant-form-item-style {
  text-align: left;
}
</style>