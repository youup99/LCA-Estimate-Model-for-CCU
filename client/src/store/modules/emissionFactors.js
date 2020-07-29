import { defaultEmissionFactors } from "./default/defaultEmissionFactors";

const state = JSON.parse(JSON.stringify(defaultEmissionFactors));
const getters = {
  getState(state) {
    return state;
  },
};

const actions = {
  update({ commit, dispatch }, newValue) {
    commit("update", newValue);
  },
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
  },
  resetMineralization({ commit, dispatch }) {
    commit("resetMineralization");
  },
  resetBioconversion({ commit, dispatch }) {
    commit("resetBioconversion");
  },
  resetReductionLight({ commit, dispatch }) {
    commit("resetReductionLight");
  },
  resetReductionHydrogen({ commit, dispatch }) {
    commit("resetReductionHydrogen");
  },
  resetReductionElectricity({ commit, dispatch }) {
    commit("resetReductionElectricity");
  },
  resetReductionHydrocarbon({ commit, dispatch }) {
    commit("resetReductionHydrocarbon");
  },
};

const mutations = {
  update(state, newValue) {
    Object.assign(state, newValue);
  },
  updateMineralization(state, newValue) {
    Object.assign(state.mineralization, newValue);
  },
  updateBioconversion(state, newValue) {
    Object.assign(state.bioconversion, newValue);
  },
  updateReductionLight(state, newValue) {
    Object.assign(state.reductionLight, newValue);
  },
  updateReductionHydrogen(state, newValue) {
    Object.assign(state.reductionHydrogen, newValue);
  },
  updateReductionElectricity(state, newValue) {
    Object.assign(state.reductionElectricity, newValue);
  },
  updateReductionHydrocarbon(state, newValue) {
    Object.assign(state.reductionHydrocarbon, newValue);
  },
  resetMineralization(state) {
    Object.assign(
      state.mineralization,
      JSON.parse(JSON.stringify(defaultEmissionFactors.mineralization))
    );
  },
  resetBioconversion(state) {
    Object.assign(
      state.bioconversion,
      JSON.parse(JSON.stringify(defaultEmissionFactors.bioconversion))
    );
  },
  resetReductionLight(state) {
    Object.assign(
      state.reductionLight,
      JSON.parse(JSON.stringify(defaultEmissionFactors.reductionLight))
    );
  },
  resetReductionHydrogen(state) {
    Object.assign(
      state.reductionHydrogen,
      JSON.parse(JSON.stringify(defaultEmissionFactors.reductionHydrogen))
    );
  },
  resetReductionElectricity(state) {
    Object.assign(
      state.reductionElectricity,
      JSON.parse(JSON.stringify(defaultEmissionFactors.reductionElectricity))
    );
  },
  resetReductionHydrocarbon(state) {
    Object.assign(
      state.reductionHydrocarbon,
      JSON.parse(JSON.stringify(defaultEmissionFactors.reductionHydrocarbon))
    );
  },
};

export default {
  namespaced: true,
  firestorePath: "userDocs/{userId}/store/emissionFactors",
  firestoreRefType: "doc", // or 'doc'
  moduleName: "emissionFactors",
  statePropName: "",
  state,
  getters,
  actions,
  mutations,
};
