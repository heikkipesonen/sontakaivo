<template>
<svg>
  <g class="status-display" :transform="position">
    <defs>
      <clipPath id="indicatorMask">
        <circle :r="radius"></circle>
      </clipPath>
    </defs>

    <rect clip-path="url(#indicatorMask)" :height="indicatorHeight" :width="radius * 2" :x="indicatorPosition.x" :y="indicatorPosition.y"></rect>
    <circle :r="radius"></circle>
    <text y="25pt">{{level}}</text>
  </g>
</svg>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      widht: 0,
      height: 0
    }
  },

  computed: {
    radius () {
      return Math.min(this.width / 2 * 0.8, this.height / 2 * 0.8) || 0
    },

    indicatorHeight () {
      return this.level / 100 * (this.radius * 2) || 0
    },

    indicatorPosition () {
      return {
        x: -this.radius,
        y: -this.radius + (this.radius * 2 - this.indicatorHeight)
      }
    },

    position () {
      return `translate(${this.width / 2 || 0}, ${this.height / 2 || 0})`
    },

    level () {
      return Math.round(100 - (this.data.remaining / this.data.total_capacity * 100))
    }
  },

  mounted () {
    let style = window.getComputedStyle(this.$el)
    this.width = parseInt(style.width.replace('px', ''))
    this.height = parseInt(style.height.replace('px', ''))
  }
}
</script>
<style lang="scss" scoped>
svg {
  position: relative;
  width: 100%;
  height: 100%;
}

.status-display {

}

circle {
  fill: transparent;
  stroke: rgb(207, 207, 207);
  stroke-width: 8px;
}

rect {
  fill: rgba(201, 201, 201, 0.6)
}

text {
  font-family: sans-serif;
  font-size: 50pt;
  fill: #ebebeb;
  text-anchor: middle;
}
</style>
