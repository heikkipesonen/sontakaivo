<template>
<view-container>
  <div class="">
    <graph :rows="items"></graph>
  </div>
  <button v-on:click="reload()">
    reload
  </button>
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
<style lang="scss">
</style>
