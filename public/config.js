(function (global) {
  global.__config__ = {
    // Public API Addr. DO NOT rename it.
    API_HOST: 'http://127.0.0.1:8000',
    APP_NAME: 'Vunt'
  }

  global.document.title = global.__config__.APP_NAME
})(window)
