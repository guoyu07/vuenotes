<template>
  <board :nav_groups="nav_groups"></board>
</template>

<script>
  export default {
    data () {
      return {
        nav_groups: [
          {
            group_name: '开发者',
            group_items: [
              { name: 'HiUI 视觉语言', route: { name: 'library_ui_guideline', params: { tab_id: 'vi' } } },
              { name: 'HiKitchen 组件库', route: { name: 'library_ui_components' } },
              { name: '测试分组', route: { name: 'test_group' } }
            ]
          }
        ]
      };
    }
  };
</script>
