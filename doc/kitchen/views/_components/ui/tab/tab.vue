<template>
  <nav class="tab" :class="{ 'in_grid': in_grid }">
    <span class="tab-item"
          v-for="(tab, key) in tabs"
          :class="{ 'active': cur_id == key }"
          @click="switchTab(key)">{{ tab }}</span>
  </nav>
</template>

<style scoped lang="stylus">
  @import "~styles/variables.styl";
  .tab { vertical-align: top; background: light_gray_2; display: inline-block; line-height: row_height_2_inner; height: row_height_2; padding: 2px; border-radius: 2px; font-size: 12px; }
  .tab-item { display: inline-block; padding: 0 10px; border-radius: 1px; color: gray_1; cursor: pointer; transition: all .1s; }
  .tab-item:hover { color: black; }
  .tab-item.active { background: #fff; font-weight: bold; color: black; }
  /* 类型 */
  .tab.in_grid { line-height: row_height_1_inner; height: row_height_1; padding: 1px; background: light_gray_1; }
</style>

<script>
  export default {
    props: {
      tabs: Object,
      cur_id: String,
      in_grid: { type: Boolean, default: false }
    },
    methods: {
      switchTab: function (tab_id) {
        this.$emit('switch-tab', tab_id);
        this.$emit('input', tab_id);
      }
    }
  };
</script>
