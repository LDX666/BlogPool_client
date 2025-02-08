<template>
    <!-- 一丶这是头部标签和搜索 -->
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
        <el-table-column label="文章id" prop="blog_id" width="100" />
        <el-table-column label="标题" prop="title">
            <template #default="scope">
                <span>《 {{ scope.row.title }} 》</span>
            </template>
        </el-table-column>
        <el-table-column label="头像" prop="blog_img" width="75">
            <template #default="scope">
                <!-- scope 会把这一行的数据都转化成字符串,所以直接调用属性,全选会出问题,渲染的时候 -->
                <el-image style="width: 50px; height: 50px" :src="`${url}/${scope.row.blog_img}`" :initial-index="0" fit="cover" />
            </template>
        </el-table-column>
        <el-table-column label="作者" prop="account" />
        <el-table-column label="文章介绍" prop="introduce" />
        <el-table-column label="阅读量" prop="visits" />
        <el-table-column label="举报数据" prop="data">
            <template #default="scope">
                <el-button type="primary" icon="Search" @click="打开抽屉(scope)">查看举报数据</el-button>
            </template>
        </el-table-column>
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
                <!-- 表格里面的修改和下架按钮 -->
                <el-button size="small" type="success" @click="查看按钮(scope)">查看详情</el-button>
                <el-button size="small" @click="通过按钮(scope)">清空投诉</el-button>
                <el-button size="small" type="danger" @click="下架按钮(scope)">下架文章</el-button>
            </template>
        </el-table-column>
    </el-table>




    <!-- 四丶这是分页组件 -->
    <el-pagination v-model:current-page="page" v-model:page-size="limit" :page-sizes="[10, 20, 50, 100]" background
        layout="total, sizes, prev, pager, next, jumper" :total="total"
        style="margin-top: 20px;justify-content: center;" />

    <!-- 五丶这是抽屉组件 -->
    <ReportDrawer v-model:抽屉数据="抽屉数据" v-model:抽屉状态="抽屉状态" />
    
</template>

<script setup>
import { Report1,Report2,Report3 } from "@/api/admin/Report.js";
import { url } from "@/config";
import { onMounted, ref } from "vue";
import ReportDrawer from "@/components/util/ReportDrawer.vue"




//一丶搜索框和添加数据部分
const 搜索框数据 = ref()        //1.与搜索框互相绑定的数据
const 查询数据 = ref()          //2.用来搜索数据,等于表格数据,由他控制搜索出来的数据渲染
const 搜索 = (val) => {         //3.用来处理模糊搜索和显示的表格数据
    //val和input的值是一样的,@input是自带的一个事件,输入框被输入时触发
    if (val.length > 0) {
        表格数据.value = 查询数据.value.filter(item => item.title.match(val)) //修改name的值用于匹配表格的值
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
    对话框数据.value = {}      //将对话框的表格数据清空
}

//二丶表格部分方法
const 表格数据 = ref([])

const 通过按钮 = async(scope) => {              //5.修改数据的按钮事件,只负责打开和传数据到对话框
    let blog_id = scope.row.blog_id  //获取对应的id
    try {
        await ElMessageBox.confirm('让这篇文章审核不通过，请仔细检查文章内容', '这是通过', 
        { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', })
        const res = await Report2(blog_id)
        if (res.code === 200) {
            ElMessage({ type: 'success', message: '成功通过审核', })
            change()
        } else {
            ElMessage({ type: 'warning', message: '请求失败,请检查api接口', })
        }
    } catch (error) {
        console.log(error);
        ElMessage('取消审核')
    }
}
const 下架按钮 = async (scope) => {       //6.删除数据的按钮事件,不用打开对话框,所以直接删除
    //console.log(scope.row);    //打印数据
    let blog_id = scope.row.blog_id  //获取对应的id
    try {
        await ElMessageBox.confirm('让这篇文章审核不通过，请仔细检查文章内容', '这是通过', 
        { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', })
        const res = await Report3(blog_id)
        if (res.code === 200) {
            ElMessage({ type: 'success', message: '已经下架文章', })
            change()
        } else {
            ElMessage({ type: 'warning', message: '请求失败,请检查api接口', })
        }
    } catch (error) {
        console.log(error);
        ElMessage('取消审核')
    }
}


const emit = defineEmits(['emit_查看按钮'])  //4.注册子组件事件,给父组件传值,用于触发添加新标签的事件
const 查看按钮 = (scope) => {
    emit('emit_查看按钮', scope.row)
    console.log('向父组件传值:', scope.row);
}




//四丶分页部分
const total = ref()         //1.用来表示总共有多少数据量
const page = ref(1)         //表示当前第几页,默认为1
const limit = ref(10)       //表示当前每页有多少数据量,默认为10,看你的数组设置的多少


//五丶抽屉数据
const 抽屉状态 = ref(false)
const 抽屉数据 = ref([])
const 打开抽屉 = (scope)=>{
    抽屉数据.value = scope.row.data
    抽屉状态.value = true
    console.log('返回的数据:',scope.row.data);
}

//六丶数据请求
const change = async () => {    //1.获取数据的方法
    const res = await Report1()
    表格数据.value = res.data
    total.value = res.total
    查询数据.value = Object.assign(表格数据.value)
    //------------------------------------------
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
</style>
