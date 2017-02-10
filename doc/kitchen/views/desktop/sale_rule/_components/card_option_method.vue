<template>
  <card class="card-option-method">
    <card-header slot="card-header" :title="'用户渠道和支付方式控制'" :is_save_actions_show="is_form_changed"
                 @reset-form="reset" @save-form="save">
    </card-header>

    <g-row :spacing="1">
      <!--<g-col :span="'1/1'">-->
        <!--<grid-input :title="'请选择政策有效的线上渠道'">-->
          <!--<checkbox-group :cur_ids="cur_ids" :options="{ '1': 'PC web站', '2': 'H5 手机站', '3': 'H5 微信站', '4': 'App' }" :in_grid="true"></checkbox-group>-->
        <!--</grid-input>-->
      <!--</g-col>-->
      <g-col :span="'1/1'">
        <grid-input :title="'请选择政策支持的支付方式'" :row_num="2.3" v-if="!!data.payment_methods">
          <g-row>
            <g-col :span="'1/1'" v-if="!!data.payment_methods.online">
              <checkbox-group :toggle_all_label="'在线支付'" :cur_ids="data.payment_methods.online.chosen" :options="data.payment_methods.online.all" :in_grid="true" @switch-checkbox="is_form_changed = true"></checkbox-group>
            </g-col>
          </g-row>
          <g-row>
            <g-col :span="'1/1'" v-if="!!data.payment_methods.inter">
              <checkbox-group :toggle_all_label="'国际支付'" :cur_ids="data.payment_methods.inter.chosen" :options="data.payment_methods.inter.all" :in_grid="true" @switch-checkbox="is_form_changed = true"></checkbox-group>
            </g-col>
          </g-row>
          <g-row>
            <g-col :span="'1/1'" v-if="!!data.payment_methods.bank">
              <checkbox-group :toggle_all_label="'银行支付'" :cur_ids="data.payment_methods.bank.chosen" :options="data.payment_methods.bank.all" :in_grid="true" @switch-checkbox="is_form_changed = true"></checkbox-group>
            </g-col>
          </g-row>
          <g-row>
            <g-col :span="'1/1'" v-if="!!data.payment_methods.score">
              <checkbox-group :toggle_all_label="'积分支付'" :cur_ids="data.payment_methods.score.chosen" :options="data.payment_methods.score.all" :in_grid="true" @switch-checkbox="is_form_changed = true"></checkbox-group>
            </g-col>
          </g-row>
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
        cur_ids: [1],
        orig_data: {},
        data: {},
        is_form_changed: false
      };
    },
    components: {
    },
    mounted () {
      this.getMethod();
    },
    methods: {
      getMethod: function () {
        axios.get('/chef/api/saleRule/channel/optionMethod?channel_id=' + this.$route.params.channel_id).then(res => {
          this.orig_data = JSON.parse(JSON.stringify(res.data.data));
          this.data = res.data.data;
        });
      },
      reset: function () {
        this.data = JSON.parse(JSON.stringify(this.orig_data));
        this.is_form_changed = false;
      },
      save: function () {
        var post_data = JSON.parse(JSON.stringify(this.data));
        post_data.channel_id = this.$route.params.channel_id;
        axios.put('/chef/api/saleRule/channel/optionMethod', post_data).then(res => {
          if (res.data.code === 200) {
            this.is_form_changed = false;
          }
        });
      }
    }
  };
</script>
