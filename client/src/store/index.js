import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import auth from "./modules/auth";
import constants from "./modules/constants";
import generalAssumptions from "./modules/generalAssumptions";
import incumbents from "./modules/incumbents";
import literature from "./modules/literature";
import pathways from "./modules/pathways";
import pathwayCalc from "./modules/pathwayCalc";
import summary from "./modules/summary";
import { Loading, Message } from "element-ui";

Vue.use(Vuex);
const vuexPersist = new VuexPersist({
  key: "my-app",
  storage: window.localStorage,
});

// Firestore
import VuexEasyFirestore from "vuex-easy-firestore";
import { Firebase, initFirebase } from "@/plugins/firebase.js";

const easyFirestore = VuexEasyFirestore(
  [
    constants,
    generalAssumptions,
    incumbents,
    literature,
    pathwayCalc,
    pathways,
    summary,
  ],
  {
    // logging: true,
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
    literature,
    summary,
  },
  plugins: [vuexPersist.plugin, easyFirestore],
});

initFirebase().catch((error) => {
  // take user to a page stating an error occurred
  // (might be a connection error, or the app is open in another tab)
});

Firebase.auth().onAuthStateChanged((user) => {
  if (store.getters["auth/isUserAuth"]) {
    let loadingInstance = Loading.service();
    store.dispatch("constants/fetchAndAdd");
    store.dispatch("generalAssumptions/fetchAndAdd");
    store.dispatch("incumbents/fetchAndAdd");
    store.dispatch("literature/fetchAndAdd");
    store.dispatch("pathwayCalc/fetchAndAdd");
    store.dispatch("pathways/fetchAndAdd");
    store.dispatch("summary/fetchAndAdd");
    setTimeout(() => {
      loadingInstance.close();
      Message.success("Loaded saved values");
    }, 1000);
  }
});

export default store;
