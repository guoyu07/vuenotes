<template>
  <section class="view-desktop">
    <top-nav></top-nav>
    <router-view class="board-view"></router-view>
  </section>
</template>

<style scoped>
  .top-nav { position: absolute; top: 0; left: 0; right: 0; }
  .board-view { position: relative; width: 1200px; margin: 45px auto 0; padding-bottom: 30px; }
</style>

<script>
  module.exports = {
    components: {
      'top-nav': require('views/_components/top_nav')
    }
  };
</script>
