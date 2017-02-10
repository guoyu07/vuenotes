<template>
  <card class="card-merchant-group-item" :is_little="true" :use_padding="true">

    <card-header slot="card-header" :title="'商户分组' + (index + 1)" :in_little_card="true">
      <icon class="drag-handle" slot="after-title" :name="'i-sort'" :color="'#999'"></icon>
      <btn :text="'详情'" @click.native="goMerchantGroupDetail()"></btn>
      <btn :text="'解除挂接'" :mood="'danger'" @click.native="removeMerchantGroupRef()"></btn>
    </card-header>
    <g-row :spacing="1">
      <g-col :span="'3/5'">
        <g-row :spacing="1">
          <g-col :span="'1/1'">
            <grid-input :title="'分组名字(只读)'">
              <text-input v-model="merchant_group.title" :in_grid="true" :readonly="true"></text-input>
            </grid-input>
          </g-col>
        </g-row>
        <g-row :spacing="1">
          <g-col :span="'1/2'">
            <grid-input :title="'商户数量'">
              <text-input v-model="merchant_group.merchant_count" :in_grid="true" :readonly="true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/2'">
            <grid-input :title="'商品数量'">
              <text-input v-model="merchant_group.product_count" :in_grid="true" :readonly="true"></text-input>
            </grid-input>
          </g-col>
        </g-row>
      </g-col>
      <g-col :span="'2/5'">
        <grid-image :image_url="merchant_group.icon" :row_num="2" :title="'图标'" :min_size="[144, 144]"
                    :display_type="'contain'" @image-uploaded="setIcon"></grid-image>
      </g-col>
    </g-row>
  </card>
</template>

<style scoped>
  .card-merchant-group-item .drag-handle { width: 12px; height: 12px; vertical-align: -2px; margin-left: 5px; }
</style>

<script>
  /* global axios:true */
  export default {
    props: ['merchant_group', 'index'],
    methods: {
      removeMerchantGroupRef: function () {
        axios.delete('/chef/api/operation/markWeApp/markGroup', {
          params: {
            type: 3,
            code: this.$route.params.city_code,
            id: this.merchant_group.id
          }
        }).then(res => {
          this.$emit('ref-removed');
        });
      },
      setIcon: function (icon_url) {
        axios.put('/chef/api/operation/markWeApp/markGroup', {
          id: this.merchant_group.id,
          icon: icon_url
        }).then(res => {
          this.merchant_group.icon = icon_url;
        });
      },
      goMerchantGroupDetail: function () {
        var href = this.$router.resolve({
          name: 'operation_merchant_group_detail',
          params: { group_id: this.merchant_group.group_id, tab: 'base' }
        }).href;
        window.open(window.location.origin + href);
      }
    }
  };
</script>
