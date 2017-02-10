<template>
  <header class="card-header" :class="{ 'in-little-card': $parent.is_little }">
    <div class="card-header-main">{{ title }}
      <slot name="after-title"></slot>
    </div>
    <aside class="card-header-actions">
      <span v-show="is_save_actions_show">
        <btn :icon="'i-undo'" @click.native="$emit('reset-form')"></btn>
        <btn :icon="'i-check'" :text="'保存'" :mood="'emphasis'" @click.native="$emit('save-form')"></btn>
      </span>
      <slot></slot>
      <btn v-if="use_delete" :icon="'i-bin'" :mood="'danger'" @click.native="doDelete"></btn>
    </aside>
  </header>
</template>

<style scoped lang="stylus">
  @import "~styles/variables.styl";
  .card-header { position: relative; line-height: row_height_1; border-bottom: 1px solid light_gray_1; margin-bottom: 10px; }
  .card-header-main { font-weight: bold; }
  .card-header-main .icon { width: 12px; height: 12px; vertical-align: -2px; margin-left: 5px; }
  .card-header-actions { position: absolute; bottom: 2px; right: 2px; }
  /* 类型 */
  .card-header.in-little-card { background: #fff; padding: 2px 10px; height: 26px; margin-bottom: 0; border: none; }
</style>

<script>
  export default {
    props: {
      title: String,
      use_delete: { type: Boolean, default: false },
      is_save_actions_show: { type: Boolean, default: false },
      in_little_card: { type: Boolean, default: false }
    },
    methods: {
      doDelete: function (row, index) {
        if (window.confirm('确认删除?')) {
          this.$emit('do-delete', row, index);
        }
      }
    }
  };
</script>
