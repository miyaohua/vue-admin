<template>
    <a-modal ok-text="确认" cancel-text="取消" centered v-model:open="visible" title="角色权限管理" @ok="handleOk"
        @cancel="cancelFn">
        <div class="wrap">
            <a-collapse>
                <a-collapse-panel v-for="(item) in permissionGroup" :key="item.id" :header="item.name">
                    <a-checkbox-group :name="item.name" v-model:value="item.selectId" :options="item.permission">
                        <template #label="{ label, introduce }">
                            <a-tooltip :title="introduce">
                                <span>{{ label }}</span>
                            </a-tooltip>
                        </template>
                    </a-checkbox-group>
                </a-collapse-panel>
            </a-collapse>
        </div>
    </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAllPermissionGroupApi, assingPermissionApi } from '@/apis/role'
import { message } from 'ant-design-vue';

const visible = ref<boolean>(false)
// 当前角色id
const currentRoleId = ref<string>('')

const handleOk = async () => {
    console.log(permissionGroup.value, 'permissionGroup')
    let permissionAll: number[] = [];
    permissionGroup.value.forEach((v: any) => {
        v.selectId.forEach((r: any) => {
            permissionAll.push(r)
        })
    });
    console.log(permissionAll);
    
    const res: any = await assingPermissionApi({
        permissionIds: permissionAll,
        roleId: currentRoleId.value
    })
    if (res?.code == 200) {
        message.success('权限分配成功')
        cancelFn()
    }
}

const cancelFn = () => {
    visible.value = false
}


const openDialog = (record: any) => {
    currentRoleId.value = record.id
    visible.value = true;
    getAllPermissionGroup()
}


// 所有权限分组及权限
const permissionGroup = ref<any>([])
const getAllPermissionGroup = async () => {
    const res: any = await getAllPermissionGroupApi()
    if (res?.code == 200) {
        permissionGroup.value = res.data.map((v: any) => {
            return {
                ...v,
                permission: v.permission.map((r: any) => {
                    return {
                        label: r.desc,
                        value: r.id,
                        name: r.name,
                        introduce: r.introduce
                    }
                })
            }
        })
        console.log(permissionGroup.value)
    }
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

    :deep(.ant-checkbox-wrapper) {
        margin-bottom: 8px
    }
}
</style>