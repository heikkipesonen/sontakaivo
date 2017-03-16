<template>
<view-container>
  <button v-on:click="reload()">
    reload
  </button>
</view-container>
</template>
<script>
import viewContainer from '../components/view'

export default {
  components: {
    viewContainer
  },

  methods: {
    reload () {
      window.location.reload()
    }
  }
}
</script>
<style lang="scss"></style>
