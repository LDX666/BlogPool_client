<template>
    <div id="adminview">
        <div class="adminbox">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <span class="adminbox-text">你好,管理员</span>
        </div>
        <div class="viewbox">
            <div class="list" v-for="item in data">
                <span class="item">{{ item.类型名 }}</span>
                <span class="item">{{ item.数据量 }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { text2 } from "@/api/Home.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";



const data = ref([])
const data2 = ref([ //这是死数据,自己编的
    {name:'访问数据',number:888},
    {name:'其他数据',number:999},
    {name:'位置数据',number:777},
    {name:'未知数据',number:666}
])
const router = useRouter()

const change = (path)=>{ //点击跳转到对应的路由
    console.log(path);
    router.push(`${path}`)
}

onMounted(async()=>{ //获取数据
    const res = await text2()
    data.value = res.data
})
</script>

<style lang="scss" scoped>
#adminview {
    .adminbox {
        padding: 20px;
        display: flex;
        align-items: center;

        .adminbox-text {
            margin-left: 15px;
        }
    }

    .viewbox {
        padding: 0 10px;
        display: flex;

        .list {
            padding: 10px;
            margin: 5px;
            border-radius: 10px;
            border: 1px solid #8a8484;
            display: flex;
            flex-direction: column;
            width: 22%;
            justify-content: center;
            align-content: center;
            flex-wrap: wrap;
            &:hover{
                box-shadow: var(--el-box-shadow-light);
            }
            

            .item {
                text-align: center;
                margin: 5px;
            }

        }
    }
}
</style>
