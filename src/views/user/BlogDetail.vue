<template>
    <div class="blogdetail">
        <!-- 这是主体内容 -->
        <div class="body">
            <div class="main">
                <!-- 标题 -->
                <div class="main_title">{{ 文章数据.title }}</div>
                <!-- 标题下面的介绍 -->
                <div class="main_introduce">
                    <div class="main_introduce_box">
                        <span class="文本超出隐藏">作者：{{ 文章数据.account }}</span>
                        <span class="文本超出隐藏">时间：{{ 文章数据.create_time }}</span>
                        <span>阅读量：{{ 文章数据.visits }}</span>
                    </div>
                </div>
                <!-- 文章主体 -->
                <div class="main_html">
                    <div v-html="文章数据.blog_content" />
                </div>
            </div>
            <!-- 评论区 -->
            <div class="comment">
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
                <div class="comment_main">
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
                                    <div class="box_item3_1_2" @click="点赞功能(item)"
                                        :class="item.is_like ? 'ture_color' : 'flase_color'">
                                        <!-- 这是图标 -->
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#dianzan_kuai"></use>
                                        </svg>
                                        <span>&nbsp;{{ item.likes }}</span>
                                    </div>
                                    <!-- 这是回复功能模块 -->
                                    <div class="box_item3_1_2" @click="回复功能(item)"
                                        :class="item.boolean ? 'ture_color' : 'flase_color'">
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon_huifu-mian"></use>
                                        </svg>
                                        <span>&nbsp;回复</span>
                                    </div>
                                </div>
                                <!-- 这是举报功能 -->
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
        </div>
        <!-- 这是右侧的用户 -->
        <el-affix :offset="96">
            <div class="right">
                <div class="right_item1">
                    <div class="right_item1_1" @click="跳转到用户页面" >
                        <img :src="`${url}/${文章数据.userurl}`" class="right_item1_1_img">
                        <div class="right_item1_1_box">
                            <span class="right_item1_1_box_1">{{ 文章数据.account }}</span>
                            <span class="right_item1_1_box_2">{{ 文章数据.user_introduce }}</span>
                        </div>
                    </div>
                    <div class="right_item1_2">
                        <div class="right_item1_2_item">
                            <span class="right_item1_2_item_text">{{ 右侧数据.blogs || '无' }}</span>
                            <span>文章数</span>
                        </div>
                        <div class="right_item1_2_item">
                            <span class="right_item1_2_item_text">{{ 右侧数据.visits || '无' }}</span>
                            <span>阅读总量</span>
                        </div>
                        <div class="right_item1_2_item">
                            <span class="right_item1_2_item_text">{{ 右侧数据.befollow || '无' }}</span>
                            <span>粉丝数</span>
                        </div>
                    </div>
                    <div class="right_item1_3">
                        <el-button type="success" @click="关注" :plain="!右侧数据.is_follow">
                            {{ 右侧数据.is_follow ? '已关注' : '关注' }}
                        </el-button>
                    </div>
                </div>

                <!-- <div>{{ 文章数据 }}</div> -->
            </div>
        </el-affix>
        <!-- 这是左侧的按钮 -->
        <div class="left">
            <div style="display: flex;flex-direction: column;">
                <!-- 点赞 -->
                <el-badge :value="左侧数据.likes" :type="左侧数据.is_likes ? 'primary' : 'info'" @click="点赞">
                    <div class="left_item">
                        <svg class="left_item_icon" aria-hidden="true"
                            :class="左侧数据.is_likes ? 'ture_color' : 'flase_color'">
                            <use xlink:href="#dianzan_kuai"></use>
                        </svg>
                    </div>
                </el-badge>

                <!-- 收藏 -->
                <el-badge :value="左侧数据.collect" :type="左侧数据.is_collect ? 'warning' : 'info'">
                    <div class="left_item" @click="收藏">
                        <svg class="left_item_icon" aria-hidden="true"
                            :class="左侧数据.is_collect ? 'ture_color' : 'flase_color'">
                            <use xlink:href="#shoucang"></use>
                        </svg>
                    </div>
                </el-badge>

                <!-- 举报 -->
                <div class="left_item" @click="对话框状态 = true">
                    <svg class="left_item_icon" aria-hidden="true" :class="'flase_color'">
                        <use xlink:href="#icon_huifu-mian"></use>
                    </svg>
                </div>
            </div>

        </div>
    </div>
    <!-- 这是举报的弹出框 -->
    <el-dialog v-model="对话框状态" title="举报该文章" width="800" draggable align-center>
        <el-form :model="举报表单" label-width="auto" ref="校验结果" :rules="校验规则" style="margin: 0 30px;">
            <el-form-item label="举报内容" prop="content">
                <el-input v-model="举报表单.content" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="对话框确定按钮">确定</el-button>
            <el-button type="primary" @click="() => { 对话框状态 = false }">取消</el-button>
        </template>
    </el-dialog>
    <!-- 这是回到顶部组件 shoucang1-->
    <el-backtop :right="100" :bottom="100" />


