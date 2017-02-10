<template>
  <paper class="p-group">

    <paper-header slot="paper-header"></paper-header>

    <card-product-groups></card-product-groups>

  </paper>
</template>

<script>
  export default {
    components: {
      'card-product-groups': require('./../../operation/_components/card_product_groups')
    }
  };
</script>


