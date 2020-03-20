<template>
  <v-app id="inspire">
    <v-container>
      <!-- search -->
      <v-row>
        <v-col>
            <SearchSubBox :videoId="videoId" :fwl="video_data.en.fwl" @setTime="setTime"/>
        </v-col>
        <v-col>
          <!-- <v-btn icon @click="submit">
            <v-icon>
              mdi-magnify
            </v-icon>
          </v-btn> -->
        </v-col>
      </v-row>
      <v-row class="">
        <!-- video -->
        <v-col sm=8 xs=12>
            <video
              id="videoPlayer"
              ref="videoPlayer"
              class="video-js vjs-default-skin"
            >
              <source
                :src="`/cl/api/docker/hls/${videoId}/video,720p.mp4,.urlset/master.m3u8`"
                type="application/x-mpegURL"
              >
              <!-- <source
                :src="`/cl/api/docker/videos/${videoId}/video720p.mp4`"
                type="video/mp4"
              > -->
                <track kind="subtitle" :src="`/cl/api/docker/videos/${videoId}/${lang}.vtt`" :srclang="lang" :label="lang" default>
                <track kind="subtitle" :src="`/cl/api/docker/videos/${videoId}/ja.vtt`" srclang="ja" label="ja">
                <track kind="subtitle" :src="`/cl/api/docker/videos/${videoId}/th.vtt`" srclang="th" label="th">
            </video>
            <!-- VIDEO DETAIL -->
            <VideoData 
            v-if="video_data.en.detial"
            :title="video_data.en.detial.title"
            :description="video_data.en.detial.description"
            :created_at="video_data.en.detial.created_at"
            :tag="video_data.en.detial.tag"
             />
        </v-col>
        <!-- wordcloud -->
        <v-col class="wordcloud-container" sm=4 xs=12>
          <v-label>Word Cloud</v-label>
          <client-only placeholder="Loading...">
            <Wordcloud :words="words" />
          </client-only>
        </v-col>
      </v-row>
      <v-row>
        <!-- Summary -->
        <v-col>
          <Summary :sum-sizes="[0.2, 0.4, 0.6, 0.8]" :fwl="video_data.en.fwl" :texts="video_data.en.sum" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import videojs from 'video.js'
import vjsThumbnailsjs from '~/components/libs/videojs.thumbnails.js'
vjsThumbnailsjs(videojs)

import _ from 'lodash'
import Summary from '~/components/watch/Summary'
import Wordcloud from '~/components/watch/Wordcloud'
import SearchSubBox from '~/components/watch/SearchSubBox'
import VideoData from '~/components/watch/VideoData'

require('~/components/libs/videojs.thumbnails.css')
require('video.js/dist/video-js.css')
require('~/assets/style/vjs-skin.scss')

export default {
  name: 'VideoPlayer',
  components: { Summary, Wordcloud, SearchSubBox, VideoData },
  props: {
    options: {
      type: Object,
      default() {
        return {
          controls: true,
          playbackRates: [0.5, 0.72, 1, 1.5, 2],
          fluid: true,
          inactivityTimeout: 500,
          hls: { withCredentials: false }
        }
      }
    }
  },
  data() {
    return {
      video_data: { en: {} },
      words: [],
      player: null,
      subDrawer: false,
      isLoading: false
    }
  },
  computed: {
    dateFromNow() {
      return moment(this.doc.created_at).fromNow()
    },
    videoId() {
      return this.$route.query.v
    },
    thumbnail_id() {
      return 10000
    },
    language() {
      return 'th'
    },
    subId: {
      get(){
        const sid = this.$store.state.watch.sid
        return sid
      },
      set(val){
      }
    },
    lang() {
      return this.$store.state.locale
    }
  },
  watch: {
    subId(val) {
      this.words = Object.entries(this.video_data.en.wc[this.subId]).map(([key, value]) => ({
        name: this.video_data.en.fwl[key],
        value
      }))
    },
    lang: {
      immediate: true,
      handler(l) {
        // change wc summary
        const vid = this.$route.query.v
        this.$axios.$get(`/docker/videos/${vid}/data_${l}.json`).then((res) => {
          //console.log(res)
          this.video_data.en = res
          this.$store.commit('watch/SET_SID', this.subId + 1)
        })

        if (this.player){
          let tracks = this.player.textTracks();
          for (let i = 0; i < tracks.length; i++) {
            let track = tracks[i];
            // find the captions track that's in lang
            if (track.language === l) {
              track.mode = 'showing';
            } else {
              track.mode = "hidden"
            }
          }
        }
    }}
  },
  mounted() {
    const vid = this.$route.query.v
    const target = 0
    const store = this.$store
    const self = this

    this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
      // console.log('onPlayerReady', this)
      this.on('loadedmetadata', function () {
        for(let i = 1; i < this.textTracks().length; i++) {
          const textTracks = this.textTracks()[i]
          if ( textTracks.language === self.lang ) {
            textTracks.mode = 'showing'
          } else {
            textTracks.mode = 'hidden'
          }
          textTracks.on('cuechange', function () {
            let subIndex = null
            subIndex = _.findIndex(
              textTracks.cues,
              x => x.text === textTracks.activeCues[target].text
            )
            // console.log(subIndex)
            store.commit('watch/SET_SID', subIndex)
          })
        }
      })
    })
    // thumbnail
    this.player.thumbnails({
      src: `/cl/api/docker/videos/${vid}/sprite.jpg`,
    });




  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    setTime(start) {
      //console.log(start)
      this.player.currentTime(start)
    //   console.log('setTime', start)
    }
  }
}
</script>
<style>
.video-js {
  width: 100%;
  height: 100%;
  min-height: 320px;
  min-width: 320px;
}

.video-js .vjs-text-track-display > div > div > div{
    font-size: 1.3rem !important;
    line-height:1.2rem !important;
    padding:5px !important;
    background: #50505050 !important;
    text-shadow: 2px 2px 2px #000000;
    color: #FFFA00 !important;
    display: inline-block !important;
}
.wordcloud-container {
    border: 4px solid #55555555;
    border-radius: 15px;
}
.sub-list.v-list.v-sheet {
    position: absolute;
    width: 35%;
    z-index: 1;
}
.sub-item.v-list-item:hover{
    background-color: #555555;
    transition: 0.4s;
}

</style>
