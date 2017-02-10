<template>
  <header class="card-footer" :style="{ 'text-align': align }">
    <slot></slot>
  </header>
</template>

<style scoped lang="stylus">
  @import './../../../_styles/variables';
  .card-footer { position: relative; line-height: row_height_1; padding: 2px 0 5px; border-top: 1px solid light_gray_1; margin-top: 10px; }
</style>

<script>
  export default {
    props: {
      align: { type: String, default: 'right' }
    }
  };
</script>
