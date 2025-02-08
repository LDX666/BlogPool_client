<template>
    <div class="admin_router">
        <!-- 一丶这是头部标签和搜索 -->
        <div class="title">
            <h2>用户管理</h2>
        </div>
        <!-- query -->
        <div class="query-box">
            <el-input class="query-input" v-model="搜索框数据" placeholder="请输入用户名搜索🔍" @input="搜索" />
            <div class="btn-list">
                <el-button type="primary" @click="添加按钮">增加</el-button>
            </div>
        </div>
        <!-- 二丶这是表格数据 -->
        <!-- 分页算法:arr.slice((当前页数-1)*每页页数,当前页数*当前条数) -->
        <el-table border :data="表格数据.slice((page - 1) * limit, page * limit)" style="width: 100%  ">
            <el-table-column label="编号" prop="user_id" width="60" />
            <el-table-column label="头像" prop="userurl" width="75">
                <template #default="scope">
                    <!-- scope 会把这一行的数据都转化成字符串,所以直接调用属性,全选会出问题,渲染的时候 -->
                    <el-image style="width: 50px; height: 50px" :src="`${url}/${scope.row.userurl}`" :initial-index="0"
                        fit="cover" />
                </template>
            </el-table-column>
            <el-table-column label="用户账号" prop="username" width="120" />
            <el-table-column label="用户名" prop="account" width="200" />
            <el-table-column label="密码" prop="password" />
            <el-table-column label="介绍" prop="user_introduce" />
            <el-table-column label="创建时间" prop="create_time" width="110">
                <template #default="scope">
                    <span>{{ scope.row.create_time.split('T')[0] }}</span>
                </template>
            </el-table-column>
            <!-- 这是最后一列表格的内容 -->
            <el-table-column align="right" width="140">
                <template #header>
                    <span>操作按钮</span>
                </template>
                <template #default="scope">
                    <!-- 表格里面的修改和删除按钮 -->
                    <el-button size="small" @click="修改按钮(scope)">修改</el-button>
                    <el-button size="small" type="danger" @click="删除按钮(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <!-- 三丶对话框  -->
        <!-- 四丶这是对话框组件 draggable表示可拖拽 align-center 表示对话框水平居中-->
        <el-dialog v-model="对话框状态" :title="对话框标题" draggable align-center width="700"> <!-- 这是头部标题-->
            <!-- 这里是表单组件, :rules="rules"是校验规则 -->
            <!-- 这是基础数据表单模块 -->
                <el-form :model="对话框数据" :rules="校验规则" label-width="auto" ref="校验结果" style="margin: 0 30px;">
                    <el-form-item label="用户头像" prop="userurl">
                       <UploadImg v-model="对话框数据.userurl" />
                    </el-form-item>
                    <el-form-item label="用户账号" prop="account"> 
                        <el-input v-model="对话框数据.account" /> 
                    </el-form-item>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="对话框数据.username" /> 
                    </el-form-item>
                    <el-form-item label="用户密码" prop="password" v-if="对话框标题=='添加'">
                        <el-input v-model="对话框数据.password" /> 
                    </el-form-item>
                    <el-form-item label="用户简介" prop="user_introduce">
                        <el-input v-model="对话框数据.user_introduce" /> 
                    </el-form-item>
                </el-form>
            <!-- 对话框尾部的确定和取消按钮-->
            <template #footer>
                <el-button @click="对话框确定按钮">确定</el-button>
                <el-button type="primary" @click="() => { 对话框状态 = false; 对话框数据 = {} }">取消</el-button>
            </template>
        </el-dialog>

        <!-- 四丶这是分页组件 -->
        <el-pagination v-model:current-page="page" v-model:page-size="limit" :page-sizes="[10, 20, 50, 100]" background
            layout="total, sizes, prev, pager, next, jumper" :total="total"
            style="margin-top: 20px;justify-content: center;" />
    </div>
</template>

<script setup>
import { UserManage1, UserManage2, UserManage3, UserManage4 } from "@/api/admin/UserManage.js";
import { url } from "@/config";
import { onMounted, ref } from "vue";
import UploadImg from "@/components/util/UploadImg.vue";

