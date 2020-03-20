<template>
  <v-app id="inspire">
    <v-layout
      column
      align-center
      class="mt-6"
    >
      <v-flex
        xs12
        lg6
      >
        <div class="text-md-center form-container">
          <form>
            <!-- subtitle upload -->
            <v-card
              class="pa-2 ma-1"
            >
              <v-label><h6>Doc Id: {{ docid }}</h6></v-label>
              <v-text-field
                v-model="youtubeUrl"
                :counter="43"
                maxlength="43"
                label="Youtube Url"
                required
                :loading="loading"
              />
              <v-label v-if="youtubeError">
                {{ youtubeError }}
              </v-label>
            </v-card>

            <!-- video upload -->
            <!-- <v-card
            class="pa-2 ma-1"
          >
            <v-card-title><v-label>Video Upload</v-label></v-card-title>
            <input id="videoFile" ref="videoFile" type="file" @change="handleVideoUpload">
          </v-card> -->

            <!-- title -->
            <v-text-field
              v-model="title"
              :counter="100"
              label="Title"
              required
            />

            <!-- course -->
            <v-flex xs12>
              <v-combobox
                v-model="selectCourse"
                :items="courses"
                label="Select a course or create a new one"
              />
            </v-flex>

            <!-- tag -->
            <v-flex xs12>
              <v-combobox
                v-model="selectTag"
                :items="tags"
                label="Select tag(s) or create new one"
                multiple
                chips
              >
                <template v-slot:selection="data">
                  <v-chip
                    :key="JSON.stringify(data.item)"
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    :disabled="data.disabled"
                    @click:close="data.parent.selectItem(data.item)"
                  >
                    <v-avatar
                      class="accent white--text"
                      left
                      v-text="data.item.slice(0, 1).toUpperCase()"
                    />
                    {{ data.item }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-flex>

            <!-- description -->
            <v-textarea
              v-model="description"
              label="Description"
              counter
              maxlength="3000"
              full-width
              single-line
            />

            <!-- submit -->
            <v-btn class="mr-4" :disabled="!youtubeSrtVerify" @click="postYoutube">
              submit
            </v-btn>
            <v-btn>
              clear
            </v-btn>
          </form>
        </div>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      title: '',
      selectCourse: '',
      selectTag: '',
      description: '',
      srtFile: '',
      videoFile: '',
      youtubeUrl: '',
      youtubeSrtVerify: false,
      youtubeError: '',
      loading: false
    }
  },
  computed: {
    courses() {
      return [
        'Machine Learning',
        'AI',
        'Scientific Computing',
        'Data Structure',
        'Programming'
      ]
    },
    tags() {
      return [
        'Programming', 'Intemediate', 'Easy', 'Fundamental'
      ]
    },
    docid() {
      return this.$store.state.user.currentVideoId
    }
  },
  watch: {
    youtubeUrl() {
      this.youtubeSrtVerify = false
      this.youtubeError = ''
      if (this.youtubeUrl.length === 43) {
        this.loading = true
        const payload = {
          docid: `${this.docid}`,
          url: this.youtubeUrl
        }
        this.$api.video.youtubeCheck(payload).then(() => {
          this.youtubeSrtVerify = true
          this.loading = false
        })
          .catch(() => {
            this.youtubeError = 'No subtitle found'
            this.loading = false
          })
      }
    }
  },
  mounted() {
    this.$store.dispatch('user/fetchCurrentVideoId')
  },

  methods: {
    handleVideoUpload() {
      this.videoFile = this.$refs.videoFile.files[0]
      console.log(this.videoFile)
    },
    handleSrtUpload() {
      this.srtFile = this.$refs.srtFile.files[0]
      console.log(this.srtFile)
    },
    postYoutube() {
      const payload = {
        docid: `${this.docid}`,
        url: this.youtubeUrl,
        title: this.title,
        course: this.selectCourse,
        tag: this.selectTag,
        description: this.description
      }
      this.$api.video.postYoutube(payload)
        .then(() => {
          this.$router.push('/uploaded')
        })
        .catch(() => {
          this.$notify.error({
            title: 'Error',
            message: '.'
          })
        })
    }
  }
}
</script>

<style>
.form-container {
  width: 300px
}
@media screen and (min-width: 600px) {
.form-container {
  width: 500px
}
}
</style>
