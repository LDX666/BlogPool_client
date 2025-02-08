import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useContentStore = defineStore('wangeditor', () => {
  const 文章 = ref({
    添加:'',
    修改:''
  })
  return { 文章 }
},{
    //持久化存储到 localStorage 中
    persist: true
  })