<template>
  <paper class="channel-policy" :is_root_paper="false">

    <paper-header slot="paper-header">
      <tab :cur_id="policy.status" v-if="$route.params.id != 'new'"
           :tabs="{ '0': '编辑中', '1': '已上线' }"
           :in_grid="true" @switch-tab="changeStatus"></tab>
    </paper-header>

    <card>
      <card-header slot="card-header" :title="'基本信息'" :is_save_actions_show="is_form_changed"
                   @reset-form="resetContact"
                   @save-form="saveContact">
      </card-header>
      <g-row>
        <g-col :span="'1/1'" v-if="category != {}">
          <grid-input :title="'商品范围'">
            <tab :cur_id="policy.product_category" :tabs="category.labels" :in_grid="true" @switch-tab="changeProductCategory"></tab>
          </grid-input>
        </g-col>
        <g-col :span="'1/1'">
          <grid-input :title="'商品类型'" :row_num="2" v-if="!!policy.product_type">
            <checkbox-group :cur_ids="policy.product_type" :options="all_product_types" :in_grid="true" @switch-checkbox="is_form_changed = true"></checkbox-group>
          </grid-input>
        </g-col>
        <g-col :span="'1/2'">
          <grid-input :title="'开始时间'">
            <text-input :type="'date'" :in_grid="true" v-model="policy.start_date"
                   @input="is_form_changed = true"></text-input>
          </grid-input>
        </g-col>
        <g-col :span="'1/2'">
          <grid-input :title="'结束时间'">
            <text-input :type="'date'" :in_grid="true" v-model="policy.end_date"
                        @input="is_form_changed = true"></text-input>
          </grid-input>
        </g-col>
      </g-row>

      <g-row :break_row="1" v-if="!!policy.discount">
        <g-col :span="'1/2'">
          <grid-input :title="'折扣类型'">
            <tab :cur_id="policy.discount.discount_type" :tabs="{ '1': '折扣', '2': '满减' }" :in_grid="true" @switch-tab="changeDiscountDiscountType"></tab>
          </grid-input>
        </g-col>
        <g-col :span="'1/2'">
          <grid-input :title="policy.discount.discount_type == 1 ? '折扣比例(此为优惠数目,例如九七折应写3)' : '满减金额'">
            <text-input :in_grid="true" v-model="policy.discount.discount_off"
                        @input="is_form_changed = true"></text-input>
          </grid-input>
        </g-col>
      </g-row>

      <g-row :break_row="1" v-if="!!policy.commision">
        <g-col :span="'1/2'">
          <grid-input :title="'返佣比例'">
            <text-input :in_grid="true" v-model="policy.commision.discount_off"
                        @input="is_form_changed = true"></text-input>
          </grid-input>
        </g-col>
      </g-row>

    </card>
  </paper>
</template>
<style scoped>
</style>
<script>
  /* global axios:true */
  export default {
    data () {
      return {
        orig_policy: {},
        policy: {},
        category: {},
        all_product_types: {},
        is_form_changed: false
      };
    },
    components: {
    },
    mounted () {
      this.$root.$emit('init-paper', this.$route.params.id === 'new' ? '新建政策' : '政策详情');
      this.getPolicy();
    },
    methods: {
      getPolicy: function () {
        if (this.$route.params.id !== 'new') {
          axios.get('/chef/api/saleRule/channel/policy?id=' + this.$route.params.id).then(res => {
            if (res.data.code === 200) {
              this.orig_policy = JSON.parse(JSON.stringify(res.data.data));
              this.policy = JSON.parse(JSON.stringify(res.data.data));
              axios.get('/chef/api/saleRule/channel/allCategory').then(res => {
                if (res.data.code === 200) {
                  this.category = res.data.data;
                  this.all_product_types = this.category.types[this.policy.product_category];
                }
              });
            }
          });
        } else {
          this.orig_policy.channel_id = this.$route.params.channel_id;
          this.orig_policy.product_category = '0';
          this.orig_policy.product_type = [];
          this.orig_policy.discount = {
            discount_type: '1',
            discount_off: '0'
          };
          this.orig_policy.commision = {
            discount_type: '1',
            discount_off: '0'
          };
          this.policy = JSON.parse(JSON.stringify(this.orig_policy));
          axios.get('/chef/api/saleRule/channel/allCategory').then(res => {
            if (res.data.code === 200) {
              this.category = res.data.data;
              this.all_product_types = this.category.types[this.policy.product_category];
            }
          });
        }
      },
      changeProductCategory: function (category) {
        this.policy.product_category = category;
        this.policy.product_type = [];
        this.all_product_types = this.category.types[category];
        this.is_form_changed = true;
      },
      changeDiscountDiscountType: function (discount_type) {
        this.policy.discount.discount_type = discount_type;
        this.is_form_changed = true;
      },
      resetContact: function () {
        this.policy = JSON.parse(JSON.stringify(this.orig_policy));
        this.is_form_changed = false;
      },
      changeStatus: function(status) {
        var post_data = {
          id: this.$route.params.id,
          status: status
        };
        axios.put('/chef/api/saleRule/channel/policyStatus', post_data).then(res => {
          if (res.data.code === 200) {
            this.policy.status = status;
          }
        });
      },
      saveContact: function () {
        if (this.$route.params.id === 'new') {
          axios.post('/chef/api/saleRule/channel/policy', this.policy).then(res => {
            if (res.data.code === 200) {
              this.policy.id = res.data.data.id;
              this.policy.status = '0';
              this.$root.$emit('replace-paper', '政策详情');
              this.$router.replace({
                name: this.$route.name,
                params: {
                  channel_id: this.$route.params.channel_id,
                  id: res.data.data.id
                }
              });
              this.is_form_changed = false;
            }
          });
        } else {
          axios.put('/chef/api/saleRule/channel/policy', this.policy).then(res => {
            if (res.data.code === 200) {
              this.is_form_changed = false;
            }
          });
        }
      }
    }
  };
</script>
