const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  username: '',
  email: '',
  accessToken: '',
  accessTokenExpire: '',
  refreshToken: '',
  isLogin: false,
  id: '',
  currentVideoId: ''
})

export const getters = {
  userInfo: (state) => {
    return {
      id: state.id,
      username: state.username,
      email: state.email
    }
  }
}

export const actions = {
  fetchCurrentVideoId({ commit }) {
    return this.$api.user.fetchCurrentVideoId()
      .then((res) => {
        commit('SET_CURRENT_VIDEO_ID', res)
      })
  },

  login({ commit, dispatch }, payload) {
    return this.$api.auth.signin(payload)
      .then((res) => {
        Cookie.set('auth', res)
        commit('UPDATE_USER', res)
        dispatch('setAccessToken')
      })
  },

  setAccessToken({ state }) {
    this.$axios.setToken(state.accessToken, 'Bearer')
  },

  setRefreshToken({ state }) {
    this.$axios.setToken(state.refreshToken, 'Bearer')
  },

  checkToken({ commit, dispatch, state }) {
    return new Promise((resolve, reject) => {
      if (Number(new Date()) / 1000 > state.accessTokenExpire) {
        this.$api.auth.token().then((res) => {
          commit('UPDATE_ACCESS_TOKEN', res)
          dispatch('setAccessToken')
          resolve()
        })
        // removed refresh token
          .catch(() => commit('RESET'))
      } else {
        dispatch('setAccessToken')
        resolve()
      }
    })
  },

  logout({ commit, dispatch, state }) {
    Cookie.remove('auth')
    this.$api.auth.signout()
      .then(() => {
        commit('RESET')
        this.$router.push('/')
        dispatch('setAccessToken')
      })
      .catch(() => {
        commit('RESET')
        dispatch('setAccessToken')
        this.$router.push('/')
      })
  }

}

export const mutations = {
  SET_CURRENT_VIDEO_ID(state, payload) {
    state.currentVideoId = payload
  },

  SET_USER(state, payload) {
    Object.assign(state, { ...payload })
  },

  UPDATE_USER(state, payload) {
    Object.assign(state, { ...payload, isLogin: true })
  },

  UPDATE_ACCESS_TOKEN(state, payload) {
    Object.assign(state, { ...state, ...payload })
  },

  RESET(state) {
    Object.assign(state, {
      username: '',
      email: '',
      accessToken: '',
      accessTokenExpire: '',
      refreshToken: '',
      isLogin: false,
      id: ''
    })
  }

}
