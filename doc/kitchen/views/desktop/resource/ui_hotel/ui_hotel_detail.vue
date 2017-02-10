<template>
  <paper class="paper-product-group-detail" :is_root_paper="false">

    <paper-header slot="paper-header" :use_delete="true" @do-delete="deleteProductGroup">
      <!--<btn :icon="'i-cog'" :text="'已上线, 挂接管理'"></btn>-->
    </paper-header>

    <card class="text-center">
      <tab :tabs="{ base: '基本信息', room: '房型', facility: '设施', service: '服务' }"
           :cur_id="cur_tab"
           @switch-tab="switchTab"></tab>
    </card>

    <keep-alive>
      <card_hotel_base v-show="cur_tab == 'base'"></card_hotel_base>
    </keep-alive>

    <keep-alive>
      <card_hotel_room v-if="cur_tab == 'room'"></card_hotel_room>
    </keep-alive>

    <keep-alive>
      <card_hotel_facility v-if="cur_tab == 'facility'"></card_hotel_facility>
    </keep-alive>

    <keep-alive>
      <card_hotel_service v-if="cur_tab == 'service'"></card_hotel_service>
    </keep-alive>

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
      'card_hotel_base': require('./_components/card_hotel_base'),
      'card_hotel_room': require('./_components/card_hotel_room'),
      'card_hotel_facility': require('./_components/card_hotel_facility'),
      'card_hotel_service': require('./_components/card_hotel_service')
    },
    methods: {
      deleteProductGroup: function () {
        axios.delete('/chef/api/resource/hotel/HotelRoomDel', {
          params: {
            hotel_id: this.$route.params.hotel_id
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$router.push({ name: 'resource_hotel' });
          }
        });
      },
      switchTab: function (tab_id) {
        this.$router.push({
          name: 'resource_hotel_detail',
          params: { hotel_id: this.$route.params.hotel_id, tab: tab_id }
        });
      }
    }
  };
</script>
