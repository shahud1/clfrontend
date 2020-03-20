import respository from '~/api/repository.js'

export default function ({ $axios, store }, inject) {
  // eslint-disable-next-line no-console
  const api = respository($axios, store)
  inject('api', api)
}
