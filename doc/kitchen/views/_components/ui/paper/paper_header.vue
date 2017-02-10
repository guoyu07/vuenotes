<template>
  <header class="paper-header">
    <div class="paper-header-main">
      <span class="paper-title">{{ title }}</span>
      <span class="after-title"><slot name="after_title"></slot></span>
    </div>
    <aside class="card-header-actions">
      <slot></slot>
      <btn v-if="use_delete" :icon="'i-bin'" :mood="'danger'" @click.native="doDelete()"></btn>
    </aside>
  </header>
</template>

<style scoped lang="stylus">
  @import "~styles/variables.styl";
  .paper-header { line-height: 28px; height: 28px; border-bottom: 1px solid light_gray_1; }
  .paper-header .paper-title { font-size: 14px; vertical-align: top; margin-right: 2px; }
  .paper-header .after-title { display: inline-block; vertical-align: -3px; height: row_height_1; }
  .card-header-actions { position: absolute; height: row_height_1; bottom: 3px; right: 0; }
</style>

<script>
  export default {
    props: {
      use_delete: { type: Boolean, default: false }
    },
    data () {
      return {
        title: ''
      };
    },
    created () {
      this.$root.$once('init-paper', (paper_title) => {
        this.title = paper_title;
      });
      this.$root.$on('replace-paper', (paper_title) => {
        if (!paper_title) return;
        this.title = paper_title;
      });
    },
    methods: {
      doDelete: function (row, index) {
        this.$emit('do-delete', row, index);
      }
    }
  };
</script>
