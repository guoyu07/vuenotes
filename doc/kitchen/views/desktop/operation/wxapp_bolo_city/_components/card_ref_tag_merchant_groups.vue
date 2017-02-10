<template>
  <card class="card-ref-tag-merchant-groups">

    <card-header slot="card-header" :title="'商户分组'">
      <btn :icon="'i-plus'" :text="'商户分组'" :mood="'emphasis'"
           @click.native="is_merchant_group_hunter_show = true"></btn>
    </card-header>

    <draggable class="pure-g grid-spacing"
               :list="groups" :options="{ animation: 300, handle: '.drag-handle' }"
               @end="sortGroup">
      <card-merchant-group-item class="pure-u-1-2 grid-spacing-u" v-for="(group, index) in groups"
                                :merchant_group="group" :index="index"
                                @ref-removed="queryGroups"></card-merchant-group-item>
    </draggable>

    <!-- 商户分组多选弹窗 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_merchant_group_hunter_show" @close-modal="is_merchant_group_hunter_show = false">
      <card-header slot="modal-header" :title="'选择多个商户分组'"></card-header>
      <multiple-hunter :type="'merchant_group'" :cur_ids="merchant_group_ids"
                       :in_cities="in_cities"
                       @cancel-hunt="is_merchant_group_hunter_show = false"
                       @do-hunt="saveMerchantGroupsRef"></multiple-hunter>
    </modal>

  </card>
</template>

<script>
  /* global axios:true */
  export default {
    data () {
      return {
        groups: [],
        merchant_group_ids: [],
        in_cities: [],
        is_merchant_group_hunter_show: false
      };
    },
    components: {
      'card-merchant-group-item': require('./card_merchant_group_item')
    },
    computed: {
      city_code: function () {
        return this.$route.params.city_code;
      },
      in_cities: function () {
        return [this.$route.params.city_code];
      }
    },
    mounted () {
      this.queryGroups();
    },
    methods: {
      queryGroups: function () {
        axios.get('/chef/api/operation/markWeApp/markGroups', {
          params: {
            type: 3,
            code: this.city_code,
            show_type: 1
          }
        }).then(res => {
          this.merchant_group_ids = this.setMerchantGroupIds(res.data.data);
          this.groups = res.data.data;
        });
      },
      setMerchantGroupIds: function (merchant_groups) {
        var merchant_group_ids = [];
        merchant_groups.map(merchant_group => {
          merchant_group_ids.push(merchant_group.group_id);
        });
        return merchant_group_ids;
      },
      saveMerchantGroupsRef: function (merchant_group_ids, merchant_groups) {
        merchant_groups = merchant_groups.map(merchant_group => {
          merchant_group.icon = '';
          this.groups.forEach(group => {
            if (group.group_id === merchant_group.group_id) {
              merchant_group.icon = group.icon;
            }
          });
          return merchant_group;
        });
        axios.patch('/chef/api/operation/markWeApp/markGroups', {
          type: 3,
          code: this.city_code,
          show_type: 1,
          groups: merchant_groups
        }).then(res => {
          this.queryGroups();
          this.is_merchant_group_hunter_show = false;
        });
      },
      sortGroup: function (event) {
        axios.put('/chef/api/operation/markWeApp/markGroups', {
          id: this.groups[event.newIndex || 0].id,
          new_index: event.newIndex || 0
        }).then(res => {
          if (res.data.code !== 200) this.queryGroups();
          else this.merchant_group_ids = this.setMerchantGroupIds(res.data.data);
        });
      }
    }
  };
</script>
