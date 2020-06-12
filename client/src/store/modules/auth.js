import firebase from "firebase/app";
const state = {
  user: null,
  error: null,
};

const getters = {
  getUser(state) {
    return state.user;
  },
  isUserAuth(state) {
    return !!state.user;
  },
  getError(state) {
    return state.error;
  },
};

const actions = {
  authAction({ commit }) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        commit("setUser", user);
      } else {
        commit("setUser", null);
      }
    });
  },
  signUp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          commit("setUser", response.user);
          resolve();
        })
        .catch((error) => {
          commit("setError", error.message);
          reject(error.message);
        });
    });
  },
  signIn({ commit }, payload) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          commit("setUser", response.user);
          resolve();
        })
        .catch((error) => {
          commit("setError", error.message);
          reject(error.message);
        });
    });
  },
  signOut({ commit }) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setUser", null);
          resolve();
        })
        .catch((error) => {
          commit("setError", error.message);
          reject(error.message);
        });
    });
  },
  resetPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(payload.email)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          commit("setError", error.message);
        });
    });
  },
};

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
