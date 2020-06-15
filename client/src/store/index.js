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
  storage: window.localStorage,
});

// Firestore
import VuexEasyFirestore from "vuex-easy-firestore";
import { Firebase, initFirebase } from "@/plugins/firebase.js";

const easyFirestore = VuexEasyFirestore(
  [constants, generalAssumptions, incumbents, pathwayCalc, pathways, summary],
  {
    logging: true,
    FirebaseDependency: Firebase,
  }
);

const store = new Vuex.Store({
  modules: {
    auth,
    constants,
    generalAssumptions,
    pathways,
    pathwayCalc,
    incumbents,
    summary,
  },
  plugins: [vuexPersist.plugin, easyFirestore],
});

initFirebase().catch((error) => {
  console.log(error);
  // take user to a page stating an error occurred
  // (might be a connection error, or the app is open in another tab)
});

Firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch("constants/fetchAndAdd");
    store.dispatch("generalAssumptions/fetchAndAdd");
    store.dispatch("incumbents/fetchAndAdd");
    store.dispatch("pathwayCalc/fetchAndAdd");
    store.dispatch("pathways/fetchAndAdd");
    store.dispatch("summary/fetchAndAdd");
  }
});

export default store;
