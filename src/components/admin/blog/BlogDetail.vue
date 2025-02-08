<template>
    <el-scrollbar height="578px">
        <div style="margin: 20px;">
            <h1 style="text-align: center;">{{ props.传给子组件的值.title }}</h1>
            <div style="display: flex;justify-content: space-evenly;">
                <span>作者： {{ props.传给子组件的值.account }}</span>
                <span>上传时间： {{ props.传给子组件的值.create_time.split('T')[0] || '无' }}</span>
                <span>文章类型： {{ props.传给子组件的值.name }}</span>
            </div>
            <p>{{ props.传给子组件的值.introduce }}</p>
            <div v-html="props.传给子组件的值.blog_content" class="blog-box"></div>
        </div>
    </el-scrollbar>
</template>

<script setup>
const props = defineProps({
    传给子组件的值: Object
})
</script>

<style>
.blog-box img{
    max-width: 100% !important;
}
</style>
