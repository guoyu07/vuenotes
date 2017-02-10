<template>
  <card class="card-ref-banners">

    <card-header slot="card-header" :title="'Banners'">
      <btn :icon="'i-plus'" :text="'从已有头图中选择'" :mood="'emphasis'"
           @click.native="$store.dispatch('SET_CHEAT_SHEET_SHOW', true)"></btn>
      <btn :icon="'i-plus'" :text="'新增'" @click.native="is_add_banner_modal_show = true"></btn>
    </card-header>

    <draggable class="pure-g grid-spacing"
               :list="banners" :options="{ animation: 300, handle: '.drag-handle' }"
               @end="sortBanner">
      <card-banner-item class="pure-u-1-2 grid-spacing-u" v-for="(banner, index) in banners"
                        :banner="banner" :index="index"
                        @ref-removed="queryBanners"></card-banner-item>
    </draggable>

    <!-- ----------------------------------------------------------------------------------------------------- -->
    <!-- Banner 新增弹窗 -->
    <modal v-if="is_add_banner_modal_show" @close-modal="is_add_banner_modal_show = false">
      <card-banner-info :is_new="true" :ref_params="ref_params" @banner-added="queryBanners"></card-banner-info>
    </modal>

    <!-- Banner 挂接小抄 -->
    <cheat-sheet v-if="$store.state.is_cheat_sheet_show">
      <hunter :type="'banner'" :cur_items="banners" @do-hunt="huntBanners"></hunter>
    </cheat-sheet>

  </card>
</template>

<script>
  /* global axios:true */
  export default {
    props: ['ref_params'],
    data () {
      return {
        banners: [],
        is_add_banner_modal_show: false
      };
    },
    components: {
      'card-banner-item': require('./card_banner_item'),
      'card-banner-info': require('./card_banner_info')
    },
    mounted () {
      this.queryBanners();
      this.$root.$on('switch-home-area', () => {
        this.queryBanners();
      });
    },
    methods: {
      queryBanners: function () {
        axios.get('/chef/api/operation/operation/operationBanners', {
          params: this.ref_params
        }).then(res => {
          this.banners = res.data.data;
          this.is_add_banner_modal_show = false;
        });
      },
      sortBanner: function (event) {
        axios.put('/chef/api/operation/operation/operationBanner', {
          id: this.banners[event.newIndex || 0].id,
          banner_id: this.banners[event.newIndex || 0].banner_id,
          new_index: event.newIndex || 0
        });
      },
      huntBanners: function (banner_ids) {
        axios.patch('/chef/api/operation/operation/operationBanners', {
          type: this.ref_params.type,
          code: this.ref_params.code,
          banner_ids: banner_ids
        }).then(res => {
          this.banners = res.data.data;
        });
      }
    }
  };
</script>
