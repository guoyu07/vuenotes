<template>
  <paper class="destination-nav-paper">

    <paper-header slot="paper-header"></paper-header>

    <div class="pure-g grid-spacing">
      <div class="pure-u-1-3 grid-spacing-u">
        <card-navigation-first-level></card-navigation-first-level>
      </div>
      <div class="pure-u-1-3 grid-spacing-u" v-if="!!$route.params.first_level_id">
        <card-navigation-second-level></card-navigation-second-level>
      </div>
      <div class="pure-u-1-3 grid-spacing-u" v-if="!!$route.params.second_level_id">
        <card-navigation-third-level></card-navigation-third-level>
      </div>
    </div>

  </paper>
</template>

<style scoped></style>

<script>
  export default {
    mounted () {
      this.$root.$emit('init-paper', '周边游导航管理');
    },
    components: {
      'card-navigation-first-level': require('./_components/card_destination_nav_first_level'),
      'card-navigation-second-level': require('./_components/card_destination_nav_second_level'),
      'card-navigation-third-level': require('./_components/card_destination_nav_third_level.vue')
    }
  };
</script>
