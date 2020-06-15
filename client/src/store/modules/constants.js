import { defaultConstants } from "./default/defaultConstants";

const state = defaultConstants;

const getters = {
  getState(state) {
    return state;
  },
};

const actions = {};

const mutations = {};

export default {
  namespaced: true,
  firestorePath: "userDocs/{userId}/store/constants",
  firestoreRefType: "doc", // or 'doc'
  moduleName: "constants",
  statePropName: "",
  namespaced: true, // automatically added
  state,
  getters,
  actions,
  mutations,
};
