<template>
  <card class="card-gift-cards">

    <card-header slot="card-header" :title="'礼品卡列表'">
      <btn :icon="'i-plus'" :text="'新增礼品卡'" :mood="'emphasis'"
           @click.native="$router.push({ name: 'operation_wxapp_bolo_gift_card_detail', params: { card_id: 'new', tab: 'base' } })"></btn>
    </card-header>

    <card-neck slot="card-neck">
      <tab :tabs="{ online: '已上线', editing: '编辑中', all: '全部' }"
           :cur_id="cur_filter_status"
           @switch-tab="switchFilterStatus"></tab>
      <text-input v-model="cur_search_word" :icon="'i-search'" @keyup-enter="searchGiftCards"></text-input>
    </card-neck>

    <table-grid-2 :data_source="gift_cards">
      <table-grid-row v-for="card in gift_cards">
        <table-grid-col :col_title="'ID.'" :span="'50px'">{{ card.card_id }}</table-grid-col>
        <table-grid-col :col_title="'礼品卡名'">{{ card.title }}</table-grid-col>
        <table-grid-col :col_title="'所属商户'" :span="'250px'">{{ card.merchant_name }}</table-grid-col>
        <table-grid-col :col_title="'城市'" :span="'70px'">{{ card.cn_name }}</table-grid-col>
        <table-grid-col :col_title="'关联商户数'" :span="'70px'">{{ card.merchant_num }}</table-grid-col>
        <table-grid-col :col_title="'操作'" :span="'150px'" :align="'right'">
          <btn :icon="'i-pencil'" :text="'详情'" @click.native="goGiftCardDetail(card)"></btn>
          <btn :text="card.status=='1' ? '下线' : '上线'" @click.native="turnOnOrOffCard(card)"></btn>
          <btn :icon="'i-bin'" :mood="'danger'" @click.native="deleteGiftCard(card)"></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>
    <!--<pagination :page_num="cur_page_num" :total="total_groups_num" @to-page="changePageNum"></pagination>-->
  </card>
</template>

<script>
  /* global axios:true */
  const STATUS = {
    'online': 1,
    'editing': 0,
    'all': null
  };
  export default {
    data () {
      return {
        gift_cards: [],
        cur_filter_status: 'online',
        cur_search_word: '',
        cur_page_num: 1
      };
    },
    mounted () {
      this.queryGiftCards();
      this.$root.$emit('init-paper', '礼品卡列表');
    },
    methods: {
      queryGiftCards: function () {
        axios.get('/chef/api/operation/markWeApp/giftCards', {
          params: {
            page_number: this.cur_page_num,
            filters: {
              status: STATUS[this.cur_filter_status]
            },
            search_word: this.cur_search_word
          }
        }).then(res => {
          this.gift_cards = res.data.data;
        });
      },
      searchGiftCards: function () {
        this.cur_page_num = 1;
        this.queryGiftCards();
      },
      deleteGiftCard: function (card) {
        axios.delete('/chef/api/operation/markWeApp/giftCard', {
          params: {
            card_id: card.card_id
          }
        }).then(res => {
          this.queryGiftCards();
        });
      },
      turnOnOrOffCard: function (card) {
        card.status === '1' ? card.status = '0' : card.status = '1';
        axios.put('/chef/api/operation/markWeApp/giftCard', card).then(res => {
          this.queryGiftCards();
        });
      },
      switchFilterStatus: function (status) {
        this.cur_filter_status = status;
        this.queryGiftCards();
      },
      changePageNum: function (page_num) {
        this.cur_page_num = page_num;
        this.queryGiftCards();
      },
      goGiftCardDetail: function (card) {
        this.$router.push({
          name: 'operation_wxapp_bolo_gift_card_detail',
          params: { card_id: card.card_id, tab: 'base' }
        });
      }
    }
  };
</script>
