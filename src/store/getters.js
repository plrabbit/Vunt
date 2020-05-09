const getters = {
  device: state => state.app.device,
  userToken: state => state.user.token,
  userInfo: state => state.user.userInfo
}

export default getters
