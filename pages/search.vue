<template>
  <v-app id="inspire">
    <v-container
      fluid
      class="mt-5"
    >
      <!-- courses select -->
      <v-row dense justify="center">
        <v-col cols="9">
          <v-chip-group
            mandatory
            active-class="primary--text"
          >
            <v-chip v-for="course in courses" :key="course" @click="courseSelect(course)">
              {{ course }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <!-- search result -->
      <v-row xs12 sm8 md6 dense justify="center">
        <VideoSearchCard v-for="s in filtered_search" :key="s.videoid" :doc="s" />
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VideoSearchCard from '~/components/search/VideoSearchCard'
export default {
  components: {
    VideoSearchCard
  },
  computed: {
    ...mapGetters({
      filtered_search: 'video/filtered_search'
    }),
    query() {
      return this.$route.query.q
    },
    courses() {
      return this.$store.state.video.courses
    }
  },
  watch: {
    query(val) {
      this.$store.dispatch('video/search', this.query)
    }
  },
  mounted() {
    this.$store.dispatch('video/search', this.query)
  },
  methods: {
    ...mapActions({
      courseSelect: 'video/select_course'
    }),
    thumbnailMouseOver(vid) {
      const store = this.$store
      setTimeout(function () {
        store.commit('video/UPDATE_THUMBNAIL', vid)
      }, 400)
    },
    thumbnailMouseLeave(vid) {
      this.$store.commit('video/RESET_THUMBNAIL', vid)
    }

  }

}
</script>

<style>
</style>
