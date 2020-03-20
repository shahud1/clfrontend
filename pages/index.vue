<template>
  <v-app id="inspire">
    <v-container>
      <v-row
        xs12
        sm8
        md6
      >
        <v-card class="ma-4 pd-4">
          <v-card-title class="headline">
            {{ $t('welcome.header') }}
          </v-card-title>
          <v-card-text>
            <p>{{ $t('welcome.info1') }}</p>
            <p>
              {{ $t('welcome.info2') }}
              >
              <NuxtLink to="/faq">
                FAQ
              </Nuxtlink>
            </p>

            <p>
              {{ $t('welcome.info3') }}
              <NuxtLink to="/feedback">
                feedback
              </Nuxtlink>
            </p>
            <hr class="my-3">
            <p>
              {{ $t('welcome.footer') }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              nuxt
              to="/upload"
            >
              {{ $t('welcome.continue') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

export default {
}
</script>
