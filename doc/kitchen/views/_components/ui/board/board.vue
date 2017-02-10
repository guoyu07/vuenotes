<template>
  <section class="board">
    <left-nav :nav_groups="nav_groups"></left-nav>
    <router-view class="paper-view" :class="{ 'move-left' : $store.state.is_cheat_sheet_show }"></router-view>
  </section>
</template>

<style scoped>
  .board .left-nav { position: fixed; top: 80px; width: 200px; }
  .board .paper-view { margin-left: 220px; }
  /*.board .paper-view.move-left { transform: translateX(-220px); }*/
  .board .paper-view.move-left { margin-left: 0; }
</style>

<script>
  export default {
    props: ['nav_groups'],
    components: {
      'left-nav': require('views/_components/left_nav')
    }
  };
</script>
