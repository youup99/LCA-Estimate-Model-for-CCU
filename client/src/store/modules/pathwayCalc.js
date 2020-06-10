const state = {
  mineralization: {},
  bioconversion: {},
  reductionLight: {},
  reductionHydrogen: {},
  reductionElectricity: {},
  reductionHydrocarbon: {}
};

const getters = {};

const actions = {
  updateMineralization({ commit, dispatch }, newValue) {
    commit("updateMineralization", newValue);
  },
  updateBioconversion({ commit, dispatch }, newValue) {
    commit("updateBioconversion", newValue);
  },
  updateReductionLight({ commit, dispatch }, newValue) {
    commit("updateReductionLight", newValue);
  },
  updateReductionHydrogen({ commit, dispatch }, newValue) {
    commit("updateReductionHydrogen", newValue);
  },
  updateReductionElectricity({ commit, dispatch }, newValue) {
    commit("updateReductionElectricity", newValue);
  },
  updateReductionHydrocarbon({ commit, dispatch }, newValue) {
    commit("updateReductionHydrocarbon", newValue);
  }
};

const mutations = {
  updateMineralization(state, newValue) {
    state.mineralization = newValue;
  },
  updateBioconversion(state, newValue) {
    state.bioconversion = newValue;
  },
  updateReductionLight(state, newValue) {
    state.reductionLight = newValue;
  },
  updateReductionHydrogen(state, newValue) {
    state.reductionHydrogen = newValue;
  },
  updateReductionElectricity(state, newValue) {
    state.reductionElectricity = newValue;
  },
  updateReductionHydrocarbon(state, newValue) {
    state.reductionHydrocarbon = newValue;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
