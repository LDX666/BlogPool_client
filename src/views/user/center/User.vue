<template>
    <div class="box">
        <div class="main">
            <div class="main_top">
                <img class="top_img" :src="`${url}/${用户数据.userurl}`" >
                <div class="top_main">
                    <div class="top_main_1">{{ 用户数据.account || '无'}}</div>
                    <div class="top_main_2">
                        <div class="top_main_2_left">
                            {{ 用户数据.user_introduce || '无'}}
                        </div>
                        <div class="top_main_2_right">
                            <button class="top_main_2_right_button" @click="跳转个人资料">设置</button>                           
                        </div>
                    </div>
                </div>
            </div>
            <el-tabs v-model="标签页默认打开值" class="main_tabs">
                <el-tab-pane label="文章" name="item1">
                    <CenterBlog :user_id="user_id"/>
                </el-tab-pane>
                <el-tab-pane label="点赞" name="item2">
                    <CenterLikeBlog :user_id="user_id"/>
                </el-tab-pane>
                <el-tab-pane label="收藏" name="item3">
                    <CenterCollect :user_id="user_id"/>
                </el-tab-pane> 
                <el-tab-pane label="关注" name="item4">
                    <CenterFollow :user_id="user_id"/>
                </el-tab-pane>
                <el-tab-pane label="粉丝" name="item5">
                    <CenterBefollow :user_id="user_id"/>
                </el-tab-pane>   
            </el-tabs>
        </div>
        <div class="right">
            <el-affix :offset="84">
                <div class="right_item1">
                    <div class="right_item1_1">个人成就</div>
                    <div class="right_item1_2">
                        <div class="start_item">
                            <div class="icon_box">
                                <svg class="icon" aria-hidden="true" style="color: #7bb9ff;">
                                    <use xlink:href="#dianzan_kuai"></use>
                                </svg>
                            </div>
                            <span>文章被点赞 {{ 用户数据.likes }}</span>
                        </div>
                        <div class="start_item">
                            <div class="icon_box">
                                <svg class="icon" aria-hidden="true" style="color: #7bb9ff;">
                                    <use xlink:href="#yanjing"></use>
                                </svg>
                            </div>
                            <span>文章被阅读 {{ 用户数据.visits }}</span>
                        </div>
                    </div>
                </div>
                <div class="right_item2">
                    <div class="right_item2_item" @click="打开关注组件">
                        <div class="right_item2_item_title">关注</div>
                        <div class="right_item2_item_main">{{用户数据.follow}}</div>
                    </div>
                    <div class="right_item2_item" @click="打开粉丝组件">
                        <div class="right_item2_item_title">粉丝</div>
                        <div class="right_item2_item_main">{{用户数据.befollow}}</div>
                    </div>
                </div>
            </el-affix>
        </div>
    </div>
</template>

<script setup>
import CenterBlog from "@/components/user/center/CenterBlog.vue";
import CenterLikeBlog from "@/components/user/center/CenterLikeBlog.vue"
import CenterCollect from "@/components/user/center/CenterCollect.vue"
import CenterFollow from "@/components/user/center/CenterFollow.vue";
import CenterBefollow from "@/components/user/center/CenterBefollow.vue"

import { useCounterStore } from "@/stores/counter";
import { GetCenter } from "@/api/user/Center.js";
import { onMounted, ref } from "vue";
import { url } from "@/config";
import { useRouter } from "vue-router";

const 用户数据 = ref({})
const 标签页默认打开值 = ref('item1')
//这是个人中心,所以使用pinia来获取数据,如果是别人的,就使用路由获取id
const store = useCounterStore()   //实例化 
const user_id = store.权限.用户id //获取用户id
const router = useRouter() //用来跳转路由的

//2.1 打开关注面板
const 打开关注组件 = ()=>{标签页默认打开值.value = 'item4'}
//2.2 打开粉丝面板
const 打开粉丝组件 = ()=>{标签页默认打开值.value = 'item5'}
//2.3 打开设置页面
const 跳转个人资料 = ()=>{router.push('/home/center/personal')}

const change =async()=>{ //初始获取用户信息
    const res = await GetCenter(store.权限.用户id)
    用户数据.value = res.data[0]
    console.log('这是用户数据:',用户数据.value);
    
}

onMounted(()=>{
    change()
})
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__nav-wrap::after{
    height: 0.5px;
}

::v-deep .el-tabs__item {
    font-size: 16px;
    font-weight: 400;
}
.box {
    width: 980px;
    margin-left: 220px;
    //background-color: #fff;
    min-height: calc(100vh - 124px);
    display: flex;
    .main{
        flex: 1 1 auto;
        min-width: 0;
        .main_top{
            display: flex;
            padding: 30px;
            background-color: #fff;
            border-radius: 2px;
            margin-bottom: 12px;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
            .top_img{
                flex: 0 0 auto;
                margin-right: 28px;
                width: 90px;
                height: 90px;
                background-color: #f9f9f9;
                border-radius: 50%;
            }
            .top_main{
                flex: 1 1 auto;
                display: flex;
                flex-direction: column;
                //justify-content: center;
                .top_main_1{
                    margin-bottom: 8px;
                    font-size: 20px;
                    font-weight: 600;
                    line-height: 1.2;
                    color: #000;
                }
                .top_main_2{
                    display: flex;
                    justify-content: space-between;
                    height: 100%;
                    .top_main_2_left{
                        font-size: 15px;
                        line-height: 1.5;
                        color: #72777b;
                        overflow: hidden;
                    }
                    .top_main_2_right{
                        display: flex;
                        align-items: flex-end;
                        .top_main_2_right_button{
                            cursor: pointer;
                            color: #007fff;
                            padding: 0;
                            height: 32.4px;
                            font-size: 16.5px;
                            font-weight: 500;
                            line-height: 1.2;
                            border: 1px solid #007fff;
                            background-color: #fff;
                            border-radius: 4px;
                            width: 116.4px;
                        }
                    }
                }
            }
        }
        .main_tabs{
            background-color: #fff;
            padding: 0 20px;
        }
    }
    .right{
        flex: 0 0 auto;
        margin-left: 12px;
        width: 240px;
        line-height: 1.2;
        .right_item1{
            margin-bottom: 12px;
            background-color: #fff;
            border-radius: 2px;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
            .right_item1_1{
                padding: 16px;
                font-size: 16px;
                font-weight: 600;
                color: #31445b;
                border-bottom: 1px solid rgba(230, 230, 231, .5);
            }
            .right_item1_2{
                padding: 16px;
                .start_item{
                    margin-bottom: 9.6px;
                    display: flex;
                    align-items: center;
                    font-size: 13px;
                    color: #000;
                    .icon_box{
                        width: 25px;
                        height: 25px;
                        background-color: #e6f3ff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-right: 14.4px;
                        border-radius: 50%;
                    }                
                }
            }
        }
        .right_item2{
            display: flex;
            margin-bottom: 12px;
            background-color: #fff;
            border-radius: 2px;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
            .right_item2_item{
                flex: 1 1 auto;
                padding: 16px 0;
                text-align: center;
                color: #31445b; 
                cursor: pointer;  
                .right_item2_item_title{
                    font-size: 16px;
                    font-weight: 500;
                }  
                .right_item2_item_main{
                    margin-top: 6px;
                    font-size: 15px;
                    font-weight: 600;
                }    
            }
        }
    }
}
.icon {
    width: 14px;
    height: 14px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    transition: all .15s linear;
}
</style>
