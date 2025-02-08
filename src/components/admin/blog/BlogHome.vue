<template>
    <!-- 二丶这是表格头上的搜索框和添加按钮 -->
    <div class="query-box">
        <el-input class="query-input" v-model="input" placeholder="请输入名称搜索🔍" @input="searchname" />
        <div class="btn-list">
            <el-button type="primary" @click="添加数据">添加新数据</el-button>
        </div>
    </div>

    <!-- 三丶这是表格组件 -->
    <!-- 分页算法:arr.slice((当前页数-1)*每页页数,当前页数*当前条数) -->
    <el-table border :data="data.slice((page - 1) * limit, page * limit)" style="width: 100%  ">
        <!-- label="自定义的名称" prop="对应的参数名称" -->
        <el-table-column label="id" prop="blog_id" width="60"/>
        <el-table-column label="文章图片" prop="blog_img" width="124">
            <template #default="scope">
                <!-- scope 会把这一行的数据都转化成字符串,所以直接调用属性,全选会出问题,渲染的时候 -->
                <el-image style="width: 100px; height: 100px" :src="`${url}/${scope.row.blog_img}`" :initial-index="0" fit="cover">
                    <template #error>
                        <div>图片加载失败</div>
                    </template>
                </el-image>
            </template>
        </el-table-column>
        <el-table-column label="文章标题" prop="title" />
        <el-table-column label="文章作者" prop="account" />
        <el-table-column label="文章类型" prop="name" />
        <el-table-column label="文章简介" prop="introduce" />
        <el-table-column label="上传时间" prop="create_time" width="103">
            <template #default="scope">
                <span>{{ scope.row.create_time.split('T')[0] }}</span>
            </template>
        </el-table-column>
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
    <el-dialog v-model="对话框状态" :title="对话框标题" draggable align-center width="700"> <!-- 这是头部标题-->
        <!-- 这里是表单组件, :rules="rules"是校验规则 -->
            <!-- 这是基础数据表单模块 -->
            <el-scrollbar height="400px">
                <el-form :model="对话框数据" :rules="rules" label-width="auto" ref="校验结果" style="margin: 0 30px;">
                    <el-form-item label="文章头像" prop="blog_img"> 
                        <el-upload list-type="picture-card" accept='.jpg,.png' multiple :limit="1" :http-request="上传图片" ref="上传组件"
                            :before-upload="上传前处理" :on-remove="移除图片" :class="{disabled:图片上传状态}" >
                            <img v-if="对话框数据.blog_img" :src="`${url}/${对话框数据.blog_img}`" style="width: 100px;height: 100px;" />
                            <el-icon v-else ><Plus /></el-icon>
                         </el-upload>
                    </el-form-item>
                    <el-form-item label="文章标题" prop="title"> <el-input v-model="对话框数据.title" /> </el-form-item>
                    <el-form-item label="文章作者" prop="user_id"> 
                        <el-select v-model="对话框数据.user_id" placeholder="选择对应文章作者">
                            <!-- label是自己写的标题,value才是对应的值 -->
                            <el-option v-for="item in 文章作者多选框" :label="item.account" :value="item.user_id" />
                        </el-select> 
                    </el-form-item>
                    <el-form-item label="文章类型" prop="type_id">
                        <el-select v-model="对话框数据.type_id" placeholder="选择对应的文章类型">
                            <!-- label是自己写的标题,value才是对应的值 -->
                            <el-option v-for="item in 文章类型多选框" :label="item.name" :value="item.type_id" />
                        </el-select> 
                    </el-form-item>
                    <el-form-item label="文章简介" prop="introduce">
                        <el-input v-model="对话框数据.introduce" autosize type="textarea" maxlength="100" placeholder="请输入简介内容"
                        show-word-limit />
                    </el-form-item>
                    <el-form-item label="文章内容" prop="blog_content">
                        <WangEditor v-model="对话框数据.blog_content"  style="width: 600px;"/>
                    </el-form-item>
                </el-form>
            </el-scrollbar>
        <!-- 对话框尾部的确定和取消按钮-->
        <template #footer>
            <el-button @click="对话框确定按钮">确定</el-button>
            <el-button type="primary" @click="()=>{对话框状态 = false;对话框数据 = {}}">取消</el-button>
        </template>
    </el-dialog>


    <!-- 五丶这是分页组件 -->
    <el-pagination v-model:current-page="page" v-model:page-size="limit" :page-sizes="[5, 20, 50, 100]" background
        layout="total, sizes, prev, pager, next, jumper" :total="total"
        style="margin-top: 20px;justify-content: center;" />
</template>

<script setup>
import { GetBlog, PutBlog, PostBlog, DeleteBlog } from "@/api/admin/Blog.js";
import { onMounted, reactive, ref, defineEmits, onBeforeUpdate } from "vue";
import { url } from "@/config"
import axios from "axios";
import WangEditor from "@/components/user/article/WangEditor.vue";
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
        data.value = searchdata.value.filter(item => item.title.match(val)) //修改name的值用于匹配表格的值
        //将浅拷贝的数据当做查询用的,既可以查询,也可以返回给原数据
        //将对应的数据全部返回给表格,刷新表格中的数据为模糊搜索匹配到的数据
        console.log(searchdata.value);
        console.log('修改成功');
    } else {
        data.value = searchdata.value
        console.log('恢复原状');
    }

}
const 添加数据 = async () => {    //3.添加数据的按钮事件,这次多半不需要
    对话框状态.value = true  //打开对话框
    对话框标题.value = '添加' //将对话框的标题修改成添加
    对话框数据.value = {}       //将对话框的表格数据清空
}



