<template>
    <div class="userbody">
        <div class="box">
            <h1 class="标题">处理器数据库</h1>
            <img src="https://versus.com/img/versus.svg" alt="versus logo" style="margin-bottom: 30px;">
            <el-autocomplete placeholder="请输入想要查询的处理器名称" v-model="输入框内容" :fetch-suggestions="获取输入建议的方法"
             style="width: 500px;"   @select="点击建议跳转路由" />
        </div>

    </div>

</template>

<script setup>
import svg from "@/assets/svg.png";
import { onMounted, ref } from "vue";
import { GetHomeQuery } from "@/api/User";
import { useRouter } from "vue-router";

const router = useRouter()
const 输入框内容 = ref()
const 建议内容 = ref([])
const 获取输入建议的方法 = (获取内容, 执行方法) => {
    //第一步，将从后端获取的数据做一个备份，方便查询
    const 内容列表 = 建议内容.value
    //第二步，构造一个查询
    const 返回值 = 获取内容
        //filter 返回一个相关的数组   toLowerCase()是将字符串处理一下，大小写  indexOf是获取对应的元素的下表，没有找到就返回-1
        ? 内容列表.filter(item => (item.value.toLowerCase().indexOf(获取内容.toLowerCase()) != -1))
        //找到了就返回filter的值，没找到就返回内容列表
        : 内容列表
    执行方法(返回值)
}


const 点击建议跳转路由 = (item) => {
    router.push(`/home/detail/${item.link}`)
}

onMounted(async () => {
    const res = await GetHomeQuery()
    建议内容.value = res.data

})

</script>

<style lang="scss">
.userbody {
    //margin-top: 60px;
    height: calc(100vh - 76px);
    background: radial-gradient(ellipse 120% 210% at 95% 0, #531889 10%, #000 70%);

    .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 50px;
        width: 100%;
        margin: 0 auto;

        .标题 {
            color: #fff;
            /* justify-content: center; */
            width: 90%;
            text-align: center;
            font-size: 6rem;
            margin-top: 30px;
            margin-bottom: 20px;
        }
    }
}
</style>
