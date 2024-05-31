<template>
    <div class="flex h-screen">
        <div class="hidden md:flex justify-center items-center w-3/6 login-bg"></div>
        <div class="w-full md:w-3/6">
            <router-view class="w-6/10" />
        </div>
    </div>

</template>

<script setup></script>

<style scoped lang="scss">
.login-bg {
    background-color: #373E51;
}
</style>