<template>
  <aside class="pagination" v-if="total > one_page_count">
    <span class="action-to to-prev"
          :class="{ 'disable': page_num == 1 }"
          @click="$emit('to-page', page_num - 1)">
      <icon :name="'i-arrow-left'" :color="'#666'"></icon></span>
    {{ page_num }}
    <span class="action-to to-next"
          :class="{ 'disable': page_num >= total / one_page_count }"
          @click="$emit('to-page', page_num + 1)">
      <icon :name="'i-arrow-right'" :color="'#666'"></icon>
    </span>
  </aside>
</template>

<style scoped lang="stylus">
  @import "~styles/variables.styl";
  .pagination { text-align: center; margin-top: 10px; }
  .pagination .action-to { display: inline-block; background: #fff; height: row_height_2; line-height: row_height_2_inner; padding: 2px 8px; border-radius: 16px; color: gray_1; min-width: row_height_2; cursor: pointer; transition: all .1s; font-weight: bold; text-align: center; }
  .pagination .action-to:hover { opacity: .6; }
  .pagination .action-to .icon { width: 12px; height: 12px; vertical-align: -2px; }
  .pagination .action-to .action-text { padding: 0 3px 0 6px; }
  .pagination .action-to.disable { opacity: .2; pointer-events: none; }
</style>

<script>
  export default {
    props: {
      page_num: { type: Number, default: 0 },
      total: { type: Number, default: 1 }
    },
    data () {
      return {
        one_page_count: 12
      };
    }
  };
</script>

