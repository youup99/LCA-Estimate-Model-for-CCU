import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import LoginLayout from "@/pages/Layout/LoginLayout.vue";
import RegistrationLayout from "@/pages/Layout/RegistrationLayout.vue";
import ForgotPasswordLayout from "@/pages/Layout/ForgotPasswordLayout.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: DashboardLayout
  },
  {
    path: "/login",
    name: "Login",
    component: LoginLayout
  },
  {
    path: "/register",
    name: "Register",
    component: RegistrationLayout
  },
  {
    path: "/forgotpassword",
    name: "Forgot Password",
    component: ForgotPasswordLayout
  },
  {
    path: "*",
    redirect: "/"
  }
];

export default routes;
