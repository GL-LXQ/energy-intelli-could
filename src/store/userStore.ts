import {defineStore} from 'pinia';
import { loginApi } from "@/api/user"
import { ref } from "vue"

interface LoginParams {
  username: string,
  password: string
}
export const useUserStore = defineStore('userStore', () => {
  const token = ref<string>(sessionStorage.getItem("token") || "")
  const roles = ref<string[]>(sessionStorage.getItem("roles") 
  ? JSON.parse(sessionStorage.getItem("roles")!) : [])
  const username = ref<string>(sessionStorage.getItem("username") || "")
  const menulist = ref<any[]>(sessionStorage.getItem("menulist") 
  ? JSON.parse(sessionStorage.getItem("menulist")!) : [])

    //登录
  const login = async (data:LoginParams) => {
      try{
        const {data: {token: tk, user: {roles : rl, username: uname}, menulist: ml}} = await loginApi(data)
        token.value = tk
        roles.value = rl
        username.value = uname
        menulist.value = ml
        sessionStorage.setItem("token", tk)
        sessionStorage.setItem("roles", JSON.stringify(rl))
        sessionStorage.setItem("username", uname)
        sessionStorage.setItem("menulist", JSON.stringify(ml))
      }catch(err){
        console.log("error", err)
      }
    }

    //清空个人信息
    const clearUserInfo = () => {
      token.value = ""
      roles.value = []
      username.value = ""
      menulist.value = []
      sessionStorage.clear()
    }

    return {
      token,
      roles,
      username,
      menulist,
      login,
      clearUserInfo
    }
})