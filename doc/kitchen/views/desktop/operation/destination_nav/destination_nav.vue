<template>
  <paper class="destination-nav-paper">

    <paper-header slot="paper-header"></paper-header>

    <div class="pure-g grid-spacing">
      <div class="pure-u-1-3 grid-spacing-u">
        <card-navigation-continent></card-navigation-continent>
      </div>
      <div class="pure-u-1-3 grid-spacing-u" v-if="!!$route.params.continent_id">
        <card-navigation-country></card-navigation-country>
      </div>
      <div class="pure-u-1-3 grid-spacing-u" v-if="!!$route.params.country_id">
        <card-navigation-city></card-navigation-city>
      </div>
    </div>

  </paper>
</template>

<style scoped></style>

<script>
  export default {
    mounted () {
      this.$root.$emit('init-paper', '目的地导航管理');
    },
    components: {
      'card-navigation-continent': require('./_components/card_destination_nav_continent'),
      'card-navigation-country': require('./_components/card_destination_nav_country'),
      'card-navigation-city': require('./_components/card_destination_nav_city.vue')
    }
  };
</script>
