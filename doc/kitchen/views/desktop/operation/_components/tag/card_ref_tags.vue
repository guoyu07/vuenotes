<template>
  <card class="card-ref-tags">

    <card-header slot="card-header" :title="'热门商品标签 (最多设置5个)'">
      <btn v-if="tags.length < 5" :icon="'i-plus'" :text="'挑选热门标签'" :mood="'emphasis'"
           @click.native="$store.dispatch('SET_CHEAT_SHEET_SHOW', true)"></btn>
    </card-header>

    <draggable class="pure-g grid-spacing"
               :list="tags" :options="{ animation: 300, handle: '.drag-handle' }"
               @end="sortTag">
      <card-tag-item class="pure-u-1-5 grid-spacing-u" v-for="(tag, index) in tags"
                     :tag="tag" :index="index"
                     @ref-removed="queryTags"
                     @icon-saved="queryTags"></card-tag-item>
    </draggable>


    <!-- Tags多选弹窗 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <cheat-sheet v-if="$store.state.is_cheat_sheet_show" @close-modal="$store.dispatch('SET_CHEAT_SHEET_SHOW', false)">
      <hunter :title="'还可以选择' + (5 - tags.length) + '个Tag'" :type="'tag'" :cur_items="tags"
              :orig_list="tags_for_hunter"
              @do-hunt="huntTags"></hunter>
    </cheat-sheet>

  </card>
</template>

<script>
  /* global axios:true */
  export default {
    props: ['ref_params'],
    data () {
      return {
        tags: [],
        tags_for_hunter: [],
        is_tag_hunter_show: false
      };
    },
    components: {
      'card-tag-item': require('./../../_components/tag/card_tag_item')
    },
    mounted () {
      this.queryTags();
      this.queryTagsForHunter();
      this.$root.$on('switch-home-area', () => {
        this.queryTags();
      });
    },
    methods: {
      queryTags: function () {
        axios.get('/chef/api/operation/operation/operationTags', {
          params: this.ref_params
        }).then(res => {
          this.tags = res.data.data;
        });
      },
      queryTagsForHunter: function () {
        axios.get('/chef/api/operation/operation/allTags', {
          params: this.ref_params
        }).then(res => {
          this.tags_for_hunter = res.data.data;
        });
      },
      sortTag: function (event) {
        axios.put('/chef/api/operation/operation/operationTags', {
          id: this.tags[event.newIndex || 0].id,
          tag_id: this.tags[event.newIndex || 0].tag_id,
          new_index: event.newIndex || 0
        });
      },
      huntTags: function (tag_ids) {
        if (tag_ids.length >= 5) this.$store.dispatch('SET_CHEAT_SHEET_SHOW', false);
        axios.patch('/chef/api/operation/operation/operationTag', {
          type: this.ref_params.type,
          code: this.ref_params.code,
          tag_ids: tag_ids
        }).then(res => {
          this.tags = res.data.data;
        });
      }
    }
  };
</script>
