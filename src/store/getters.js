const getters = {
  device: state => state.app.device,
  language: state => state.app.language,
  userToken: state => state.user.token,
  userInfo: state => state.user.userInfo
}

export default getters
