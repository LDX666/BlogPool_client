<template>
    <div class="card-list">
        <div class="card" v-for="item in data" @click="跳转到详情页(item.cpu_id)">
            <img src="../../../assets/intel/ix.webp" alt="处理器图片" class="card-img">
            <div class="card-text">
                <p style="text-align: center;">{{ item.处理器名称 }}</p>
                <div class="card-text-body">
                    <div class="card-text-body-item">
                        <el-tooltip content="这是处理器内核数量" placement="top" effect="light">
                            <el-icon><School /></el-icon>
                        </el-tooltip>
                        <span style="margin-left: 5px;">{{ item.内核数 }}</span>
                    </div>
                    <div class="card-text-body-item">
                        <el-tooltip content="这是处理器的总线程数量" placement="top" effect="light">
                            <el-icon><OfficeBuilding /></el-icon>
                        </el-tooltip>
                        <span style="margin-left: 5px;">{{ item.总线程数 }}</span>
                    </div>
                    <div class="card-text-body-item">
                        <el-tooltip content="这是处理器的三级缓存" placement="bottom" effect="light">
                            <el-icon><Help /></el-icon>
                        </el-tooltip>
                        <span style="margin-left: 5px;">{{ item.缓存 }}</span>
                    </div>
                    <div class="card-text-body-item">
                        <el-tooltip content="这是官方的散热参考功耗" placement="bottom" effect="light">
                            <el-icon><Location /></el-icon>
                        </el-tooltip>
                        <span style="margin-left: 5px;">{{ item.TDP }}</span>
                    </div>
                    <div class="card-text-body-item">
                        <el-tooltip content="这是发行日期" placement="bottom" effect="light">
                            <el-icon><Timer /></el-icon>
                        </el-tooltip>
                        <span style="margin-left: 5px;">{{ item.发行日期 }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()
const data = ref([])

const series_id = route.params.id
console.log(series_id);
const 请求 = async () => {
    const res = await axios.get('http://localhost:3000/api/select/UserSeriesCpu', { params: { series_id:47 } })
    data.value = res.data.data
}
请求()

const 跳转到详情页 = (cpu_id)=>{
    console.log('我是点击跳转时触发的,id为:',cpu_id); 
    router.push(`/home/detail/${cpu_id}`)
}
</script>

<style lang="scss" scoped>
.card-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    .card {
        background-color: #FFFFFF;
        max-height: 650px;
        min-height: 120px;
        border-radius: .5rem;
        padding: 10px 8px;
        cursor: pointer;
        display: grid;
        grid-template-columns: 1fr 3fr;
        gap: 0 10px;
        border: 1px solid #e7e8e7;

        .card-img {
            width: 100px;
            height: 100px;
            max-width: 100%;
            max-height: 100%;
            object-fit: fill;
            align-self: center;
            justify-self: center;
        }

        .card-text {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
            height: 100%;

            .card-text-body {
                display: grid;
                grid-template-columns: repeat(3, 1fr);

                .card-text-body-item {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
}
</style>
