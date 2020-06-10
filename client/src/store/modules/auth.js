const state = {
  token: localStorage.getItem("user-token") || "",
  status: ""
};

const getters = {
  isAuthenticated: state => {
    return !!state.token;
  },
  authStatus: state => {
    return state.status;
  }
};

const actions = {
  login: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      // The Promise used for router redirect in login
      commit("login");
      const token = user.username;
      localStorage.setItem("user-token", token);
      if (user.username === "username" && user.password === "password") {
        commit("success", token);
        resolve();
      } else {
        commit("error");
        localStorage.removeItem("user-token");
        reject("Incorrect username/password");
      }
    });
  },

  logout: ({ commit, dispatch }) => {
    return new Promise(resolve => {
      commit("logout");
      localStorage.removeItem("user-token"); // clear your user's token from localstorage
      resolve();
    });
  }
};

const mutations = {
  login: state => {
    state.status = "loading";
  },
  success: (state, token) => {
    state.status = "success";
    state.token = token;
  },
  error: state => {
    state.status = "error";
  },
  logout: state => {
    state.status = "";
    state.token = "";
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
