import { RouteRecordRaw } from 'vue-router';

export default {
    path: '/home',
    component: () => import('@/layouts/home/index.vue'),
    redirect: '/home/dashboard',
    children: [
        {
            path: 'dashboard',
            name: 'dashboard',
            component: () => import('@/views/home/dashboard/index.vue'),
            meta: {
                title: '仪表盘'
            }
        },
        {
            path: 'permission',
            name: 'permission',
            component: () => import('@/views/home/permission/index.vue'),
            meta: {
                title: '权限管理'
            }
        },
        {
            path: 'role',
            name: 'role',
            component: () => import('@/views/home/role/index.vue'),
            meta: {
                title: '角色管理'
            }
        }
    ]
} as RouteRecordRaw