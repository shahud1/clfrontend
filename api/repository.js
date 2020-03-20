const auth = 'auth'
const video = 'video'
const python = 'python'

export default ($axios, store) => ({
  auth: {
    signin: payload => $axios.$post(`/node/${auth}/signin`, payload),
    signup: payload => $axios.$post(`/node/${auth}/signup`, payload),
    signout: () => {
      store.dispatch('user/setRefreshToken')
      return $axios.$post(`/node/${auth}/signout`)
    },
    token: () => {
      store.dispatch('user/setRefreshToken')
      return $axios.$get(`/node/${auth}/token`)
    }
  },
  user: {
    fetch: async () => {
      await store.dispatch('user/checkToken')
      const user = await $axios.$get('/node/user')
      return store.commit('user/SET_USER', user)
    },
    fetchCurrentVideoId: async () => {
      await store.dispatch('user/checkToken')
      return $axios.$get('/node/user/currentVideoId')
    }
  },
  video: {
    youtubeCheck: async (payload) => {
      await store.dispatch('user/checkToken')
      return $axios.$post(`/node/${video}/youtube/check`, payload)
    },
    postYoutube: async (payload) => {
      await store.dispatch('user/checkToken')
      return $axios.$post(`/node/${video}/youtube`, payload)
    },
    fetch: async (payload) => {
      await store.dispatch('user/checkToken')
      return $axios.$get(`/node/${video}`, payload)
    }
  },
  doc: {
    getDoc: async (docid) => {
      const doc = await $axios.$get(`/node/doc/${docid}`)
      return doc
    },
  },
  indexer: {
    suggest: (payload) => {
      return $axios.$get(`/${python}/suggest?q=${payload}`)
      // return $axios.$get(`/node/suggest`)
    },
    search: (payload) => {
      return $axios.$get(`/${python}/${store.state.locale}/search?q=${payload}`)
    },
    searchSub: (vid, query) => {
      return $axios.$get(`/${python}/${store.state.locale}/search/sub?q=${query}&v=${vid}`)
    }
  }
})
