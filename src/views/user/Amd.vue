<template>

        <div class="main_comment">
            <!-- 这是评论的标题 -->
            <div class="title">评论 {{ 评论区数据.length }}</div>
            <!-- 这是输入评论的地方 -->
            <div class="top">
                <img :src="`${url}/头像.png`" class="top_img">
                <el-input v-model="input" maxlength="1000" show-word-limit :autosize="{ minRows: 4, maxRows: 10 }"
                    type="textarea" placeholder="平等表达,友善交流" />
                <el-button type="primary" plain style="margin-left: 16px;" :disabled="!input"
                    @click="回复文章">发表评论</el-button>
            </div>
            <!-- 这是评论区的主体 -->
            <div class="main">
                <!-- 这是最新和最热,不用管 -->
                <div class="main_top">最新</div>
                <!-- 这才是每一条评论,使用for循环遍历 -->
                <div class="main_body" v-for="item in 评论区数据">
                    <img class="main_body_img" :src="`${url}/头像.png`">
                    <div class="main_body_box">
                        <!-- 这是回答者的名称 -->
                        <div class="box_item1">{{ item.account }}</div>
                        <!-- 这是回答者的回答内容 v-if表示是否添加@这个人-->
                        <div class="box_item2">
                            <span v-if="item.to_user_id" style="color: #008AC5;">@{{ item.to_user_account
                                }}&nbsp;</span>
                            {{ item.content }}
                        </div>
                        <!-- 这是下面的时间,点赞,和回复功能 -->
                        <div class="box_item3">
                            <div class="box_item3_1">
                                <div class="box_item3_1_1">{{ item.create_time.split('T')[0] }}</div>
                                <!-- 这是点赞功能模块 -->
                                <div class="box_item3_1_2" @click="点赞功能(item)" :class="item.is_like ? 'ture_color' : 'flase_color'">
                                    <!-- 这是图标 -->
                                    <svg class="icon" aria-hidden="true"><use xlink:href="#dianzan_kuai"></use></svg>
                                    <span>&nbsp;{{ item.likes }}</span>
                                </div>
                                <!-- 这是回复功能模块 -->
                                <div class="box_item3_1_2" @click="回复功能(item)"
                                    :class="item.boolean ? 'ture_color' : 'flase_color'">
                                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon_huifu-mian"></use></svg>
                                    <span>&nbsp;回复</span>
                                </div>
                            </div>

                            <div class="box_item3_2">举报</div>
                        </div>
                        <!-- 这是点击回复之后新增的回答输入框,v-if表示一开始是隐藏状态 -->
                        <div class="box_item4" v-if="item.boolean">
                            <el-input v-model="回复评论内容" maxlength="1000" minlength="5"
                                :autosize="{ minRows: 4, maxRows: 10 }" show-word-limit type="textarea"
                                :placeholder="item.account" />
                            <el-button type="primary" plain style="margin-left: 16px;" @click="回复某人(item)"
                                :disabled="!回复评论内容">回复评论</el-button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { url } from "@/config.js";
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore()


const input = ref() //这是回复文章绑定的输入框
const 回复文章 = async () => {
    let content = input.value
    let user_id = store.权限.用户id
    let to_user_id = null
    let blog_id = 评论区数据.value[0].blog_id
    const res = await axios.post(`${url}/api/post/InsertContent`, { user_id, content, to_user_id, blog_id })
    if (res.data.code === 200) {
        ElMessage({ message: `评论成功`, type: 'success', })
        change()
    } else {
        ElMessage.error('回复失败')
    }
}

const 点赞功能 = async (item) => {
    console.log('这是点赞的时候传过来的数据', item);
    const user_id = store.权限.用户id
    const comment_id = item.comment_id
    const likes = item.likes
    const res = await axios.post(`${url}/api/post/Insert/CommentLikes`, { user_id, comment_id, likes })
    console.log('点赞消息发送过去了,这是返回的参数:', res.data);
    item.is_like = res.data.data.boolean
    item.likes = res.data.data.likes
}

const 回复功能 = (item) => {
    console.log('这是回复的时候携带的数据:', item);
    item.boolean = !item.boolean
}

const 回复评论内容 = ref()
const 回复某人 = async (item) => {
    console.log('这是回复某人的消息：', item);
    let content = 回复评论内容.value
    let user_id = store.权限.用户id
    let to_user_id = item.user_id
    let blog_id = item.blog_id
    const res = await axios.post(`${url}/api/post/InsertContent`, { user_id, content, to_user_id, blog_id })
    if (res.data.code === 200) {
        ElMessage({ message: `回复用户${item.account}成功`, type: 'success', })
        change()
    } else {
        ElMessage.error('回复失败')
    }
}




const 评论区数据 = ref([])
const change = async () => {
    const res = await axios.get(`${url}/api/text6666`, { params: { blog_id: 55, user_id: store.权限.用户id } })
    评论区数据.value = res.data.data
    console.log(res.data.data);
}

change()
</script>

<style lang="scss" scoped>
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;

}

.ture_color {
    color: #1e80ff;
    transition: all .2s;
}

.flase_color {
    color: #8a919f;
    transition: all .2s;
}



    .main_comment {
        border-radius: 4px;
        background: #fff;
        margin-top: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        font-style: normal;
        padding-left: 2.67rem;
        padding-right: 2.67rem;

        .title {
            color: #252933;
            ;
            font-size: 18px;
            font-weight: 600;
            line-height: 30px;
        }

        .top {
            margin-top: 32px;
            display: grid;
            grid-template-columns: 56px 1fr 96px;

            .top_img {
                margin-right: 16px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }

        .main {
            margin-top: 32px;

            .main_top {
                font-size: 15px;
                font-weight: 500;
                line-height: 22px;
                display: inline-block;
                font-weight: 400;
                cursor: pointer;
                border-radius: 2px;
                padding: 3px 4px;
                color: #1e80ff;
            }

            .main_body {
                display: flex;
                min-width: 0;
                //min-height: 120px;
                margin-top: 4px;
                padding: 16px 0;

                .main_body_img {
                    margin-right: 16px;
                    width: 36px;
                    height: 36px;
                    object-fit: cover;
                    border-radius: 50%;
                }

                .main_body_box {
                    width: 100%;

                    .box_item1 {
                        color: #515767;
                        ;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 24px;
                    }

                    .box_item2 {
                        margin-top: 4px;
                        color: #252933;
                        ;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 28px;
                        display: -webkit-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 6;
                    }

                    .box_item3 {
                        margin-top: 8px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .box_item3_1 {
                            display: flex;
                            align-items: center;

                            .box_item3_1_1 {
                                font-size: 14px;
                                font-weight: 400;
                                line-height: 22px;
                                margin-right: 16px;
                            }

                            .box_item3_1_2 {
                                transition: all .2s;
                                padding: 0 10px;
                                font-size: 14px;
                                font-weight: 400;
                                line-height: 22px;
                                cursor: pointer;

                                &:hover {
                                    color: #1e80ff;
                                }
                            }
                        }
                    }

                    .box_item4 {
                        display: grid;
                        grid-template-columns: 1fr 96px;
                        margin-top: 8px;
                    }
                }
            }
        }
    }

</style>
