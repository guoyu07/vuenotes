<template>
  <board :nav_groups="nav_groups"></board>
</template>

<script>
  export default {
    data () {
      return {
        nav_groups: [
          {
            group_name: '渠道',
            group_items: [
              { name: '企业渠道', route: { name: 'sale_rule_company_channel' } },
              { name: '同业渠道', route: { name: 'sale_rule_same_channel' } },
              { name: '异业渠道', route: { name: 'sale_rule_diff_channel' } }
            ]
          }
        ]
      };
    }
  };
</script>
