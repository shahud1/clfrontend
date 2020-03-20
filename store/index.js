const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  locale: 'en'
})

export const actions = {
  nuxtServerInit({ commit, state }, { req }) {
    //  login
    let auth = null
    // run as server
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth)
        commit('user/UPDATE_USER', auth, { root: true })
      } catch (err) {
        // no valid cookie found
      }
    }
  }
}

export const mutations = {
  SET_LANG(state, locale) {
    state.locale = locale
  }
}
