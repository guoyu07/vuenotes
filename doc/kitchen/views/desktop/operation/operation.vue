<template>
  <board :nav_groups="nav_groups"></board>
</template>

<script>
  export default {
    data () {
      return {
        nav_groups: [
          {
            group_name: '基础运营',
            group_items: [
              { name: '「自由行目的地」导航管理', route: { name: 'operation_destination_nav' } },
              { name: '「周边游目的地」导航管理', route: { name: 'operation_around_tour_nav' } }
            ]
          },
          {
            group_items: [
              { name: '商品分组 (专题)', route: { name: 'operation_product_group' } },
              { name: '商品分组的分组 (专题组)', route: { name: 'operation_group_product_group' } },
              { name: '商户分组', route: { name: 'operation_merchant_group' } }
            ]
          },
          {
            group_items: [
              { name: '头图 (Banner)', route: { name: 'operation_banner' } },
              { name: '标签 (Tag)', route: { name: 'operation_tag' } }
            ]
          },
          {
            group_name: '主站运营',
            group_items: [
              { name: '首页', route: { name: 'operation_web_home' } },
              { name: '目的地页', route: { name: 'operation_web_dest' } }
            ]
          },
          {
            group_name: '小程序',
            group_items: [
              { name: '菠萝PASS - 城市主页', route: { name: 'operation_wxapp_bolo_city' } },
              { name: '菠萝PASS - 礼品卡', route: { name: 'operation_wxapp_bolo_gift_card' } }
            ]
          }
        ]
      };
    }
  };
</script>