//二、表格部分
const data = ref([])                      //1.data是请求回来的原始表格数据
const searchdata = ref()                  //2.searchdata是副本,用来查询用的
//表格部分的方法
const change = async () => {                 //3.获取数据和复制数据 以及分页的总数方法
    const res = await GetBlog()  //获取后端的请求数据,axios请求
    文章作者多选框.value = res.name
    文章类型多选框.value = res.type
    total.value = res.total
    data.value = res.data
    console.log('这是表格数据:', data.value);
    searchdata.value = Object.assign(data.value) //浅拷贝数据,这样能做到一个被修改了,一个还是不变
    console.log('这是查询框数据:', searchdata.value);
}

const emit = defineEmits(['emit_查看详情'])  //4.注册子组件事件,给父组件传值,用于触发添加新标签的事件
const 查看详情 = (scope) => {
    emit('emit_查看详情', scope.row)
    console.log('向父组件传值:',scope.row);
}

const 修改数据 = (scope) => {              //5.修改数据的按钮事件,只负责打开和传数据到对话框
    对话框标题.value = '修改'   //将对话框的标题改成修改
    对话框状态.value = true   //打开对话框
    let copedata = JSON.parse(JSON.stringify(scope.row));  //使用深层拷贝，防止修改到原数据，浅层拷贝试过了，依旧会修改原数据
    对话框数据.value = copedata   //将当前表格的数据传入对话框中的表单
    console.log(对话框数据.value);  //打印数据
}
const 删除数据 = async (scope) => {       //6.删除数据的按钮事件,不用打开对话框,所以直接删除
    //console.log(scope.row);    //打印数据
    let bolg_id = scope.row.bolg_id  //获取对应的id
    try { //ElMessageBox.confirm弹出确认消息,这是点击确认的逻辑
        await ElMessageBox.confirm('是否确认', '删除数据', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', })
        console.log('这是删除的时候传给后端的值', bolg_id);
        const res = await DeleteBlog(bolg_id)
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

const 文章作者多选框 = ref()
const 文章类型多选框 = ref()

const 校验结果 = ref(null)





const 对话框数据 = ref({ //表单数据格式
    bolg_id: '',
    blog_img: '',
    title: '',
    user_id: '',
    account: '',
    type_id: '',
    introduce: '',
    blog_content: '',  //这个文章内容不便展示,但是可以在修改的时候展示
    craete_time:''
})

const rules = reactive({  //校验规则
    blog_img:[
        {required: true, message: '请上传图片', trigger: 'blur'}
    ],
    title: [
        { required: true, message: '标题不能为空', trigger: 'blur' }
    ],
    user_id: [
        { required: true, message: `选择用户,作者不能为空`, trigger: "change" }
    ],
    type_id: [
    { required: true, message: '选择文章类型,类型不能为空', trigger: 'change' }
    ],
    introduce: [
        { required: true, message: '请输入简介', trigger: 'blur' },
        { min: 10, max: 100, message: '最低10个字,最多100字介绍', trigger: 'blur' }
    ]
})

// 这一部分是上传头像用的
const 上传组件  =  ref()
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
    console.log('图片上传成功:查看一下上传组件的值',上传组件.value);
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

const 对话框确定按钮 = async () => {
    //第一步,判断校验规则是否通过,通过的话不需要在执行额外操作
    try {
        await 校验结果.value.validate() //先不校验
        //第二步,因为只有前面的校验规则成功,才能执行下去,添加弹窗提示
        ElMessageBox.confirm('是否确认', '标题', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', }).then(async () => {
            //第三步判断这个按钮是修改还是添加
            if (对话框标题.value === '修改') { //这是修改操作
                //第四 ① 步,执行修改操作,向后端发送数据
                console.log('这是修改的值:',对话框数据.value);
                try {
                    let { blog_id, blog_img, title, user_id, type_id, introduce, blog_content} = 对话框数据.value  //获取当前修改的数据
                    //将数据封装一下,blog_content不是表单数据,而是子组件传过来的数据
                    let 传给后端的数据 = { blog_id, blog_img, title, user_id, type_id, introduce, blog_content }   
                    console.log('传给后端的修改数据:', 传给后端的数据); //测试的时候保留的,后面会删掉
                    let 后端返回的数据 = await PutBlog(传给后端的数据)
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
                    let { user_id, blog_img, title, type_id, introduce, blog_content } = 对话框数据.value  //获取当前修改的数据
                    let 传给后端的数据 = { user_id, blog_img, title, type_id, introduce, blog_content }  //将数据封装一下,blog_content是子组件传过来的
                    let 后端返回的数据 = await PostBlog(传给后端的数据)
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


//四、分页部分

const total = ref()             //6.用来表示数据量的
const page = ref(1)             //7.表示当前第几页,默认为1
const limit = ref(5)           //8.表示当前每页有多少数据量,默认为10,看你的数组设置的多少


onBeforeUpdate(()=>{
    console.log('数据变更了');
    console.log('这时候文章数据的值为:',对话框数据.value);
})
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

.disabled{
    .el-upload--picture-card {
        display: none !important;
    }
} 
</style>
