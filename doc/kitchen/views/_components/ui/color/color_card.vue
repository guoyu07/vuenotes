<template>
  <div class="color-card"
       :style="{ 'background': value, 'height': $parent.row_num * 50 - 28 + 'px' }"></div>
</template>

<style>
  .color-card { margin: 0 -5px; }
</style>

<script>
  export default {
    props: {
      value: { type: String, default: '#eee' },
      in_grid: { type: Boolean, default: false }
    },
    methods: {
      onInput: function (event) {
        this.$emit('input', event.target.value);
      }
    }
  };
</script>
