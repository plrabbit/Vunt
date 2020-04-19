const app = {
  state: {
    device: 'desktop'
  },
  mutations: {
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  }
}

export default app
