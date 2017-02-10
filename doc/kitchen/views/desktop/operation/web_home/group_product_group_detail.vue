<template>
  <paper class="paper-group-product-group-detail" :is_root_paper="false">

    <paper-header slot="paper-header"></paper-header>

    <card-group-product-group-base @set-cities="setCities"></card-group-product-group-base>

    <keep-alive>
      <card-product-group-list v-if="group_id != 'new'" :in_cities="in_cities" :parent="'web_home_group_product_detail'"></card-product-group-list>
    </keep-alive>

  </paper>
</template>

<script>
  export default {
    data () {
      return {
        in_cities: []
      };
    },
    computed: {
      group_id: function () {
        return this.$route.params.group_id;
      }
    },
    components: {
      'card-group-product-group-base': require('../group_product_group/_components/card_group_product_group_base'),
      'card-product-group-list': require('../group_product_group/_components/card_product_group_list')
    },
    methods: {
      setCities: function (in_cities) {
        this.in_cities = in_cities;
        console.log(this.in_cities);
      }
    }
  };
</script>
