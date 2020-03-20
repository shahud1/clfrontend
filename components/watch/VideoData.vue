<template>
 <div >
  <h2>{{ title }}</h2>
  <!-- time -->
  <div class="overline">
    {{ dateFromNow }}
  </div>
  <!-- description -->
  <div class="caption">
    {{ description }}
  </div>
  <!-- tag -->
  <v-chip v-for="tag in tag" :key="tag" x-small class="ma-1 overline tag" label>
    {{ tag }}
  </v-chip>
 </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    title: {
      type: String,
      default: () => "Loading Title"
    },
    description: {
      type: String,
      default: () => "Loading Description"
    },
    created_at: {
      type: String,
      default: () => ""
    },
    tag: {
      type: Array,
      default: () => []
    }

  },
  computed: {
    dateFromNow() {
      return moment(this.created_at).fromNow()
    },
  }
}
</script>