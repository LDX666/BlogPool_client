<template>
<el-affix :offset="84" style="width: 200px; height: 0;">
    <el-menu class="aside" router :default-active="默认打开的菜单">
        <el-menu-item index="/home/center/editblog">
            <el-icon><EditPen /></el-icon> 
            <span>写文章</span>
        </el-menu-item>
        <el-menu-item index="/home/center">
            <el-icon><HomeFilled /></el-icon>
            <span>个人中心</span>
        </el-menu-item>
        <el-menu-item index="/home/center/blog">
            <el-icon><Menu /></el-icon>
            <span>文章管理</span>
        </el-menu-item>
        <el-menu-item index="/home/center/personal">
            <el-icon><UserFilled /></el-icon>
            <span>个人资料</span>
        </el-menu-item>
</el-menu>
</el-affix>
</template>

<script setup>
import { ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

//菜单随着路由的打开而变化
const 默认打开的菜单 = ref("/home/center")
onBeforeRouteUpdate((to, from)=>{默认打开的菜单.value = to.path})
</script>

<style lang="scss" scoped>
.aside{
    border-radius: 4px;
    width: 200px;
    bottom: 0;
    overflow: hidden;
    margin-bottom: 24px;
    padding: 12px 0;
}
</style>
