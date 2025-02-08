<template>
    <v-chart :option="option" autoresize />
</template>

<script setup>

import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent,GridComponent  } from 'echarts/components';
import VChart from 'vue-echarts';
import { ref, provide, onMounted } from 'vue';

import { text1 } from "@/api/Home";

use([
    CanvasRenderer,
    BarChart,
    TitleComponent,
    TooltipComponent,
    GridComponent 
]);

provide('dark');

//对表的数据进行替换
const 数据 = ref([])

const option = ref({
    title: {
        text: '近一周用户增长柱状图',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>用户增长数：{c} ',
    },
    xAxis: {
        type: 'category',
        data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '具体数据',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }
    ]
});


onMounted(async()=>{
    const res = await text1()
    数据.value = res.data
    option.value.xAxis.data = 数据.value.map((item)=>item.时间)
    option.value.series[0].data = 数据.value.map((item) => item.数据量)
})

</script>

<style scoped></style>