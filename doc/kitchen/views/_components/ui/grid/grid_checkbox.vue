<template>
  <section class="grid-checkbox"
           :class="{ 'selected': value }" :style="{ 'height': row_num * 50 + 'px' }"
           @click="$emit('input', !value)">
    <i class="icon-wrap">
      <icon v-show="value" :name="'i-check'" :color="'#666'"></icon>
    </i>
  </section>
</template>


<style scoped lang="stylus">
  @import './../../../_styles/variables';
  .grid-checkbox { position: relative; background: #fff; cursor: pointer; opacity: 1; transition: all .2s; }
  .grid-checkbox:hover { opacity: .8; }
  .grid-checkbox .icon-wrap { display: block; position: absolute; top: 50%; left: 50%; margin: -12px 0 0 -12px; width: 24px; height: 24px; padding: 2px; border-radius: 50%; border: 1px solid gray_3; transition: all .2s; }
  .grid-checkbox.selected { background: light_gray_2; }
  .grid-checkbox.selected .icon-wrap { border: none; }
</style>

<script>
  export default {
    props: {
      row_num: { type: Number, default: 1 },
      value: { type: Boolean, default: false }
    }
  };
</script>
