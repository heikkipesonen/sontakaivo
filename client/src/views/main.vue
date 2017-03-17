<template>
<view-container>
  <button v-on:click="reload()">
    reload
  </button>
  <graph :rows="items"></graph>
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
      window.location.reload()
    }
  },

  created () {
    api.get('/month').then((response) => {
      console.log(response)
      this.items = response.rows
    })
  }
}
</script>
<style lang="scss"></style>
