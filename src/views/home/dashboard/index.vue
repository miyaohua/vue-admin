<template>
    dashboardwws嗷嗷
    <Button @click="test">Test</Button>
</template>

<script setup lang="ts">
import { Button } from 'ant-design-vue';
import { testApi } from '@/apis/dashboard'

const test = () => {
    console.log('test')
    testApi({
        name: 'test',
        desc: 'test'
    }).then(res => {
        console.log(res)
    })
}
</script>

<style scoped lang="scss"></style>