<template>
  <v-row xs12 sm6 md6>
    <v-card-text>
      <v-layout align-center>
        <v-combobox
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          :placeholder="$t('search')"
          @keyup.enter="submit"
          color="white"
          hide-details
          return-object
        />
        <v-btn @click="submit" icon>
          <v-icon>
            mdi-magnify
          </v-icon>
        </v-btn>
      </v-layout>
    </v-card-text>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
  }),

  computed: {
    items() {
      return this.$store.state.video.suggestion
    },
    search: {
      get: function (){
        const sq = this.$store.state.video.search_queries
        return sq
      },
      set: function (val){
        if (!val) {
          return 
        }
        // Items have already been requested
        if (this.isLoading) return
        this.isLoading = true
        // Lazily load input items
        this.$store.dispatch('video/suggest', val)
          .catch((err) => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
        this.$store.commit('video/SET_SEARCH_QUERIES', val)
      }
    }
  },

  methods: {
    submit() {
      if (this.search) {
        this.$store.commit('video/SET_SEARCH_SUB_QUERIES', this.search)
        this.$router.push(`/search?q=${this.search}`)
      }
    }
  }
}
</script>

<style>
</style>
