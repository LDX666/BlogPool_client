<template>
    <!-- 最外层的大盒子 -->
    <div class="bigBox">
        <div class="box" ref="box">
            <!-- 滑动盒子 -->
            <div class="pre-box">
                <h1>WELCOME</h1>
                <p>JOIN US!</p>
                <div class="img-box">
                    <img :src=img alt="" id="avatar" />
                </div>
            </div>
            <!-- 注册盒子 -->
            <div class="register-form">
                <!-- 标题盒子 -->
                <div class="title-box">
                    <h1>注册</h1>
                </div>
                <!-- 输入框盒子 -->
                <el-form ref="registerFormRef" :model="registerForm" :rules="rules" label-with="5px">
                    <el-form-item prop="username" label=" ">
                        <el-input type="text" placeholder="用户名" v-model="registerForm.username" />
                    </el-form-item>
                    <el-form-item prop="password" label=" ">
                        <el-input type="password" placeholder="密码" v-model="registerForm.password" />
                    </el-form-item>
                    <el-form-item prop="confirmPassword" label=" ">
                        <el-input type="password" placeholder="确认密码" v-model="registerForm.confirmPassword" />
                    </el-form-item>
                </el-form>
                <!-- 按钮盒子 -->
                <div class="btn-box">
                    <button @click="register">注册</button>
                    <!-- 绑定点击事件 -->
                    <p @click="mySwitch">已有账号?去登录</p>
                </div>
            </div>
            <!-- 登录盒子 -->
            <div class="login-form">
                <!-- 标题盒子 -->
                <div class="title-box">
                    <h1>登录</h1>
                </div>
                <!-- 输入框盒子   :rules="rules" 这个属性是绑定校验规则的-->
                <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-with="5px">
                    <el-form-item prop="username" label=" ">
                        <el-input type="text" placeholder="用户名" v-model="loginForm.username" />
                    </el-form-item>
                    <el-form-item prop="password" label=" ">
                        <el-input type="password" placeholder="密码" v-model="loginForm.password" />
                    </el-form-item>
                    <el-radio-group v-model="radio" class="ml-4">
                        <el-radio value="1" size="large">普通用户</el-radio>
                        <el-radio value="2" size="large">管理员</el-radio>
                    </el-radio-group>
                </el-form>
                <!-- 按钮盒子 -->
                <div class="btn-box">
                    <button @click="login">登录</button>
                    <!-- 绑定点击事件 -->
                    <p @click="mySwitch">没有账号?去注册</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import luan from '../assets/img/wuwu.jpeg'
import luan2 from '../assets/img/waoku.jpg'
//import { Lock, User } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { LoginUser, RegisterUser, LoginAdmin } from "@/api/login.js";
import { useRouter } from 'vue-router'
import { useCounterStore } from "@/stores/counter";

const 权限管理 = useCounterStore()
console.log('这是pinia信息',权限管理.权限.状态);

let radio = ref('1')  //定义单选内容,1是普通用户,2是管理员
let img = ref(luan2)  //定义图片内容,用路径不显示,因为这个路径是等组件加载完成之后才能写入的,直接导入图片就行了
let flag = ref(true)

const router = useRouter() //开启路由跳转功能
const mySwitch = () => { //滑动功能
    const pre_box = document.querySelector('.pre-box')
    //const img = document.querySelector("#avatar")
    if (flag.value) {
        pre_box.style.transform = "translateX(100%)"
        pre_box.style.backgroundColor = "#c9e0ed"
        img.value = luan
    }
    else {
        pre_box.style.transform = "translateX(0%)"
        pre_box.style.backgroundColor = "#edd4dc"
        img.value = luan2
    }
    flag.value = !flag.value
}

const loginForm = reactive({  //输入框内容,用户登录的
    username: '',
    password: ''
})
const registerForm = reactive({ //输入框内容,用户注册的
    username: '',
    password: '',
    confirmPassword: ''
})

const loginFormRef = ref('')
const registerFormRef = ref('')

const rules = reactive({  //输入框校验规则
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 10, message: '长度应该在2~10个字符之间', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '长度应该大于6', trigger: 'blur' },
    ],
    confirmPassword: [
        { required: true, message: '请输入确认密码', trigger: 'blur' },
        { min: 6, message: '长度应该大于6', trigger: 'blur' },
    ],
})


