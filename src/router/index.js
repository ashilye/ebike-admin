import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
export const constantRoutes = [
    {
        path: "/",
        hidden: true,
        redirect: '/login'
    },

    {
        path: "/login",
        component: () => import("@/views/login"),
        hidden: true
    },

    {
        path: "/home",
        component: () => import("@/views/home"),
        hidden: true
    },
    {
        path: "/404",
        component: () => import("@/views/404"),
        hidden: true
    },
    { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
    new Router({
        scrollBehavior: () => ({ y: 0 }),
        mode:"history",
        routes: constantRoutes
    });

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;