</template>
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { GetBlog_idDetail, text3 } from "@/api/user/Blog.js";
import { PostFollow, PostBlogLikes, Text4,text5} from "@/api/user/Center";
import { url } from "@/config.js";
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore()
const router = useRouter()



const route = useRoute()  //获取传过来的路由
const 文章数据 = ref({})

const 左侧数据 = ref({})
const 右侧数据 = ref({})



//后面加的
const 跳转到用户页面 = ()=>{router.push(`/home/userdetail/${右侧数据.value.user_id}`)}

const 对话框状态 = ref(false)
const 举报表单 = ref({
    content: ''
})
const 校验结果 = ref(null)              //4.校验结果,在确认按钮里使用,这里默认为不校验
const 校验规则 = ref({
    content: [
        { required: true, message: '举报内容不能为空', trigger: 'blur' },
        { min: 6, max: 255, message: '最低6个字符,最多255个字符', trigger: 'blur' }
    ],
})
const 对话框确定按钮 = async()=>{
    try {
        await 校验结果.value.validate() //先进行校验
        ElMessageBox.confirm('是否确认', '标题', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', })
        .then(async () => {
            let user_id = store.权限.用户id       //自己的用户id  
            let blog_id = 左侧数据.value.blog_id  //文章id
            let content = 举报表单.value.content
            const res = await text5(user_id,blog_id,content)
            if (res.code === 200) {
                对话框状态.value = false  //关闭对话框
                举报表单.value = {}  //清空举报内容
                ElMessage({ type: 'success', message: '举报文章成功,请等待管理员响应', })  //弹出修改成功提示
            } else {
                console.log(后端返回的数据.data);                           //打印失败原因
                ElMessage({ type: 'error', message: '举报文章失败,请联系管理员查询原因', })   //弹出失败消息框
            }
        }).catch(()=>{
            ElMessage('取消举报')
        })
    } catch (error) {
        ElMessage({ type: 'error', message: '请正确填写举报的内容' })
    }
}


const 点赞 = async () => {
    let user_id = store.权限.用户id
    let blog_id = 左侧数据.value.blog_id  //博主id

    if (左侧数据.value.is_likes) {
        let res = await PostBlogLikes(user_id, blog_id)
        左侧数据.value.is_likes = res.data
        左侧数据.value.likes = 左侧数据.value.likes - 1
        console.log('这时候的点赞数据:', 左侧数据.value.likes);
    } else {
        let res = await PostBlogLikes(user_id, blog_id)
        左侧数据.value.is_likes = res.data
        左侧数据.value.likes = 左侧数据.value.likes + 1
        console.log('这时候的点赞数据:', 左侧数据.value.likes);
    }

}
const 关注 = async () => {
    let user_id = store.权限.用户id
    let follower = 右侧数据.value.user_id  //博主id
    if (user_id === follower) {
        ElMessage({ type: 'warning', message: '不能自己关注自己', })
    } else {
        const res = await PostFollow(user_id, follower)
        右侧数据.value.is_follow = res.data
        console.log('关注状态：', res.data);
    }
}
const 收藏 = async () => {
    let user_id = store.权限.用户id
    let blog_id = 左侧数据.value.blog_id  //博主id

    if (左侧数据.value.is_collect) {
        let res = await Text4(user_id, blog_id)
        左侧数据.value.is_collect = res.data
        左侧数据.value.collect = 左侧数据.value.collect - 1
        console.log('这时候的收藏数:', 左侧数据.value.collect);
        console.log('这时候的状态:', res.data);
    } else {
        let res = await Text4(user_id, blog_id)
        左侧数据.value.is_collect = res.data
        左侧数据.value.collect = 左侧数据.value.collect + 1
        console.log('这时候的收藏数:', 左侧数据.value.collect);
        console.log('这时候的状态:', res.data);
    }
}
const 举报 = async () => {

}



//原来的
const input = ref() //这是回复文章绑定的输入框
const 回复文章 = async () => {
    let content = input.value
    let user_id = store.权限.用户id
    let to_user_id = null
    let blog_id = 文章数据.value.blog_id
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
    let user_id = store.权限.用户id
    let blog_id = route.params.id
    const 其他 = await text3(user_id, blog_id)
    const res = await axios.get(`${url}/api/text6666`, { params: { blog_id: route.params.id, user_id: store.权限.用户id } })
    评论区数据.value = res.data.data
    左侧数据.value = 其他.data.blog[0]
    右侧数据.value = 其他.data.author[0]
    console.log('这是现在测试的左侧数据:', 左侧数据.value);
    console.log('这是现在测试的右侧数据:', 其他.data.author[0]);
}



onMounted(async () => {
    const res = await GetBlog_idDetail(route.params.id)
    文章数据.value = res.data[0]
    console.log('请求获取成功', 文章数据.value);
    change()
})
</script>


<style lang="scss" scoped>
.blogdetail {
    margin: 0 auto;
    width: 100%;
    max-width: 1140px;
    margin-top: 28px;
    padding: 0 0 8rem;
    display: grid;
    gap: 20px;
    grid-template-columns: 820px 300px;

    .body {
        display: flex;
        flex-direction: column;

        .main {
            width: 820px;
            max-width: 100%;
            background-color: #fff;
            padding-top: 2.67rem;
            padding-right: 2.67rem;
            padding-left: 2.67rem;
            box-sizing: border-box;
            border-radius: 4px 4px 0 0;
            overflow: hidden;

            .main_title {
                margin: 0 0 1.3rem;
                font-size: 2.667rem;
                font-weight: 600;
                line-height: 1.31;
                color: #252933;
            }

            .main_introduce {
                display: flex;
                align-items: center;
                flex-direction: column;

                .main_introduce_box {
                    display: grid;
                    margin-bottom: 1.667rem;
                    gap: 16px;
                    grid-template-columns: 160px 1fr 1fr;
                    width: 100%;
                }
            }

            .main_html {
                word-break: break-word;
                line-height: 1.75;
                font-weight: 400;
                font-size: 16px;
                overflow-x: hidden;
                color: #252933;
            }

        }

        .comment {
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

            .comment_main {
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
    }

    .right {
        display: flex;
        flex-direction: column;

        .right_item1 {
            border-radius: 4px;
            background: #fff;
            padding: 20px;
            margin-bottom: 1.5rem;

            .right_item1_1 {
                display: flex;
                padding-bottom: 8px;
                align-items: center;
                cursor: pointer;

                .right_item1_1_img {
                    flex: 0 0 auto;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .right_item1_1_box {
                    display: flex;
                    flex-direction: column;
                    flex: 1 1 auto;
                    min-width: 0;
                    margin-left: 12px;

                    .right_item1_1_box_1 {
                        font-size: 16px;
                        font-weight: 500;
                        line-height: 2rem;
                        color: #252933;
                        display: inline-block;
                        vertical-align: top;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .right_item1_1_box_2 {
                        font-size: 14px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: #8a919f;
                        font-weight: 400;
                        line-height: 22px;
                    }
                }
            }

            .right_item1_2 {
                display: flex;
                align-items: center;
                justify-content: space-around;

                .right_item1_2_item {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-bottom: 8px;
                    color: #8a919f;
                    font-size: 13px;
                    font-weight: 400;
                    line-height: 22px;

                    .right_item1_2_item_text {
                        color: #252933;
                        font-size: 16px;
                        font-weight: 500;
                        line-height: 24px;
                    }
                }

            }

            .right_item1_3 {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 4px;
            }
        }
    }

    .left {
        position: fixed;
        margin-left: -5rem;
        top: 220px;
        z-index: 2;

        .left_item {
            position: relative;
            margin-bottom: 1.667rem;
            width: 48px;
            height: 48px;
            background-color: #fff;
            background-position: 50%;
            background-repeat: no-repeat;
            border-radius: 50%;
            box-shadow: 0 2px 4px 0 rgba(50, 50, 50, .04);
            cursor: pointer;
            text-align: center;
            font-size: 1.67rem;

            &::after {
                content: attr(data-dynamic-content);
                position: absolute;
                top: 0;
                left: 75%;
                height: 17px;
                line-height: 17px;
                padding: 0 5px;
                border-radius: 9px;
                font-size: 11px;
                text-align: center;
                white-space: nowrap;
                background-color: var(--content_color);
                color: #fff;
            }

            .left_item_icon {
                height: 48px;
                width: 20px;
                vertical-align: -0.15em;
                fill: currentColor;
                overflow: hidden;
                transition: all 0.15s linear;

                &:hover {
                    color: #968125;
                    transition: all .2s;
                }
            }
        }
    }

}

.文本超出隐藏 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: top;
    display: inline-block;
}

.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    transition: all .15s linear;
}

.ture_color {
    color: #1e80ff;
    transition: all .2s;
}

.flase_color {
    color: #8a919f;
    transition: all .2s;
}
</style>
