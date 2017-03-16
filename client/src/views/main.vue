<template>
<div>
  <button v-on:click="reload()">
    reload
  </button>
</div>
</template>
<script>
  export default {
    methods: {
      reload () {
        window.location.reload()
      }
    }
  }
</script>
<style lang="scss"></style>
