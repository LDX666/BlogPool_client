<template>
    <div class="admin_router">
        <el-tabs v-model="默认打开的标签值" type="card" editable @tab-remove="移除标签">
            <el-tab-pane label="系列管理" name="0">
                <AdminReportBlogHome @emit_查看按钮="打开标签页" />
            </el-tab-pane>
            <el-tab-pane v-for="item in 标签组" :key="item.name" :label="item.title" :name="item.name"
                style="background-color: #f2f3f5;">
                <!-- 这个路由组件会复用，就是有缓存，默认如果其他地方不变，就会沿着上一次的渲染使用，节省资源，
                我们让他每次传入的值不一样，就可以解决这个问题 -->
                <BlogDetail :传给子组件的值="item.props" />
            </el-tab-pane>
        </el-tabs>
    </div>

</template>

<script setup>
import { ref } from 'vue'
import AdminReportBlogHome from "@/components/admin/report_blog/AdminReportBlogHome.vue"
import BlogDetail from "@/components/admin/blog/BlogDetail.vue"
//  import { useRouter } from "vue-router";

//const router = useRouter()
const 默认打开的标签值 = ref('0')
const 标签组 = ref([])

const 打开标签页 = async (data) => {//这个data是子组件事件触发的时候传过来的值
    console.log('传给子组件的值:', data);
    //第一步,从组件中拿到想要传递的值
    //第三步,打开一个新标签页,并将这两个值传进去
    let {account,create_time,introduce,title,name,blog_content} = data
    const props = {account,create_time,introduce,title,name,blog_content}
    标签组.value.push({
        title: data.title,  //title是标签的名称
        name: data.blog_id,      //name是标签的id,用文章id给他就行
        props: props   //将props作为值直接传给这个数组,因为数组直接被v-for解析了,这样可以传给里面的子组件,
        //并且保证了每个子组件接收的值都是不同的,不会变成打开一个组件,值就刷新一遍
    })
    //第四步,打开刚才添加的标签页
    默认打开的标签值.value = data.blog_id
    //第五步,看看打印的结果是否正确
    console.log('这是新的标签组数据:', 标签组.value);
}

const 移除标签 = (name) => {
    console.log("移除的标签的name值:", name)
    const 需要移除的标签值 = name;
    // 1.找到需要删除对象的索引  
    const 标签组内的索引值 = 标签组.value.findIndex(obj => obj.name === 需要移除的标签值);
    // 如果找到了索引，则使用splice方法删除该对象  
    if (标签组内的索引值 !== -1) {
        标签组.value.splice(标签组内的索引值, 1);
    }
    // 更新默认打开的标签值  
    let 新的标签值;
    if (标签组内的索引值 > 0) {
        // 如果不是第一个标签页，则激活前一个标签页  
        新的标签值 = 标签组.value[标签组内的索引值 - 1].name;
    } else if (标签组.value.length > 0) {
        // 如果是第一个标签页且还有其他标签页，则激活下一个标签页  
        新的标签值 = 标签组.value[0].name;
    } else {
        // 如果没有其他标签页了，则可能需要处理为空的情况，比如重置为初始标签页等  
        新的标签值 = '0'; // 假设初始标签页的name是'0'  
    }

    默认打开的标签值.value = 新的标签值;
}

</script>

<style lang="scss">
//这是遮挡右上角添加按钮用的
.el-tabs__new-tab {
    display: none;
}
</style>