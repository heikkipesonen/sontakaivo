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
import api from '../api'
import viewContainer from '../components/view'
import graph from '../components/graph'

export default {
  components: {
    viewContainer,
    graph
  },

  data () {
    return {
      items: []
    }
  },

  methods: {
    reload () {
      console.log('reload')
      window.location.reload()
    }
  },

  created () {
    api.get('/range').then((response) => {
      console.log(response)
      this.items = response.rows
    })
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
