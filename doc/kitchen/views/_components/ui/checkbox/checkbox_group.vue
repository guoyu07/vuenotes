<template>
  <span class="checkbox-group">
    <label class="checkbox-option check-all" @click="toggleAll()">
      <span class="checkbox-icon"><icon v-show="is_all_checked" :name="'i-check'"></icon></span>
      <span class="checkbox-text">{{ toggle_all_label }}</span>
    </label>
    <label class="checkbox-option" v-for="(option, key) in options" @click="checkOption(key)">
      <span class="checkbox-icon"><icon v-show="(is_num && cur_ids.indexOf(parseInt(key)) >= 0) || (!is_num && cur_ids.indexOf(key + '') >= 0)" :name="'i-check'"></icon></span>
      <span class="checkbox-text">{{ option }}</span>
    </label>
  </span>
</template>

<style scoped lang="stylus">
  @import "~styles/variables.styl";
  .checkbox-group { font-size: 12px; }
  .checkbox-option { display: inline-block; margin-right: 10px; line-height: row_height_1; cursor: pointer; }
  .checkbox-option.check-all { position: relative; font-weight: bold; margin-right: 30px; }
  .checkbox-option.check-all::after { content: ''; display: block; position: absolute; right: -17px; top: 50%; margin-top: -4px; height: 8px; border-left: 1px solid gray_3; }
  .checkbox-option:hover .checkbox-icon { background: light_gray_2; }
  .checkbox-option .checkbox-icon { display: inline-block; width: 12px; height: 12px; padding: 1px; background: light_gray_1; border-radius: 2px; transition: all .1s; vertical-align: middle; }
  .checkbox-option .checkbox-icon .icon { width: 10px; height: 10px; }
  .checkbox-option .checkbox-text { vertical-align: middle; }
</style>

<script>
  export default {
    props: {
      options: Object,
      cur_ids: { type: Array, default: [] },
      toggle_all_label: { type: String, default: '全部' }
    },
    computed: {
      is_all_checked: function () {
        var is_all_checked = true;
        for (var key in this.options) {
          if (this.is_num) {
            key = parseInt(key);
          } else {
            key = key + '';
          }
          if (this.cur_ids.indexOf(key) === -1) {
            is_all_checked = false;
          }
        }
        return is_all_checked;
      },
      is_num: function () {
        return this.cur_ids.length > 0 && (typeof this.cur_ids[0] === 'number');
      }
    },
    methods: {
      checkOption: function (key) {
        if (this.is_num) {
          key = parseInt(key);
        } else {
          key = key + '';
        }
        var index = this.cur_ids.indexOf(key);
        if (index >= 0) {
          this.cur_ids.splice(index, 1);
        } else {
          this.cur_ids.push(key);
        }
        this.$emit('switch-checkbox');
      },
      toggleAll: function () {
        if (this.is_all_checked) {
          this.cur_ids.splice(0, this.cur_ids.length);
        } else {
          for (var key in this.options) {
            if (this.is_num) {
              key = parseInt(key);
            } else {
              key = key + '';
            }
            if (this.cur_ids.indexOf(key) > -1) {
              continue;
            }
            this.cur_ids.push(key);
          }
        }
        this.$emit('switch-checkbox');
      }
    }
  };
</script>
