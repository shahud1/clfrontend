<template>
  <div>
    <v-combobox
      label="Search in video"
      :items="fwl"
      :search-input.sync="search"
      @focus="handleFocus"
      @blur="handleBlur"
      color="white"
      hide-details
    />
    <v-expand-transition>
      <v-list v-if="subDrawer && search_sub" class="sub-list">
        <v-list-item
          v-for="sub in search_sub"
          :key="sub.start"
          class="sub-item"
        >
          <div @mouseenter="$emit('setTime', sub.start)">
            {{ sub.text }}
          </div>
        </v-list-item>
      </v-list>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  props: [ 'fwl', 'videoId' ],
  data() {
    return {
      subDrawer: false,
      isLoading: false
    }
  },

  computed: {
    search_sub() {
      return this.$store.state.video.search_sub
    },
    search: {
      get: function(){
        const val = this.$store.state.video.search_sub_queries
        return val
      },
      set: function(val){
        if (!val) {
          return
        }

        // Items have already been requested
        if (this.isLoading) return
        this.isLoading = true
        this.subDrawer = false
        // Lazily load input items
        const vid = this.videoId
        this.$store.dispatch('video/search_sub', { vid, query: val })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            this.isLoading = false
            this.subDrawer = true
          })
        this.$store.commit('video/SET_SEARCH_SUB_QUERIES', val)
      }
    },
  },

  methods: {
    handleBlur() {
      this.subDrawer = false
    },
    handleFocus() {
      this.subDrawer = true
    },
  }
}
</script>