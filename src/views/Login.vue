<script setup lang="ts">
import logo from "@/assets/logo.png"
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from "@/store/userStore.ts"
import { useRouter } from "vue-router"
import { ElMessage } from 'element-plus'

interface RuleForm {
  username: string;
  password: string;
}
const ruleForm: RuleForm = reactive({
  username: "",
  password: "",
})

const formRules = reactive<FormRules<RuleForm>>({
  username: [
    {
      required: true, message: "用户名不能为空", trigger: "blur"
    },
    {
      min: 4, max: 10, message: "用户名长度必须在4到10个字符之间", trigger: "blur"
    }
  ],
  password: [
    {
      required: true, message: "密码不能为空", trigger: "blur"
    }
  ]
})

const formRef = ref<FormInstance>()
const userStore = useUserStore()
const router = useRouter()



// 登录
const handleLogin = () => {
  //校验表单
  if(!formRef.value) return
  formRef.value?.validate( async (valid:boolean) => {
    if(valid) {
      // 校验通过 发起登录请求
      await userStore.login(ruleForm)
      // 登录成功 跳转到首页
      if (userStore.token) {
        console.log(userStore.token)
        router.push("/")
      }else{
        ElMessage.error("密码错误")
      }
    }else {
      ElMessage.error("请输入正确的用户名和密码")
    }
  })
}
</script>

<template>
  <div class="bg">
    <div class="login">
      <div class="logo">
        <img :src="logo" alt="" width="70px" height="70px">
        <h1 class="ml">能源智控云平台</h1>
      </div>
      <el-form 
      ref="formRef"
      :model="ruleForm"
      :rules="formRules">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" prefix-icon="UserFilled" placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" prefix-icon="Lock" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bg {
  background-image: url("../assets/bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  position: relative;
  
  .login {
    position: absolute;
    top: 50%;
    left: 16%;
    transform: translateY(-60%);
    width: 600px;
    height: 360px;
    padding: 50px;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;

      h1 {
        color: rgb(14, 53, 148);
      }
    }
  }
}
</style>