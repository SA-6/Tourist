<script setup>
import { cloneDeep } from 'lodash-es';
import { reactive, ref } from 'vue';
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    width: '100px',
    fixed: 'left'
  },
  {
    title: '用户名',
    dataIndex: 'uid',
    width: '100px',
  },
  {
    title: '附件',
    dataIndex: 'attachment',
    width: '150px',
  },
  {
    title: '日期',
    dataIndex: 'date',
    width: '250px',
  },
  {
    title: '内容',
    dataIndex: 'content',
    width: '300px',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: '150px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    fixed: 'right',
    width: '150px'
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    id: `Edrward ${i}`,
    uid: `User100${i}`,
    attachment: `London Park no. ${i}`,
    date: new Date().toISOString(),
    content: 'Pellentesque accumsan cursus dui,'+ 
    'sodales blandit urna sodales vitae Pellentesque accumsan cursus dui,'+
    ' sodales blandit urna urna sodales vitae ipsum Pellentesque accumsan cursus dui,'+
    'sodales blan urna sodales vitaePellentesque accumsan cursus dui, sodales blan sodales vitae.',
    status: 'finished'
  });
}
const dataSource = ref(data);
const editableData = reactive({});
const edit = key => {
  console.log(key);
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
  console.log(editableData[key]);
};
const save = key => {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
  delete editableData[key];
};
const cancel = key => {
  delete editableData[key];
};
</script>

<template>
  <!-- columns属性设置表格的列的相关信息 -->
  <!-- data-source属性设置表格中的数据 -->
  <!-- bordered属性设置表格的边框是否显示 -->
  <a-table :columns="columns" :data-source="dataSource" :scroll="{ x:1300, y:520 }" bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="['attachment', 'content'].includes(column.dataIndex)">
        <div>
          <a-input
            v-if="editableData[record.key]"
            v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">Save</a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)">Edit</a>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>