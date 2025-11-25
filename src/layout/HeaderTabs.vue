<script setup lang="ts">
import { useTabStore } from "@/store/tabStore"
const tabStore = useTabStore()

</script>

<template>
  <el-tabs
    type="card"
    class="demo-tabs"
    :closable="true"
  >
    <el-tab-pane v-for="item in tabStore.tabList" :label="item.name">
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