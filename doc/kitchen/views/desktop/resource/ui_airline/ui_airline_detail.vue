<template>
    <paper class="airline" :is_loading_show="false">

        <paper-header slot="paper-header"></paper-header>

        <card-airline-detail></card-airline-detail>
    </paper>
</template>

<script>
  export default {
    components: {
      'card-airline-detail': require('./_components/card_airline_detail.vue')
    }
  };
</script>