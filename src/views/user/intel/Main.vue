<template>
    <div class="card-list" v-if="页面数据.length > 0">
        <div class="card" v-for="item in 页面数据" @click="跳转到详情页(item.cpu_id)">
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
    <div v-else>
        <h1 style="text-align: center;">这个系列暂时没有添加处理器数据</h1>
        <h1 style="text-align: center;">请联系管理员进行添加</h1>
    </div>
</template>

<script setup>
import { GetUserSeriesCpu } from "@/api/User";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()
const 页面数据 = ref([])

const series_id = route.params.id //这是获取路由传过来的数据,值id是系列id
//console.log('这是系列id',series_id);

const 跳转到详情页 = (cpu_id)=>{
    //console.log('我是点击跳转时触发的,id为:',cpu_id); 
    router.push(`/home/detail/${cpu_id}`)
}

onMounted(async()=>{
    const res = await GetUserSeriesCpu(series_id)
    页面数据.value = res.data
    //console.log('页面一开始加载的数据:',页面数据.value);
})
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
