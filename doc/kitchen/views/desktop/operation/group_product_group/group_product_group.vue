<template>
  <paper class="group-product-group">

    <paper-header slot="paper-header"></paper-header>

    <card-group-product-groups></card-group-product-groups>

  </paper>
</template>

<script>
  export default{
    components: {
      'card-group-product-groups': require('./../_components/card_group_product_groups')
    },
    mounted () {
      this.$root.$emit('init-paper', '分组的分组列表');
    }
  };
</script>
