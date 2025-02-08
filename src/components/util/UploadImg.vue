<template>
    <div>
        <el-upload list-type="picture-card" accept='.jpg,.png' multiple :limit="1" :http-request="上传图片" ref="上传组件"
            :before-upload="上传前处理" :on-remove="移除图片" >
            <img v-if="图片地址" :src="`${url}/${图片地址}`" style="width: 100px;height: 100px;" />
            <el-icon v-else>
                <Plus />
            </el-icon>
        </el-upload>
        <!-- <hr>
        {{ 图片地址 }}
        :class="{ disabled: 图片上传状态 }" -->
    </div>
</template>

<script setup>
import { url } from "@/config";
import axios from "axios"
import { ref } from "vue";


//一丶图片数据
const 图片地址 = defineModel()
console.log('这是v-model绑定的值:',图片地址);

//二丶这一部分是上传头像用的
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
    图片地址.value = 返回的图片地址
    图片上传状态.value = true    //改变图片上传状态为成功
    console.log('图片上传成功:返回的图片地址',返回的图片地址);
    console.log('打印一下这时候的图片地址:',图片地址);
    上传组件.value.clearFiles() 
  }).catch((err) => {
    console.log(err);
    图片上传状态.value = false
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
    图片地址.value = '',
    图片上传状态.value = false
}
</script>

<style lang="scss">
.disabled{
    .el-upload--picture-card {
        display: none !important;
    }
}
</style>
