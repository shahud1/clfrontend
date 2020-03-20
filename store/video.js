export const state = () => ({
  uploads: [],
  suggestion: [],
  courses: [],
  search: [],
  search_sub: [],
  search_queries: '',
  search_sub_queries: '',
  selected_course: 'All'
})

export const getters = {
  filtered_search: (state) => {
    return state.search.filter((video) => {
      if (state.selected_course === 'All') {
        return true
      }
      return video.course.includes(state.selected_course)
    })
  }
}

export const actions = {
  fetch({ commit }) {
    return this.$api.video.fetch()
      .then((res) => {
        commit('SET_UPLOAD', res)
      })
  },

  suggest({ commit }, payload) {
    return this.$api.indexer.suggest(payload)
      .then((res) => {
        commit('SET_SUGGESTION', res.result)
      })
  },

  select_course({ commit }, payload) {
    return commit('SET_SELECTED_COURSE', payload)
  },

  search({ commit }, payload) {
    return this.$api.indexer.search(payload)
      .then(({ result, status }) => {
        if (status !== 'ok') return
        const courses = ['All']
        result.forEach((v) => {
          for (const course of v.course) {
            if (!courses.includes(course)) {
              courses.push(course)
            }
          }
        })
        commit('SET_COURSES', courses)
        commit('SET_SEARCH', result)
      })
  },

  search_sub({ commit }, { vid, query }) {
    return this.$api.indexer.searchSub(vid, query)
      .then((res) => {
        const items = res.result.map((item) => {
          return item
        })
        console.log(items, vid, query)
        commit('SET_SEARCH_SUB', items)
      })
  }

}

export const mutations = {
  SET_UPLOAD(state, payload) {
    state.uploads = payload
  },

  SET_SUGGESTION(state, payload) {
    state.suggestion = payload
  },

  SET_COURSES(state, payload) {
    state.courses = payload
  },

  SET_SEARCH(state, payload) {
    state.search = payload
  },

  SET_SEARCH_SUB(state, payload) {
    state.search_sub = payload
  },

  SET_SEARCH_QUERIES(state, payload) {
    state.search_queries = payload
  },

  SET_SEARCH_SUB_QUERIES(state, payload) {
    state.search_sub_queries = payload
  },

  SET_SELECTED_COURSE(state, payload) {
    state.selected_course = payload
  },

  UPDATE_THUMBNAIL(state, vid) {
    const item = state.search.find(item => item.videoid === vid)
    item.tid += 10000
  },

  RESET_THUMBNAIL(state, vid) {
    const item = state.search.find(item => item.videoid === vid)
    item.tid = 1000
  }
}
