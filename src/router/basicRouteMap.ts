import type { RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/layout/DefaultLayout.vue"),
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/Dashboard.vue")
      }, 
      {
        path: "/chargingstation/monitor",
        name: "monitor",
        component: () => import("@/views/chargingstation/Monitor.vue")
      },
      {
        path: "/chargingstation/revenue",
        name: "revenue",
        component: () => import("@/views/chargingstation/Revenue.vue")
      },
      {
        path: "/chargingstation/fault",
        name: "fault",
        component: () => import("@/views/chargingstation/Fault.vue")
      },
      {
        path:"/map",
        name:"map",
        component:()=>import("@/views/map/ElectronicMap.vue")
      },
      {
        path:"/operations/orders",
        name:"orders",
        component:()=>import("@/views/operations/Orders.vue")
      },
      {
        path:"/operations/detail",
        name: "orderDetail",
        component:()=>import("@/views/operations/OrdersDetail.vue")
      },
      {
        path: "/operations/total",
        name: "charging",
        component:()=>import("@/views/operations/Charging.vue")
      },
      {
        path: "/alarm",
        name: "alarm",
        component:()=>import("@/views/alarm/Alarm.vue")
      },
      {
        path: "/equipment",
        name: "membershipCard",
        component:()=>import("@/views/membershipCard/MembershipCard.vue")
      },
      {
        path: "/document",
        name: "document",
        component:()=>import("@/views/document/Document.vue"),
        meta: {
          accessRoles: ["admin", "manager"]
        }
      },
      {
        path: "/system",
        name: "system",
        component:()=>import("@/views/systemSetting/SystemSetting.vue"),
        meta: {
          accessRoles: ["admin"]
        }
      },
      {
        path: "/personal",
        name: "personal",
        component:()=>import("@/views/personal/Personal.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/NotFound.vue"),
  }
]
export default routes