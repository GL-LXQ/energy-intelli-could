<script setup lang="ts">
import Menu from "@/components/navMenu/Menu.vue"
import { onMounted } from 'vue';
import TopHeader from "@/components/topHeader/TopHeader.vue"
import HeaderTabs from "@/layout/HeaderTabs.vue"

</script>
<template>
     <el-container>
      <el-aside width="200px">
        <Menu />
      </el-aside>
      <el-container>
        <el-header>
          <TopHeader />
        </el-header>
        <el-main>
          <HeaderTabs />
          <router-view />
        </el-main>
      </el-container>
    </el-container>
</template>

<style lang="less" scoped>
.el-container {
  .el-aside {
    height: 100vh;
    background-color: white;
    box-shadow: 10px 0 8px -2px rgba(0, 0, 0, 0.2);
  }

  .el-header {
    padding: 0 !important;
  }
  
  .el-main {
    height: 80vh;
    overflow: auto;
  }
}
</style>