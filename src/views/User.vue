<template>
    <div style="background-color: #f6f7fb;min-height: calc(100vh - 16px);">
        <el-affix>
            <UserHeader />
        </el-affix>
        <UserMain />
    </div>


</template>

<script setup>
import UserHeader from '@/components/user/UserHeader.vue';
import UserMain from '@/components/user/UserMain.vue';

</script>

<style lang="scss"></style>
