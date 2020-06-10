import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import auth from "./modules/auth";
import constants from "./modules/constants";
import generalAssumptions from "./modules/generalAssumptions";
import incumbents from "./modules/incumbents";
import pathways from "./modules/pathways";
import pathwayCalc from "./modules/pathwayCalc";
import summary from "./modules/summary";

Vue.use(Vuex);
const vuexPersist = new VuexPersist({
  key: "my-app",
  storage: window.localStorage
});

export default new Vuex.Store({
  modules: {
    auth,
    constants,
    generalAssumptions,
    pathways,
    pathwayCalc,
    incumbents,
    summary
  },
  plugins: [vuexPersist.plugin]
});
