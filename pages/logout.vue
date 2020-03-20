<template>
  <div class="container">
    <h1>Logging Out...</h1>
    <br> <br>
    <h2> See you again, <p>{{ username }}</p> </h2>
  </div>
</template>

<script>
export default {
  computed: {
    username() { return this.$store.state.form.login.username }
  },
  created() {
    this.$store.dispatch('user/logout')
  }
}
</script>

<style scoped>
.container {
    border: 5px solid white;
    display: flex;
    margin:20px;
    height: 60vh;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: white;
}
</style>
