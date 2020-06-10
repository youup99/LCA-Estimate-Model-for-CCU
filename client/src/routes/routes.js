import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import CalculationLayout from "@/pages/Layout/CalculationLayout.vue";
import LoginLayout from "@/pages/Layout/LoginLayout.vue";
import SummaryLayout from "@/pages/Layout/SummaryLayout.vue";

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
    path: "/calculation",
    name: "Calculation",
    component: CalculationLayout
  },
  {
    path: "/summary",
    name: "Summary",
    component: SummaryLayout
  },
  {
    path: "*",
    redirect: "/"
  }
];

export default routes;
