<template>
  <card class="card-merchant-group-merchants">

    <card-header slot="card-header" :title="'关联商户列表'">
      <btn :icon="'i-plus'" :text="'商户'" :mood="'emphasis'" @click.native="is_merchant_hunter_show = true"></btn>
    </card-header>

    <table-grid-2 :data_source="merchants">
      <table-grid-row v-for="merchant in merchants">
        <table-grid-col :col_title="'ID.'" :span="'50px'">{{ merchant.merchant_id }}</table-grid-col>
        <table-grid-col :col_title="'商户'">{{ merchant.name }}</table-grid-col>
        <table-grid-col :col_title="'如何到达   (点击表中按钮可编辑)'" :span="'450px'">
          {{ merchant.arrival }}
          <btn :icon="'i-pencil'" :mood="'mood'" :text="'如何到达'" @click.native="updateMerchant(merchant)"
               style="float: right"></btn>
        </table-grid-col>
        <table-grid-col :col_title="'操作'" :span="'80px'" :align="'right'">
          <btn :icon="'i-bin'" :text="'解挂'" :mood="'danger'" @click.native="deleteMerchant(merchant)"></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>

    <!-- 商户多选弹窗 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_merchant_hunter_show" @close-modal="is_merchant_hunter_show = false">
      <card-header slot="modal-header" :title="'选择多个商户'"></card-header>
      <multiple-hunter :type="'merchant'" :cur_ids="merchant_ids"
                       :in_cities="$store.state.paper_stack[$store.state.paper_stack.length - 1].data.city_codes"
                       @cancel-hunt="is_merchant_hunter_show = false"
                       @do-hunt="saveMerchantsRef"></multiple-hunter>
    </modal>

    <!--到达方式编辑弹窗-->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_how_to_get_there_modal_show" @close-modal="is_how_to_get_there_modal_show = false">
      <card-header slot="modal-header" :title="update_merchant.name"></card-header>
      <card-gift-card-how-to-get-there :merchant="update_merchant"
                                       @cancel-edit="is_how_to_get_there_modal_show = false"
                                       @save-how-to-get-there="saveHowToGetThere"></card-gift-card-how-to-get-there>
    </modal>

  </card>
</template>

<script>
  /* global axios:true */
  export default {
    data () {
      return {
        merchants: [],
        merchant_ids: [],
        is_merchant_hunter_show: false,
        is_how_to_get_there_modal_show: false,
        update_merchant: {}
      };
    },
    components: {
      'card-gift-card-how-to-get-there': require('./card_gift_card_how_to_get_there.vue')
    },
    beforeMount () {
      this.queryMerchants();
    },
    methods: {
      queryMerchants: function () {
        axios.get('/chef/api/operation/markWeApp/GiftCardMerchants', {
          params: {
            card_id: this.$route.params.card_id
          }
        }).then(res => {
          this.merchant_ids = this.setMerchantIds(res.data.data);
          this.merchants = res.data.data;
        });
      },
      saveMerchantsRef: function (merchant_ids, merchants) {
        axios.patch('/chef/api/operation/markWeApp/GiftCardMerchants', {
          card_id: this.$route.params.card_id,
          merchant_ids: merchant_ids
        }).then(res => {
          this.is_merchant_hunter_show = false;
          this.queryMerchants();
        });
      },
      deleteMerchant: function (merchant) {
        axios.delete('/chef/api/operation/markWeApp/GiftCardMerchant', {
          params: {
            id: merchant.id
          }
        }).then(res => {
          this.queryMerchants();
        });
      },
      setMerchantIds: function (merchants) {
        var merchant_ids = [];
        merchants.map(merchant => {
          merchant_ids.push(merchant.merchant_id);
        });
        return merchant_ids;
      },
      saveHowToGetThere: function () {
        this.is_how_to_get_there_modal_show = false;
        this.queryMerchants();
      },
      updateMerchant: function (merchant) {
        this.update_merchant = merchant;
        this.is_how_to_get_there_modal_show = true;
      }
    }
  };
</script>
