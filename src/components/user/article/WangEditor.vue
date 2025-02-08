<template>
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" />
        <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
            @onCreated="handleCreated" @onChange="handleChange" />
    </div>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { url } from "@/config";
import { onBeforeUnmount, ref, shallowRef, onMounted, watch  } from 'vue'
import { Editor, Toolbar  } from '@wangeditor/editor-for-vue'



// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

//模拟 ajax 异步获取内容
// onMounted(() => {
//     console.log('组件被重新加载了,这时候的值为:',文章数据.modelValue);
//     valueHtml.value = 文章数据.modelValue //开始的时候把获取到的数据传给文本就行
// })

//1.这是获取父组件传给子组件的值
const 文章数据 = defineProps({ 
    modelValue:{
        type:String,
        default:''
    }
})
valueHtml.value = 文章数据.modelValue
//2.这是定义子组件传给父组件的名字
const emit = defineEmits(['update:modelValue']) 
let 状态 = false
watch(文章数据,(newvalue,oldvalue)=>{
    console.log('父组件的值变化了:',newvalue.modelValue);
    valueHtml.value = newvalue.modelValue
})

const toolbarConfig = {//这是菜单栏配置
    excludeKeys:["uploadVideo"]  //屏蔽掉上传视频的功能,保留插入视频功能
}

const editorConfig = { //这是菜单中功能的配置
    placeholder: '请输入内容...',  //默认内容
    MENU_CONF:{ //菜单配置
        uploadImage:{ //上传图片配置
            fieldName: 'img', //fromdata上传的文件名
            server:`${url}/api/upload/img`,  //服务器地址名
            base64LimitSize: 10 * 1024 ,     // 设置base64图片插入,小于10kb的就直接使用base64格式了
            customInsert:(res,insertFn)=>{   //这是自定义插入图片,res是返回信息,insertFn是执行插入的方法
                //console.log('富文本编辑器上传信息',res);
                insertFn(`${url}/${res.data}`)
                //console.log('富文本编辑器图片插入成功');
            }
        }
    }
}

const handleChange = (editor)=>{
    console.log('编辑器值变化了:',editor.getHtml());
    emit('update:modelValue',valueHtml.value)
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}


</script>

<style lang="scss"></style>
