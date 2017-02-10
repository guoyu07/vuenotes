<template>
  <section class="table-grid" :class="{ 'is-sortable': use_sort }">

    <g-row class="table-header">
      <g-col class="table-th" v-if="use_sort" :span="'1/24'">
        <label class="th-label">排序</label></g-col>
      <g-col class="table-th" v-for="field in fields" :span="field.col_span || '1/6'">
        <label class="th-label">{{ field.name }}</label></g-col>
      <g-col class="table-th text-right" :span="actions_col_span">
        <label class="th-label">操作</label></g-col>
    </g-row>

    <div class="table-body">
      <draggable :list="data_source" :options="{ disabled: !use_sort, animation: 150, handle: '.drag-handle' }"
                 @end="doSort">
        <g-row class="table-row"
               v-for="(row, row_index) in data_source"
               :class="{ 'active': active_index == row_index }">
          <g-col class="table-td drag-handle" v-if="use_sort" :span="'1/24'">
            <span><icon :name="'i-sort'" :color="'#999'"></icon></span>
          </g-col>
          <g-col class="table-td not-to-drag" :span="field.col_span || '1/6'" v-for="field in fields">
            {{ row[field.field] | textFilter(field.filter) }}
          </g-col>
          <g-col class="table-td not-to-drag text-right" :span="actions_col_span">
            <span class="row-action"
                  v-for="(action, index) in actions"
                  :class="[action.mood || 'blue']"
                  @click="$emit(action.event, row, row_index)">
              <icon v-if="!!action.icon" :name="action.icon" :color="color[action.mood] || color.blue"></icon><span
              v-if="!!action.text" class="action-text">{{ action.text }}</span>
            </span>
            <span class="row-action danger"
                  v-if="use_delete"
                  @click="doDelete(row, row_index)"><icon :name="'i-bin'" :color="color.danger"></icon></span>
          </g-col>
        </g-row>
      </draggable>
    </div>

  </section>
</template>

<style scoped lang="stylus">
  @import '~styles/variables.styl';
  .table-header { border-radius: 1px; }
  .table-th { background: #fff; line-height: 28px; padding: 0 8px; font-weight: bold; box-shadow: 0 1px 2px -1px rgba(0, 0, 0, .1); }
  .table-th .th-label { display: inline-block; transform: scale(.9); transform-origin: 0 50%; white-space: nowrap; }
  .table-th.text-right .th-label { transform-origin: 100% 50%; }
  .table-body .table-row { margin-top: 1px !important; border-radius: 1px; }
  .table-body .table-row .icon { width: 12px; height: 12px; vertical-align: -2px; margin: 0 2px; }
  .table-td { background: #fff; padding: 10px 8px; box-shadow: 0 0 2px -1px rgba(0, 0, 0, .1); line-height: row_height_1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .row-action { position: relative; display: inline-block; height: row_height_1; line-height: row_height_1; padding: 0 3px; border-radius: 3px; margin-left: 7px; }
  .row-action:not(:first-child)::before { content: ""; display: block; position: absolute; left: -4px; top: 50%; height: 10px; margin-top: -5px; border-left: 1px solid light_gray_1; }
  .row-action:hover { cursor: pointer; background: light_gray_2; opacity: .8; transition: all .1s; }
  .row-action .action-text { margin: 0 2px; }
  /* 类型 */
  .row-action.blue { color: blue; }
  .row-action.warning { color: warning; }
  .row-action.danger { color: danger; }
  .row-action.success { color: success; }
  /* 状态 */
  .table-body .table-row.active .table-td  { background: rgba(0, 255, 0, .02); }
  /* drag */
  .table-body .table-row.sortable-ghost .table-td { background: rgba(0, 0, 0, .02); }
  .table-grid.is-sortable .table-row .drag-handle { cursor: move; cursor: -webkit-grabbing; }
</style>

<script>
  import color from 'styles/color.js';
  export default {
    props: {
      data_source: Array,
      fields: Array,
      actions: Array,
      actions_col_span: { type: String, default: '1/6' },
      active_index: Number,
      use_delete: { type: Boolean, default: false },
      use_sort: { type: Boolean, default: false }
    },
    data () {
      return {
        color: color
      };
    },
    filters: {
      textFilter: function (text, filter) {
        if (!filter) return text;
        return filter[text];
      }
    },
    methods: {
      doDelete: function (row, index) {
        if (window.confirm('确认删除?')) {
          this.$emit('do-delete', row, index);
        }
      },
      doSort: function (event) {
        this.$emit('do-sort', this.data_source[event.newIndex], event.newIndex, event.oldIndex);
      }
    }
  };
</script>


