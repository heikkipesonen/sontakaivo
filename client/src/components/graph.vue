<script>
import { Line, mixins } from 'vue-chartjs/es'

export default Line.extend({
  mixins: [mixins.reactiveProp],
  props: [
    'chartData',
    'options'
  ],

  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})
</script>
