const state = {
  Diesel: {},
  Ethanol: {},
  Methane: {},
  Methanol: {},
};

const getters = {
  getState(state) {
    return state;
  },
};

const actions = {
  update({ commit, dispatch }, newValue) {
    commit("update", newValue);
  },
};

const mutations = {
  update(state, newValue) {
    newValue.forEach((value, index) => {
      state[value.name] = value.value;
    });
  },
};

export default {
  namespaced: true,
  firestorePath: "userDocs/{userId}/store/incumbents",
  firestoreRefType: "doc", // or 'doc'
  moduleName: "incumbents",
  statePropName: "",
  state,
  getters,
  actions,
  mutations,
};
