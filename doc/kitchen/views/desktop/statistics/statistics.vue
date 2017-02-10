<template>
  <section class="paper-statistics">
    <card-sales-chart></card-sales-chart>
  </section>
</template>

<script>
  export default {
    components: {
      'card-sales-chart': require('./_components/card_sales_chart')
    }
  };
</script>