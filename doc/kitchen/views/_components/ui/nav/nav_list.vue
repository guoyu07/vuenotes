<template>
  <nav class="nav-list">
    <header class="list-header" v-if="!!title">{{ title }}</header>
    <div class="nav-items">
      <span class="nav-item"
            v-for="item in nav_items"
            @click="$emit('select-item', item)">{{ item.name }}</span>
    </div>
  </nav>
</template>

<style scoped lang="stylus">
  @import "~styles/variables.styl";
  .nav-list { position: relative; }
  .list-header { font-size: 12px; line-height: row_height_1; font-weight: bold; padding: 0 1px; }
  .nav-item { position: relative; display: block; margin-top: 1px; line-height: 24px; padding-right: 8px; border-radius: 1px; background: light_gray_2; padding: 5px 10px; cursor: pointer; opacity: 1; transition: all .2s; }
  .nav-item:not(:first-child) { margin-top: 1px; }
  .nav-item:hover { background: light_gray_1; opacity: .8; }
</style>

<script>
  export default {
    props: {
      title: String,
      nav_items: Array
    }
  };
</script>
