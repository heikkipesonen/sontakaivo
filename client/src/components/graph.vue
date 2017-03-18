<template>
<svg width="100%" height="100%">
  <polyline :points="points"></polyline>
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
      let yoffset = this.height * 0.1

      return this.rows.reverse().map((row, index) => {
        return `${index * xfactor},${this.height - (row.value * yfactor) - yoffset}`
      }).join(' ')
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

    polyline {
      opacity: 0.6;
      stroke: #ffffff;
      stroke-width: 2;
      fill: transparent;
    }
  }
</style>
