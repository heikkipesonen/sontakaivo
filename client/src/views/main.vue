<template>
<view-container>
  <button v-on:click="reload()">
    reload
  </button>
</view-container>
</template>
<script>
import api from '../api'
import viewContainer from '../components/view'

export default {
  components: {
    viewContainer
  },

  methods: {
    reload () {
      window.location.reload()
    }
  },

  created () {
    api.get('/latest').then((response) => {
      console.log(response)
    })
  }
}
</script>
<style lang="scss"></style>
