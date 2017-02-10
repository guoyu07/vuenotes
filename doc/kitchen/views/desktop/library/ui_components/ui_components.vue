<template>
  <paper class="paper_ui_components">

    <paper-header slot="paper_header" xw></paper-header>

    <card class="text-center">
      <tab v-model="cur_tab" :tabs="{ form: '表单', hunter: 'Hunter' }" :cur_id="cur_tab"></tab>
    </card>

    <card-form-components v-if="cur_tab == 'form'"></card-form-components>

    <card-dest-hunter v-if="cur_tab == 'hunter'"></card-dest-hunter>
    <card-product-hunter v-if="cur_tab == 'hunter'"></card-product-hunter>
    <div class="pure-g grid-spacing">
      <card-product-group-hunter class="pure-u-1-2 grid-spacing-u" v-if="cur_tab == 'hunter'"></card-product-group-hunter>
      <card-group-product-group-hunter class="pure-u-1-2 grid-spacing-u" v-if="cur_tab == 'hunter'"></card-group-product-group-hunter>
    </div>

  </paper>
</template>

<script>
  export default {
    data () {
      return {
        cur_tab: 'form'
      };
    },
    components: {
      'card-form-components': require('./_components/card_form_components'),
      'card-dest-hunter': require('./_components/card_dest_hunter'),
      'card-product-hunter': require('./_components/card_product_hunter'),
      'card-product-group-hunter': require('./_components/card_product_group_hunter'),
      'card-group-product-group-hunter': require('./_components/card_group_product_group_hunter')
    },
    mounted: function () {
      this.$root.$emit('init-paper', 'HiKitchen组件库');
    }
  };
</script>
