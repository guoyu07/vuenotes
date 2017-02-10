<template>
  <span class="su-selector selected"
        :class="{ 'expand': is_dropdown_show, 'in_grid': in_grid, 'align-right': align == 'right' }">
    <div class="selector-cur" @click.stop="is_dropdown_show = !is_dropdown_show">
      <span>{{ value_text }}</span><icon :name="'i-arrow-down'" :color="'#666'"></icon>
    </div>
    <aside class="selector-dropdown shadow-normal" v-show="is_dropdown_show" @click.stop>
        <nav-list class="option-group" v-for="group in option_groups"
                  :nav_items="group.items"
                  :title="group.name"
                  @select-item="onSelectItem"></nav-list>
    </aside>
  </span>
</template>

<style scoped lang="stylus">
  @import "~styles/variables.styl";
  .su-selector { position: relative; vertical-align: top; display: inline-block; height: row_height_2; line-height: row_height_2_inner; padding: 2px; min-width: 90px; font-size: 12px; background: light_gray_2; border-radius: 2px; }
  .selector-cur { position: relative; padding: 0 30px 0 10px; border-radius: 1px; cursor: pointer; }
  .selector-cur .icon { position: absolute; display: block; top: 50%; right: 10px; margin-top: -5px; width: 10px; height: 10px; vertical-align: -2px; margin-left: 5px; transition: all .2s ease; }
  .selector-dropdown { position: absolute; background: light_gray_3; z-index: 200; padding: 10px 10px 15px; top: 25px; }
  .selector-dropdown .option-group { width: 200px; }
  .selector-dropdown .option-group:not(:first-child) { margin-top: 10px; }
  /* 状态 */
  .su-selector.selected .selector-cur { background: #fff; font-weight: bold; }
  .su-selector.expand .selector-cur .icon { transform: rotate(180deg); }
  /* 类型 */
  .su-selector.in_grid { height: row_height_1; line-height: row_height_1_inner; padding: 1px; }
  .su-selector.align-right .selector-dropdown { right: 1px; }
</style>

<script>
  export default {
    props: {
      option_groups: Array,
      value: [String, Number],
      in_grid: { type: Boolean, default: false },
      align: { type: String, default: 'left' }
    },
    data () {
      return {
        is_dropdown_show: false
      };
    },
    created () {
      this.$root.$on('close-selector', () => {
        if (this.is_dropdown_show === true) this.is_dropdown_show = false;
      });
    },
    computed: {
      value_text: function () {
        var ret_text = '请选择';
        this.option_groups.map(group => {
          group.items.map(item => {
            if (item.id.toString() === this.value.toString()) ret_text = item.name;
          });
        });
        return ret_text;
      }
    },
    methods: {
      onSelectItem: function (item) {
        this.$emit('input', item);
        this.$emit('select-item', item);
        this.is_dropdown_show = false;
      }
    }
  };
</script>
