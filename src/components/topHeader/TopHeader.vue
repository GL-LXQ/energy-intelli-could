<script setup lang="ts">
import { useUserStore } from '@/store/userStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const {username} = storeToRefs(userStore)
const router = useRouter()

const handleCommand = (command: string)=> {
  if(command === "user"){
    router.push("/personal")
  }else {
    //清空pinia中用户信息，跳转至登录页
    userStore.clearUserInfo()
    router.push("/login")
  }
}
</script>

<template>
  <div class="header">
    <div class="personal-pannel">
      <el-badge :is-dot="true" class="item">
        <el-icon>
          <BellFilled />   
        </el-icon>
      </el-badge>
      <div class="avatar-box">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </div>
      <div class="dropdown-box">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            欢迎您，{{username}}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="User" command="user">个人中心</el-dropdown-item>
              <el-dropdown-item icon="SwitchButton" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header {
  height: 60px;
  padding: 0 20px;
  background-color: #bab9b9;

  .personal-pannel {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: end;
    gap: 16px;
  }
}
</style>