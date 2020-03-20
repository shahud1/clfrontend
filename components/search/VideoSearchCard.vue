<template>
  <v-card :to="`/watch?v=${doc.videoid}`" max-height="160" class="video-search-card">
    <v-row dense>
      <!-- image -->
      <v-col class="shrink">
        <Thumbnail
          :vid="doc.videoid"
        />
      </v-col>
      <!-- description -->
      <v-col>
        <!-- title -->
        <v-card-title class="ml-2 pa-1 body-1">
          {{ doc.title }}
        </v-card-title>
        <v-card-text class="mt-0">
          <!-- time -->
          <div class="overline">
            {{ dateFromNow }}
          </div>
          <!-- description -->
          <div class="caption">
            {{ doc.description.substring(0,130) }} ...
          </div>
        </v-card-text>
        <!-- tag -->
        <v-chip v-for="tag in doc.tag" :key="tag" x-small class="ma-1 overline tag" label>
          {{ tag }}
        </v-chip>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import moment from 'moment'
import Thumbnail from '~/components/search/Thumbnail'

export default {
  components: { Thumbnail },
  props: {
    doc: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    dateFromNow() {
      return moment(this.doc.created_at).fromNow()
    }
  }
}
</script>

<style scoped>

.video-search-card {
  width: 70%;
  overflow: hidden;
}

.video-search-card:hover {
  background: #505050;
}

.tag {
  font-size: .5rem;
  overflow: hidden;
}
</style>
