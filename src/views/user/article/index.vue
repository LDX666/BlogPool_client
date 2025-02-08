<template>
    <div class="artclebox">
        <ArticleAside/>
        <RouterView :key="$route.fullPath"/>
    </div>
</template>

<script setup>
import ArticleAside from '@/components/user/aside/ArticleAside.vue';



</script>

<style lang="scss" >
.artclebox{
    max-width: 1200px;
    min-height: calc(100vh - 76px - 1.66rem);
    margin: 0 auto;
    margin-top: 1.66rem;
    display: flex;
    flex-direction: row;
}
</style>
