<template>
    <div class="warp">
        <AdminView class="item"></AdminView>
        <PieChart class="item" ></PieChart>
        <BarChart class="item" ></BarChart>
        <LineChart class="item" ></LineChart>
    </div>
</template>

<script setup>
import AdminView from "@/components/admin/home/AdminView.vue";
import PieChart from "@/components/admin/home/PieChart.vue";
import BarChart from "@/components/admin/home/BarChart.vue";
import LineChart from "@/components/admin/home/LineChart.vue";
</script>

<style lang="scss" scoped >
.warp{
    // display: flex;
    // flex-wrap: wrap;
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 创建两列，每列占用等量的空间 */  
    grid-template-rows: repeat(2, 1fr); /* 创建两行，每行占用等量的空间 */  
    box-shadow: var(--el-box-shadow-light);
    .item{
        width: 100%;
        height: calc((100vh - 120px) / 2);
        min-height: 300px;
        //padding: 20px;
        border: 1px solid #f5f5f5;
    }
}
</style>
