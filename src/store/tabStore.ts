import { defineStore } from 'pinia'
import type {MenuItemType} from "@/types/user/index.ts"
import { ref } from "vue"

export const useTabStore = defineStore("tabStore", () => {
  const tabList = ref<MenuItemType[]>([{name:"数据看板",url:"/dashboard",icon:"DataLine"}]);

  //添加菜单项至tabList
  const add2TabList = (item:MenuItemType) => {
    //判断是否存在
    const exit = tabList.value.some( tab => tab.name === item.name)
    //存在，移至首位
    if(exit){
      //找到并删除
      delTab(item.name)
      // 放到数组首位
      tabList.value.unshift(item)
    }else{
      //不存在，追加到末尾
      tabList.value.push(item)
    }
    console.log(tabList.value)
  }

  //删除tabList中的指定项
  const delTab = (name:string) => {
    tabList.value = tabList.value.filter( item => item.name !== name)
  }
  return {
    tabList,
    add2TabList,
    delTab

  }
})