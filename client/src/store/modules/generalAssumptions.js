import { defaultGeneralAssumptions } from "./default/defaultGeneralAssumptions";

const state = JSON.parse(JSON.stringify(defaultGeneralAssumptions));

const getters = {};

const actions = {
  update({ commit, dispatch }, newValue) {
    commit("update", newValue);
  },
  reset({ commit, dispatch }) {
    commit("reset");
  }
};

const mutations = {
  update(state, newValue) {
    Object.assign(state, newValue);
  },
  reset(state) {
    Object.assign(state, JSON.parse(JSON.stringify(defaultGeneralAssumptions)));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
