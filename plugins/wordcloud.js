import Vue from 'vue'
import wordcloud from 'vue-wordcloud'
import * as d3 from 'd3'
import axios from 'axios'

const tooltip = d3.select('body').append('div')
  .attr('class', 'tooltip')
  .style('width', '250px')
  .style('height', '250px')
  .style('overflow', 'hidden')
  .style('font', '1em sans-serif')
  .style('border-radius', '15px')
  .style('padding', '18px')
  .style('text-justify', 'inter-word')
  .style('text-align', 'justify')
  .style('opacity', 0)
let onWord = false

// edit draw function
wordcloud.methods.draw = function (data) {
  const { layout, chart, color, nameKey, valueKey, wordClick } = this
  const fill = this.getColorScale(color)
  const vm = this
  const centeredChart = chart.append('g')
    .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')')
  // Define the div for the tooltip
  const text = centeredChart.selectAll('text')
    .data(data)
    .enter().append('text')
    .style('font-size', d => d.size + 'px')
    .style('font-family', d => d.font)
    .style('fill', (d, i) => fill(i))
    .attr('class', 'text')
    .attr('text-anchor', 'middle')

  text.transition()
    .duration(500)
    .attr('transform', (d) => { return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')' })
    .text(d => d.text)

  text.on('mouseover', function (d) {
    const rect = this.getBoundingClientRect()
    onWord = true
    this.style.stroke = '#000000'
    this.style.lineWidth = '1'

    axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${d.text}&limit=1&namespace=0&format=json`)
      .then(res => res.data)
      .then((data) => {
        if (data && data[2].length > 0 && onWord === true) {
          const scrollY = document.querySelector('html').scrollTop
          tooltip.html(`<div>
                            <h4>${data[1][0]}</h4> 
                            <h5>${data[2][0]}</h5>
                            <span class='wiki-link'>${data[3][0]}</span>
                        </div>`)
          tooltip
            .style('left', `${rect.left - 150}px`)
            .style('top', `${rect.bottom + scrollY}px`)
        }
      })
    tooltip.transition()
      .duration(200)
      .style('opacity', 0.9)
  })
    .on('mouseout', function (d) {
      tooltip.transition()
        .duration(500)
        .style('opacity', 0)
      this.style.stroke = ''
    })

  text.on('click', (d) => {
    wordClick(d[nameKey], d[valueKey], vm)
  })
}

Vue.component('wordcloud', wordcloud)
