export default {
  path: 'order',
  name: 'order',
  component: require('views/desktop/order/order'),
  redirect: { name: 'processing_order' },
  children: [
    {
      path: 'processing_order',
      name: 'processing_order',
      component: require('views/desktop/order/order_list/order_list')
    },
    {
      path: 'order/:order_id',
      name: 'order_detail',
      component: require('views/desktop/order/order_detail/order_detail')
    }
  ]
};
