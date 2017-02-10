<template>
  <div class="g-col"
       :class="[ 'pure-u-' + span.replace(/\//, '-') ]">
    <slot></slot>
  </div>
</template>

<style scoped>
  .g-col { position: relative; }
  .g-col .grid-input,
  .g-col .grid-checkbox,
  .g-col .grid-image { border-bottom: 1px solid #f7f7f7; border-right: 1px solid #f7f7f7; }
</style>

<script>
  export default {
    props: {
      span: String
    }
  };
</script>
