<template>
  <card class="card-info-contract">
    <card-header slot="card-header" :title="'商务相关信息'" :is_save_actions_show="is_form_changed"
                 @reset-form="resetContract" @save-form="saveContract">
    </card-header>

    <g-row :spacing="1">
      <g-col :span="'1/2'">
        <grid-input :title="'合作方式'" :row_num="2">
          <textarea-input v-model="contract.summary" :in_grid="true" @input="is_form_changed = true"></textarea-input>
        </grid-input>
      </g-col>

      <g-col :span="'1/2'">
        <grid-input :title="'合作开始时间'">
          <text-input :type="'date'" v-model="contract.contract_start_date" :in_grid="true"
                      @input="is_form_changed = true"></text-input>
        </grid-input>
        <grid-input :title="'合作结束时间'">
          <text-input :type="'date'" v-model="contract.contract_end_date" :in_grid="true"
                      @input="is_form_changed = true"></text-input>
        </grid-input>
      </g-col>

      <g-col :span="'1/2'">
        <grid-input :title="'结算方式'" :row_num="2">
          <textarea-input :in_grid="true" v-model="contract.attachement" @input="is_form_changed = true"></textarea-input>
        </grid-input>
      </g-col>

      <g-col :span="'1/2'">
        <grid-input :title="'对接方式'">
          <tab :cur_id="contract.access_type" :tabs="{ '1': '跳转到玩途下单', '2': '渠道下单' }" :in_grid="true" @switch-tab="changeAccessType"></tab>
        </grid-input>
        <grid-input :title="'上货方式'">
          <tab :cur_id="contract.channel_product_type" :tabs="{ '0': '不在渠道上货', '1': '人工渠道后台上货', '2': 'API上货' }" :in_grid="true" @switch-tab="changeChannelProductType"></tab>
        </grid-input>
      </g-col>

      <g-col :span="'1/1'">
        <grid-input :title="'备注信息'" :row_num="2">
          <textarea-input :in_grid="true" v-model="contract.comments" @input="is_form_changed = true"></textarea-input>
        </grid-input>
      </g-col>
    </g-row>
  </card>
</template>
<style scoped>
</style>
<script>
  /* global axios:true */
  export default {
    data () {
      return {
        contract: {},
        orig_contract: {},
        is_form_changed: false
      };
    },
    components: {
    },
    mounted () {
      this.getContract();
    },
    methods: {
      getContract: function () {
        axios.get('/chef/api/saleRule/channel/biz?channel_id=' + this.$route.params.channel_id).then(res => {
          if (res.data.code === 200) {
            if (res.data.data.has_biz) {
              this.orig_contract = Object.assign({}, res.data.data);
              this.contract = res.data.data;
            } else {
              this.orig_contract.channel_id = this.$route.params.channel_id;
              this.orig_contract.access_type = '1';
              this.orig_contract.channel_product_type = '0';
              this.contract = Object.assign({}, this.orig_contract);
            }
          }
        });
      },
      resetContract: function () {
        this.contract = Object.assign({}, this.orig_contract);
        this.is_form_changed = false;
      },
      saveContract: function () {
        axios.put('/chef/api/saleRule/channel/biz', this.contract).then(res => {
          if (res.data.code === 200) {
            this.orig_contract = Object.assign({}, this.contract);
            this.is_form_changed = false;
          }
        });
      },
      changeAccessType: function (type) {
        this.contract.access_type = type;
        this.is_form_changed = true;
      },
      changeChannelProductType: function (type) {
        this.contract.channel_product_type = type;
        this.is_form_changed = true;
      }
    }
  };
</script>
