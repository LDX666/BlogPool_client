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
        <el-table-column label="id" prop="cpu_id" width="100" />
        <el-table-column label="处理器名称" prop="处理器名称" width="180" />
        <el-table-column label="内核数" prop="内核数" width="100" />
        <el-table-column label="总线程数" prop="总线程数" width="100" />
        <el-table-column label="缓存" prop="缓存" width="150" />
        <el-table-column label="TDP" prop="TDP" width="150" />
        <el-table-column label="发行日期" prop="发行日期" width="150" />
        <!-- 这是最后一列表格的内容 -->
        <el-table-column align="right">
            <template #header>
                <span>操作按钮</span>
            </template>
            <template #default="scope">
                <!-- 表格里面的修改和删除按钮 scope是这一行的数据-->
                <el-button size="small" type="success" @click="查看详情(scope)">查看详情</el-button>
                <el-button size="small" @click="EditTable(scope)">修改</el-button>
                <el-button size="small" type="danger" @click="DeleteTable(scope)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 四丶这是对话框组件 draggable表示可拖拽 align-center 表示对话框水平居中-->
    <el-dialog v-model="对话框状态" :title="对话框标题" draggable align-center width="900"> <!-- 这是头部标题-->
        <!-- 这里是表单组件, :rules="rules"是校验规则 -->
        <div class="box">
            <div><!-- 这是基础数据表单模块 -->
                <h3 class="center">基础数据</h3>
                <el-form :model="对话框数据" :rules="rules" label-width="auto" ref="校验结果1">
                    <el-form-item label="处理器名称" prop="处理器名称"> <el-input v-model="对话框数据.处理器名称" /> </el-form-item>
                    <el-form-item label="内核数" prop="内核数"> <el-input v-model="对话框数据.内核数" /> </el-form-item>
                    <el-form-item label="总线程数" prop="总线程数"> <el-input v-model="对话框数据.总线程数" /> </el-form-item>
                    <el-form-item label="处理器基本频率"> <el-input v-model="对话框数据.处理器基本频率" /> </el-form-item>
                    <el-form-item label="处理器最大频率" prop="处理器最大睿频频率"> <el-input v-model="对话框数据.处理器最大睿频频率" />
                    </el-form-item>
                    <el-form-item label="缓存" prop="缓存"><el-input v-model="对话框数据.缓存" /></el-form-item>
                    <el-form-item label="TDP"> <el-input v-model="对话框数据.TDP" /></el-form-item>
                    <el-form-item label="光刻" prop="光刻"> <el-input v-model="对话框数据.光刻" /> </el-form-item>
                    <el-form-item label="属于什么系列" prop="系列id"> <el-input v-model="对话框数据.系列id" /> </el-form-item>
                    <el-form-item label="发行日期" prop=""><el-input v-model="对话框数据.发行日期" /></el-form-item>
                </el-form>
            </div>
            <div><!-- 这是核显和内存数据表单模块 -->
                <h3 class="center">核显和内存数据</h3>
                <el-form :model="对话框数据" :rules="rules" label-width="auto" ref="校验结果2">
                    <el-form-item label="核显名称"> <el-input v-model="对话框数据.核显名称" /></el-form-item>
                    <el-form-item label="显卡基本频率"> <el-input v-model="对话框数据.显卡基本频率" /></el-form-item>
                    <el-form-item label="显卡最大频率"> <el-input v-model="对话框数据.显卡最大加速频率" /></el-form-item>
                    <el-form-item label="支持的显示器数量"> <el-input v-model="对话框数据.支持的显示器数量" /></el-form-item>
                    <el-form-item>
                        <span style="justify-content: center;">↓ 内存数据 ↓</span>
                    </el-form-item>
                    <el-form-item label="内存类型" prop="内存类型"> <el-input v-model="对话框数据.内存类型" /></el-form-item>
                    <el-form-item label="最大内存通道数"> <el-input v-model="对话框数据.最大内存通道数" /></el-form-item>
                    <el-form-item label="是否支持ecc内存"> <el-input v-model="对话框数据.支持ECC内存" /></el-form-item>
                    <el-form-item label="最大内存容量" prop="最大内存容量"> <el-input v-model="对话框数据.最大内存容量" /></el-form-item>
                    <el-form-item label="支持的插槽类型" prop="支持的插槽类型"> <el-input v-model="对话框数据.支持的插槽类型" /></el-form-item>
                </el-form>
            </div>
            <div><!-- 这是十二代之后出现的数据表单模块 -->
                <h3 class="center">十二代之后出现的数据</h3>
                <el-form :model="对话框数据" label-width="auto">
                    <el-form-item label="处理器基本功耗"> <el-input v-model="对话框数据.处理器基本功耗" /> </el-form-item>
                    <el-form-item label="处理器最大功耗"> <el-input v-model="对话框数据.处理器最大功耗" /> </el-form-item>
                    <el-form-item label="性能核数"> <el-input v-model="对话框数据.性能核数" /> </el-form-item>
                    <el-form-item label="性能核基本频率"> <el-input v-model="对话框数据.性能核基本频率" /> </el-form-item>
                    <el-form-item label="性能核最大频率"> <el-input v-model="对话框数据.性能核最大睿频频率" /> </el-form-item>
                    <el-form-item label="能效核数"> <el-input v-model="对话框数据.能效核数" /> </el-form-item>
                    <el-form-item label="能效核基本频率"> <el-input v-model="对话框数据.能效核基本频率" /> </el-form-item>
                    <el-form-item label="能效核最大频率"> <el-input v-model="对话框数据.能效核最大睿频频率" /> </el-form-item>
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
import { GetCpu, PutCpu, PostCpu, DeleteCpu } from "@/api/Cpu.js";
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
        data.value = searchdata.value.filter(item => item.处理器名称.match(val))
        //将浅拷贝的数据当做查询用的,既可以查询,也可以返回给原数据
        //将对应的数据全部返回给表格,刷新表格中的数据为模糊搜索匹配到的数据
        console.log(searchdata.value);
        console.log('查询成功');
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
    const res = await GetCpu()  //获取后端的请求数据,axios请求
    total.value = res.total
    多选框.value = res.name
    data.value = res.data
    searchdata.value = Object.assign(data.value) //浅拷贝数据,这样能做到一个被修改了,一个还是不变
}

