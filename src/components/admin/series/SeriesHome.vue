<template>
    <!-- 二丶这是表格头上的搜索框和添加按钮 -->
    <div class="query-box">
        <el-input class="query-input" v-model="input" placeholder="请输入名称搜索🔍" @input="searchname" />
        <div class="btn-list">
            <el-button type="primary" @click="PostData">增加</el-button>
        </div>
    </div>

    <!-- 三丶这是表格组件 -->
    <!-- 分页算法:arr.slice((当前页数-1)*每页页数,当前页数*当前条数) -->
    <el-table border :data="data.slice((page - 1) * limit, page * limit)" style="width: 100%  ">
        <!-- label="自定义的名称" prop="对应的参数名称" -->
        <el-table-column label="id" prop="series_id" width="100" />
        <el-table-column label="系列名称" prop="系列名称" width="400" />
        <el-table-column label="代号id" prop="代号id" width="100" />
        <el-table-column label="代号名称" prop="代号名称" width="300" />
        <!-- 这是最后一列表格的内容 -->
        <el-table-column align="right">
            <template #header>
                <span>操作按钮</span>
            </template>
            <template #default="scope">
                <!-- 表格里面的修改和删除按钮 scope是这一行的数据-->
                <el-button size="small" type="success" @click="OpenTabs(scope)">查看对应的cpu</el-button>
                <el-button size="small" @click="EditTable(scope)">修改</el-button>
                <el-button size="small" type="danger" @click="DeleteTable(scope)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>



    <!-- 四丶这是对话框组件 -->
    <el-dialog v-model="dialog" :title="dialogtitle" width="500"> <!-- 这是头部标题-->
        <!-- 这里是表单组件, :rules="rules"是校验规则 -->
        <el-form label-width="auto" :model="formData" :rules="rules" ref="校验结果" style="max-width: 600px">
            <el-form-item label="系列名称" prop="系列名称"> <!-- 这里是每一项的左边标题,prop="name" 是他匹配的校验规则-->
                <el-input v-model="formData.系列名称" placeholder="请输入系列名称" /> <!-- 这里是表单组件内部的输入框,placeholder是默认的值-->
            </el-form-item>
            <el-form-item label="选择所属的代号" prop="代号id">
                <el-select v-model="formData.代号id" placeholder="选择对应的代号">
                    <!-- label是自己写的标题,value才是对应的值 -->
                    <el-option v-for="item in 多选框" :label="item.代号名称" :value="item.code_id" />
                </el-select>
            </el-form-item>
        </el-form>
        <!-- 对话框尾部的确定和取消按钮-->
        <template #footer>
            <el-button @click="ConfirmButton">确定</el-button>
            <el-button type="primary" @click="dialog = false">取消</el-button>
        </template>
    </el-dialog>
    <!-- 五丶这是分页组件 -->
    <el-pagination v-model:current-page="page" v-model:page-size="limit" :page-sizes="[10, 20, 50, 100]" background
        layout="total, sizes, prev, pager, next, jumper" :total="total"
        style="margin-top: 20px;justify-content: center;" />

</template>

<script setup>
import { GetSeries, PutSeries, PostSeries, DeleteSeries } from "@/api/Series.js";
import { onMounted, reactive, ref, defineEmits } from "vue";

//组件初始化需要的数据

onMounted(() => { //一开始就调用函数
    change()
})

//一、搜索部分
const input = ref()             //1.input用来获取搜索的输入框内容
//搜索部分的方法
const searchname = (val) => {   //2.用来处理模糊搜索和显示的表格数据
    //val和input的值是一样的,@input是自带的一个事件,输入框被输入时触发
    if (val.length > 0) {
        data.value = searchdata.value.filter(item => item.username.match(val))
        //将浅拷贝的数据当做查询用的,既可以查询,也可以返回给原数据
        //将对应的数据全部返回给表格,刷新表格中的数据为模糊搜索匹配到的数据
        console.log(searchdata.value);
        console.log('修改成功');
    } else {
        data.value = searchdata.value
        console.log('恢复原状');
    }

}
const PostData = async () => {    //3.添加数据的按钮事件
    dialog.value = true  //打开对话框
    dialogtitle.value = '添加' //将对话框的标题修改成添加
    formData.value = {}       //将对话框的表格数据清空
}



//二、表格部分
const data = ref([])                      //1.data是请求回来的原始表格数据
const searchdata = ref()                  //2.searchdata是副本,用来查询用的
//表格部分的方法
const change = async () => {                 //3.获取数据和复制数据 以及分页的总数方法
    const res = await GetSeries()  //获取后端的请求数据,axios请求
    total.value = res.total
    多选框.value = res.name
    data.value = res.data
    searchdata.value = Object.assign(data.value) //浅拷贝数据,这样能做到一个被修改了,一个还是不变
}

