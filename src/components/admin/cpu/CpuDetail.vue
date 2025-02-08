<template>
    <h3 style="text-align: center;">这是{{ props.传给子组件的值.name }}的详细数据</h3>
  <el-descriptions  border :column="4" direction="vertical" style="justify-content: center;">
    <!-- 一,基础数据 -->
    <!-- 1.有必要保留的数据 -->
    <el-descriptions-item label="这是基础数据" :span="4" align="center">
      <el-descriptions border :column="4">
        <el-descriptions-item label="处理器名称" align="center">{{ 表格数据.处理器名称 || '无' }}</el-descriptions-item>
        <el-descriptions-item label="内核数" align="center">{{ 表格数据.内核数 || '无' }}</el-descriptions-item>
        <el-descriptions-item label="总线程数" align="center">{{ 表格数据.总线程数 || '无' }}</el-descriptions-item>
        <el-descriptions-item label="缓存" align="center">{{ 表格数据.缓存 || '无' }}</el-descriptions-item>
        <el-descriptions-item label="光刻" align="center">{{ 表格数据.光刻 || '无' }}</el-descriptions-item>
        <el-descriptions-item label="发行日期" align="center">{{ 表格数据.发行日期 || '无' }}</el-descriptions-item>
        <el-descriptions-item label="所属系列" align="center">{{ 系列名称 || '无' }}</el-descriptions-item>
        <el-descriptions-item label="支持的插槽类型" align="center">{{ 表格数据.支持的插槽类型 || '无' }}</el-descriptions-item>
        <el-descriptions-item label="TDP" align="center">{{ 表格数据.TDP || '无' }}</el-descriptions-item>
        <el-descriptions-item label="处理器基本功耗" align="center">{{ 表格数据.处理器基本功耗 || '无' }}</el-descriptions-item>
        <el-descriptions-item label="处理器最大功耗" align="center">{{ 表格数据.处理器最大功耗 || '无' }}</el-descriptions-item>
        <el-descriptions-item></el-descriptions-item>
        <!-- 2.可以省略的数据 -->
        <el-descriptions-item :span="2" label="性能核数据" align="center">
          <el-descriptions border direction="vertical">
            <el-descriptions-item label="性能核数" align="center">{{ 表格数据.性能核数 || '无' }}</el-descriptions-item>
            <el-descriptions-item label="性能核基本频率" align="center">{{ 表格数据.性能核基本频率 || '无' }}</el-descriptions-item>
            <el-descriptions-item label="性能核最大频率" align="center">{{ 表格数据.性能核最大睿频频率 || '无' }}</el-descriptions-item>
          </el-descriptions>
        </el-descriptions-item>
        <el-descriptions-item :span="2" label="能效核数据" align="center">
          <el-descriptions border direction="vertical">
            <el-descriptions-item label="能效核数" align="center">{{ 表格数据.能效核数 || '无' }}</el-descriptions-item>
            <el-descriptions-item label="能效核基本频率" align="center">{{ 表格数据.能效核基本频率 || '无' }}</el-descriptions-item>
            <el-descriptions-item label="能效核最大频率" align="center">{{ 表格数据.能效核最大睿频频率 || '无' }}</el-descriptions-item>
          </el-descriptions>

        </el-descriptions-item>
      </el-descriptions>
    </el-descriptions-item>

    <!-- 二,内存 -->
    <el-descriptions-item :span="2" label="内存数据" >
      <el-descriptions border :column="1">
        <el-descriptions-item label="内存类型" >{{ 表格数据.内存类型 || '无' }}</el-descriptions-item>
        <el-descriptions-item label="最大内存通道数" >{{ 表格数据.最大内存通道数 || '无' }}</el-descriptions-item>
        <el-descriptions-item label="是否支持ecc内存" >{{ 表格数据.支持ECC内存 || '无' }}</el-descriptions-item>
        <el-descriptions-item label="最大内存容量" >{{ 表格数据.最大内存容量 || '无' }}</el-descriptions-item>
      </el-descriptions>
    </el-descriptions-item>

    <!-- 三,显卡 -->
    <el-descriptions-item :span="2" label="核显数据" >
      <el-descriptions border :column="1">
        <el-descriptions-item label="核显名称" >{{ 表格数据.核显名称 || '无' }}</el-descriptions-item>
        <el-descriptions-item label="显卡基本频率" >{{ 表格数据.显卡基本频率 || '无' }}</el-descriptions-item>
        <el-descriptions-item label="显卡最大频率" >{{ 表格数据.显卡最大加速频率 || '无' }}</el-descriptions-item>
        <el-descriptions-item label="支持的显示器数量" >{{ 表格数据.支持的显示器数量 || '无' }}</el-descriptions-item>
      </el-descriptions>
    </el-descriptions-item>
  </el-descriptions>

</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue';
import { GetCpuDetail } from '@/api/Cpu.js';
const props = defineProps({  //这是子组件获取父组件传递的值
    传给子组件的值: Object,
})
console.log('这是子组件获得的值:',props.传给子组件的值);

const 表格数据 = ref({})
const 系列名称 = ref()


onMounted(async() => {
    const res = await GetCpuDetail(props.传给子组件的值.id)  //根据父组件传递的id值获取总数据
        表格数据.value = res.data[0]                               //获取表格数据
        系列名称.value = res.系列名称[0].系列名称
        console.log('这是组件钩子的id值', props.传给子组件的值.id);
        console.log('这是表格数据:',表格数据.value );
        console.log('这是后端传过来的值',res.data[0]);
})
</script>

<style lang="scss">
.box {
    // width: 900px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* 创建两列，每列宽度相等 */
    grid-gap: 10px;
    /* 设置网格项之间的间隙 */

    .center {
        text-align: center;
    }
}
</style>
