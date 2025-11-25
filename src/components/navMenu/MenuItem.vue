<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type {MenuItemType} from "@/types/user"
import {useTabStore} from "@/store/tabStore"

export default defineComponent({
  name: "MyMenuItem",
  props: {
    item: {
      type: Object as PropType<MenuItemType>,
        required: true
    }
  },
  setup(props) {
    const tabStore = useTabStore()
    const handleClick = (item:MenuItemType) => {
      // 点击菜单项，添加到tabList
      tabStore.add2TabList(item)
    }
    return {handleClick}
  }
})


</script>

<template>
        <el-sub-menu v-if="item.children" :index="item.url">
          <template #title>
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <my-menu-item v-for="child in item.children" :item="child" :key="child.url"></my-menu-item>
        </el-sub-menu>

        <el-menu-item v-else :index="item.url" @click="handleClick(item)">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
</template>