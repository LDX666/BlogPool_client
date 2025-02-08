<template>
    <div class="box" v-if="是否成功发布">
        <div class="top">修改文章</div>
        <el-form :model="对话框数据" :rules="rules" label-width="auto" ref="校验结果" style="margin: 0px auto;width: 820px;">
            <el-form-item label="文章头像" prop="blog_img">
                <el-upload list-type="picture-card" accept='.jpg,.png' multiple :limit="1" :http-request="上传图片"
                    ref="上传组件" :before-upload="上传前处理" :on-remove="移除图片" :class="{ disabled: 图片上传状态 }">
                    <img v-if="对话框数据.blog_img" :src="`${url}/${对话框数据.blog_img}`" style="width: 100px;height: 100px;" />
                    <el-icon v-else>
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="文章标题" prop="title"> <el-input v-model="对话框数据.title" /> </el-form-item>
            <el-form-item label="文章类型" prop="type_id">
                <el-select v-model="对话框数据.type_id" placeholder="选择对应的文章类型">
                    <!-- label是自己写的标题,value才是对应的值 -->
                    <el-option v-for="item in 文章类型" :label="item.name" :value="item.type_id" />
                </el-select>
            </el-form-item>
            <el-form-item label="文章简介" prop="introduce">
                <el-input v-model="对话框数据.introduce" autosize type="textarea" maxlength="100" placeholder="请输入简介内容"
                    show-word-limit />
            </el-form-item>
            <el-form-item prop="blog_content">
                <WangEditor v-model="对话框数据.blog_content" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="确认()">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="thanks" v-else>
        <div class="thanks_img"></div>
        <div class="thanks_text">
            <div class="thanks_text_title" @click="跳转到文章详情页">《{{ 对话框数据.title }}》</div>
            <div class="thanks_text_text">发布成功，有了你的分享，社区会变得更加美好！</div>
            <el-button type="primary" plain style="margin-top: 40px;" @click="回到首页">回到首页</el-button>
        </div>
    </div>
</template>

<script setup>
import WangEditor from '@/components/user/article/WangEditor.vue';
import axios from 'axios';
import { ref, reactive, onMounted } from 'vue';
import { GetType } from "@/api/admin/Blog_type";
import {  GetBlog,PutBlog } from "@/api/user/Blog";
import { url } from "@/config";
import { useCounterStore } from "@/stores/counter";
import { useRoute, useRouter } from 'vue-router';

//获取用户id,路由传过来的文章id,已经是否成功修改和发布
const route = useRoute()
const router =useRouter()
const blog_id = route.params.id
const 是否成功发布 = ref(true) 

//修改文章成功的页面功能
const 跳转到文章详情页 = ()=>{router.push(`/home/blogdetail/${blog_id}`)}
const 回到首页 = ()=>{router.push(`/home/article/1`)}

//获取文章数据
const 文章类型 = ref([])
const 校验结果 = ref(null)
const 对话框数据 = ref({ //表单数据格式
    blog_img: '',   //文章图片
    title: '',      //文章标题
    type_id: '',    //文章类型id
    introduce: '',  //文章介绍
    blog_content: '',  //这个文章内容不便展示,但是可以在修改的时候展示
})
//校验规则
const rules = reactive({  //校验规则
    blog_img: [
        { required: true, message: '请上传图片', trigger: 'blur' }
    ],
    title: [
        { required: true, message: '标题不能为空', trigger: 'blur' }
    ],
    type_id: [
        { required: true, message: '选择文章类型,类型不能为空', trigger: 'change' }
    ],
    introduce: [
        { required: true, message: '请输入简介', trigger: 'blur' },
        { min: 10, max: 100, message: '最低10个字,最多100字介绍', trigger: 'blur' }
    ]
})

//确认按钮的功能
const 确认 = async () => {
    console.log('点击确认按钮时的数据:', 对话框数据.value.blog_content);
    ElMessageBox.confirm('是否确认', 'Warning', { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning', })
        .then(async () => {
            try {
                await 校验结果.value.validate()
                let { blog_img, title, type_id, introduce, blog_content } = 对话框数据.value
                let data = { blog_id, blog_img, title, type_id, introduce, blog_content }
                const res = await PutBlog(data)
                if (res.code === 200) {
                    ElMessage({ message: '修改文章成功', type: 'success', })
                    是否成功发布.value = false
                } else {
                    ElMessage.error('修改文章失败,请再试一次')
                }
            } catch (error) {
                ElMessage.error('请输入正确的格式内容')
            }
        })
        .catch(() => {
            ElMessage({ message: '取消操作', type: 'info' })
        })
}

//图片上传部分,以后封装成组件
const 上传组件 = ref()
const 图片上传状态 = ref(false)
const 上传图片 = (item) => {  //这里blog_img的地址被改变了
    let file = item.file
    let filedata = new FormData()
    filedata.append('img', file)
    axios.post(`${url}/api/upload/img`, filedata, {
        Headers: { 'Content-Type': 'multipart/form-data' },
    }).then((res) => {
        let 返回的图片地址 = res.data.data
        对话框数据.value.blog_img = 返回的图片地址
        图片上传状态.value = true    //改变图片上传状态为成功
        console.log('图片上传成功,查看这是的状态', 图片上传状态.value);
        上传组件.value.clearFiles()
    }).catch((err) => {
        console.log(err);
        图片上传状态.value = false
        fileList.value = []
    })
}
const 上传前处理 = (rawFile) => {
    console.log(rawFile.type);
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('只允许上传jpg，png格式的文件')
        return false
    } else if (rawFile.size / 1024 / 1024 > 10) {
        ElMessage.error('图片大小不能超过 10MB!')
        return false
    }
    return true
}
const 移除图片 = () => {
    fileList.value = []
    对话框数据.value.blog_img = '',
        图片上传状态.value = false
}

//数据初始化
const change = async () => {
    const res = await GetType()
    const res2 = await GetBlog(route.params.id)
    文章类型.value = res.data
    对话框数据.value = res2.data[0]
}
onMounted(() => { change() })
</script>

<style lang="scss" scoped>
.box {
    width: 980px;
    background-color: #fff;
    min-height: calc(100vh - 108px);
    padding-bottom: 24px;
    margin: 0 auto;
    margin-top: 30px;

    .top {
        color: #252933;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;
        padding: 16px 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #e4e6eb;
    }
}
.thanks{
    width: 960px;
    height: 560px;
    //min-height: calc(100vh - 112px);
    margin: 20px auto 16px;
    padding: 40px 100px 20px;
    background-color: #fff;
    text-align: center;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .thanks_img{
        margin-bottom: 8px;
        background-image: url(http://localhost:3000/背景图.jpg);
        width: 180px;
        height: 180px;
        background-size: cover;
        background-position: 50%;
        background-repeat: no-repeat;
    }
    .thanks_text{
        font-size: 14px;
        line-height: 22px;
        margin-top: 8px;
        color: #4e5969;
        .thanks_text_title{
            cursor: pointer;
            margin-bottom: 8px;
            color: #252933;
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            text-align: center;
            &:hover{
                color: #1e80ff;
            }
        }
    }
}

::v-deep .el-form-item__content {
    justify-content: center;
}

.disabled {
    .el-upload--picture-card {
        display: none !important;
    }
}
</style>
