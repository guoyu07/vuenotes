<template>
  <paper class="airline" :is_loading_show="false">

    <paper-header slot="paper-header"></paper-header>

    <card-airline-list></card-airline-list>

  </paper>
</template>

<script>
  export default {
    components: {
      'card-airline-list': require('./_components/card_airline_list.vue')
    }
  };
</script>
