<template>
  <section class="table-grid" :class="{ 'is-sortable': use_sort }">

    <!-- table header -->
    <header class="table-header" v-if="data_source.length > 0">
      <span class="table-header-col" v-if="use_sort" style="width: 35px;"><span>排序</span></span>
      <span class="table-header-col" v-for="col in cols"
            :style="[getWidth(col.span), { 'text-align': col.align }]"><span v-html="col.col_title"></span></span>
    </header>

    <transition :name="page_transition" :mode="'out-in'">
      <div class="table-body" v-if="data_source.length > 0" :key="transition_key">
        <draggable :list="data_source" :options="{ disabled: !use_sort, animation: 150, handle: '.drag-handle' }"
                   @end="doSort">
          <slot></slot>
        </draggable>
      </div>
    </transition>

    <aside class="text-center" v-if="!data_source.length > 0">~ Empty ~</aside>

  </section>
</template>

<style scoped lang="stylus">
  @import '~styles/variables.styl';
  .table-grid { position: relative; height: 100%; }
  .table-header { position: absolute; top: 0; left: 0; right: 0; z-index: 100; display: flex; line-height: row_height_2_inner; white-space: nowrap; box-shadow: 0 1px 2px -1px rgba(0, 0, 0, .3); }
  .table-header-col { background: #fff; padding: 0 8px; font-weight: bold; }
  .table-header-col > span { display: block; transform: scale(.9); transform-origin: 0 100%; }
  .table-body { height: 100%; padding-top: row_height_2_inner; overflow-y: auto; }
  /* 类型 */
  .row-action.blue { color: blue; }
  .row-action.warning { color: warning; }
  .row-action.danger { color: danger; }
  .row-action.success { color: success; }
</style>

<script>
  import color from 'styles/color.js';
  export default {
    props: {
      data_source: [Array, Object],
      active_index: Number,
      use_delete: { type: Boolean, default: false },
      use_sort: { type: Boolean, default: false },
      page_num: Number,
      transition_key: String
    },
    data () {
      return {
        color: color,
        rows: [],
        cols: [],
        page_transition: 'slide-right'
      };
    },
    watch: {
      data_source: function () {
        this.$nextTick(() => {
          this.initTable();
        });
      },
      page_num: function (new_page_num, old_page_num) {
        this.page_transition = new_page_num >= old_page_num ? 'slide-right' : 'slide-left';
      }
    },
    mounted: function () {
      this.$nextTick(() => {
        if (this.data_source.length > 0) {
          this.initTable();
        }
      });
    },
    methods: {
      initTable: function () {
        var rows = [];
        var closest_children = this.$children[0];
        if (!closest_children || !closest_children.$slots.default) return;
        closest_children.$slots.default.map((VNode) => {
          if (VNode.child) rows.push(VNode.child);
        });
        var cols = [];
        rows[0].$slots.default.map((VNode) => {
          if (VNode.child) cols.push(VNode.child);
        });
        this.rows = rows;
        this.cols = cols;
      },
      doSort: function (event) {
        this.$emit('do-sort', this.data_source[event.newIndex || 0], event.newIndex || 0, event.oldIndex);
      },
      getWidth: function (span) {
        if (!span) return { 'flex': 1 };
        else if (typeof span === 'string') return { 'width': span };
        else return { 'flex': span };
      }
    }
  };
</script>


