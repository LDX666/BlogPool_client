<template>
    <el-menu router :default-active="默认打开的标签">
      <el-sub-menu :index="code.code_id.toString()" v-for="code in data" :disabled="!code.series.length">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>{{ code.代号名称 }}</span>
        </template>
        <el-menu-item :index="`/home/intel/${series.series_id}`"
          v-for="series in code.series">{{ series.系列名称 }}</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </template>
  
  <script setup>
  import { GetAside } from "@/api/User";
  import { onMounted, ref } from 'vue';
  import { onBeforeRouteUpdate } from "vue-router";
  
  
  const 默认打开的标签 = ref('/home/intel/47')
  const data = ref([])
  
  const change = async () => {
    const res = await GetAside(2)
    data.value = res.data
    //console.log(res.data);
  }
  change()
  
  onBeforeRouteUpdate((to, from) => {
    默认打开的标签.value = to.path
    //console.log('路由跳转,目的地', to.path);
    //console.log('路由跳转,原来地址', from.path);
  
  })
  </script>
  
  <style lang="scss" scoped></style>
  