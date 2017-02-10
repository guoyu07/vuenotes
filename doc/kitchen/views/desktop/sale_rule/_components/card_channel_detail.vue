<template>
  <div class="card-channel-detail">

    <card class="text-center" v-if="$route.params.channel_id != 'new'">
      <tab :tabs="{ info: '基本信息', option: '政策配置' }"
           :cur_id="current_tab"
           @switch-tab="switchTab"></tab>
    </card>

    <div v-show="current_tab == 'info'">
      <card-info-contact @channel-status="channelStatus"></card-info-contact>

      <card-info-contract></card-info-contract>
    </div>

    <div v-show="current_tab == 'option'">
      <card-option-method></card-option-method>

      <card-option-policy></card-option-policy>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
  export default {
    data () {
      return {
        current_tab: 'info'
      };
    },
    components: {
      'card-option-method': require('./card_option_method'),
      'card-option-policy': require('./card_option_policy'),
      'card-info-contact': require('./card_info_contact'),
      'card-info-contract': require('./card_info_contract')
    },
    mounted () {
    },
    methods: {
      switchTab: function (tab_id) {
        this.current_tab = tab_id;
      },
      channelStatus: function (status) {
        this.$emit('channel-status', status);
      }
    }
  };
</script>
