import { defineStore } from 'pinia'
import type {MenuItemType} from "@/types/user/index.ts"
import { ref } from "vue"

export const useTabStore = defineStore("tabStore", () => {
  const tabList = ref<MenuItemType[]>([{name:"数据看板",url:"/dashboard",icon:"DataLine"}]);

  const currentClickItem = ref("数据看板")

  const setCurrentClickItem = (name:string) => {
    currentClickItem.value = name
  }

  //添加菜单项至tabList
  const add2TabList = (item:MenuItemType) => {
    //判断是否存在
    const exit = tabList.value.some( tab => tab.name === item.name)
    //存在，移至首位
    if(exit){
      return
    }else{
      //不存在，追加到末尾
      tabList.value.push(item)
    }
    console.log(tabList.value)
  }

  //删除tabList中的指定项
  const delTab = (name:string) => {
    //如果是只有一个，那么不允许删除
    if(tabList.value.length === 1) return
    //如果删除的是高亮的，那么判断高亮的位置是否在第一个，在第一个则下一个高亮，不在则上一个高亮
    const index = tabList.value.findIndex(item => item.name === name)
    // 如果index不存在
    if(index === -1) return
    //判断是否高亮
    if(tabList.value[index] && tabList.value[index].name === currentClickItem.value) {
      //如果是第一个，那么下一个高亮
      if(index === 0) {
        const next = tabList.value[1];
        if (next) {
          currentClickItem.value = next.name;
        }
      }else{
        //如果不是第一个，那么上一个高亮
        const prev = tabList.value[index - 1];
        if (prev) {
          currentClickItem.value = prev.name;
        }
      }
    }
    tabList.value = tabList.value.filter( item => item.name !== name)
  }
  return {
    currentClickItem,
    tabList,
    add2TabList,
    delTab,
    setCurrentClickItem

  }
}, {
  persist: { storage: sessionStorage}
  }
)