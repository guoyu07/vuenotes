<template>
  <section class="loading-cover">
    <img class="running-man" :src="running_giraffe">
  </section>
</template>

<style scoped>
  .loading-cover { position: absolute; z-index: 400; top: 0; left: 0; right: 0; bottom: 0; background: #fff; }
  .loading-cover .running-man { display: block; margin: 120px auto; width: 400px; }
</style>

<script>
  export default {
    data () {
      return {
        running_giraffe: require('./_images/running_giraffe.gif')
      };
    }
  };
</script>
