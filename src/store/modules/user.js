const user = {
  state: {
    userInfo: {},
    token: ''
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    Login ({ commit }, loginInfo) {
      return new Promise((resolve, reject) => {
        // Some requests to login

        commit('SET_TOKEN', '')

        // Remember user
        localStorage.setItem('pc___access-token', '')
        resolve()
      })
    },
    GetCurrentUser ({ commit }) {
      return new Promise((resolve, reject) => {
        // Some requests to get your userInfo

        commit('SET_USER_INFO', {}) // { userName: xxx, groupId: 1, ... }
        resolve()
      })
    },
    Logout ({ commit }) {
      return new Promise((resolve, reject) => {
        // Some requests to logout

        commit('SET_TOKEN', '')
        localStorage.removeItem('pc___access-token')
        resolve()
      })
    }
  }
}

export default user
