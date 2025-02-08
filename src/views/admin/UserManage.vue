<template>
    <div class="title">
        <h2>用户管理</h2>
    </div>
    <!-- query -->
    <div class="query-box">
        <el-input class="query-input" v-model="input" placeholder="请输入姓名搜索🔍" @input="searchname" />
        <div class="btn-list">
            <el-button type="primary" @click="handleAdd">增加</el-button>
        </div>
    </div>
    <!-- 这是表格数据 -->
    <!-- 分页算法:arr.slice((当前页数-1)*每页页数,当前页数*当前条数) -->
    <el-table border :data="data.slice((page - 1) * limit, page * limit)" style="width: 100%  ">
        <el-table-column label="编号" prop="user_id" />
        <el-table-column label="账号" prop="username" />
        <el-table-column label="密码" prop="password" />
        <!-- 这是最后一列表格的内容 -->
        <el-table-column align="right">
            <template #header>
                <span>操作按钮</span>
            </template>
            <template #default="scope">
                <!-- 表格里面的修改和删除按钮 -->
                <el-button size="small" @click="EditTable(scope)">修改</el-button>
                <el-button size="small" type="danger" @click="DeleteTable(scope)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 这是分页组件 -->
    <el-pagination v-model:current-page="page" v-model:page-size="limit" :page-sizes="[10, 20, 50, 100]" background
        layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top: 20px;justify-content: center;" />

    <!-- 对话框              这个不是主体 -->
    <el-dialog v-model="dialog" :title="title" width="500"> <!-- 这是头部标题 -->
        <!-- 这里是表单组件 -->
        <el-form label-width="auto" :model="formData" style="max-width: 600px">
            <el-form-item label="账号">
                <el-input v-model="formData.username" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formData.password" />
            </el-form-item>
        </el-form>
        <!-- 对话框尾部的确定和取消按钮-->
        <template #footer>
            <el-button @click="ConfirmButton">确定</el-button>
            <el-button type="primary" @click="dialog = false">取消</el-button>
        </template>
    </el-dialog>
</template>

<script  setup>
import { GetAllUser } from "@/api/get.js"
import axios from "axios";
import { ref } from "vue";

const dialog = ref(false) //用来表示弹窗是否弹出的
const data = ref([])      //用来接收请求数据的
const datacope = ref()    //用来拷贝请求数据用于查询数据，减少数据库请求
const input = ref()       //用来获取搜索的输入框内容
const title = ref()       //用来定义表单头部标题的
const total = ref()       //用来表示数据量的
const page = ref(1)      //表示当前第几页,默认为1
const limit = ref(10)     //表示当前每页有多少数据量,默认为10,看你的数组设置的多少

const formData = ref({  //用于定义对话框内表单的数据，是不可缺少的
    //这里面的数据不需要全部都用到,主要是我为了接收数据方便,把row获取的完整数据都写上了
    user_id: '',
    username: '',
    password: '',
    create_time: '',
    update_time: ''
})




const DeleteTable = (scope) => { //这个函数是删除表格数据用到的
    //第一步,获取想要删除的数据id
    console.log(scope.row);
    formData.value = scope.row
    const user_id = formData.value.user_id
    //第二步,上传id到数据库删除对应的数据
    axios.delete('http://localhost:3000/api/delete', {
        data: { user_id }
    }).then((res) => {
        //这是删除成功触发的回调
        console.log('删除成功', res.data);
        //重新执行以下请求刷新页面
        GetAllUser('/api/get/queryAllUser', data, datacope)
    }).catch((err) => {
        console.log(err);
    })

}
const EditTable = (scope) => {  //这个函数是打开修改对话框,并把当前行的数据赋值给对话框中的表单
    title.value = '修改'
    dialog.value = true   //打开表单对话框
    let copedata = JSON.parse(JSON.stringify(scope.row));  //使用深层拷贝，防止修改到原数据，浅层拷贝试过了，依旧会修改原数据
    formData.value = copedata   //将表格数据传入表单
    console.log(copedata.user_id);  //打印数据
}


const ConfirmButton = async () => { //添加和修改的弹出框  内部确认按钮
    if (title.value === '修改') {//判断当前是修改还是添加
        try { //这是修改的逻辑
            await ElMessageBox.confirm('是否确认', '标题', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', })
            let { user_id, username, password } = formData.value //获取当前弹出框的表单数据
            let editfromData = { user_id, username, password }      //封装数据
            let res = await axios.put('http://localhost:3000/api/put', editfromData)  //获取修改的返回值
            if (res.data.code === 200) { //如果返回值为200就返回成功的表示
                dialog.value = false  //关闭弹出矿
                GetAllUser('/api/get/queryAllUser', data, datacope, total)  //刷新页面
                ElMessage({ type: 'success', message: '处理成功', })  //弹出成功消息框
            } else {
                console.log('处理失败');
                dialog.value = true 
                ElMessage({ type: 'error', message: '处理失败', })   //弹出失败消息框
            }
        } catch (error) { //这是点击取消会触发的逻辑,也可以捕获请求失败的例子
            //暂时没有更好的解决办法 
            console.log('出错了');
            console.log(error);
        }
    } else {
        try {
            await ElMessageBox.confirm('是否确认', '标题', { cancelButtonText: '取消', confirmButtonText: '确定', type: 'warning', })
            let { username, password } = formData.value
            let adddata = { username, password }
            let res = await axios.post('http://localhost:3000/api/post', adddata)
            if (res.data.code === 200) {
                console.log('处理成功');
                dialog.value = false
                GetAllUser('/api/get/queryAllUser', data, datacope, total)
                ElMessage({ type: 'success', message: '处理成功', })
            } else {
                console.log('处理失败');
                dialog.value = true
                ElMessage({ type: 'error', message: '处理失败', })
            }
        } catch (error) {
            console.log(error);
        }
    }

}
const handleAdd = () => {   //添加数据用的
    //1.打开对话框
    dialog.value = true
    //2.将对话框的标题修改成添加
    title.value = '添加数据'
    //3.将获取的表单数据清空
    formData.value = {}
    console.log('被点击了');
}

//这个方法用来获取数据，并且把数据浅拷贝一份给第三个参数
GetAllUser('/api/get/queryAllUser', data, datacope, total)


const searchname = (val) => {  //用来处理模糊搜索和表格数据
    //val和input的值是一样的,@input是自带的一个事件,输入框被输入时触发
    if (val.length > 0) {
        data.value = datacope.value.filter(item => item.username.match(val))
        //将浅拷贝的数据当做查询用的,既可以查询,也可以返回给原数据
        console.log(datacope.value);
        console.log('修改成功');
    } else {
        data.value = datacope.value
        console.log('恢复原状');
    }

}



</script>

<style lang="scss">
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
</style>