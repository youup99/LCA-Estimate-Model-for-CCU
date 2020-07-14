import { defaultLiterature } from "./default/defaultLiterature";

const state = defaultLiterature;

const getters = {
  getState(state) {
    return state;
  },
};

const actions = {};

const mutations = {};

export default {
  namespaced: true,
  firestorePath: "userDocs/{userId}/store/literature",
  firestoreRefType: "doc", // or 'doc'
  moduleName: "literature",
  statePropName: "",
  namespaced: true, // automatically added
  state,
  getters,
  actions,
  mutations,
};
