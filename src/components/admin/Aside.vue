<template>
  <el-menu router :default-active="defaultActive" active-text-color="#ffd04b" background-color="#545c64" text-color="#fff"
    >

    <el-menu-item index="/admin/home">
      <el-icon>
        <HomeFilled />
      </el-icon>
      <span>首页</span>
    </el-menu-item>
<!-- 
    <el-menu-item index="/admin/usermanage">
      <el-icon><Avatar /></el-icon>
      <span>用户管理</span>
    </el-menu-item> -->
    <el-menu-item index="/admin/user">
      <el-icon><Avatar /></el-icon>
      <span>用户管理</span>
    </el-menu-item>
    <!-- <el-menu-item index="/admin/code">
      <el-icon>
        <ElementPlus />
      </el-icon>
      <span>代号管理</span>
    </el-menu-item>

    <el-menu-item index="/admin/series">
      <el-icon>
        <Management />
      </el-icon>
      <span>系列管理</span>
    </el-menu-item>

    <el-menu-item index="/admin/detail">
      <el-icon>
        <Cpu />
      </el-icon>
      <span>处理器管理</span>
    </el-menu-item> -->
    <!-- 这是后台管理系统,不需要缩放 -->
    <el-menu-item index="/admin/blogtype">
      <el-icon><FolderAdd /></el-icon>
      <span>文章类型管理</span>
    </el-menu-item>
    <el-menu-item index="/admin/blog">
      <el-icon><Edit /></el-icon>
      <span>文章管理</span>
    </el-menu-item>
    <el-menu-item index="/admin/audit">
      <el-icon><Management /></el-icon>
      <span>文章审核管理</span>
    </el-menu-item>
    <el-sub-menu index="#">
      <template #title>
        <el-icon><location /></el-icon>
        <span>举报管理</span>
      </template>
      <el-menu-item index="/admin/report_blog">
        <el-icon><FolderAdd /></el-icon>
        <span>文章举报管理</span>
      </el-menu-item>
      <!-- <el-menu-item index="/admin/report_comment">
        <el-icon><Edit /></el-icon>
        <span>评论举报管理</span>
      </el-menu-item> -->
  </el-sub-menu>
  </el-menu>

</template>

<script setup>
import { ref } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";

const router = useRouter()

const defaultActive = ref("/admin/home")

onBeforeRouteUpdate((to, from) => {
  defaultActive.value = to.path
  console.log('路由跳转,目的地', to.path);
  console.log('路由跳转,原来地址', from.path);

})


</script>

<style lang="scss"></style>
