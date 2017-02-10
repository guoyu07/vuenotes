<template>
  <i class="icon" :class="[name]">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
         viewBox="0 0 1040 1040"
         width="100%"
         height="100%">
      <path :fill="color" :d="icons[name]">
    </svg>
  </i>
</template>

<style scoped>
  .icon { position: relative; display: inline-block; vertical-align: top; width: 20px; height: 20px; overflow: hidden; }
  .icon > svg { display: block; }
</style>

<script>
  import icons from 'icons';
  export default {
    props: {
      name: String,
      color: String
    },
    data () {
      return {
        icons: icons
      };
    }
  };
</script>
