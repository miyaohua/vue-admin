<template>
    <div class="px-20 h-screen w-1/1! md:px-55">
        <div class="w-full h-full pt-77">
            <div class="mb-8 text-center text-xl font-bold">{{ appName }}后台管理系统</div>
            <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish"
                @finishFailed="onFinishFailed">

                <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名' }]">
                    <a-input placeholder="请输入用户名" v-model:value="formState.username" />
                </a-form-item>

                <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
                    <a-input-password placeholder="请输入密码" v-model:value="formState.password" />
                </a-form-item>

                <a-form-item name="remember">
                    <div class="flex justify-between">
                        <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
                        <div class="forget" @click="forgotPassword">忘记密码?</div>
                    </div>
                </a-form-item>

                <div>
                    <a-button class="w-full h-full" type="primary" html-type="submit">登录</a-button>
                </div>
            </a-form>
        </div>

    </div>
</template>

<script setup lang="ts">
const appName = import.meta.env.VITE_APP_NAME
import { message } from 'ant-design-vue';
import { reactive } from 'vue';
import { loginApi } from '@/apis/auth'
import Cookie from 'js-cookie'
import { useRouter } from 'vue-router'

const router = useRouter();

interface FormState {
    username: string;
    password: string;
    remember: boolean;
}

const formState = reactive<FormState>({
    username: 'admin',
    password: 'mi010409',
    remember: true,
});


/**
 * 登录
 * @param values 
 */
const onFinish = async (values: any) => {
    const res: any = await loginApi(values)
    if (res?.code == 200) {
        message.success('登录成功！')
        // 保存token 3小时 3/24=0.125
        Cookie.set('token', res.data.token, { expires: 0.125 })
        router.push('/home')
    }
};


/**
 * 忘记密码
 */
const forgotPassword = () => {

}


/**
 * 验证错误
 * @param errorInfo 
 */
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
</script>

<style scoped lang="scss">
.forget {
    cursor: pointer;
}
</style>