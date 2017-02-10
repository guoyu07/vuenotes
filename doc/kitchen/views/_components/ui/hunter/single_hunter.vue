<template>
  <section class="single-hunter pure-g">
    <!-- 过滤框 -->
    <div class="hunter-option pure-u-1-1">

      <text-input class="hunter-filter" :icon="'i-search'" :icon_event="'keyup-enter'" v-model="self_search_word"
                  @keyup-enter="queryHunterBook"></text-input>
      <!-- --------------------------------------------------------------------------------------------------- -->
      <!-- 候选列表 -->
      <table-grid-2 class="hunter-options"
                    :data_source="list">
        <table-grid-row v-for="row in list">
          <table-grid-col :col_title="'ID.'" :span="'50px'">{{ row[TYPE_ID_FIELD] }}</table-grid-col>
          <table-grid-col v-for="col in TYPE_FIELDS" :col_title="col.title" :span="col.span">
            {{ evalColValue(row, col.field) }}
          </table-grid-col>
          <table-grid-col :col_title="'操作'" :span="'60px'" :align="'right'">
            <btn :text="'选择'" @click.native="selectOption(row)"></btn>
          </table-grid-col>
        </table-grid-row>
      </table-grid-2>
    </div>
  </section>
</template>

<style scoped lang="stylus">
  @import '~styles/variables.styl';
  .single-hunter { margin: 0 -5px; }
  .hunter-option { padding: 0 5px; }
  .hunter-filter { display: block; width: 100%; }
  .hunter-options { max-height: 360px; min-height: 360px; margin: 10px 0 -10px; }
</style>

<script>
  /* global axios:true */
  const TYPE = {
    merchant: {
      id_field: 'merchant_id',
      fields: [
        { field: 'name', title: '商户名' },
        { field: 'express_num', title: '快捷买单数', span: '70px' },
        { field: 'product_num', title: '商品数', span: '70px' }]
    },
    city: {
      id_field: 'city_code',
      fields: [
        { field: 'cn_name', title: '城市名' },
        { field: 'en_name', title: '英文名', span: '130px' }]
    }
  };
  export default {
    props: {
      type: String,
      search_word: String,
      in_cities: [String, Array],
      in_countries: [String, Array],
      in_continents: [String, Array]
    },
    data () {
      return {
        TYPE_ID_FIELD: TYPE[this.type].id_field,
        TYPE_FIELDS: TYPE[this.type].fields,
        list: [],
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
      selectOption: function (option) {
        this.$emit('do-hunt', option);
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
