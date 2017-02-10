<template>
  <aside class="left-nav">
    <div class="nav-group" v-for="group in nav_groups">
      <header class="group-header" v-if="!!group.group_name">{{ group.group_name }}</header>
      <div class="group-items">
        <router-link class="group-item" v-for="item in group.group_items"
                     :to="item.route">{{ item.name }}
        </router-link>
      </div>
    </div>
  </aside>
</template>

<style scoped>
  .left-nav { border-right: 1px solid rgba(255, 255, 255, .1); text-align: right; }
  .nav-group { position: relative; }
  .nav-group:not(:first-child) { margin-top: 10px; }
  .nav-group:not(:first-child) .group-header { margin-top: 40px; }
  .group-header { font-size: 12px; color: rgba(255, 255, 255, .4); padding-right: 10px; margin-bottom: 8px; line-height: 1; transform: scale(.9); transform-origin: 100% 0%; }
  .group-items:first-child::before { content: ''; display: block; position: absolute; width: 5px; top: -5px; right: 10px; border-top: 1px solid rgba(255, 255, 255, .1); }
  .group-item { position: relative; display: block; line-height: 24px; padding-right: 8px; color: #ccc; }
  .group-item:hover { color: #fff; }
  .group-item.router-link-active { color: #fff; }
  .group-item.router-link-active::after { position: absolute; display: block; content: ''; right: -1px; top: 0; bottom: 0; width: 1px; background: #fff; }
</style>

<script>
  export default {
    props: {
      nav_groups: Array
    }
  };
</script>
