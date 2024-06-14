<template>
    <a-modal ok-text="确认" cancel-text="取消" :maskClosable="false" centered v-model:open="visible" title="角色权限管理"
        @ok="handleOk" @cancel="cancelFn">
        <div class="wrap">
            <a-collapse ghost>
                <a-collapse-panel v-for="(item) in permissionGroup" :key="item.id" :header="item.name">
                    <a-checkbox-group :options="item.permission.map(v => v.desc)" />
                </a-collapse-panel>
            </a-collapse>
        </div>
    </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAllPermissionGroupApi } from '@/apis/role'

const visible = ref<boolean>(false)
// 当前角色id
const currentRoleId = ref<string>('')

const handleOk = () => { }

const cancelFn = () => { }


const openDialog = (record: any) => {
    currentRoleId.value = record.id
    visible.value = true;
    getAllPermissionGroup();
    getAllPermission()
}


// 所有权限分组及权限
const permissionGroup = ref<any>([])

const getAllPermissionGroup = async () => {
    const res: any = await getAllPermissionGroupApi()
    if (res?.code == 200) {
        permissionGroup.value = res.data
    }
}


const getAllPermission = () => {

}


defineExpose({
    openDialog
})
</script>


<style scoped lang="scss">
.wrap {
    width: 100%;
    height: 400px;
    overflow: auto;
}
</style>