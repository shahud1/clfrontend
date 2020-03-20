<template>
  <v-app id="inspire">
    <v-layout
      column
      align-center
    >
      <v-flex
        xs12
        lg6
        class="mt-5"
      >
        <h1>Uploaded List</h1>
        <v-data-table
          :headers="headers"
          :items="uploads"
          :items-per-page="10"
          sort-by="updated_at"
          class="elevation-1"
        />
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
  data: () => ({
    dialog: false,
    headers: [
      { text: 'Doc Id', value: 'videoid' },
      { text: 'Title', value: 'title' },
      { text: 'Status', value: 'status' },
      { text: 'Updated_at', value: 'updated_at' }
    ]
  }),

  computed: {
    uploads() {
      const uploads = this.$store.state.video.uploads
      console.log(uploads)
      return uploads
    }
  },

  created() {
    this.$store.dispatch('video/fetch')
  },

  methods: {
    deleteItem(item) {
      const index = this.uploads.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.uploads.splice(index, 1)
    },

    close() {
    },

    save() {
    }
  }
}
</script>
