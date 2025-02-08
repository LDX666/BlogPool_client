<template>
    <div class="mainbox">
        <CenterAsdie/>
        <RouterView/>
    </div>

</template>

<script setup>
import CenterAsdie from "@/components/user/center/CenterAside.vue"
</script>

<style lang="scss" scoped>
.mainbox{
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    margin-top: 24px;
    padding-bottom: 24px;

}
</style>
