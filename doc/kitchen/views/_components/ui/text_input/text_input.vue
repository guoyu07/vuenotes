<template>
  <span class="text-input" :class="{ 'in_grid': in_grid, 'readonly': readonly, 'big': $parent.row_num > 1 }">
    <label class="text-input-inner">
      <span class="input-prefix" v-if="!!prefix">{{ prefix }}</span>
      <input class="the-input" :value="value" :type="type" :readonly="readonly"
             @input="onInput"
             @keyup.enter="$emit('keyup-enter', value)">
      <span class="input-suffix" v-if="!!suffix">{{ suffix }}</span>
      <icon v-if="!!icon" :class="{ 'use-action': !!icon_event }" :name="icon" :color="'#666'"
            @click.native="$emit(icon_event)"></icon>
    </label>
  </span>
</template>

<style scoped lang="stylus">
  @import "~styles/variables.styl";
  .text-input { position: relative; display: inline-block; height: row_height_2; line-height: row_height_2_inner; padding: 2px; background: light_gray_2; }
  .text-input-inner { position: relative; display: block; background: #fff; padding: 0 30px 0 10px; }
  .text-input .the-input { display: inline-block; width: 100%; border: none; appearance: none; background: transparent; outline: none; padding: 0; }
  .text-input .icon { display: block; position: absolute; top: 50%; right: 6px; margin-top: -10px; padding: 4px; transition: all .1s; }
  .text-input .icon.use-action:hover { cursor: pointer; opacity: .8; }
  /* 类型 */
  .text-input.in_grid { display: inline-block; width: 100%; height: 22px; padding: 0; background: transparent; border-bottom: 1px solid light_gray_2; }
  .text-input.in_grid .text-input-inner { display: flex; background: transparent; padding: 0; line-height: 14px; font-size: 14px; }
  .text-input.in_grid .input-prefix { padding-right: 5px; }
  .text-input.in_grid .input-suffix { padding-left: 5px; }
  .text-input.in_grid .the-input { flex: 1; font-size: 14px; line-height: 20px; }
  .text-input.in_grid.big { height: 72px; }
  .text-input.in_grid.big .the-input { font-size: 28px; line-height: 62px; }
  /* readonly */
  .text-input.readonly { border: none; pointer-events: none; cursor: not-allowed; }
</style>

<script>
  export default {
    props: {
      value: String,
      type: { type: String, default: 'text' },
      icon: String,
      icon_event: String,
      prefix: String,
      suffix: String,
      in_grid: { type: Boolean, default: false },
      readonly: { type: Boolean, default: false }
    },
    methods: {
      onInput: function (event) {
        this.$emit('input', event.target.value);
      }
    }
  };
</script>
