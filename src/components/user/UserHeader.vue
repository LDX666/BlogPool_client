<template>
    <div class="userheader">
        <div style="padding: 0 10vh;">
            <el-menu :default-active="默认打开的菜单" mode="horizontal" :ellipsis="false" router background-color="#00000000"
                text-color="#fff" active-text-color="#0fe95c">
                <el-menu-item index="/">
                    <img src="../../assets/灰底白字.png" style="height: 36px;">
                </el-menu-item>
                <!-- <el-menu-item index="/home/intel"><span>英特尔</span></el-menu-item>
                <el-menu-item index="/home/amd"><span>Amd</span></el-menu-item> -->
                <el-menu-item index="/home/center"><span>个人中心</span></el-menu-item>
                <el-menu-item index="/home/article/1"><span>首页</span></el-menu-item>
                <div class="flex-grow" />
                <el-sub-menu index="#" popper-class="menu">
                    <template #title><el-avatar :src="`${url}/${权限管理.权限.图片地址}`" /></template>
                    <el-menu-item disabled>{{ 权限管理.权限.名称 }}</el-menu-item>
                    <el-menu-item index="/home/center">个人中心</el-menu-item>
                    <el-menu-item index="/" @click="注销账号">注销</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>

    </div>

</template>

<script setup>
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { useCounterStore } from "@/stores/counter";
import { url } from "@/config";
import { onMounted,ref } from "vue";

const 默认打开的菜单 = ref("/home/article/1")
onBeforeRouteUpdate((to, from)=>{默认打开的菜单.value = to.path})

const 权限管理 = useCounterStore()
console.log('这是用户权限:',权限管理.权限.名称);
const 注销账号 = ()=>{
    console.log('我注销了账号');
    权限管理.权限.状态 = '游客'
    权限管理.权限.用户id = 0
    //router.push('/')
}


</script>

<style lang="scss">
.el-menu--horizontal.el-menu {
    border-bottom: 0;
}

.menu {
    background-color: #c73a3a;
}

.userheader {
    height: 60px;
    background: #161616;
    //position: fixed;
    top: 0;
    transition: transform .2s cubic-bezier(.55, .06, .68, .19), background-color .5s;
    width: 100%;

    .flex-grow {
        flex-grow: 1;
    }
}
</style>
