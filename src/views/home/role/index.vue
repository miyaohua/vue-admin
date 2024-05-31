<template>
    <div class="p-5 bg-white">
        <a-form ref="formRef" :model="formState" layout="inline" name="basic" autocomplete="off" @finish="onFinish">
            <a-form-item label="角色名称" name="name">
                <a-input v-model:value="formState.name" />
            </a-form-item>

            <a-form-item>
                <a-button type="primary" html-type="submit">查询</a-button>
            </a-form-item>

            <a-form-item>
                <a-button @click="resetForm">重置</a-button>
            </a-form-item>

        </a-form>
    </div>

    <div class="p-5 bg-white mt-5">
        <!-- 操作按钮 -->
        <div class="mb-5">
            <a-button type="primary" @click="resetForm">新增角色</a-button>
        </div>
        <!-- 表格 -->
        <a-table :columns="columns" :data-source="data" :loading="isLoading">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                    <span>
                        <a-tag color="pink">{{ record.name }}</a-tag>
                    </span>
                </template>

                <template v-else-if="column.key === 'action'">
                    <span>
                        <a>修改</a>
                        <a-divider type="vertical" />
                        <a>删除</a>
                    </span>
                </template>
            </template>
        </a-table>
    </div>
</template>


<script setup lang="ts">
import { queryRoleApi } from '@/apis/role'

import { reactive, ref } from 'vue';
const formRef = ref<any>(null)
interface FormState {
    name: string;
}
const formState = reactive<FormState>({
    name: ''
});
const onFinish = async (values: any) => {
    isLoading.value = true;
    const res: any = await queryRoleApi({
        name: values.name ,
        page: '1',
        pageSize: '10',
    })
    if (res?.code == 200) {
        console.log(res)
        data.value = res.data.list
    }
    isLoading.value = false;

};

const resetForm = () => {
    formRef.value.resetFields()
}

const isLoading = ref<Boolean>(false)

const columns: any = [
    {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '角色描述',
        dataIndex: 'desc',
        key: 'desc',
    },
    {
        title: '创建时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
    },
    {
        title: '操作',
        key: 'action',
    },
];

const data: any = ref([])
</script>

<style scoped lang="scss"></style>