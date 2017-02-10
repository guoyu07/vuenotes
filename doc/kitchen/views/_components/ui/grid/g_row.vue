<template>
  <section class="g-row pure-g"
           :style="{ 'border-left': spacing + 'px solid ' + spacing_color,
                     'border-top': spacing + 'px solid ' + spacing_color,
                     'margin-top': break_row * 10 + 'px' }">
    <slot></slot>
  </section>
</template>

<script>
  export default {
    props: {
      spacing: { type: Number, default: 0 },
      spacing_color: { type: String, default: '#f7f7f7' },
      break_row: { type: Number, default: 0 }
    }
  };
</script>
