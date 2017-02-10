<template>
  <section class="table-grid-col"
           :title="!span || span > 0 ? $slots.default[0].text : ''"
           :style="[getWidth, { 'text-align': align }]">
    <slot></slot>
  </section>
</template>

<style scoped lang="stylus">
  @import '~styles/variables.styl';
  .table-grid-col { padding: 10px 8px; line-height: row_height_1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  /* drag */
  .table-grid-row.sortable-ghost .table-grid-col { background: rgba(0, 0, 0, .02); }
</style>

<script>
  export default {
    props: {
      col_title: String,
      span: [String, Number],
      align: String
    },
    computed: {
      getWidth: function () {
        if (!this.span) return { 'flex': 1 };
        else if (typeof this.span === 'string') return { 'width': this.span };
        else return { 'flex': this.span };
      }
    }
  };
</script>
