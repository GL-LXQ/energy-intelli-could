import router from './index'
import { useUserStore } from '@/store/userStore'

router.beforeEach((to) => {
  const userStore = useUserStore()
  //如果去往非登录页面，检查有无token，无token跳转至登录页
  if (to.path !== "/login" && !userStore.token) {
    return {path:"/login"}
  }
  //如果去往登陆页， 检查有无token，有token跳转至首页
  if ( to.path === "/login" && userStore.token) {
    return {path: "/"}
  }
})