const emit = defineEmits(['emit_查看详情'])  //4.注册子组件事件,给父组件传值,用于触发添加新标签的事件
const 查看详情 = (scope) => {
    emit('emit_查看详情', scope.row)
    //console.log(scope.row);
}


const EditTable = (scope) => {              //5.修改数据的按钮事件,只负责打开和传数据到对话框
    对话框标题.value = '修改'   //将对话框的标题改成修改
    对话框状态.value = true   //打开对话框
    let copedata = JSON.parse(JSON.stringify(scope.row));  //使用深层拷贝，防止修改到原数据，浅层拷贝试过了，依旧会修改原数据
    对话框数据.value = copedata   //将当前表格的数据传入对话框中的表单
    console.log(对话框数据.value);  //打印数据
}
const DeleteTable = async (scope) => {       //6.删除数据的按钮事件,不用打开对话框,所以直接删除
    //console.log(scope.row);    //打印数据
    let Cpu_id = scope.row.cpu_id  //获取对应的id
    try { //ElMessageBox.confirm弹出确认消息,这是点击确认的逻辑
        await ElMessageBox.confirm('是否确认', '删除数据', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', })
        const res = await DeleteCpu(Cpu_id)
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
const 多选框 = ref()                  //3.定义多选框数据的,获取对应的代号id和名称

const 校验结果1 = ref(null)
const 校验结果2 = ref(null)

const 对话框数据 = ref({ //表单数据格式
    TDP: '',
    cpu_id: '',
    修改时间: '',
    光刻: '',
    内存类型: '',
    内核数: '',
    发行日期: '',
    处理器名称: '',
    处理器基本功耗: '',
    处理器基本频率: '',
    处理器最大功耗: '',
    处理器最大睿频频率: '',
    性能核基本频率: '',
    性能核数: '',
    性能核最大睿频频率: '',
    总线程数: '',
    支持ECC内存: '',
    支持的插槽类型: '',
    支持的显示器数量: '',
    数据添加时间: '',
    显卡基本频率: '',
    显卡最大内存: '',
    显卡最大加速频率: '',
    最大CPU配置数: '',
    最大内存容量: '',
    最大内存通道数: '',
    核显名称: '',
    系列id: '',
    缓存: '',
    能效核基本频率: '',
    能效核数: '',
    能效核最大睿频频率: ''
})

const rules = reactive({  //校验规则
    处理器名称: [
        { required: true, message: '请输入值,本项不能为空', trigger: 'blur' }
    ],
    内核数: [
        { required: true, message: '请输入值,本项不能为空', trigger: 'blur' }
    ],
    总线程数: [
        { required: true, message: '请输入值,本项不能为空', trigger: 'blur' }
    ],
    处理器最大睿频频率: [
        { required: true, message: '请输入值,本项不能为空', trigger: 'blur' }
    ],
    缓存: [
        { required: true, message: '请输入值,本项不能为空', trigger: 'blur' }
    ],
    光刻: [
        { required: true, message: '请输入值,本项不能为空', trigger: 'blur' }
    ],
    系列id: [
        { required: true, message: '请输入值,本项不能为空', trigger: 'blur' }
    ],
    内存类型: [
        { required: true, message: '请输入值,本项不能为空', trigger: 'blur' }
    ],
    最大内存容量: [
        { required: true, message: '请输入值,本项不能为空', trigger: 'blur' }
    ],
    支持的插槽类型: [
        { required: true, message: '请输入值,本项不能为空', trigger: 'blur' }
    ],
    // 系列名称: [
    //   { required: true, message: '请输入值,本项不能为空', trigger: 'blur' },
    //   { min: 1, message: '输入项长度大于1', trigger: 'blur' },
    // ],
    代号id: [
        { required: true, message: '请选择一项,本项不能为空', trigger: 'blur', },
    ]
})
const 对话框确定按钮 = async () => {
    //第一步,判断校验规则是否通过,通过的话不需要在执行额外操作
    try {
        await Promise.all([校验结果1.value.validate(),校验结果2.value.validate()])
        //第二步,因为只有前面的校验规则成功,才能执行下去,添加弹窗提示
        ElMessageBox.confirm('是否确认', '标题', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', }).then(async () => {
            //第三步判断这个按钮是修改还是添加
            if (对话框标题.value === '修改') { //这是修改操作
                //第四 ① 步,执行修改操作,向后端发送数据
                try {
                    let { cpu_id, 处理器名称, 内核数, 性能核数, 能效核数, 总线程数, 性能核基本频率, 能效核基本频率,
                        处理器基本频率, 性能核最大睿频频率, 能效核最大睿频频率, 处理器最大睿频频率, 缓存, 光刻, TDP,
                        处理器基本功耗, 处理器最大功耗, 发行日期, 系列id, 内存类型, 最大内存容量, 最大内存通道数,
                        核显名称, 显卡基本频率, 显卡最大加速频率, 显卡最大内存, 支持的显示器数量, 支持ECC内存,
                        支持的插槽类型, 最大CPU配置数 } = 对话框数据.value  //获取当前修改的数据
                    let 传给后端的数据 = { //将数据封装一下
                        cpu_id, 处理器名称, 内核数, 性能核数, 能效核数, 总线程数, 性能核基本频率, 能效核基本频率,
                        处理器基本频率, 性能核最大睿频频率, 能效核最大睿频频率, 处理器最大睿频频率, 缓存, 光刻, TDP,
                        处理器基本功耗, 处理器最大功耗, 发行日期, 系列id, 内存类型, 最大内存容量, 最大内存通道数,
                        核显名称, 显卡基本频率, 显卡最大加速频率, 显卡最大内存, 支持的显示器数量, 支持ECC内存,
                        支持的插槽类型, 最大CPU配置数
                    }
                    console.log(传给后端的数据); //测试的时候保留的,后面会删掉
                    let 后端返回的数据 = await PutCpu(传给后端的数据)
                    //第五步,根据后端返回的数据,判断结果是成功还是失败
                    if (后端返回的数据.code === 200) { 
                        //第六步,成功之后关闭对话框,刷新页面,并弹出修改成功提示
                        对话框状态.value = false  //关闭对话框
                        change()              //刷新页面
                        ElMessage({ type: 'success', message: '修改cpu数据成功', })  //弹出修改成功提示
                    } else {
                        //第六步如果失败,打印失败原因,并弹出修改失败提示
                        console.log(后端返回的数据.data);                           //打印失败原因
                        ElMessage({ type: 'error', message: '修改cpu数据失败', })   //弹出失败消息框
                    }
                } catch (error) {
                    //这是第四 ① 步,修改操作,向后端发送数据报错的结果,大概率不可能,但还是写一下
                    ElMessage({ type: 'error', message: `请求出错${error}`, })
                }

            } else {//这是添加操作
                //第四 ② 步,执行添加操作,向后端发送数据
                try {
                    let { 处理器名称, 内核数, 性能核数, 能效核数, 总线程数, 性能核基本频率, 能效核基本频率,
                        处理器基本频率, 性能核最大睿频频率, 能效核最大睿频频率, 处理器最大睿频频率, 缓存, 光刻, TDP,
                        处理器基本功耗, 处理器最大功耗, 发行日期, 系列id, 内存类型, 最大内存容量, 最大内存通道数,
                        核显名称, 显卡基本频率, 显卡最大加速频率, 显卡最大内存, 支持的显示器数量, 支持ECC内存,
                        支持的插槽类型, 最大CPU配置数 } = 对话框数据.value  //获取当前修改的数据
                    let 传给后端的数据 = { //将数据封装一下
                        处理器名称, 内核数, 性能核数, 能效核数, 总线程数, 性能核基本频率, 能效核基本频率,
                        处理器基本频率, 性能核最大睿频频率, 能效核最大睿频频率, 处理器最大睿频频率, 缓存, 光刻, TDP,
                        处理器基本功耗, 处理器最大功耗, 发行日期, 系列id, 内存类型, 最大内存容量, 最大内存通道数,
                        核显名称, 显卡基本频率, 显卡最大加速频率, 显卡最大内存, 支持的显示器数量, 支持ECC内存,
                        支持的插槽类型, 最大CPU配置数
                    }
                    let 后端返回的数据 = await PostCpu(传给后端的数据)
                    //第五步,根据后端返回的数据,判断结果是成功还是失败
                    if (后端返回的数据.code === 200) { 
                        //第六步,成功之后关闭对话框,刷新页面,并弹出添加成功提示
                        对话框状态.value = false  //关闭对话框
                        change()              //刷新页面
                        ElMessage({ type: 'success', message: '添加cpu数据成功', })  //弹出修改成功提示
                    } else {
                        //第六步如果失败,打印失败原因,并弹出添加失败提示
                        console.log(后端返回的数据.data);                           //打印失败原因
                        ElMessage({ type: 'error', message: '添加cpu数据失败', })   //弹出失败消息框
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
