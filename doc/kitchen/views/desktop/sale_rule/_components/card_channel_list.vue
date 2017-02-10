<template>
  <card class="card-channel-list">

    <card-header slot="card-header" :title="'渠道列表'">
      <btn :icon="'i-plus'" :mood="'emphasis'" :text="'新增渠道'"
           @click.native="goDetail('new')"></btn>
    </card-header>

    <card-neck slot="card-neck">
      <tab :tabs="{ all: '全部', online: '已上线', editing: '编辑中', out: '禁用' }"
           :cur_id="cur_filter_status"
           @switch-tab="switchFilterStatus"></tab>
      <text-input v-model="cur_search_word" :icon="'i-search'" @keyup-enter="queryChannelList"></text-input>
    </card-neck>

    <table-grid
      :data_source="channel_list"
      :fields="[{ name: 'ID.', field: 'channel_id', col_span: '1/24' },
                { name: '名称', field: 'name', col_span: '6/24' },
                { name: '负责人', field: 'contacts', col_span: '3/24' },
                { name: '开始时间', field: 'contract_start_date', col_span: '4/24' },
                { name: '结束时间', field: 'contract_end_date', col_span: '4/24' },
                { name: '状态', field: 'status', col_span: '2/24', filter: { 1: '已上线', 0: '编辑中', 2: '禁用' } }]"
      :actions="[{ icon: 'i-pencil', text: '详情', event: 'channel—detail' }]"
      :actions_col_span="'4/24'"
      @channel—detail="goDetail">
    </table-grid>
    <pagination :page_num="cur_page_num" :total="total_channel_num" @to-page="changePageNum"></pagination>

  </card>
</template>

<style scoped></style>

<script>
  /* global axios:true */
  const STATUS = {
    'out': 2,
    'online': 1,
    'editing': 0,
    'all': null
  };
  export default {
    props: {
      type: Number
    },
    data () {
      return {
        channel_list: [],
        cur_filter_status: 'all',
        cur_page_num: 1,
        cur_search_word: '',
        total_channel_num: 1
      };
    },
    components: {},
    mounted () {
      this.queryChannelList();
    },
    methods: {
      queryChannelList: function () {
        axios.get('/chef/api/saleRule/channel/channelList', {
          params: {
            page_number: this.cur_page_num,
            filters: {
              type: this.type,
              status: STATUS[this.cur_filter_status]
            },
            search_word: this.cur_search_word
          }
        }).then(res => {
          this.channel_list = res.data.data.channels;
          this.total_channel_num = parseInt(res.data.data.total);
        });
      },
      switchFilterStatus: function (status) {
        this.cur_filter_status = status;
        this.cur_page_num = 1;
        this.queryChannelList();
      },
      changePageNum: function (page_num) {
        this.cur_page_num = page_num;
        this.queryChannelList();
      },
      goDetail: function (channel) {
        var channel_id = 'new';
        if (channel !== 'new') {
          channel_id = channel.channel_id;
        }
        this.$router.push({ name: 'sale_rule_channel_detail', params: { 'channel_id': channel_id } });
      }
    }
  };
</script>
