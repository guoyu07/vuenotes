<template>
  <nav class="top-nav">
    <section class="nav-main">
      <div class="nav-brand">
        <!-- logo -->
        <h1>HiKitchen</h1>
      </div>
      <div class="nav-groups">
        <div class="nav-group" v-for="group in nav_groups">
          <span class="nav-item" v-for="item in group.group_items">
            <router-link v-if="!!item.route.name" :to="item.route">{{ item.name }}</router-link>
            <a v-else :href="item.route" target="_blank">{{ item.name }}</a>
          </span>
        </div>
      </div>
    </section>
    <aside class="nav-aside">
      <span class="aside-item">
        <img :src="'https://spics.hitour.cc/5d5aa4d5f463e0bae700240bded6eb0b.png'">
        Simi
      </span>
    </aside>
  </nav>
</template>

<style scoped>
  .top-nav { display: flex; line-height: 30px; padding: 5px 10px; }
  .nav-main { display: flex; border-bottom: 1px solid rgba(255, 255, 255, .1); }
  .nav-brand h1 { font-weight: 100; }
  .nav-groups { margin-left: 50px; padding-top: 6px; line-height: 24px; }
  .nav-groups .nav-group { position: relative; display: inline-block; margin-left: 40px; }
  .nav-groups .nav-group:not(:first-child)::before { content: ''; display: block; position: absolute; top: 8px; left: -10px; height: 8px; border-left: 1px solid rgba(255, 255, 255, .1); }
  .nav-item { position: relative; display: inline-block; margin: 0 20px; height: 24px; color: #ddd; text-decoration: none; cursor: pointer; }
  .nav-item:last-child { margin-right: 0; }
  .nav-item:hover { color: #fff; }
  .nav-item > a.router-link-active { color: #fff; }
  .nav-item > a.router-link-active::after { content: ''; display: block; position: absolute; bottom: -1px; left: 0; right: 0; border-top: 1px solid #fff; }
  /* 右侧 */
  .nav-aside { position: relative; flex: 1; text-align: right; height: 24px; line-height: 24px; margin-right: -5px; padding-top: 6px; }
  .nav-aside .aside-item { display: inline-block; vertical-align: top; padding: 0 5px; cursor: pointer; opacity: .8; }
  .nav-aside .aside-item:hover { opacity: 1; transition: all .2s; }
  .nav-aside .aside-item > img { display: inline-block; height: 24px; border-radius: 50%; vertical-align: -8px; }
  .nav-aside .aside-item > .icon { width: 12px; height: 12px; vertical-align: -2px; padding: 2px; }
</style>

<script>
  export default {
    data () {
      return {
        nav_groups: [
          {
            group_items: [
              { name: '订单', route: { name: 'order' } },
              { name: '统计', route: 'http://backend.hitour.cc/admin/statistics/index#/basic_order' }
            ]
          },
          {
            group_items: [
              { name: '前台运营', route: { name: 'operation' } },
              { name: '销控', route: { name: 'sale_rule' } },
              { name: '产品', route: 'http://backend.hitour.cc/admin' },
              { name: '资源', route: { name: 'resource' } },
              { name: '商户', route: 'http://backend.hitour.cc/d#!/merchant' }
            ]
          },
          {
            group_items: [
              { name: '资料库', route: { name: 'library' } }
            ]
          }
        ]
      };
    },
    methods: {
      to: function (route) {
        if (typeof route === 'string' && route.indexOf('http://') >= 0) {
          window.open(route);
        } else {
          this.$router.push(route);
        }
      }
    }
  };
</script>
