const state = {
  Figure1: {},
  Figure2: {},
  Figure3: {},
  Figure4: {}
};

const getters = {};

const actions = {
  updateFigure1({ commit, dispatch }, newValue) {
    commit("updateFigure1", newValue);
  },
  updateFigure2({ commit, dispatch }, newValue) {
    commit("updateFigure2", newValue);
  },
  updateFigure3({commit, dispatch}, newValue){
    commit("updateFigure3", newValue);
  },
  updateFigure4({commit, dispatch}, newValue){
    commit("updateFigure4", newValue);
  }
};

const mutations = {
  updateFigure1(state, newValue) {
    state.Figure1 = newValue;
  },
  updateFigure2(state, newValue) {
    state.Figure2 = newValue;
  },
  updateFigure3(state, newValue){
    state.Figure3 = newValue;
  },
  updateFigure4(state, newValue){
    state.Figure4 = newValue;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
