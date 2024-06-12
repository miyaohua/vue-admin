<template>
  <a-modal ok-text="确认" cancel-text="取消" :maskClosable="false" centered v-model:open="visible"
    :title="editId ? '修改角色' : '新增角色'" @ok="handleOk" @cancel="cancelFn">
    <a-form class="mt-8" ref="formRef" :model="formState" name="basic" autocomplete="off">
      <a-form-item label="角色名称" name="name" :rules="[{ required: true, message: '请输入角色名称' }]">
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item label="角色描述" name="desc" :rules="[{ required: true, message: '请输入角色描述' }]">
        <a-input v-model:value="formState.desc" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { addRoleApi, editRoleApi } from '@/apis/role'
import { reactive, ref, defineExpose } from "vue";
import { message } from 'ant-design-vue'
const emit = defineEmits(['queryAllRole'])

interface FormState {
  name: string;
  desc: string;
}

const visible = ref<boolean>(false)

const formRef = ref<any>(null);
const formState = reactive<FormState>({
  name: "",
  desc: "",
});

const editId = ref('')
const cancelFn = () => {
  formRef.value.clearValidate();
  formRef.value.resetFields();
  editId.value = ''
  visible.value = false;
}

const handleOk = () => {
  formRef.value.validateFields().then(async (values: any) => {
    if (editId.value) {
      // 修改
      const res: any = await editRoleApi(editId.value, values)
      if (res?.code == 200) {
        message.success('修改成功')
        cancelFn();
        emit('queryAllRole')
      }
      return;
    }
    const res: any = await addRoleApi(values)
    if (res?.code == 200) {
      cancelFn();
      emit('queryAllRole')
      message.success('新增成功')
    }
  });
};

const openDialog = (values: any) => {
  visible.value = true;
  if (values) {
    formState.name = values.name
    formState.desc = values.desc
    editId.value = values.id
  }
}

defineExpose({
  openDialog
})
</script>

<style scoped lang="scss"></style>