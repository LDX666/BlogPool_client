<template>
    <div class="admin_router">
        我是文章管理页面
        <hr>
        <el-button type="primary" :icon="Search" @click="打开抽屉">Search</el-button>
        <el-drawer v-model="抽屉状态" title="举报详情数据" >
            <span>Hi there!</span>
        </el-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue';


const 抽屉状态 = ref(false)
const 打开抽屉 = ()=>{
    抽屉状态.value = true
}
</script>

<style lang="scss"></style>
