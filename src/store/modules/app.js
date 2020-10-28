const app = {
  state: {
    device: 'desktop',
    language: 'enUS'
  },
  mutations: {
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    TOGGLE_LANGUAGE: (state, language) => {
      state.language = language
    }
  }
}

export default app
