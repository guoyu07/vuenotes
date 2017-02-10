<template>
  <paper class="paper-gift-card-detail" :is_root_paper="false">

    <paper-header slot="paper-header" :use_delete="true" @do-delete="deleteGiftCard">
    </paper-header>

    <card class="text-center">
      <tab :tabs="this.$route.params.card_id!='new' ? { base: '基本信息', merchants: '关联商户' } : { base: '基本信息' }"
           :cur_id="cur_tab"
           @switch-tab="switchTab"></tab>
    </card>

    <keep-alive>
      <card-gift-card-base v-show="cur_tab == 'base'"></card-gift-card-base>
    </keep-alive>

    <keep-alive>
      <card-gift-card-merchants v-if="cur_tab == 'merchants'"></card-gift-card-merchants>
    </keep-alive>

  </paper>
</template>

<script>
  /* global axios:true */
  export default {
    computed: {
      cur_tab: function () {
        return this.$route.params.tab;
      }
    },
    components: {
      'card-gift-card-base': require('./_components/card_gift_card_base'),
      'card-gift-card-merchants': require('./_components/card_gift_card_merchants')
    },
    methods: {
      deleteGiftCard: function () {
        axios.delete('/chef/api/operation/markWeApp/giftCard', {
          params: {
            card_id: this.$route.params.card_id
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$router.push({ name: 'operation_wxapp_bolo_gift_card' });
          }
        });
      },
      switchTab: function (tab_id) {
        this.$router.push({
          name: 'operation_wxapp_bolo_gift_card_detail',
          params: { card_id: this.$route.params.card_id, tab: tab_id }
        });
      }
    }
  };
</script>
