<template>
    <v-chart :option="option" autoresize />
</template>

<script setup>

import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, } from 'echarts/components';
import VChart from 'vue-echarts';
import { ref, provide, onMounted } from 'vue';
import { text2 } from "@/api/Home.js"; //获取数据的接口
use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
]);

provide('dark');

const 数据 = ref([])



const option = ref({
    title: {
        text: '每个类型文章数量占比图',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
    },
    series: [
        {
            name: '详细数据',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                { value: 335, name: 'Direct' },
                { value: 310, name: 'Email' },
                { value: 234, name: 'Ad Networks' },
                { value: 135, name: 'Video Ads' },
                { value: 1548, name: 'Search Engines' },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
});

onMounted(async()=>{
    const res = await text2()
    数据.value = res.data
    option.value.legend.data = 数据.value.map((item) => item.类型名) //使用map获取一个只有name属性的数组,并返回给图标
    option.value.series[0].data = 数据.value.map((item) => ({ value: item.数据量, name: item.类型名 }))
})
</script>

<style scoped></style>