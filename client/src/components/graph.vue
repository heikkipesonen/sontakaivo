<template>
<svg width="100%" height="100%">
  <path :d="path"></path>
</svg>
</template>
<script>
import {fitCurve} from '../utils/fitcurves'

export default {
  props: {
    rows: {
      type: Array,
      default: () => []
    },

    max: {
      type: Number,
      default: 765
    },

    min: {
      type: Number,
      default: 0
    },

    curveTolerance: {
      type: Number,
      default: 10
    }
  },

  data () {
    return {
      width: 1,
      height: 1
    }
  },

  computed: {
    count () {
      return this.rows.length - 1
    },

    points () {
      let xfactor = this.width / this.count
      let yfactor = this.height / this.max

      return this.rows.reverse().map((row, index) => {
        return [
          index * xfactor,
          this.height - (row.value * yfactor)
        ]
      })
    },

    path () {
      if (!this.points.length) return ''
      return fitCurve(this.points, this.curveTolerance).map((curve) => {
        let m = curve.slice(0, 1)
        let c = curve.slice(1)
        return 'M' + m.join(' ') + ' C ' + c.map((cc) => cc.join(' ')).join(',')
      })
    }
  },

  mounted () {
    const style = window.getComputedStyle(this.$el)
    this.width = parseInt(style.width.replace('px', ''))
    this.height = parseInt(style.height.replace('px', ''))
  }
}
</script>
<style lang="scss" scoped>
  svg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;

    polyline, line, path {
      opacity: 0.6;
      stroke: #ffffff;
      stroke-width: 2;
      fill: transparent;
    }

    line {
      opacity: 0.3;
    }

    circle {
      r: 5;
      stroke: #d00;
      fill: transparent;
    }
  }
</style>
