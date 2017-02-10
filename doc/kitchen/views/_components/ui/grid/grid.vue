<template>
  <section class="grid pure-g"
           :style="{ 'border-left': spacing + 'px solid ' + spacing_color,
                     'border-right': spacing + 'px solid ' + spacing_color }">
    <slot></slot>
  </section>
</template>

<script>
  export default {
    props: {
      spacing: { type: Number, default: 0 },
      spacing_color: { type: String, default: '#f7f7f7' }
    }
  };
</script>