const emit = defineEmits(['emit_opentab'])  //4.注册子组件事件,给父组件传值,用于触发添加新标签的事件
const OpenTabs = (scope) => {
    emit('emit_opentab', scope.row)
    //console.log('子组件传过来的值:',scope.row);
}


const EditTable = (scope) => {              //5.修改数据的按钮事件,只负责打开和传数据到对话框
    dialogtitle.value = '修改'   //将对话框的标题改成修改
    dialog.value = true   //打开对话框
    formData.value = scope.row   //将当前表格的数据传入对话框中的表单
    console.log(scope.row.Series_id);  //打印数据
}
const DeleteTable = async (scope) => {       //6.删除数据的按钮事件,不用打开对话框,所以直接删除
    console.log(scope.row);    //打印数据
    let Series_id = scope.row.Series_id  //获取对应的id
    try { //ElMessageBox.confirm弹出确认消息,这是点击确认的逻
        await ElMessageBox.confirm('是否确认', '删除数据', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', })
        const res = await DeleteSeries(Series_id)
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
    //第二步,上传id到数据库删除对应的数据

}




//三、对话框部分
const dialog = ref()                  //1.dialog 用来判断对话框是否打开
const dialogtitle = ref()             //2.dialogtitle 用来定义表单头部标题的
const 多选框 = ref()                  //3.定义多选框数据的,获取对应的代号id和名称
const 校验结果 = ref(null)
const formData = ref({                //4.用于定义对话框内表单的数据，是不可缺少的
    //这里面的数据不需要全部都用到,主要是我为了接收数据方便,把row获取的完整数据都写上了
    Series_id: '',
    系列名称: '',
    代号id: ''   //这是对话框中的选择器的数据,label是自己起的名字,value才是值
})
const rules = reactive({
    系列名称: [
        { required: true, message: '请输入值,本项不能为空', trigger: 'blur' },
    ],
    代号id: [
        { required: true, message: '请选择一项,本项不能为空', trigger: 'blur', },
    ]
})
const ConfirmButton = async () => {           //5.确认按钮的点击事件,很重要,取消按钮没有事件
    //console.log(formData.value);
    //第一步,判断校验规则是否通过,通过的话不需要在执行额外操作
    try {
        await 校验结果.value.validate()
        //第二步,因为只有前面的校验规则成功,才能执行下去,添加弹窗提示
        ElMessageBox.confirm('是否确认', '标题', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', }).then(async () => {
            //第三步判断这个按钮是修改还是添加
            if (dialogtitle.value === '修改') { //这是修改操作
                //第四 ① 步,执行修改操作,向后端发送数据
                try {
                    let { Series_id, 系列名称, 代号id } = formData.value  //获取当前修改的数据
                    let putdata = { Series_id, 系列名称, 代号id }
                    console.log(putdata);
                    let res = await PutSeries(putdata)     //发送修改请求
                    if (res.code === 200) { //判断请求是否成功 
                        dialog.value = false  //请求成功关闭弹出框
                        change()              //请求成功刷新页面
                        ElMessage({ type: 'success', message: '修改系列数据成功', })  //弹出成功消息框
                    } else {
                        console.log(res.data);                               //打印失败原因
                        ElMessage({ type: 'error', message: '修改系列数据失败', })   //弹出失败消息框
                    }
                } catch (error) {
                    //这是第四 ① 步,修改操作,向后端发送数据报错的结果,大概率不可能,但还是写一下
                    ElMessage({ type: 'error', message: `请求出错${error}`, })
                }

            } else {//这是添加操作
                //第四 ② 步,执行添加操作,向后端发送数据
                try {
                    let { 系列名称, 代号id } = formData.value   //获取数据
                    console.log(formData.value);
                    let adddata = { 系列名称, 代号id }            //封装数据
                    console.log(adddata);
                    let res = await PostSeries(adddata)   //返回请求结果
                    if (res.code === 200) {   //判断请求是否成功
                        dialog.value = false  //请求成功关闭弹出框
                        change()              //请求成功刷新页面
                        ElMessage({ type: 'success', message: '添加系列数据成功', })  //弹出成功消息框
                    } else {
                        console.log(res.err);                               //打印失败原因
                        ElMessage({ type: 'error', message: '添加系列数据失败', })   //弹出失败消息框
                    }
                } catch (error) {
                    //这是第四 ② 步,添加操作,向后端发送数据报错的结果,大概率不可能,但还是写一下
                    ElMessage({ type: 'error', message: `请求出错${error}`, })
                }
            }
        }).catch((e) => {
            //这是第二步,点击取消之后的操作,这里的错误没有意义
            console.log(e);
            ElMessage('取消修改')
        })

    } catch (error) {
        //这是第一步,校验规则不通过时,需要执行的
        ElMessage({ type: 'error', message: '请填写必要的数据' })
    }
}



//四、分页部分
const total = ref()             //6.用来表示数据量的
const page = ref(1)             //7.表示当前第几页,默认为1
const limit = ref(10)           //8.表示当前每页有多少数据量,默认为10,看你的数组设置的多少












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
