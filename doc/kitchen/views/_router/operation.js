export default {
  path: 'operation',
  name: 'operation',
  component: require('views/desktop/operation/operation'),
  redirect: { name: 'operation_destination_nav' },
  children: [
    // ----------------------------------------------------------------------------------------
    // 目的地导航
    {
      path: 'destination_nav/:continent_id?/:continent_code?/:country_id?/:country_code?',
      name: 'operation_destination_nav',
      component: require('views/desktop/operation/destination_nav/destination_nav')
    },
    // ----------------------------------------------------------------------------------------
    // 周边游导航
    {
      path: 'around_tour_nav/:first_level_id?/:first_level_code?/:second_level_id?/:second_level_code?',
      name: 'operation_around_tour_nav',
      component: require('views/desktop/operation/around_tour_nav/around_tour_nav')
    },
    // ----------------------------------------------------------------------------------------
    // 商品分组
    {
      path: 'product_group',
      name: 'operation_product_group',
      component: require('views/desktop/operation/product_group/product_group')
    },
    {
      path: 'product_group/:group_id/:tab',
      name: 'operation_product_group_detail',
      component: require('views/desktop/operation/product_group/product_group_detail')
    },
    // ----------------------------------------------------------------------------------------
    // 商品分组的分组
    {
      path: 'group_product_group',
      name: 'operation_group_product_group',
      component: require('views/desktop/operation/group_product_group/group_product_group')
    },
    {
      path: 'group_product_group/:group_id',
      name: 'operation_group_product_group_detail',
      component: require('views/desktop/operation/group_product_group/group_product_group_detail')
    },
    {
      path: 'group_product_group_in_group/:group_id/:tab',
      name: 'operation_product_group_detail_in_group',
      component: require('views/desktop/operation/group_product_group/product_group_detail_in_group')
    },
    // ----------------------------------------------------------------------------------------
    // 商户分组
    {
      path: 'merchant_group',
      name: 'operation_merchant_group',
      component: require('views/desktop/operation/merchant_group/merchant_group')
    },
    {
      path: 'merchant_group/:group_id/:tab',
      name: 'operation_merchant_group_detail',
      component: require('views/desktop/operation/merchant_group/merchant_group_detail')
    },
    // ----------------------------------------------------------------------------------------
    // Banner
    {
      path: 'banner',
      name: 'operation_banner',
      component: require('views/desktop/operation/banner/banner')
    },
    {
      path: 'banner/:banner_id',
      name: 'operation_banner_detail',
      component: require('views/desktop/operation/banner/banner_detail')
    },
    // ----------------------------------------------------------------------------------------
    // Tag
    {
      path: 'tag',
      name: 'operation_tag',
      component: require('views/desktop/operation/tag/tag')
    },
    {
      path: 'tag/:tag_id',
      name: 'operation_tag_detail',
      component: require('views/desktop/operation/tag/tag_detail')
    },
    // ----------------------------------------------------------------------------------------
    // web首页
    {
      path: 'web_home',
      name: 'operation_web_home',
      component: require('views/desktop/operation/web_home/web_home')
    },
    {
      path: 'web_home/:area_id/:tab',
      name: 'operation_web_home_area',
      component: require('views/desktop/operation/web_home/web_home_area')
    },
    {
      path: 'web_home_product_group/:group_id/:tab',
      name: 'operation_web_home_product_group_detail',
      component: require('views/desktop/operation/web_home/product_group_detail')
    },
    {
      path: 'web_home_group_product_group/:group_id',
      name: 'operation_web_home_group_product_group_detail',
      component: require('views/desktop/operation/web_home/group_product_group_detail')
    },
    {
      path: 'web_home/:area_id/:tab/banner/:banner_id',
      name: 'operation_web_home_banner_detail',
      component: require('views/desktop/operation/banner/banner_detail')
    },
    // ----------------------------------------------------------------------------------------
    // web目的地页
    {
      path: 'web_dest',
      name: 'operation_web_dest',
      component: require('views/desktop/operation/web_dest/web_dest')
    },
    {
      path: 'web_dest_detail/:dest_id/:dest_title/:dest_type/:tab/:country_code',
      name: 'operation_web_dest_detail',
      component: require('views/desktop/operation/web_dest/web_dest_detail')
    },
    // ----------------------------------------------------------------------------------------
    // 菠萝PASS
    {
      path: 'wxapp_bolo_city',
      name: 'operation_wxapp_bolo_city',
      component: require('views/desktop/operation/wxapp_bolo_city/wxapp_bolo_city')
    },
    {
      path: 'wxapp_bolo_city_detail/:city_code/:cn_name/:tab',
      name: 'operation_wxapp_bolo_city_detail',
      component: require('views/desktop/operation/wxapp_bolo_city/wxapp_bolo_city_detail')
    },
    {
      path: 'wxapp_bolo_gift_card',
      name: 'operation_wxapp_bolo_gift_card',
      component: require('views/desktop/operation/wxapp_bolo_gift_card/wxapp_bolo_gift_card')
    },
    {
      path: 'wxapp_bolo_gift_card_detail/:card_id/:tab',
      name: 'operation_wxapp_bolo_gift_card_detail',
      component: require('views/desktop/operation/wxapp_bolo_gift_card/wxapp_bolo_gift_card_detail')
    }
  ]
};
