<template>
  <paper class="gift-card" :title="'礼品卡列表'">

    <paper-header slot="paper-header"></paper-header>

    <card-gift-cards></card-gift-cards>

  </paper>
</template>

<script>
  export default {
    components: {
      'card-gift-cards': require('./_components/card_gift_cards')
    }
  };
</script>
