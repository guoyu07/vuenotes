<template>
  <p>{{ greeting }} world</p>
</template>

<style scoped>
  p {
    font-size: 2em;
    text-align: center;
  }
</style>

<script>
module.exports = {
  data: function(){
    return {
      greeting: 'Hello'
    }
  }
}
</script>
