<template>
  <paper class="same-industry-detail" :is_root_paper="false">

    <paper-header slot="paper-header">
      <tab v-if="$route.params.channel_id != 'new'" :cur_id="status" :tabs="{ '0': '编辑中', '1': '已上线', '2': '禁用' }" :in_grid="true" @switch-tab="changeStatus"></tab>
    </paper-header>

    <card-channel-new v-if="$route.params.channel_id == 'new'"></card-channel-new>
    <card-channel-detail v-if="$route.params.channel_id != 'new'" @channel-status="channelStatus"></card-channel-detail>
  </paper>
</template>
<style scoped>
</style>
<script>
  /* global axios:true */
  export default {
    data () {
      return {
        paper_title: '新增渠道',
        status: ''
      };
    },
    components: {
      'card-channel-detail': require('./_components/card_channel_detail'),
      'card-channel-new': require('./_components/card_channel_new')
    },
    methods: {
      channelStatus: function (status) {
        this.status = status;
      },
      changeStatus: function(status) {
        var post_data = {
          channel_id: this.$route.params.channel_id,
          status: status
        };
        axios.put('/chef/api/saleRule/channel/channelStatus', post_data).then(res => {
          if (res.data.code === 200) {
            this.status = status;
          }
        });
      }
    }
  };
</script>
