<template>
  <paper class="web-home">

    <paper-header slot="paper-header"></paper-header>

    <card class="pure-g grid-spacing">
      <div class="pure-u-1-4 grid-spacing-u"></div>
      <nav-list class="pure-u-1-4 grid-spacing-u" :title="'PC'"
                :nav_items="[{ name: 'PC首页运营', id: 100 }]"
                @select-item="goArea"></nav-list>
      <nav-list class="pure-u-1-4 grid-spacing-u" :title="'H5'"
                :nav_items="[{ name: 'H5首页 - 全国出发', id: 99 },
                             { name: 'H5首页 - 华东出发', id: 3 },
                             { name: 'H5首页 - 华北出发', id: 2 },
                             { name: 'H5首页 - 华南出发', id: 1 }]"
                @select-item="goArea"></nav-list>
      <div class="pure-u-1-4 grid-spacing-u"></div>
    </card>

  </paper>
</template>

<script>
  export default {
    mounted () {
      this.$root.$emit('init-paper', '选择首页运营片区');
    },
    methods: {
      goArea: function (area) {
        this.$router.push({
          name: 'operation_web_home_area',
          params: { area_id: area.id, tab: 'banners' }
        });
      }
    }
  };
</script>
