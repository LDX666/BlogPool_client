<template>
    <!-- 二丶这是表格头上的搜索框和添加按钮 -->
    <div class="query-box">
        <el-input class="query-input" v-model="input" placeholder="请输入名称搜索🔍" @input="searchname" />
        <div class="btn-list">
            <el-button type="primary" @click="PostData">添加新数据</el-button>
        </div>
    </div>

    <!-- 三丶这是表格组件 -->
    <!-- 分页算法:arr.slice((当前页数-1)*每页页数,当前页数*当前条数) -->
    <el-table border :data="data.slice((page - 1) * limit, page * limit)" style="width: 100%  ">
        <!-- label="自定义的名称" prop="对应的参数名称" -->
        <el-table-column label="id" prop="type_id"  />
        <el-table-column label="类型名称" prop="name" />
        <el-table-column label="添加时间" prop="create_time" />
        <!-- 这是最后一列表格的内容 -->
        <el-table-column align="right">
            <template #header>
                <span>操作按钮</span>
            </template>
            <template #default="scope">
                <!-- 表格里面的修改和删除按钮 scope是这一行的数据-->
                <el-button size="small" type="success" @click="查看详情(scope)">查看详情</el-button>
                <el-button size="small" @click="修改数据(scope)">修改</el-button>
                <el-button size="small" type="danger" @click="删除数据(scope)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 四丶这是对话框组件 draggable表示可拖拽 align-center 表示对话框水平居中-->
    <el-dialog v-model="对话框状态" :title="对话框标题" draggable align-center width="900"> <!-- 这是头部标题-->
        <!-- 这里是表单组件, :rules="rules"是校验规则 -->
        <div class="box">
            <div><!-- 这是基础数据表单模块 -->
                <h3 class="center">修改名称</h3>
                <el-form :model="对话框数据" :rules="rules" label-width="auto" ref="校验结果">
                    <el-form-item label="类型名称" prop="name"> <el-input v-model="对话框数据.name" /> </el-form-item>
                </el-form>
            </div>
        </div>
        <!-- 对话框尾部的确定和取消按钮-->
        <template #footer>
            <el-button @click="对话框确定按钮">确定</el-button>
            <el-button type="primary" @click="对话框状态 = false">取消</el-button>
        </template>
    </el-dialog>


    <!-- 五丶这是分页组件 -->
    <el-pagination v-model:current-page="page" v-model:page-size="limit" :page-sizes="[10, 20, 50, 100]" background
        layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top: 20px;justify-content: center;" />
</template>

<script setup>
import { GetType, PutType, PostType, DeleteType } from "@/api/admin/Blog_type.js";
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
        data.value = searchdata.value.filter(item => item.name.match(val)) //修改name的值用于匹配表格的值
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
    对话框状态.value = true  //打开对话框
    对话框标题.value = '添加' //将对话框的标题修改成添加
    对话框数据.value = {}       //将对话框的表格数据清空
}



//二、表格部分
const data = ref([])                      //1.data是请求回来的原始表格数据
const searchdata = ref()                  //2.searchdata是副本,用来查询用的
//表格部分的方法
const change = async () => {                 //3.获取数据和复制数据 以及分页的总数方法
    const res = await GetType()  //获取后端的请求数据,axios请求
    total.value = res.total
    data.value = res.data
    searchdata.value = Object.assign(data.value) //浅拷贝数据,这样能做到一个被修改了,一个还是不变
}

// const emit = defineEmits(['emit_查看详情'])  //4.注册子组件事件,给父组件传值,用于触发添加新标签的事件
// const 查看详情 = (scope) => {
//     emit('emit_查看详情', scope.row)
//     //console.log(scope.row);
// }


const 修改数据 = (scope) => {              //5.修改数据的按钮事件,只负责打开和传数据到对话框
    对话框标题.value = '修改'   //将对话框的标题改成修改
    对话框状态.value = true   //打开对话框
    let copedata = JSON.parse(JSON.stringify(scope.row));  //使用深层拷贝，防止修改到原数据，浅层拷贝试过了，依旧会修改原数据
    对话框数据.value = copedata   //将当前表格的数据传入对话框中的表单
    console.log(对话框数据.value);  //打印数据
}
const 删除数据 = async (scope) => {       //6.删除数据的按钮事件,不用打开对话框,所以直接删除
    //console.log(scope.row);    //打印数据
    let type_id = scope.row.type_id  //获取对应的id
    try { //ElMessageBox.confirm弹出确认消息,这是点击确认的逻辑
        await ElMessageBox.confirm('是否确认', '删除数据', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', })
        console.log('这是删除的时候传给后端的值', type_id);
        const res = await DeleteType(type_id)
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
const 对话框状态 = ref()                  //1.对话框状态 用来判断对话框是否打开
const 对话框标题 = ref()             //2.对话框标题 用来定义表单头部标题的


const 校验结果 = ref(null)


const 对话框数据 = ref({ //表单数据格式
    type_id: '',
    name:'',
    create_time:''
})

const rules = reactive({  //校验规则
    name: [
        { required: true, message: '请输入值,本项不能为空', trigger: 'blur' }
    ]
})
const 对话框确定按钮 = async () => {
    //第一步,判断校验规则是否通过,通过的话不需要在执行额外操作
    try {
        await 校验结果.value.validate()
        //第二步,因为只有前面的校验规则成功,才能执行下去,添加弹窗提示
        ElMessageBox.confirm('是否确认', '标题', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', }).then(async () => {
            //第三步判断这个按钮是修改还是添加
            if (对话框标题.value === '修改') { //这是修改操作
                //第四 ① 步,执行修改操作,向后端发送数据
                try {
                    let { type_id,name } = 对话框数据.value  //获取当前修改的数据
                    let 传给后端的数据 = { type_id,name }   //将数据封装一下
                    console.log('传给后端的修改数据:',传给后端的数据); //测试的时候保留的,后面会删掉
                    let 后端返回的数据 = await PutType(传给后端的数据)
                    //第五步,根据后端返回的数据,判断结果是成功还是失败
                    if (后端返回的数据.code === 200) { 
                        //第六步,成功之后关闭对话框,刷新页面,并弹出修改成功提示
                        对话框状态.value = false  //关闭对话框
                        change()              //刷新页面
                        ElMessage({ type: 'success', message: '修改类型数据成功', })  //弹出修改成功提示
                    } else {
                        //第六步如果失败,打印失败原因,并弹出修改失败提示
                        console.log(后端返回的数据.data);                           //打印失败原因
                        ElMessage({ type: 'error', message: '修改类型数据失败', })   //弹出失败消息框
                    }
                } catch (error) {
                    //这是第四 ① 步,修改操作,向后端发送数据报错的结果,大概率不可能,但还是写一下
                    ElMessage({ type: 'error', message: `请求出错${error}`, })
                }

            } else {//这是添加操作
                //第四 ② 步,执行添加操作,向后端发送数据
                try {
                    let { name } = 对话框数据.value  //获取当前修改的数据
                    let 传给后端的数据 = { name}  //将数据封装一下
                    let 后端返回的数据 = await PostType(传给后端的数据)
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

.box {
    // width: 900px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* 创建两列，每列宽度相等 */
    grid-gap: 10px;
    /* 设置网格项之间的间隙 */

    .center {
        text-align: center;
    }
}
</style>
