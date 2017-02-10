<template>
  <span class="btn" :class="[mood]">
    <icon v-if="!!icon" :name="icon" :color="(mood == 'normal' || mood == 'warning') ? '#333' : '#fff'"></icon>
    <span v-if="!!text">{{ text }}</span>
  </span>
</template>

<style scoped lang="stylus">
  @import './../../../_styles/variables';
  .btn { vertical-align: top; position: relative; display: inline-block; line-height: row_height_1; height: row_height_1; background: gray_1; padding: 0 8px; font-size: 12px; color: #fff; border-radius: 3px; transition: all .1s; cursor: pointer; }
  .btn .icon { width: 12px; height: 12px; vertical-align: -2px; }
  .btn .icon:nth-last-child(2) { margin-right: 2px; }
  /* 类型 */
  .btn.normal { background: light_gray_1; color: black; }
  .btn.emphasis { background: gray_1; }
  .btn.blue { background: blue; }
  .btn.success { background: success; }
  .btn.danger { background: danger; font-weight: bold; }
  .btn.warning { background: warning; color: black; font-weight: bold; }
  /* 状态 */
  .btn:hover { opacity: .8; }
</style>

<script>
  export default {
    props: {
      icon: String,
      text: String,
      mood: { type: String, default: 'normal' }
    }
  };
</script>
