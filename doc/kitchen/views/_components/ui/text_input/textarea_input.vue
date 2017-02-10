<template>
  <div class="textarea-input" :class="{ 'in_grid': in_grid, 'out_grid': !in_grid }">
    <textarea class="the-textarea"
              :value="value"
              :style="{ 'height': $parent.row_num * 50 - 28 + 'px' }"
              @input="onInput"
              @keyup.enter="$emit('keyup-enter', value)">

    </textarea>
  </div>
</template>

<style scoped lang="stylus">
  @import "~styles/variables.styl";
  .textarea-input { position: relative; }
  .the-textarea { display: block; width: 100%; padding: 2px 0; font-size: 14px; line-height: 18px; outline: none; border: none; border-bottom: 1px solid light_gray_1; }
  /* 类型 */
</style>

<script>
  export default {
    props: {
      value: String,
      in_grid: { type: Boolean, default: false }
    },
    methods: {
      onInput: function (event) {
        this.$emit('input', event.target.value);
      }
    }
  };
</script>
