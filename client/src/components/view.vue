<template>
<div class="view">
    <div class="view-content">
        <slot></slot>
    </div>
</div>
</template>
<script>
export default {

}
</script>
<style scoped lang="scss">
@import '../styles/theme';

.view {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    overflow: hidden;
    background-color: #eee;
}

.view-content {
  flex: 1 0 auto;
}
</style>
