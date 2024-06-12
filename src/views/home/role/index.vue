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
            <a-button type="primary" @click="addRoleFn">新增角色</a-button>
        </div>
        <!-- 表格 -->
        <a-table bordered :pagination="paginationConfig" :columns="columns" :data-source="data" :loading="isLoading"
            @change="changeFn">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                    <span>
                        <a-tag color="#108ee9">{{ record.name }}</a-tag>
                    </span>
                </template>

                <template v-else-if="column.key === 'action'">
                    <span>
                        <a-button size="small" @click="edit(record)" type="link">修改</a-button>
                        <a-divider type="vertical" />
                        <a-button size="small" @click="edit(record)" type="link">角色权限</a-button>
                        <a-divider type="vertical" />
                        <a-button size="small" @click="del(record)" type="link" danger>删除</a-button>
                    </span>
                </template>
            </template>
        </a-table>
    </div>
    <addEditRole ref="addRoleRef" @queryAllRole="queryAllRole" />
    <!-- 删除角色弹窗 -->
    <a-modal ok-text="确认" cancel-text="取消" :maskClosable="false" centered v-model:open="isDel" title="删除角色"
        :confirm-loading="isDelLoading" @ok="delFn">
        <p class="mt-8">此操作将永久删除该角色</p>
    </a-modal>

    <!-- 权限 -->
    
</template>


<script setup lang="ts">
import { queryRoleApi, deleteRoleApi } from '@/apis/role'
import { reactive, ref, onMounted } from 'vue';
import { columns } from './tableconfig'
import addEditRole from './addEditRole.vue'
import { message } from 'ant-design-vue';

onMounted(() => {
    queryAllRole()
})
interface FormState {
    name: string;
}

const queryAllRole = () => {
    onFinish(formState);
}

const formRef = ref<any>(null)
const formState = reactive<FormState>({
    name: ''
});

const page = ref(1);
const pageSize = ref(10);
const total = ref(0)

const isLoading = ref<Boolean>(false)
const data: any = ref([])


const paginationConfig = ref({
    current: page,
    pageSize,
    total: total,
    showSizeChanger: true,
    showTotal: (total: number) => `总 ${total} 条数据`,
})

const onFinish = async (values?: any) => {
    isLoading.value = true;
    const res: any = await queryRoleApi({
        name: values?.name ?? '',
        page: page.value,
        pageSize: pageSize.value,
    })
    if (res?.code == 200) {
        data.value = res.data.list
        total.value = res.data.total
    }
    isLoading.value = false;

};

const resetForm = () => {
    formRef.value.resetFields()
}


const changeFn = (pagination: any) => {
    paginationConfig.value.current = pagination.current
    paginationConfig.value.pageSize = pagination.pageSize
    onFinish(formState)
}


const addRoleRef = ref<any>(null)
const addRoleFn = () => {
    addRoleRef.value.openDialog();
}


const edit = (record: any) => {
    addRoleRef.value.openDialog(record)
}

const del = ({ id }: any) => {
    delId.value = id
    isDel.value = true;

}

const delId = ref('')
const isDel = ref<boolean>(false)
const isDelLoading = ref<boolean>(false)
const delFn = async () => {
    const res: any = await deleteRoleApi(delId.value)
    if (res?.code == 200) {
        message.success('删除成功')
        queryAllRole();
        isDel.value = false;
    }
}

</script>

<style scoped lang="scss"></style>