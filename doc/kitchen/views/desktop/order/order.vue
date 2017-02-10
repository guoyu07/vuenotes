<template>
  <board :nav_groups="nav_groups"></board>
</template>

<script>
  export default {
    data () {
      return {
        nav_groups: [
          {
            group_items: [
              { name: '待处理订单', route: { name: 'processing_order' } }
            ]
          }
        ]
      };
    }
  };
</script>


