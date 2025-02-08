<template>
    <div class="artclebox-aside">
        <el-menu router :default-active="默认打开的标签" style="border-radius: 6px;">
            <el-menu-item :index="`/home/article/${blogtype.type_id}`" v-for="blogtype in data">
                {{ blogtype.name }}
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script setup>
import { GetBlogAside } from "@/api/user/Blog.js";
import { ref } from "vue";
import { onBeforeRouteUpdate ,useRouter} from "vue-router";

const 默认打开的标签 = ref('')
const data = ref([])
const router = useRouter()
const change = async()=>{
    const res = await GetBlogAside()
    data.value = res.data
    //第一次打开页面,默认地址对的,但是不会跳转路由,所以需要手动跳转
    默认打开的标签.value = '/home/article/1'
    router.push('/home/article/1')
}
change()

onBeforeRouteUpdate((to, from) => {//当路由变化是触发
  默认打开的标签.value = to.path
  //console.log('路由跳转,目的地', to.path);
  //console.log('路由跳转,原来地址', from.path);

})
</script>

<style lang="scss" >
.artclebox-aside{
    width: 180px;
    min-width: 180px;
    margin-right: 20px;
    overflow-x: hidden;
    
}
</style>
