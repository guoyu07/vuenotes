<template>
  <section class="toast shadow-deep">
    <div class="toast-icon">
      <icon :name="icon" :color="'#fff'"></icon>
    </div>
    <div class="toast-text">{{ text }}</div>
  </section>
</template>

<style scoped>
  .toast { position: fixed; display: flex; top: 10px; left: 50%; margin-left: -150px; width: 300px; height: 40px; line-height: 30px; padding: 5px 12px; opacity: .8; border-radius: 1px; background: #000; }
  .toast-icon { width: 30px; }
  .toast-icon .icon { vertical-align: middle; width: 18px; height: 18px; }
  .toast-text { font-size: 14px; }
</style>

<script>
  export default {
    props: {
      text: String,
      icon: { type: String, default: 'i-check' }
    }
  };
</script>
