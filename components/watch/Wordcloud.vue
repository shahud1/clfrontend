<template>
  <wordcloud
    :data="words"
    name-key="name"
    value-key="value"
    :show-tooltip="false"
    :font-size="[11,50]"
    font-scale="log"
    :rotate="{from: 0, to: 0, numOfOrientation: 1}"
    :word-click="wordClickHandler"
  />
</template>
<script>
export default {
  props: {
    words: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    svg() {
      return document.querySelector('svg')
    }
  },
  watch: {
    // words: {
    //   immediate: true,
    //   handler(val) {
    //     const wcList = document.getElementsByClassName('text')
    //     const axios = this.$axios
    //     let onWord = false
    //     for (const wc of wcList) {
    //       const tooltip = document.getElementsByClassName('tooltip')[0]
    //       wc.addEventListener('mouseover', function (event) {
    //         onWord = true
    //         event.srcElement.style.stroke = '#000000'
    //         event.srcElement.style.lineWidth = '1'

    //         axios.$get(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${this.textContent}&limit=1&namespace=0&format=json`)
    //           .then((data) => {
    //             if (data[2].length > 0 && onWord === true) {
    //               tooltip.innerHTML = `<div>
    //                                             <h4>${data[1][0]}</h4>
    //                                             <h5>${data[2][0]}</h5>
    //                                             <span class='wiki-link'>${data[3][0]}</span>
    //                                         </div>`
    //               tooltip.style.opacity = 0.8
    //               tooltip.style.left = `${event.pageX - event.offsetX}px`
    //               tooltip.style.top = `${event.pageY + 15}px`
    //             }
    //           })
    //       })
    //       wc.addEventListener('mouseout', function (event) {
    //         onWord = false
    //         event.srcElement.style.stroke = ''
    //         tooltip.style.opacity = 0
    //       })
    //     }
    //   }
    // }
  },
  methods: {
    wordClickHandler(name, value, vm) {
      this.$axios.$get(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${name}&limit=1&namespace=0&format=json`)
        .then((data) => {
          const win = window.open(data[3][0], '_blank')
          win.focus()
        })
    }
  }
}
</script>

<style>

div.tooltip h4 {
    color: lightcoral;
}
div.tooltip h5 {
    color:lightgoldenrodyellow;
    font: 0.7em sans-serif;

}
.wiki-link {
    font: 0.6em sans-serif !important;
    color: lightblue;
}
</style>
