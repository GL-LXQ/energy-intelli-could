<script setup lang="ts">
import { useTabStore } from "@/store/tabStore"
import { ref } from "vue"
import {computed} from "vue"
const tabStore = useTabStore()
const activeName = computed({
  get: ()=>tabStore.currentClickItem.valueOf(),
  set: (val:string)=>tabStore.setCurrentClickItem(val)
})

const removeTab = (tabPaneName:string) => {
  tabStore.delTab(tabPaneName)
}

</script>

<template>
  <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    :closable="true"
    @tab-remove="removeTab"
  >
    <el-tab-pane v-for="item in tabStore.tabList" :label="item.url" :name="item.name">
       <template #label>
        <span class="custom-tabs-label">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.name }}</span>
        </span>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>