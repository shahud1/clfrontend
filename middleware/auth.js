export default function ({ store, redirect }) {
  if (!store.state.user.isLogin) {
    redirect('/login')
  }
}
