<template>
  <span class="selector selected" :class="{ 'expand': is_dropdown_show, 'in_grid': in_grid }" @click.stop>
    <div class="selector-cur" @click="is_dropdown_show = !is_dropdown_show">
      <span>{{ options[self_cur_id] || '请选择' }}</span>
      <icon :name="'i-arrow-down'" :color="'#666'"></icon>
    </div>
    <transition :name="'slide-down'">
      <aside class="selector-dropdown shadow-light" v-show="is_dropdown_show">
        <div class="dropdown-filter" v-if="use_filter">
          <input size="auto" :value.trim="value" @change="$emit('input', $event.target.value)">
        </div>
        <div class="dropdown-menu">
          <div class="menu-item" v-for="(option, key) in options" @click="selectOption(option, key)">{{ option }}</div>
        </div>
      </aside>
    </transition>
  </span>
</template>

<style scoped lang="stylus">
  @import "~styles/variables.styl";
  .selector { vertical-align: top; display: inline-block; height: row_height_2; line-height: row_height_2_inner; padding: 2px; min-width: 90px; background: light_gray_2; border-radius: 2px; }
  .selector-cur { position: relative; z-index: 201; padding: 0 30px 0 10px; border-radius: 1px; cursor: pointer; }
  .selector-cur .icon { position: absolute; display: block; top: 50%; right: 10px; margin-top: -5px; width: 10px; height: 10px; vertical-align: -2px; margin-left: 5px; transition: all .2s ease; }
  .selector-dropdown { position: relative; background: light_gray_3; z-index: 200; max-height: 200px; overflow-y: auto; }
  .selector-dropdown .dropdown-filter { margin: 5px; height: row_height_2_inner; line-height: row_height_2_inner; background: #fff; }
  .selector-dropdown .dropdown-filter > input { display: inline-block; padding: 0 6px; border: none; height: 18px; vertical-align: middle; outline: none; }
  .dropdown-menu .menu-item { position: relative; padding: 4px 10px; line-height: row_height_1; margin: 1px; cursor: pointer; transition: all .1s; }
  .dropdown-menu .menu-item:hover { background: #fff; }
  .dropdown-menu .menu-item:not(:first-child):before { content: ""; display: block; position: absolute; top: -1px; left: 10px; right: 10px; border-top: 1px solid light_gray_2; }
  /* 状态 */
  .selector.selected .selector-cur { background: #fff; font-weight: bold; }
  .selector.expand .selector-cur .icon { transform: rotate(180deg); }
  /* 类型 */
  .selector.in_grid { height: row_height_1; line-height: row_height_1_inner; padding: 1px; }
</style>

<script>
  export default {
    props: {
      options: Object,
      cur_id: { type: String, default: '' },
      in_grid: { type: Boolean, default: false },
      value: String,
      use_filter: false
    },
    data () {
      return {
        is_dropdown_show: false
      };
    },
    computed: {
      self_cur_id: function () {
        return this.cur_id.toString();
      }
    },
    created () {
      this.$root.$on('close-selector', () => {
        this.is_dropdown_show = false;
      });
    },
    methods: {
      selectOption: function (option_value, option_id) {
        this.self_cur_id = option_id;
        this.$emit('switch-option', option_id, option_value);
        this.is_dropdown_show = false;
      }
    }
  };
</script>
