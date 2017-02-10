<template>
  <paper class="channel-list">
    <paper-header slot="paper-header"></paper-header>

    <card-channel-list :type="3"></card-channel-list>
  </paper>
</template>
<style scoped>
</style>
<script>
  export default {
    data () {
      return {
      };
    },
    components: {
      'card-channel-list': require('./../_components/card_channel_list.vue')
    },
    mounted () {
      this.$root.$emit('init-paper', '企业渠道');
    },
    methods: {
    }
  };
</script>
