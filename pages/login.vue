<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form @keyup.native.enter="handleLoginButton">
                  <v-text-field
                    v-model="username"
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-btn>
                  <nuxt-link to="/register">
                    <h5>Create Account</h5>
                  </nuxt-link>
                </v-btn>
                <v-spacer />
                <v-btn color="primary" @click="handleLoginButton">
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    username: '',
    password: ''
  }),
  computed: {
    isLogin() {
      const isLogin = this.$store.state.user.isLogin
      if (isLogin === true) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.$router.push('/')
      }
      return isLogin
    }
  },
  watch: {
    isLogin() {
      if (this.isLogin === true) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    handleLoginButton() {
      // login
      const payload = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('user/login', payload)
        .then(() => {
          this.$router.go('/')
        })
        .catch(() => {
          this.$notify.error({
            title: 'Error',
            message: 'Wrong Email or Password'
          })
        })
    }
  }
}
</script>
