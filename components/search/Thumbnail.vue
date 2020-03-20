<template>
  <div
    @mouseover="handleHover"
    @mouseleave="handleMouseOut"
    class="thumbnail"
  >
    <img
      :style="myStyle"
      :src="`api/docker/videos/${vid}/sprite.jpg`"
      @load="loadedImage"
      class="thumb-image"
    >
    <!-- <v-img
      :key="`${vid}-${tid}`"
      height="300"
      width="500"
      :src="`${server}/thumb/${vid}/video720p.mp4/thumb-${tid}.jpg`"
      :lazy-src="`${server}/thumb/${vid}/video720p.mp4/thumb-${tid}.jpg`"
    /> -->
  </div>
</template>
<script>
export default {
  props: {
    vid: {
      type: Number,
      default: 10000
    }
  },
  data() {
    return {
      imageHeight: 0,
      myStyle: {},
      interval: null
    }
  },
  methods: {
    loadedImage(image) {
      this.imageHeight = image.target.height
      image.target.width *= 250 / 192
      image.target.height *= 1.0666
    },
    handleHover() {
      let offsetImg = 0
      this.interval = setInterval(() => {
        offsetImg += 1
        if (offsetImg >= (this.imageHeight / 108) - 1) {
          clearInterval(this.interval)
        }
        this.myStyle = {
          top: `${-150 * offsetImg}px`
        }
      }, 100)
    },
    handleMouseOut() {
      clearInterval(this.interval)
    }
  }
}
</script>

<style scoped>
.thumbnail {
  position: relative;
  width: 250px;
  height: 150px;
  overflow: hidden;

}

.thumb-image {
  position:  absolute;
}

</style>
