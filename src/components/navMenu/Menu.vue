<script setup lang="ts">
import logo from "@/assets/logo.png"
import { useUserStore } from "@/store/userStore";
import MenuItem from "@/components/navMenu/MenuItem.vue"
import router from "@/router";

const userStore = useUserStore()


</script>

<template>
  <div class="logo">
    <img :src="logo" alt="">
    <h1>能源智控云</h1>
  </div>
  <el-menu
        active-text-color="#ffd04b"
        background-color="#fff"
        class="el-menu-vertical-demo"
        text-color="#000"
        :router="true"
        :default-active="$route.path"
      >
        <MenuItem v-for="item in userStore.menulist" :key="item.url" :item="item" />
      </el-menu>
</template>

<style lang="less" scoped>
.el-menu {
  border: none;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 100%;

  img {
    height: 34px;
    width: 34px;
  }

  h1 {
    font-size: 20px;
    margin-left: 6px;
  }
}
</style>
