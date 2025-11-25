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

  //如果跳转路由需要权限，检查用户角色是否符合
  if(to.meta?.accessRoles && !userStore.roles.some( role => (to.meta.accessRoles as string[]).includes(role))){
      //用户角色不符合，不允许跳转,跳转至首页
      return {path: "/"}
  }
})
