import { defaultPathways } from "./default/defaultPathways";

const state = JSON.parse(JSON.stringify(defaultPathways));

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
  updatePathwayTest({ commit, dispatch }, newValue) {
    commit("updatePathwayTest", newValue);
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
  resetPathwayTest({ commit, dispatch }) {
    commit("resetPathwayTest");
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
  updatePathwayTest(state, newValue) {
    Object.assign(state.pathwayTest, newValue);
  },
  resetMineralization(state) {
    Object.assign(
      state.mineralization,
      JSON.parse(JSON.stringify(defaultPathways.mineralization))
    );
  },
  resetBioconversion(state) {
    Object.assign(
      state.bioconversion,
      JSON.parse(JSON.stringify(defaultPathways.bioconversion))
    );
  },
  resetReductionLight(state) {
    Object.assign(
      state.reductionLight,
      JSON.parse(JSON.stringify(defaultPathways.reductionLight))
    );
  },
  resetReductionHydrogen(state) {
    Object.assign(
      state.reductionHydrogen,
      JSON.parse(JSON.stringify(defaultPathways.reductionHydrogen))
    );
  },
  resetReductionElectricity(state) {
    Object.assign(
      state.reductionElectricity,
      JSON.parse(JSON.stringify(defaultPathways.reductionElectricity))
    );
  },
  resetReductionHydrocarbon(state) {
    Object.assign(
      state.reductionHydrocarbon,
      JSON.parse(JSON.stringify(defaultPathways.reductionHydrocarbon))
    );
  },
  resetPathwayTest(state) {
    Object.assign(
      state.pathwayTest,
      JSON.parse(JSON.stringify(defaultPathways.pathwayTest))
    );
  },
};

export default {
  namespaced: true,
  firestorePath: "userDocs/{userId}/store/pathways",
  firestoreRefType: "doc", // or 'doc'
  moduleName: "pathways",
  statePropName: "",
  state,
  getters,
  actions,
  mutations,
};
