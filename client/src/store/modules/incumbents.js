const state = {
    Diesel: {},
    Ethanol: {},
    Methane: {},
    Methanol: {}
};

const getters = {}

const actions = {
    update({ commit, dispatch }, newValue) {
        commit('update', newValue);
    }
}

const mutations = {
    update(state, newValue) {
        newValue.forEach((value, index) => {
            state[value.name] = value.value
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}