<template>
  <section class="multiple-hunter pure-g">

    <div class="hunter-left pure-u-1-2">
      <!-- 过滤框 -->
      <text-input class="hunter-filter" :icon="'i-search'" :icon_event="'keyup-enter'" v-model="self_search_word"
                  @keyup-enter="queryHunterBook"></text-input>
      <!-- --------------------------------------------------------------------------------------------------- -->
      <!-- 候选多选列表 -->
      <table-grid-2 class="hunter-options"
                    :data_source="list">
        <table-grid-row v-for="row in list">
          <table-grid-col :col_title="'ID.'" :span="'50px'">{{ row[TYPE_ID_FIELD] }}</table-grid-col>
          <table-grid-col v-for="col in TYPE_FIELDS" :col_title="col.title" :span="col.span">
            {{ evalColValue(row, col.field) }}
          </table-grid-col>
          <table-grid-col :col_title="'操作'" :span="'60px'" :align="'right'">
            <btn v-show="self_cur_ids.indexOf(row[TYPE_ID_FIELD]) < 0" :text="'选择'"
                 @click.native="selectOption(row)"></btn>
            <btn v-show="self_cur_ids.indexOf(row[TYPE_ID_FIELD]) >= 0" :icon="'i-check'" :mood="'emphasis'"
                 @click.native="selectOption(row)"></btn>
          </table-grid-col>
        </table-grid-row>
      </table-grid-2>
    </div>

    <div class="hunter-right pure-u-1-2">
      <aside class="selected-title text-right">
        <btn :text="'全部弃选'" :mood="'danger'" @click.native="emptySelected"></btn>
      </aside>
      <!-- 选中列表 -->
      <table-grid-2 class="selected-list"
                    :data_source="selected_list">
        <table-grid-row v-for="row in selected_list">
          <table-grid-col :col_title="'ID.'" :span="'50px'">{{ row[TYPE_ID_FIELD] }}</table-grid-col>
          <table-grid-col v-for="col in TYPE_FIELDS" :col_title="col.title" :span="col.span">{{ row[col.field] }}
          </table-grid-col>
          <table-grid-col :col_title="'操作'" :span="'60px'" :align="'right'">
            <btn :text="'弃选'" @click.native="selectOption(row)"></btn>
          </table-grid-col>
        </table-grid-row>
      </table-grid-2>
    </div>

    <!-- 底部 取消、保存 -->
    <card-footer class="hunter-footer pure-u-1-1">
      <btn :text="'取消'" @click.native="$emit('cancel-hunt')"></btn>
      <btn :icon="'i-check'" :mood="'emphasis'" :text="'确定'"
           @click.native="$emit('do-hunt', self_cur_ids, selected_list)"></btn>
    </card-footer>

  </section>
</template>

<style scoped lang="stylus">
  @import '~styles/variables.styl';
  .multiple-hunter { margin: 0 -5px; }
  .hunter-left, .hunter-right { padding: 0 5px; }
  .hunter-filter { display: block; width: 100%; }
  .hunter-options { max-height: 360px; min-height: 360px; margin: 10px 0 -10px; }
  .hunter-right .selected-title { line-height: row_height_2; }
  .hunter-right .selected-title .btn { vertical-align: middle; }
  .hunter-right .selected-list { margin: 10px 0 -10px; max-height: 360px; min-height: 360px; }
</style>

