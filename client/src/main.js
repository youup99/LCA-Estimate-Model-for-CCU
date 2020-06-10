// =========================================================
// * Vue Material Dashboard - v1.4.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";

// Element UI
import ElementUI from "element-ui";
import ExTableColumn from "ex-table-column";
import "element-ui/lib/theme-chalk/index.css";

// Bootstrap
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Highcharts
import HighchartsVue from "highcharts-vue";
var Highcharts = require("highcharts"),
  HighchartsGroupedCategories = require("highcharts-grouped-categories")(
    Highcharts
  );

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalDirectives from "./globalDirectives";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

// store
import store from "./store";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !store.getters["auth/isAuthenticated"])
    next("/login");
  else next();
});

Vue.prototype.$Chartist = Chartist;

Vue.use(ElementUI);
Vue.component(ExTableColumn.name, ExTableColumn);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalDirectives);
Vue.use(HighchartsVue);

var Event = new Vue({});
/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
});