const login = async () => { //用户登录按钮
    console.log(radio.value);
    if (radio.value === '1') {
        const res = await LoginUser(loginForm) //获取后端数据
        if (res.code === 200) {
            ElMessage({ type: 'success', message: '用户登陆成功', })  //弹出成功消息框
            console.log(res);
            权限管理.权限 = res.data
            console.log('这是我试图修改的pinia信息',权限管理.权限.状态);
            router.push('/home/article/1')
        } else {
            ElMessage({ type: 'error', message: '用户登录失败', })   //弹出失败消息框
        }
    } else {//管理员登录按钮
        const res = await LoginAdmin(loginForm) 
        if (res.code === 200) {
            ElMessage({ type: 'success', message: '管理员登陆成功', })  //弹出成功消息框
            权限管理.权限 = res.data
            console.log('这是我试图修改的pinia信息',权限管理.权限.状态);
            router.push('/admin/home')
        } else {
            ElMessage({ type: 'error', message: '管理员登录失败', })   //弹出失败消息框
        }
    }

}
const register = async () => {//用户注册按钮
    const { username, password, confirmPassword } = registerForm
    if (password === confirmPassword) {
        let body = { username, password }
        const res = await RegisterUser(body)
        if (res.code === 200) {
            ElMessage({ type: 'success', message: '注册成功', }) //弹出成功消息框
            window.location.reload();
        } else {
            ElMessage({ type: 'error', message: '注册失败,该用户名已经存在', })   //弹出失败消息框
        }

    } else {
        ElMessage({ type: 'error', message: '两次密码不一样', })   //弹出失败消息框
    }

    console.log('这是注册按钮');
}


</script>

<style scoped>
/* 去除input的轮廓 */
input {
    outline: none;
}

.bigBox {
    /* 溢出隐藏 */
    height: calc(100vh - 16px);
    overflow-x: hidden;
    display: flex;
    /* 渐变方向从左到右 */
    background: linear-gradient(to right, rgb(247, 209, 215), rgb(191, 227, 241));
}

/* 最外层的大盒子 */
.box {
    width: 900px;
    height: 500px;
    display: flex;
    /* 相对定位 */
    position: relative;
    z-index: 2;
    margin: auto;
    /* 设置圆角 */
    border-radius: 8px;
    /* 设置边框 */
    border: 1px solid rgba(255, 255, 255, 0.6);
    /* 设置盒子阴影 */
    box-shadow: 2px 1px 19px rgba(0, 0, 0, 0.1);
}

/* 滑动的盒子 */
.pre-box {
    /* 宽度为大盒子的一半 */
    width: 50%;
    height: 100%;
    /* 绝对定位 */
    position: absolute;
    /* 距离大盒子左侧为0 */
    left: 0;
    /* 距离大盒子顶部为0 */
    top: 0;
    z-index: 99;
    border-radius: 4px;
    background-color: #edd4dc;
    box-shadow: 2px 1px 19px rgba(0, 0, 0, 0.1);
    /* 动画过渡，先加速再减速 */
    transition: 0.5s ease-in-out;
}

/* 滑动盒子的标题 */
.pre-box h1 {
    margin-top: 100px;
    text-align: center;
    /* 文字间距 */
    letter-spacing: 5px;
    color: white;
    /* 禁止选中 */
    user-select: none;
    /* 文字阴影 */
    text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 滑动盒子的文字 */
.pre-box p {
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin: 20px 0;
    /* 禁止选中 */
    user-select: none;
    font-weight: bold;
    color: white;
    text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 图片盒子 */
.img-box {
    width: 200px;
    height: 200px;
    margin: 20px auto;
    /* 设置为圆形 */
    border-radius: 50%;
    /* 设置用户禁止选中 */
    user-select: none;
    overflow: hidden;
    box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 图片 */
.img-box img {
    width: 100%;
    transition: 0.5s;
}

/* 登录和注册盒子 */
.login-form,
.register-form {
    flex: 1;
    height: 100%;
}

/* 标题盒子 */
.title-box {
    height: 200px;
    line-height: 200px;
}

/* 标题 */
.title-box h1 {
    text-align: center;
    color: white;
    /* 禁止选中 */
    user-select: none;
    letter-spacing: 5px;
    text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 输入框盒子 */
.el-form {
    display: flex;
    /* 纵向布局 */
    flex-direction: column;
    /* 水平居中 */
    align-items: center;
}

.el-form-item {
    width: 65%;
}

/* 输入框 */
input {
    /* width: 60%; */
    height: 40px;
    margin-bottom: 20px;
    text-indent: 10px;
    border: 1px solid #fff;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 120px;
    /* 增加磨砂质感 */
    backdrop-filter: blur(10px);
}

input:focus {
    /* 光标颜色 */
    color: #b0cfe9;
}

/* 聚焦时隐藏文字 */
input:focus::placeholder {
    opacity: 0;
}

/* 按钮盒子 */
.btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 按钮 */
button {
    width: 100px;
    height: 30px;
    margin: 0 7px;
    line-height: 30px;
    border: none;
    border-radius: 4px;
    background-color: #69b3f0;
    color: white;
}

/* 按钮悬停时 */
button:hover {
    /* 鼠标小手 */
    cursor: pointer;
    /* 透明度 */
    opacity: 0.8;
}

/* 按钮文字 */
.btn-box p {
    height: 30px;
    line-height: 30px;
    /* 禁止选中 */
    user-select: none;
    font-size: 14px;
    color: white;
}

.btn-box p:hover {
    cursor: pointer;
    border-bottom: 1px solid white;
}
</style>