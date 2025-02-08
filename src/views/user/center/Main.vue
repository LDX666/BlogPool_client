<template>
    <div class="box">
        <div class="box_header">
            <div class="box_header_left">文章</div>
            <div class="box_header_right"><el-input v-model="input" placeholder="搜索文章" suffix-icon="Search" /></div>
        </div>
        <div class="title">
            <span class="title_item">全部({{文章数据.length}})</span>
        </div>
        <!-- 这是文章部分的盒子 -->
        <div class="box_body" v-for="item in 文章数据" @click="跳转到文章页面(item)" >
            <div class="item" v-if="item.state===1">
                <!-- 上面部分 -->
                <div class="item_1">
                    <div class="item_1_left">{{item.title}}</div>
                    <!-- 下拉菜单 里面有编辑和删除文章 -->
                    <el-dropdown>
                        <el-icon class="icon">
                            <MoreFilled />
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="编辑文章(item)">编辑</el-dropdown-item>
                                <el-dropdown-item @click="删除文章(item)">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <!-- 下面部分 -->
                <div class="item_2">
                    <span>{{ item.create_time.split('T')[0] }}</span>
                    <span style="height: 14px;width: 0;border-left: 1px solid #e5e6eb;margin: 0 16px;"></span>
                    <span>{{ item.visits }} 阅读</span>
                    <span style="margin: 0 6px;">·</span>
                    <span>{{ item.likes }} 点赞</span>
                    <span style="margin: 0 6px;">·</span>
                    <span>{{ item.comment }} 评论</span>
                    <span style="margin: 0 6px;">·</span>
                    <span>{{ item.collect }} 收藏</span>
                </div>
            </div>
            <div class="item" v-else-if="item.state===0">
                <div class="item_1">
                    <div class="item_1_left" style="color: #86909c;">该文章正在审核中</div>
                    <el-dropdown>
                        <el-icon class="icon">
                            <MoreFilled />
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="编辑文章(item)">编辑</el-dropdown-item>
                                <el-dropdown-item @click="删除文章(item)">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <div class="item" v-else-if="item.state===2">
                <div class="item_1">
                    <div class="item_1_left" style="color: red;">该文章已被举报下架</div>
                    <el-dropdown>
                        <el-icon class="icon">
                            <MoreFilled />
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="编辑文章(item)">编辑</el-dropdown-item>
                                <el-dropdown-item @click="删除文章(item)">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { GetUserBlog,DeleteUserBlog } from "@/api/user/Blog";
import { useCounterStore } from "@/stores/counter";
import { useRouter } from 'vue-router';

const store = useCounterStore()   //实例化  
const user_id = store.权限.用户id //获取用户id

const router = useRouter()      //实例化路由

const input = ref()

const 文章数据 = ref([])

//文章的跳转,修改,删除按钮
const 编辑文章 = (item)=>{router.push(`/home/reviseblog/${item.blog_id}`)}
const 跳转到文章页面 = (item)=>{
    //console.log('这是点击文章的数据',item);
    router.push(`/home/blogdetail/${item.blog_id}`)  //路由跳转
}
const 删除文章 = async(item)=>{
    console.log('这是删除的时候的数据:',item);
    try {
        const 结果 = await ElMessageBox.confirm('是否确认删除这篇文章','Warning',{confirmButtonText: '确认',cancelButtonText: '取消',type: 'warning',})
        const res = await DeleteUserBlog(item.user_id,item.blog_id)
        ElMessage({type: 'success', message: '文章删除成功',})
        console.log('这是返回的数据',res);
        change()/刷新页面
    } catch (error) {
        ElMessage({type: 'info',message: '取消删除',})
    } 
}

const change = async()=>{
    const res = await GetUserBlog(user_id)
    文章数据.value = res.data
    console.log('这是文章数据',文章数据.value);
}

onMounted(()=>{
    change()
})

</script>

<style lang="scss" scoped>
.box {
    width: 980px;
    margin-left: 220px;
    background-color: #fff;
    min-height: calc(100vh - 124px);
    //margin-bottom: 24px;

    .box_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding: 0 20px;
        border-bottom: 1px solid #e5e6eb;

        .box_header_left {
            color: #1e80ff;
            font-weight: 500;
            height: 56px;
            line-height: 56px;
            font-size: 16px;
        }

    }
    .title{
        padding: 0 20px;
        .title_item{
            border-right: 1px solid #e5e6eb;
            display: inline-block;
            padding-right: 16px;
            font-weight: 500;
            font-size: 14px;
            line-height: 22px;
            color: #1e80ff;
        }
    }
    .box_body {
        padding: 0 20px;
        cursor: pointer;
        color: #909090;
        box-sizing: border-box;

        .item {
            width: 100%;
            padding: 16px 0;
            border-bottom: 1px solid #e5e6eb;

            .item_1 {
                position: relative;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;

                .item_1_left {
                    max-width: calc(100% - 20px);
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 24px;
                    color: #1d2129;
                    display: inline-block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    flex: auto;
                }

                .icon {
                    width: 24px;
                    height: 24px;

                    &:hover {
                        background-color: #e5e6eb;
                        color: #1e80ff;
                    }
                }
            }

            .item_2 {
                font-weight: 400;
                font-size: 14px;
                height: 22px;
                line-height: 22px;
                display: flex;
                align-items: center;
                color: #86909c;
            }
        }
    }

}
</style>
