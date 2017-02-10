export default {
  path: 'library',
  name: 'library',
  component: require('views/desktop/library/library'),
  redirect: { name: 'library_ui_guideline', params: { tab_id: 'vi' } },
  children: [
    {
      path: 'ui_guideline/:tab_id',
      name: 'library_ui_guideline',
      component: require('views/desktop/library/ui_guideline/ui_guideline')
    },
    {
      path: 'ui_components',
      name: 'library_ui_components',
      component: require('views/desktop/library/ui_components/ui_components')
    },
    {
      path: 'test_group',
      name: 'test_group',
      component: require('views/desktop/library/p_group/p_group')
    }
  ]
};
