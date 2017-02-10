<template>
  <paper class="paper-product-group-detail" :is_root_paper="false">

    <paper-header slot="paper-header" :use_delete="true" @do-delete="deleteProductGroup">

    </paper-header>

    <card-rate-groups></card-rate-groups>

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
      'card-rate-groups': require('./_components/card_rate_detail.vue')
    },
    methods: {
      deleteProductGroup: function () {
        axios.delete('/chef/api/resource/hotel/RateDelete', {
          params: {
            rate_id: this.$route.params.rate_id
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$router.push({ name: 'resource_hotel_rate' });
          }
        });
      }
    }
  };
</script>
