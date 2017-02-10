<template>
  <paper class="merchant-group" :title="'商户分组列表'">

    <paper-header slot="paper-header"></paper-header>

    <card-merchant-groups></card-merchant-groups>

  </paper>
</template>

<script>
  export default {
    components: {
      'card-merchant-groups': require('./_components/card_merchant_groups')
    }
  };
</script>
