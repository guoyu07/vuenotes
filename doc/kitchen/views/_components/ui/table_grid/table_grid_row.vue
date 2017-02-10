<template>
  <section class="table-grid-row" :class="{ 'highlight': is_highlight, 'can-be-click': use_click }">
    <table-grid-col class="drag-handle" v-if="$parent.$parent.use_sort" :span="'35px'">
      <icon :name="'i-sort'" :color="'#666'"></icon>
    </table-grid-col>
    <slot></slot>
  </section>
</template>

<style scoped lang="stylus">
  @import '~styles/variables.styl';
  .table-grid-row { display: flex; margin-top: 1px; background: #fff; box-shadow: 0 1px 2px -1px rgba(0, 0, 0, .1); transition: all .2s; }
  .table-grid-row .icon { width: 12px; height: 12px; vertical-align: middle; }
  .table-grid-row .drag-handle { cursor: move; cursor: -webkit-grabbing; text-align: center; }
  .table-grid-row.highlight { background: light_gray_2; }
  .table-grid-row.can-be-click:not(.highlight):hover { background: light_gray_3; cursor: pointer; }
</style>

<script>
  export default {
    props: {
      dd: String,
      is_highlight: { type: Boolean, default: false },
      use_click: { type: Boolean, default: false }
    }
  };
</script>
