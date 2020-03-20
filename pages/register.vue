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
                <v-toolbar-title>Create an Account</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="username"
                    label="Username"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                  />

                  <v-text-field
                    v-model="email"
                    label="Email"
                    name="email"
                    prepend-icon="mdi-mail"
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
                  <nuxt-link to="/login">
                    <h5>Aleardy have an account?</h5>
                  </nuxt-link>
                </v-btn>
                <v-spacer />
                <v-btn color="primary" @click="handleCreateButton">
                  Create
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
    password: '',
    email: ''
  }),
  methods: {
    handleCreateButton() {
      const payload = {
        username: this.username,
        password: this.password
      }
      if (this.email) {
        payload.email = this.email
      }
      this.$api.auth.signup(payload)
        .then((res) => {
          this.$router.push('/login')
        })
        .catch((error) => {
          this.$notify.error({
            title: 'Error',
            message: error.response.data.error
          })
        })
    }
  }
}
</script>
