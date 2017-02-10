<template>
  <paper class="paper-product-group-detail" :is_root_paper="false">

    <paper-header slot="paper-header" :use_delete="true" @do-delete="deleteProductGroup">

    </paper-header>

    <card-hotel-groups></card-hotel-groups>

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
      'card-hotel-groups': require('./_components/card_facility_detail.vue')
    },
    methods: {
      deleteProductGroup: function () {
        axios.delete('/chef/api/resource/hotel/HotelServiceDelete', {
          params: {
            facility_id: this.$route.params.facility_id
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$router.push({ name: 'resource_hotel_facility' });
          }
        });
      }
    }
  };
</script>
