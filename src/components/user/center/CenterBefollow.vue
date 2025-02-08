<template>
    <div class="itembox" v-for="item in 关注数据" v-if="关注数据.length">
        <img class="box_img" :src="`${url}/${item.userurl}`" >
        <div class="box_main">
            <div class="item_name">{{ item.account }}</div>
            <div class="item_introduce">{{ item.user_introduce }}</div>
        </div>
        <el-button type="success" @click="关注(item)" :plain="!item.is_follow" class="box_button">{{ item.is_follow ?'已关注':'关注' }}</el-button>
    </div>
    <div v-else>该用户没有这方面的数据</div>
</template>

<script setup>
import { GetCenterBefollow, PostFollow } from "@/api/user/Center";
import { onMounted, ref } from "vue";
import { url } from "@/config";
import { useCounterStore } from "@/stores/counter";

//这是当前用户的id
const store = useCounterStore()   //实例化 
const user_id = store.权限.用户id //获取用户id

//1.从父组件中获取用户id
const props = defineProps({
    user_id: Number
})
//2.获取关注数据
const 关注数据 = ref([])



//3.1关注功能
const 关注 = async(item)=>{
    const res = await PostFollow(user_id,item.follower)
    item.is_follow = res.data
    console.log('关注状态：',res.data);
}

//初始化数据,获取关注数据的基础数据
const change = async () => {
    const res = await GetCenterBefollow(props.user_id)
    关注数据.value = res.data
    console.log('这是粉丝数据:',关注数据.value);
}
onMounted(()=>{change()})
</script>

<style lang="scss" scoped>
.itembox{
    display: flex;
    align-items: center;
    min-height: 84px;
    padding: 6px 9px;
    border-bottom: 1px solid rgba(228, 230, 235, 0.5);
    .box_img{
        flex: 0 0 auto;
        margin-right: 20px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        object-fit: cover;
    }
    .box_main{
        flex: 1 1 auto;
        min-width: 0;
        .item_name{
            color: #2e3135;
            font-size: 16px;
            font-weight: 600;
            max-width: 128px;
            display: inline-block;
            vertical-align: top;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .item_introduce{
            margin-top: 7.2px;
            font-size: 12px;
            font-weight: 500;
            color: #b9c0c8;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .box_button{
        font-size: 12px;
        margin-left: 12px;
        padding: 0px;
        flex: 0 0 auto;
        border: 1px solid #92c452;
        width: 90px;
        height: 30px;
    }
}
</style>
