<template>
  <card class="hunter" :use_padding="false">

    <card-header class="hunter-header" :title="title || 'Hunter'"></card-header>

    <text-input class="hunter-filter" v-if="orig_list.length == 0" :icon="'i-search'" :icon_event="'keyup-enter'"
                v-model="self_search_word"></text-input>

    <div class="option-list" v-if="type == 'banner'">
      <hunter-banner v-for="banner in list" :banner="banner" :is_selected="cur_ids.indexOf(banner.banner_id) >= 0"
                     @do-select="selectOption"></hunter-banner>
    </div>
    <div class="option-list" v-if="type == 'tag'">
      <hunter-tag v-for="tag in list" :tag="tag" :is_selected="cur_ids.indexOf(tag.tag_id) >= 0"
                  @do-select="selectOption"></hunter-tag>
    </div>

  </card>
</template>

<style scoped lang="stylus">
  @import '~styles/variables.styl';
  .hunter-header { background: light_gray_3; }
  .option-list { height: 494px; margin-top: 10px; overflow-y: auto; }
</style>

<script>
  /* global axios:true */
  const TYPE = {
    banner: { id_field: 'banner_id' },
    tag: { id_field: 'tag_id' }
  };
  export default {
    props: {
      title: String,
      type: String,
      search_word: String,
      city: String,
      country: String,
      continent: String,
      cur_items: {
        type: Array, default: () => {
          return [];
        }
      },
      orig_list: {
        type: Array, default: () => {
          return [];
        }
      }
    },
    data () {
      return {
        list: this.orig_list,
        self_search_word: this.search_word
      };
    },
    computed: {
      cur_ids: function () {
        var ret_ids = [];
        this.cur_items.map(item => {
          ret_ids.push(item[TYPE[this.type].id_field].toString());
        });
        return ret_ids;
      },
      self_cur_items: function () {
        var ret_items = [];
        this.cur_items.map(item => {
          ret_items.push(item);
        });
        return ret_items;
      }
    },
    components: {
      'hunter-banner': require('./hunter_banner'),
      'hunter-tag': require('./hunter_tag')
    },
    mounted () {
      if (this.orig_list.length === 0) {
        this.queryHunterBook();
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
      selectOption: function (option) {
        var option_id = option[TYPE[this.type].id_field];
        var index = this.cur_ids.indexOf(option_id);
        if (index >= 0) {
          this.cur_ids.splice(index, 1);
          this.self_cur_items.splice(index, 1);
        } else {
          this.cur_ids.unshift(option_id);
          this.self_cur_items.unshift(option);
        }
        this.$forceUpdate();
        this.$emit('do-hunt', this.cur_ids, this.self_cur_items);
      }
    }
  };
</script>
