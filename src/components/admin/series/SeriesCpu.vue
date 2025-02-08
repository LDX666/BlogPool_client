<template>
    <!-- 一 这是标题组件 -->
        <h3 style="text-align: center;">{{ props.传给子组件的值.name }} 对应的CPU数据</h3>
    <!-- 二 这是表格组件 -->
    <el-table border :data="表格数据.slice((page - 1) * limit, page * limit)" style="width: 100%  ">
        <!-- label="自定义的名称" prop="对应的参数名称" -->
        <el-table-column label="id" prop="cpu_id" />
        <el-table-column label="处理器名称" prop="处理器名称" />
        <el-table-column label="内核数" prop="内核数" />
        <el-table-column label="总线程数" prop="总线程数" />
        <el-table-column label="缓存" prop="缓存" />
        <el-table-column label="TDP" prop="TDP" />
        <el-table-column label="发行日期" prop="发行日期" />
        <!-- 这是最后一列表格的内容 -->
    </el-table>
    <!-- 三 这是分页组件 -->
    <el-pagination v-model:current-page="page" v-model:page-size="limit" :page-sizes="[10, 20, 50, 100]" background
        layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top: 20px;justify-content: center;" />
</template>

<script setup>
import { GetSeriesCpu } from "@/api/Series"
import { onMounted, ref, defineProps } from "vue";

const props = defineProps({  //这是子组件获取父组件传递的值
    传给子组件的值:Object,
})



const 表格数据 = ref([])         //1.这是表格数据
const total = ref()             //2.表示当前总数据是多少
const page = ref(1)             //3.表示当前第几页,默认为1
const limit = ref(10)           //4.表示当前每页有多少数据量,默认为10,看你的数组设置的多少


onMounted(async() => {
        const res = await GetSeriesCpu(props.传给子组件的值.id)  //根据父组件传递的id值获取总数据
        表格数据.value = res.data                                //获取表格数据
        total.value = res.total                                 //获取表格总数据量
        console.log('这是组件钩子的id值', props.传给子组件的值.id);
        console.log(系列名称.value);
})


</script>

<style lang="scss"></style>
