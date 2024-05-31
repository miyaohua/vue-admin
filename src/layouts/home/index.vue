<template>
    <a-layout class="w-full h-full">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div class="title h-8 m-4 text-base text-center leading-8 text-white">
                <span v-show="!collapsed">{{ appName }}后台管理系统</span>
            </div>
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="menuClick">
                <a-menu-item key="dashboard">
                    <user-outlined />
                    <span>仪表盘</span>
                </a-menu-item>
                <a-menu-item key="permission">
                    <video-camera-outlined />
                    <span>权限管理</span>
                </a-menu-item>
                <a-menu-item key="role">
                    <upload-outlined />
                    <span>角色管理</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>

        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
                <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
            </a-layout-header>
            <a-layout-content :style="{ padding: '20px', background: '#F2F5F9', minHeight: '280px' }">
                <router-view />
            </a-layout-content>
        </a-layout>

    </a-layout>
</template>


<script lang="ts" setup>
const appName = import.meta.env.VITE_APP_NAME

import { ref } from 'vue';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);


const menuClick = (item: any) => {
    console.log(item)
    router.push(`/home/${item.key}`)
}
</script>


<style scoped lang="scss">
.trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

.trigger:hover {
    color: #1890ff;
}

.fold {
    display: none;
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

.fold:hover {
    color: #1890ff;
}

.site-layout .site-layout-background {
    background: #fff;
}

// 小于768px
@media screen and (max-width: 768px) {
    :deep(.ant-layout-sider) {
        position: absolute !important;
        flex: unset !important;
        width: 0 !important;
        min-width: unset !important;
        max-width: unset !important;
        height: 100%;
        z-index: 99;
    }

    :deep(.ant-menu) {
        display: none;
    }

    .title {
        display: none;
    }

    .trigger {
        display: none;
    }

    .fold {
        display: unset
    }
}
</style>
