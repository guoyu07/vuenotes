<template>
  <paper class="product-group" :is_loading_show="true">

    <paper-header slot="paper-header"></paper-header>

    <card-product-groups></card-product-groups>

  </paper>
</template>

<script>
  export default {
    components: {
      'card-product-groups': require('./../_components/card_product_groups')
    }
  };
</script>
