<template>
  <v-chart :option="option" autoresize />
</template>

<script setup>

import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import { ref, provide, onMounted} from 'vue';
import { text1 } from "@/api/Home";

const 数据 = ref([])

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent
]);

provide('dark');


const option = ref({
  title: {
    text: '用户增长折线图',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>用户增长数：{c} ',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name:'详细数据',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {}
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