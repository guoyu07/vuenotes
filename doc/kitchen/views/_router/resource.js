export default {
  path: 'resource',
  name: 'resource',
  component: require('views/desktop/resource/resource'),
  redirect: {name: 'resource_hotel'},
  children: [
    {
      path: 'hotel',
      name: 'resource_hotel',
      component: require('views/desktop/resource/ui_hotel/ui_hotel_list')
    },
    {
      path: 'hotel/:hotel_id/:tab',
      name: 'resource_hotel_detail',
      component: require('views/desktop/resource/ui_hotel/ui_hotel_detail')
    },
    {
      path: 'airline',
      name: 'resource_airline',
      component: require('views/desktop/resource/ui_airline/ui_airline_list')
    },
    {
      path: 'facility',
      name: 'resource_hotel_facility',
      component: require('views/desktop/resource/ui_hotel/ui_hotel_facility_list')
    },
    {
      path: 'facility/:facility_id',
      name: 'resource_hotel_facility_detail',
      component: require('views/desktop/resource/ui_hotel/ui_hotel_facility_detail')
    },
    {
      path: 'service',
      name: 'resource_hotel_service',
      component: require('views/desktop/resource/ui_hotel/ui_hotel_service_list')
    },
    {
      path: 'service/:service_id',
      name: 'resource_hotel_service_detail',
      component: require('views/desktop/resource/ui_hotel/ui_hotel_service_detail')
    },
    {
      path: 'room/:room_id/:hotel_id',
      name: 'resource_hotel_room_detail',
      component: require('views/desktop/resource/ui_hotel/ui_hotel_room_detail')
    },
    {
      path: 'rate',
      name: 'resource_hotel_rate',
      component: require('views/desktop/resource/ui_hotel/ui_hotel_rate_list')
    },
    {
      path: 'rate/:rate_id',
      name: 'resource_hotel_rate_detail',
      component: require('views/desktop/resource/ui_hotel/ui_hotel_rate_detail')
    },
    {
      path: 'airline/:tab',
      name: 'new_resource_airline',
      component: require('views/desktop/resource/ui_airline/ui_airline_detail')
    },
    {
      path: 'airline/:airline_id',
      name: 'resource_airline_detail',
      component: require('views/desktop/resource/ui_airline/ui_airline_detail')
    },
    {
      path: 'flight',
      name: 'resource_flight',
      component: require('views/desktop/resource/ui_flight/ui_flight_list')
    }
  ]
};
