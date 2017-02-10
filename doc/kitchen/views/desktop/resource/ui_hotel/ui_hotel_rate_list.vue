<template>
  <paper class="product-group" :is_loading_show="true">

    <paper-header slot="paper-header"></paper-header>

    <card-rate-groups></card-rate-groups>

  </paper>
</template>

<script>
  export default {
    components: {
      'card-rate-groups': require('./_components/card_rate_list.vue')
    }
  };
</script>
