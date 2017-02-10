<template>
  <label class="grid-input" :style="{ 'height': row_num * 50 + 'px' }">
    <p class="grid-input-title">{{ title }}:</p>
    <div class="grid-input-wrap">
      <slot></slot>
    </div>
  </label>
</template>

<style scoped lang="stylus">
  @import './../../../_styles/variables';
  .grid-input { display: block; position: relative; height: 50px; background: #fff; color: black; padding: 5px 10px; }
  .grid-input-title { color: gray_2; height: 18px; line-height: 15px; }
  .grid-input-wrap { font-size: 14px; line-height: row_height_1; }
</style>

<script>
  export default {
    props: {
      row_num: { type: Number, default: 1 },
      title: String
    }
  };
</script>
