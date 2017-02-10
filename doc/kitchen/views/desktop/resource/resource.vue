<template>
    <board :nav_groups="nav_groups"></board>
</template>

<script>
  export default {
    data () {
      return {
        nav_groups: [
          {
            group_name: '酒店基本信息',
            group_items: [
              { name: '酒店列表', route: { name: 'resource_hotel' } },
              { name: '酒店设施', route: { name: 'resource_hotel_facility' } },
              { name: '酒店服务', route: { name: 'resource_hotel_service' } },
              { name: '评分来源', route: { name: 'resource_hotel_rate' } }
            ]
          },
          {
            group_name: '航空公司信息',
            group_items: [
              { name: '航空公司列表', route: { name: 'resource_airline' } }
            ]
          },
          {
            group_name: '航班基本信息',
            group_items: [
              { name: '航班列表', route: { name: 'resource_flight' } }
            ]
          }
        ]
      };
    }
  };
</script>
