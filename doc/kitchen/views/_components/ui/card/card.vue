<template>
  <section class="card" :class="{ 'little': is_little, 'no-padding': !use_padding }">
    <slot name="card-header"></slot>
    <slot name="card-neck"></slot>
    <slot></slot>
  </section>
</template>

<style scoped>
  .card { position: relative; padding-top: 18px; padding-bottom: 18px; }
  .card.little { padding-top: 0; padding-bottom: 0; margin-bottom: 12px; }
  /* 状态 */
  .card.no-padding { padding-top: 0; padding-bottom: 0; }
</style>

<script>
  export default {
    props: {
      is_little: { type: Boolean, default: false },
      use_padding: { type: Boolean, default: true }
    }
  };
</script>
