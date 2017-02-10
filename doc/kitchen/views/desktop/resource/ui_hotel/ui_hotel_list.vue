<template>
  <paper class="product-group" :is_loading_show="true">

    <paper-header slot="paper-header"></paper-header>

    <card-hotel-groups></card-hotel-groups>

  </paper>
</template>

<script>
  export default {
    components: {
      'card-hotel-groups': require('./_components/card_hotel_list.vue')
    }
  };
</script>
