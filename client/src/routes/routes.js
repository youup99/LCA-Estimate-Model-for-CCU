import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import LoginLayout from "@/pages/Layout/LoginLayout.vue";

const routes = [{
        path: "/",
        name: "Main",
        component: DashboardLayout,
    },
    {
        path: "/login",
        name: "Login",
        component: LoginLayout
    }, {
        path: "*",
        redirect: "/",
    }
];



export default routes;