//一丶搜索框和添加数据部分
const 搜索框数据 = ref()        //1.与搜索框互相绑定的数据
const 查询数据 = ref()          //2.用来搜索数据,等于表格数据,由他控制搜索出来的数据渲染
const 搜索 = (val) => {         //3.用来处理模糊搜索和显示的表格数据
    //val和input的值是一样的,@input是自带的一个事件,输入框被输入时触发
    if (val.length > 0) {
        表格数据.value = 查询数据.value.filter(item => item.username.match(val)) //修改name的值用于匹配表格的值
        //将浅拷贝的数据当做查询用的,既可以查询,也可以返回给原数据
        //将对应的数据全部返回给表格,刷新表格中的数据为模糊搜索匹配到的数据
        console.log(查询数据.value);
        console.log('修改成功');
    } else {
        表格数据.value = 查询数据.value
        console.log('恢复原状');
    }

}
const 添加按钮 = async () => {     //4.打开对话框添加数据
    对话框状态.value = true  //打开对话框
    对话框标题.value = '添加' //将对话框的标题修改成添加
    对话框数据.value = {}       //将对话框的表格数据清空
}

//二丶表格部分方法
const 表格数据 = ref([])
const 修改按钮 = (scope) => {              //5.修改数据的按钮事件,只负责打开和传数据到对话框
    对话框标题.value = '修改'   //将对话框的标题改成修改
    对话框状态.value = true   //打开对话框
    let copedata = JSON.parse(JSON.stringify(scope.row));  //使用深层拷贝，防止修改到原数据，浅层拷贝试过了，依旧会修改原数据
    对话框数据.value = copedata   //将当前表格的数据传入对话框中的表单
    console.log(对话框数据.value);  //打印数据
}
const 删除按钮 = async (scope) => {       //6.删除数据的按钮事件,不用打开对话框,所以直接删除
    //console.log(scope.row);    //打印数据
    let user_id = scope.row.user_id  //获取对应的id
    try { //ElMessageBox.confirm弹出确认消息,这是点击确认的逻辑
        await ElMessageBox.confirm('是否确认', '删除数据', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', })
        console.log('这是删除的时候传给后端的值', user_id);
        const res = await UserManage4(user_id)
        console.log(res);
        if (res.code === 200) {
            ElMessage({ type: 'success', message: '删除成功', })  //弹出删除成功提示
            change()                                              //刷新页面
        } else {
            ElMessage({ type: 'warning', message: '删除失败', })
        }
    } catch (error) { //这是点击取消的逻辑,请求错误也会来到这边
        console.log(error);
        ElMessage('取消删除')
    }
    //第二步,上传user_id到数据库删除对应的数据
}

//三丶对话框部分方法
const 对话框状态 = ref()                //1.用来确认对话框是否打开
const 对话框标题 = ref()                //2.对话框的标题
const 对话框数据 = ref({                //3.对话框内表单的数据
    user_id: '',          //用户id
    account: '',     //用户账号
    username: '',    //用户名
    password: '',    //密码
    userurl: '',      //头像地址
    user_introduce: '',   //用户介绍
    create_time: ''  //创建时间
})

const 校验结果 = ref(null)              //4.校验结果,在确认按钮里使用,这里默认为不校验
const 校验规则 = ref({                  //5.校验规则
    userurl: [
        { required: true, message: '请上传图片', trigger: 'blur' }
    ],
    account: [
        { required: true, message: '账号不能为空', trigger: 'blur' },
        { min: 2, max: 10, message: '最低2个字符,最多10个字符', trigger: 'blur' }
    ],
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 6, max: 10, message: '最低6个字符,最多10个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 10, message: '最低6个字符,最多10个字符', trigger: 'blur' }
    ],
    user_introduce: [
        { required: true, message: '请输入简介', trigger: 'blur' },
        { min: 10, max: 100, message: '最低10个字,最多100字介绍', trigger: 'blur' }
    ]
})
const 对话框确定按钮 = async () => {    //6.对话框确认按钮的点击事件
    //第一步,判断校验规则是否通过,通过的话不需要在执行额外操作
    try {
        await 校验结果.value.validate() //先不校验
        //第二步,因为只有前面的校验规则成功,才能执行下去,添加弹窗提示
        ElMessageBox.confirm('是否确认', '标题', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', }).then(async () => {
            //第三步判断这个按钮是修改还是添加
            if (对话框标题.value === '修改') { //这是修改操作
                //第四 ① 步,执行修改操作,向后端发送数据
                try {
                    let { user_id,userurl,account,username,user_introduce} = 对话框数据.value  //获取当前修改的数据
                    //将数据封装一下,blog_content不是表单数据,而是子组件传过来的数据
                    let 传给后端的数据 = { user_id,userurl,account,username,user_introduce }   
                    console.log('传给后端的修改数据:', 传给后端的数据); //测试的时候保留的,后面会删掉
                    let 后端返回的数据 = await UserManage3(传给后端的数据)
                    //第五步,根据后端返回的数据,判断结果是成功还是失败
                    if (后端返回的数据.code === 200) {
                        //第六步,成功之后关闭对话框,刷新页面,并弹出修改成功提示
                        对话框状态.value = false  //关闭对话框
                        change()              //刷新页面
                        ElMessage({ type: 'success', message: '修改文章数据成功', })  //弹出修改成功提示
                    } else {
                        //第六步如果失败,打印失败原因,并弹出修改失败提示
                        console.log(后端返回的数据.data);                           //打印失败原因
                        ElMessage({ type: 'error', message: '修改文章数据失败', })   //弹出失败消息框
                    }
                } catch (error) {
                    //这是第四 ① 步,修改操作,向后端发送数据报错的结果,大概率不可能,但还是写一下
                    ElMessage({ type: 'error', message: `请求出错${error}`, })
                }

            } else {//这是添加操作
                //第四 ② 步,执行添加操作,向后端发送数据
                try {
                    let { account, username, password,user_introduce, userurl } = 对话框数据.value  //获取当前添加的数据
                    let 传给后端的数据 = { account, username, password,user_introduce, userurl }  //将数据封装一下
                    let 后端返回的数据 = await UserManage2(传给后端的数据)
                    //第五步,根据后端返回的数据,判断结果是成功还是失败
                    if (后端返回的数据.code === 200) {
                        //第六步,成功之后关闭对话框,刷新页面,并弹出添加成功提示
                        对话框状态.value = false  //关闭对话框
                        change()              //刷新页面
                        ElMessage({ type: 'success', message: '添加类型数据成功', })  //弹出修改成功提示
                    } else {
                        //第六步如果失败,打印失败原因,并弹出添加失败提示
                        console.log(后端返回的数据.data);                           //打印失败原因
                        ElMessage({ type: 'error', message: '添加类型数据失败', })   //弹出失败消息框
                    }
                } catch (error) {
                    //这是第四 ② 步,添加操作,向后端发送数据报错的结果,大概率不可能,但还是写一下
                    ElMessage({ type: 'error', message: `请求出错${error}`, })
                }
            }
        }).catch((e) => {
            //这是第二步,点击取消之后的操作,如果是添加,这里还应该吧表单数据删除掉
            console.log(e);
            ElMessage('取消修改')
        })

    } catch (error) {
        //这是第一步,校验规则不通过时,需要执行的
        ElMessage({ type: 'error', message: '请填写必要的数据' })
    }
}

//四丶分页部分
const total = ref()         //1.用来表示总共有多少数据量
const page = ref(1)         //表示当前第几页,默认为1
const limit = ref(10)       //表示当前每页有多少数据量,默认为10,看你的数组设置的多少


//五丶数据请求
const change = async () => {    //1.获取数据的方法
    const res = await UserManage1()
    表格数据.value = res.data
    total.value = res.total
    查询数据.value = Object.assign(表格数据.value)
    console.log('数据被请求了,查询是否正常');
    console.log(res);
}
onMounted(() => { change() })   //2.页面打开时请求数据
</script>

<style lang="scss" scoped>
.title {
    text-align: center;
}

.query-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.query-input {
    width: 200px;
}

.disabled {
    .el-upload--picture-card {
        display: none !important;
    }
}
</style>
