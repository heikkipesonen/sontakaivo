<template>
<svg width="100%" height="100%">
  <circle v-for="point in points" :cx="point.x" :cy="point.y"></circle>
</svg>
</template>
<script>
export default {
  props: {
    rows: {
      type: Array,
      default: []
    }
  },

  data () {
    return {
      width: 1,
      height: 1
    }
  },

  computed: {
    max () {
      return this.rows.reduce((max, row) => row.value > max ? row.value : max, 0) * 1.2
    },

    count () {
      return this.rows.length - 1
    },

    points () {
      let xfactor = this.width / this.count
      let yfactor = this.height / this.max

      return this.rows.map((row, index) => {
        return {
          y: this.height - (row.value * yfactor),
          x: index * xfactor
        }
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

    circle {
      opacity: 0.6;
      stroke: #e8fffd;
      fill: transparent;
      r: 10;
    }
  }
</style>
