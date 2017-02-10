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
      'card-hotel-groups': require('./_components/card_hotel_room_detail.vue')
    },
    methods: {
      deleteProductGroup: function () {
        axios.delete('/chef/api/resource/hotel/HotelRoomDel', {
          params: {
            room_id: this.$route.params.room_id
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$router.push({ name: 'resource_hotel' });
          }
        });
      }
    }
  };
</script>
