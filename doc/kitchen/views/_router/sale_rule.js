export default {
  path: 'sale_rule',
  name: 'sale_rule',
  component: require('views/desktop/sale_rule/sale_rule'),
  redirect: { name: 'sale_rule_company_channel' },
  children: [
    {
      path: 'company_channel',
      name: 'sale_rule_company_channel',
      component: require('views/desktop/sale_rule/company_channel/channel_list')
    },
    {
      path: 'same_channel',
      name: 'sale_rule_same_channel',
      component: require('views/desktop/sale_rule/same_channel/channel_list')
    },
    {
      path: 'diff_channel',
      name: 'sale_rule_diff_channel',
      component: require('views/desktop/sale_rule/diff_channel/channel_list')
    },
    {
      path: 'channel/:channel_id',
      name: 'sale_rule_channel_detail',
      component: require('views/desktop/sale_rule/channel_detail')
    },
    {
      path: 'channel/:channel_id/contact/:id',
      name: 'sale_rule_channel_contact',
      component: require('views/desktop/sale_rule/channel_contact')
    },
    {
      path: 'channel/:channel_id/policy/:id',
      name: 'sale_rule_channel_policy',
      component: require('views/desktop/sale_rule/channel_policy')
    }
  ]
};
