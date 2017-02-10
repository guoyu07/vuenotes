<template>
  <paper class="banner-detail" :is_root_paper="false">

    <paper-header slot="paper-header"></paper-header>

    <card-banner-info :banner_id="$route.params.banner_id"></card-banner-info>

  </paper>
</template>

<script>
  export default {
    components: {
      'card-banner-info': require('./../_components/banner/card_banner_info')
    }
  };
</script>
