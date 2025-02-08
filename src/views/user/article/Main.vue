<template>
    <div class="box">
        <div class="box-main" >
            <div v-for="item in 文章数据" class="card-list" @click="跳转到文章详情页(item)" >
                <div class="card">
                    <div class="card-main">
                    <div class="item1">{{ item.title }}</div>
                    <div class="item2">{{ item.introduce }}</div>
                    <div class="item3">
                        <span class="item3_left">{{ item.account }} |</span>
                        <span><el-icon><View /></el-icon>{{ item.visits }}</span>
                        <span class="item3_right">{{ item.name }}</span>
                        
                    </div>
                </div>
                <img :src="`${url}/${item.blog_img}`" class="card-img">
                </div>

            </div>
        </div>

        <div class="box-right">
            <div class="item1">
                <div class="item1-1">
                    <div class="item1-1-left">
                        <span class="item1-1-left-1">右边的内容</span>
                        <div class="item1-1-left-2">点亮在社区的每一天</div>
                    </div>
                    <el-button type="primary" icon="Edit" size="small" @click="跳转到写文章页面">写文章</el-button>
                </div>
            </div>
            <div class="item2">
                其他的数据
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { GetTypeBlog } from "@/api/user/Blog.js";
import { onMounted, ref } from "vue";
import { url } from "@/config.js";

const 文章数据 = ref()
const route = useRoute()     //用来获取路由传递的参数
const router = useRouter()   //用来跳转路由的


const 跳转到写文章页面 = ()=>{router.push('/home/center/editblog')}
const 跳转到文章详情页 = (item)=>{
    console.log('打印一下点击的时候获取的数据',item.blog_id);
    router.push(`/home/blogdetail/${item.blog_id}`)
}

onMounted(async () => {
    const res = await GetTypeBlog(route.params.id)
    文章数据.value = res.data
    console.log('文章数据:',文章数据.value);
})
</script>

<style lang="scss" scoped>
.box {
    margin: 0 auto;
    display: grid;
    width: 100%;
    grid-template-columns: 3fr 1fr;
    .box-main {
        border-radius: 2px;
        width: 720px;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        .card-list {
            transition: all .3s ease-in;
            cursor: pointer;
            background: #fff;
            padding: 12px 20px 0;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            &:hover{
                background-color: #ecf5ff;
            }
            .card{
                display: flex;
                padding-bottom: 12px;
                border-bottom: 1px solid rgba(228,230,235,0.5);
                width: 100%;
                .card-main{
                    flex: 1 1 auto;
                    .item1{
                        margin-bottom: 2px;
                        font-weight: 600;
                        font-size: 16px;
                        line-height: 24px;
                        color: #252933;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                    }
                    .item2{
                        margin-bottom: 4px;
                        font-weight: 400;
                        color: #8a919f;
                        font-size: 13px;
                        line-height: 22px;
                        display: -webkit-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                    }
                    .item3{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        flex-wrap: wrap;
                        .item3_left{
                            font-size: 13px;
                            line-height: 20px;
                            color: #8a919f;
                            flex-shrink: 0;
                        }
                        .item3_right{
                            max-width: 65px;
                            background-color: #f2f3f5;
                            padding: 0 6px;
                            border-radius: 2px;
                            max-width: 76px;
                            box-sizing: border-box;
                            margin-left: 6px;
                            color: #8a919f;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            min-height: 18px;
                            line-height: 18px;
                        }
                    }

                }
                .card-img {
                flex: 0 0 auto;
                width: 108px;
                height: 72px;
                margin-left: 24px;
                background-color: #fff;
                border-radius: 4px;
                border: 1px solid rgba(228, 230, 235, 0.5);
            }
            }

        }
    }


    .box-right {
        .item1{
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
            border-radius: 2px;
            margin-bottom: 1.66rem;
            font-size: 1.16rem;
            line-height: 1.29;
            border-radius: 4px;
            color: #252933;
            .item1-1{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                .item1-1-left{
                    display: flex;
                    flex-direction: column;
                    .item1-1-left-1{
                        color: #252933;
                        font-size: 16px;
                        font-weight: 600;
                        line-height: 24px;
                    }
                    .item1-1-left-2{
                        color: #8a919f;
                        font-size: 12px;
                        font-weight: 400;
                        line-height: 24px;
                        margin-top: 2px;
                    }
                }
            }
        }
        
    }
}
</style>
