<template>
<svg>
  <circle v-for="point in points" fill="#d00" r="10" :cx="point.x" :cy="point.y"></circle>
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

  computed: {
    points () {
      const length = this.rows.length - 1
      return this.rows.map((row, index) => {
        let pos = (length / index) || 0
        console.log(row)
        return {
          y: row.value,
          x: pos
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  svg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
  }
</style>
