import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('user', () => {
  const 权限 = ref({
    状态:'游客',
    图片地址:"头像.png",
    名称:'游客',
    用户id:0,
  })
  return { 权限 }
},{
    //持久化存储到 localStorage 中
    persist: true
  })
