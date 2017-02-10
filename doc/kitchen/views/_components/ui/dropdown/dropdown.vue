<template>
  <span class="dropdown" @click="is_menu_show = !is_menu_show">
    <div class="name-wrap"><slot name="name"></slot></div>
    <div class="menu-wrap" v-show="is_menu_show"><slot name="menu"></slot></div>
  </span>
</template>

<style scoped lang="stylus">
  @import './../../../_styles/variables.styl';
  .dropdown { position: relative; height: row_height_1; line-height: row_height_1; padding: 0 10px; }
</style>

<script>
  export default {
    data () {
      return {
        is_menu_show: false
      };
    }
  };
</script>
