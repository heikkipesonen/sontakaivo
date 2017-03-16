<template>
<div>
  <button c-on:click="reload()">
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
