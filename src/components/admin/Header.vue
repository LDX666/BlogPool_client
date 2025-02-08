<template>
    <el-menu router mode="horizontal" :ellipsis="false" active-text-color="#ffd04b" background-color="#545c64"
        text-color="#fff">
        <el-menu-item index="/" style="padding: 0;border: 0;">
            <img style="height: 100%;" src="../../assets/灰底白字.png" alt="logo" />
        </el-menu-item>
        <div class="flex-grow" />

        <el-sub-menu >
            <template #title><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /></template>
            <el-menu-item disabled >管理员账号</el-menu-item>
            <el-menu-item @click="注销账号" >注销</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useCounterStore } from "@/stores/counter";
import { ref } from "vue";
const router = useRouter()
const 用户状态 = useCounterStore()

const 注销账号 = ()=>{
    console.log('我注销了账号');
    用户状态.权限.状态 = '游客'
    router.push('/')
}
</script>

<style lang="scss">
.flex-grow {
    flex-grow: 1;
}
</style>
