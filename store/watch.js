export const state = () => ({
  sid: 0
})

export const mutations = {
  SET_SID(state, payload) {
    state.sid = payload
  }
}
