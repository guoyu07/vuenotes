<template>
  <paper class="banner">

    <paper-header slot="paper-header"></paper-header>

    <card class="card-banners">
      <card-header slot="card-header" :title="'Banners'">
        <btn :icon="'i-plus'" :text="'头图'" :mood="'emphasis'" @click.native="is_add_banner_modal_show = true"></btn>
      </card-header>

      <div class="pure-g grid-spacing">
        <card-banner class="pure-u-1-1 grid-spacing-u"
                     v-for="(banner, index) in banners" :orig_banner="banner" :index="index"
                     @banner-added="queryBanners"
                     @banner-deleted="queryBanners"></card-banner>
      </div>
    </card>

    <!-- ----------------------------------------------------------------------------------------------- -->
    <!-- 新增banner弹窗 -->
    <modal v-if="is_add_banner_modal_show" @close-modal="is_add_banner_modal_show = false">
      <card-banner class="pure-u-1-1" :orig_banner="new_banner" :is_new="true"
                   @banner-added="queryBanners"
                   @banner-deleted="queryBanners"></card-banner>
    </modal>

  </paper>
</template>

<script>
  /* global axios:true */
  export default {
    data () {
      return {
        banners: [],
        new_banner: {},
        is_add_banner_modal_show: false
      };
    },
    components: {
      'card-banner': require('./_components/card_banner')
    },
    mounted () {
      this.$root.$emit('init-paper', '头图列表');
      this.queryBanners();
    },
    methods: {
      queryBanners: function () {
        axios.get('/chef/api/operation/banner/banners').then(res => {
          this.banners = res.data.data;
          this.is_add_banner_modal_show = false;
        });
      }
    }
  };
</script>
