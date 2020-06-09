const state = {
    Figure1: {},
    Figure2: {},
    Figure3: {},
    Figure4: {}
};

const getters = {}

const actions = {
    update({ commit, dispatch }, newValue) {
        commit('update', newValue);
    }
}

const mutations = {
    update(state, newValue) {
        state.Figure1 = newValue;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}