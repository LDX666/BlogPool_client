<template>
    <div class="box">
        <div class="top">个人资料</div>
        <div class="main">
            <div class="main_left">
                <div class="main_left_top">基本信息</div>
                <el-form :model="表单数据" label-width="auto" :rules="rules" ref="校验结果">
                    <el-form-item label="用户名" prop="account">
                        <el-input v-model="表单数据.account" prefix-icon="User" maxlength="20" clearable
                            placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="用户介绍" prop="user_introduce">
                        <el-input v-model="表单数据.user_introduce" rows="3" type="textarea" placeholder="请写下自己的简介"
                            maxlength="100" show-word-limit />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="表单数据.password" type="password" show-password maxlength="20"
                            placeholder="请输入密码" style="width: 350px;" :disabled="是否重置密码" />
                        <el-button text type="primary" @click="重置密码">重置密码</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="margin-left: 68px;" @click="修改信息">保存修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="main_right">
                <el-upload list-type="picture-card" accept='.jpg,.png' multiple :limit="1" :http-request="上传图片"
                    ref="上传组件" :before-upload="上传前处理" :on-remove="移除图片" :class="{ disabled: 图片上传状态 }"
                    style="text-align: center;">
                    <img v-if="用户头像" :src="`${url}/${用户头像}`" style="width: 100%;height: 100%; border-radius: 50%;" />
                    <el-icon v-else>
                        <Plus />
                    </el-icon>
                </el-upload>
                <div class="main_right_text">格式：支持JPG、PNG、JPEG <br>大小：10M以内</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, reactive } from 'vue';
import { url } from "@/config";
import { GetUser, PutUser } from "@/api/user/Center";
import { useCounterStore } from "@/stores/counter";

//获取用户id,图片 在pinia中获取
const store = useCounterStore()
const 用户头像 = ref()
用户头像.value = store.权限.图片地址
console.log('我的头像数据:', 用户头像.value);

//重置密码功能
const 是否重置密码 = ref(true)
const 重置密码 = () => { 是否重置密码.value = !是否重置密码.value }

const 表单数据 = ref({
    account: `${store.权限.名称}`,
    user_introduce: '',
    username: '',
    password: ''
})
const 校验结果 = ref()
const rules = reactive({  //校验规则
    account: [
        { required: true, message: `用户名不能为空`, trigger: "change" },
        { min: 2, message: '最少需要两个字', trigger: 'blur' }
    ],
    user_introduce: [
        { required: true, message: '个人简介不能为空', trigger: 'change' },
        { min: 10, message: '最少需要10个字的个人介绍', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码至少需要6个字符', trigger: 'blur' }
    ]
})
const 修改信息 = async () => {
    try {
        await 校验结果.value.validate()
        let userurl = 用户头像.value
        let user_id = store.权限.用户id
        let { account, user_introduce, password } = 表单数据.value
        let data = { user_id,userurl, account, user_introduce, password }
        console.log('这是上传的修改数据:',data);
        ElMessageBox.confirm('是否修改个人信息', 'Warning', { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning', })
            .then(async () => {
                const res = await PutUser(data)
                if (res.code === 200) {
                    ElMessage({ message: '修改个人信息成功', type: 'success', })
                    //修改个人数据成功的时候要把用户名和头像一起修改掉
                    store.权限.图片地址 = userurl
                    store.权限.名称 = account
                    change()
                } else {
                    ElMessage.error('修改个人信息失败,请再试一次')
                }
            }).catch(() => {
                ElMessage({ message: '取消操作', type: 'info' })
            })
    } catch (error) {
        ElMessage.error('请输入正确的内容')
    }


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
        用户头像.value = 返回的图片地址
        图片上传状态.value = true    //改变图片上传状态为成功
        console.log('图片上传成功,查看这是的状态', 图片上传状态.value);
        上传组件.value.clearFiles()
    }).catch((err) => {
        console.log(err);
        图片上传状态.value = false
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
    用户头像.value = '',
        图片上传状态.value = false
}

const change = async () => {
    const res = await GetUser(store.权限.用户id)
    表单数据.value.user_introduce = res.data[0].user_introduce
    表单数据.value.username = res.data[0].username
    表单数据.value.password = res.data[0].password
}
onMounted(() => { change() })
</script>

<style lang="scss" scoped>
.box {
    width: 980px;
    margin-left: 220px;
    background-color: #fff;
    min-height: calc(100vh - 108px);

    .top {
        color: #252933;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;
        padding: 16px 20px;
        border-bottom: 1px solid #e4e6eb;
    }

    .main {
        padding: 0 20px 40px;
        display: flex;

        .main_left {
            min-width: 240px;
            width: 560px;

            .main_left_top {
                padding: 20px 0;
                color: #252933;
                font-size: 16px;
                font-style: normal;
                font-weight: 500;
                line-height: 24px;
            }
        }

        .main_right {
            flex: 1;
            padding-top: 20px;
            padding-left: 20px;
            padding-right: 20px;

            .main_right_text {
                color: #8a919f;
                text-align: center;
                font-size: 13px;
                font-style: normal;
                font-weight: 400;
                line-height: 22px;
                margin-top: 8px;
            }
        }
    }
}

.disabled {
    .el-upload--picture-card {
        display: none !important;
    }
}

::v-deep .el-upload--picture-card {
    border-radius: 50%;
}

::v-deep .el-form-item__content {
    justify-content: space-between;
}
</style>
