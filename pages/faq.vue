<template>
  <v-app id="inspire">
    <v-layout
      column
      class="mt-5"
    >
      <v-flex
        xs12
        sm8
        md6
      >
        <v-card class="ma-4 pd-4">
          <v-card-title class="headline">
            {{ $t('faq.header') }}
          </v-card-title>
          <v-card-text>
            <p>{{ $t('faq.info1') }}</p>

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
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>

export default {
}
</script>
