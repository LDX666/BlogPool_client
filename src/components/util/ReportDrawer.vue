<template>
    <el-drawer v-model="抽屉状态" title="举报详情数据" >
        <el-table border :data="抽屉数据.slice((page - 1) * limit, page * limit)" style="width: 100%  ">
            <el-table-column label="用户id" prop="user_id" width="60"/>
            <el-table-column label="头像" prop="userurl" width="75">
            <template #default="scope">
                <!-- scope 会把这一行的数据都转化成字符串,所以直接调用属性,全选会出问题,渲染的时候 -->
                <el-image style="width: 50px; height: 50px" :src="`${url}/${scope.row.userurl}`" :initial-index="0" fit="cover" />
            </template>
            </el-table-column>
            <el-table-column label="用户名" prop="account" />
            <el-table-column label="举报原因" prop="content" />
        </el-table>
        <el-pagination v-model:current-page="page" v-model:page-size="limit" :page-sizes="[5,10, 20, 50, 100]" background
        layout="total, sizes, prev, pager, next, jumper" :total="抽屉数据.length"
        style="margin-top: 20px;justify-content: center;" />
    </el-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { url } from "@/config";

const 抽屉状态 = defineModel('抽屉状态')
const 抽屉数据 = defineModel('抽屉数据')

console.log('父组件数据1',抽屉状态.value);
console.log('父组件数据2',抽屉数据.value);


//分页部分
const page = ref(1)         //表示当前第几页,默认为1
const limit = ref(5)       //表示当前每页有多少数据量,默认为10,看你的数组设置的多少
</script>

<style lang="scss" scoped>

</style>