<script>
  /* global axios:true */
  const TYPE = {
    destination: {
      id_field: 'destination_code',
      fields: [{ field: 'cn_name', title: '目的地名' }]
    },
    city: {
      id_field: 'city_code',
      fields: [{ field: 'cn_name', title: '城市名' }]
    },
    country: {
      id_field: 'country_code',
      fields: [{ field: 'cn_name', title: '国家名' }]
    },
    continent: {
      id_field: 'continent_id',
      fields: [{ field: 'cn_name', title: '大洲名' }]
    },
    product: {
      id_field: 'product_id',
      fields: [
        { field: 'name', title: '商品名' },
        { field: 'city_name', title: '所属城市', span: '70px' },
        { field: 'product_type_name', title: '类型', span: '80px' },
        { field: 'price.price', title: '价格 (&yen)', span: '70px' }]
    },
    product_group: {
      id_field: 'group_id',
      fields: [{ field: 'title', title: '分组名' },
        { field: 'product_count', title: '含商品数', span: '70px' }]
    },
    group_product_group: {
      id_field: 'group_id',
      fields: [
        { field: 'title', title: '分组的分组名' },
        { field: 'sub_group_count', title: '含分组数', span: '70px' }]
    },
    group: {
      id_field: 'group_id',
      fields: [
        { field: 'title', title: '名称' },
        { field: 'type_name', title: '类型', span: '80px' }]
    },
    merchant: {
      id_field: 'merchant_id',
      fields: [
        { field: 'name', title: '商户名' },
        { field: 'express_num', title: '快捷买单数', span: '70px' },
        { field: 'product_num', title: '商品数', span: '70px' }]
    },
    merchant_group: {
      id_field: 'group_id',
      fields: [{ field: 'title', title: '分组名' },
        { field: 'merchant_count', title: '含商户数', span: '70px' }]
    }
  };
  export default {
    props: {
      type: String,
      search_word: String,
      cur_ids: {
        type: Array, default: () => {
          return [];
        }
      },
      in_cities: [String, Array],
      in_countries: [String, Array],
      in_continents: [String, Array]
    },
    data () {
      return {
        TYPE_ID_FIELD: TYPE[this.type].id_field,
        TYPE_FIELDS: TYPE[this.type].fields,
        list: [],
        selected_list: [],
        self_search_word: this.search_word
      };
    },
    computed: {
      self_cur_ids: function () {
        var ret_ids = [];
        this.cur_ids.map(id => {
          ret_ids.push(id.toString());
        });
        return ret_ids;
      }
    },
    mounted: function () {
      this.queryHunterBook();
      if (this.self_cur_ids.length > 0) {
        this.queryHunterReWarm();
      }
    },
    methods: {
      queryHunterBook: function () {
        axios.get('/chef/api/cookBook/cook', {
          params: {
            type: this.type,
            search_word: this.self_search_word,
            city: this.in_cities,
            country: this.in_countries,
            continent: this.in_continents
          }
        }).then(res => {
          this.list = res.data.data;
        });
      },
      queryHunterReWarm: function () {
        axios.get('/chef/api/cookBook/reWarm', {
          params: {
            type: this.type === 'product_group' || this.type === 'group_product_group' ? 'group' : this.type,
            ids: this.self_cur_ids
          }
        }).then(res => {
          this.selected_list = res.data.data;
        });
      },
      selectOption: function (option) {
        var option_id = option[TYPE[this.type].id_field];
        var index = this.self_cur_ids.indexOf(option_id);
        if (index >= 0) {
          this.self_cur_ids.splice(index, 1);
          this.selected_list.splice(this.getSelectedOptionIndex(option, this.selected_list), 1);
        } else {
          this.self_cur_ids.unshift(option_id);
          this.selected_list.unshift(option);
        }
      },
      emptySelected: function () {
        this.self_cur_ids.splice(0, this.self_cur_ids.length);
        this.selected_list.splice(0, this.selected_list.length);
      },
      getSelectedOptionIndex: function (option, selected_list) {
        var ret_index = -1;
        if (!selected_list) return ret_index;
        selected_list.map((selected_option, index) => {
          if (option[TYPE[this.type].id_field] === selected_option[TYPE[this.type].id_field]) {
            ret_index = index;
          }
        });
        return ret_index;
      },
      evalColValue: function (option, field_str) {
        var field_arr = field_str.split('.');
        var ret_value = option;
        field_arr.map(field => {
          ret_value = ret_value[field];
        });
        return ret_value;
      }
    }
  };
</script>
