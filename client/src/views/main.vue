<template>
<view-container>
  <div class="canvas">
    <graph :rows="items"></graph>
  </div>
  <div class="toolbar">
    <button v-on:click="reload">
      reload
    </button>
  </div>
</view-container>
</template>
<script>
import viewContainer from '../components/view'
import graph from '../components/graph'
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    viewContainer,
    graph
  },

  computed: {
    ...mapGetters({
      items: 'chart'
    })
  },

  methods: {
    ...mapActions([
      'getChart'
    ]),

    reload () {
      window.location.reload()
    }
  },

  created () {
    this.getChart('range')
  }
}
</script>
<style lang="scss" scoped>
.canvas {
  position: absolute;;
  left: 64px;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
}

.toolbar {
  position: absolute;
  left: 0;
  width: 64px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #0087dd;

  button {
    width: 64px;
    height: 64px;
    outline: none;
    background-color: transparent;
    color: white;
    border: none;
  }
}

</style>
