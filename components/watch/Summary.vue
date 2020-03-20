<template>
  <v-card height="500px" style="overflow: auto">
    <v-card-title class="text-center justify-center py-6">
      <v-label>Summary</v-label>
    </v-card-title>
    <v-tabs
      v-model="tab"
      grow
    >
      <v-tab
        v-for="sumSize in sumSizes"
        :key="sumSize"
      >
        {{ sumSize }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="sumSize in sumSizes"
        :key="sumSize"
      >
        <v-card flat>
          <v-card-text class="summary-text">
            <!-- {{ texts[sumSize] }} -->
            <span v-html="texts[sumSize]" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
export default {
  props: {
    fwl: {
      type: Array,
      default() {
        return []
      }
    },
    sumSizes: {
      type: Array,
      default() {
        return [0.2, 0.4, 0.6, 0.8]
      }
    },
    texts: {
      type: Object,
      default() {
        return { 0.2: 'loading', 0.4: 'loading', 0.6: 'loading', 0.8: 'loading' }
      }
    }
  },
  data() {
    return {
      tab: null,
      test: '<b>1</b>'
    }
  },
  mounted() {
    this.sumSizes.forEach((sumSize) => {
      this.fwl.forEach((word) => {
        const re = new RegExp(`${word}`, 'gi')
        this.texts[sumSize] = this.texts[sumSize].replace(re, `<span class='mark'>${word}</span>`)
      })
    })
  }

}
</script>

<style>
.mark {
  color: lightblue;
}

.summary-text {
  text-justify:  inner-word;
  text-align:  justify;
  color: lightgoldenrodyellow !important;
  font-family: sans-serif;
  font-size: 14px;
}
</style>
