import { RouteRecordRaw } from 'vue-router';

export default {
    path: '/auth',
    component: () => import('@/layouts/auth/index.vue'),
    redirect: '/auth/login',
    children: [
        {
            path: 'login',
            name: 'login',
            component: () => import('@/views/auth/login.vue')
        }
    ]
} as RouteRecordRaw