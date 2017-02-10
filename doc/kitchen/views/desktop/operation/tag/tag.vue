<template>
  <paper class="tag">

    <paper-header slot="paper-header"></paper-header>

    <card class="card-tags">
      <card-header slot="card-header" :title="'Tags'">
        <!--<btn :icon="'i-plus'" :text="'新增Tag'" :mood="'emphasis'" @click.native="is_add_tag_modal_show = true"></btn>-->
      </card-header>

      <card-neck slot="card-neck">
        <text-input v-model="cur_search_word" :icon="'i-search'" @keyup-enter="searchTags"></text-input>
      </card-neck>

      <div class="pure-g grid-spacing">
        <card-tag-info class="pure-u-1-2 grid-spacing-u" v-for="tag in tags" :orig_tag="tag"></card-tag-info>
      </div>
      <pagination :page_num="cur_page_num" :total="total_groups_num" @to-page="changePageNum"></pagination>
    </card>

  </paper>
</template>

<script>
  /* global axios:true */
  module.exports = {
    data () {
      return {
        tags: [],
        cur_search_word: '',
        cur_page_num: 1,
        total_groups_num: 0,
        is_add_tag_modal_show: false
      };
    },
    components: {
      'card-tag-info': require('./_components/card_tag_info')
    },
    mounted () {
      this.$root.$emit('init-paper', 'Tag 集中管理 (目前仅支持设置Tag的风格图标)');
      this.queryTags();
    },
    methods: {
      queryTags: function () {
        axios.get('/chef/api/operation/productTag/allTags', {
          params: {
            page_number: this.cur_page_num,
            search_word: this.cur_search_word
          }
        }).then(res => {
          this.tags = res.data.data.tags;
          this.total_groups_num = parseInt(res.data.data.total);
          window.scrollTo(0, 0);
        });
      },
      searchTags: function () {
        this.cur_page_num = 1;
        this.queryTags();
      },
      changePageNum: function (page_num) {
        this.cur_page_num = page_num;
        this.queryTags();
      }
    }
  };
</script>
