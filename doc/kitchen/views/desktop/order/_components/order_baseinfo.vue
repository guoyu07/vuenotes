<template>
  <card>
    <card-header></card-header>
  </card>
</template>
<script>
  /* global axios:true */
  export default {
    data () {
      return {
        booking_date: {},
        order_detail: [],
        cur_filter_status: 'all',
        cur_page_num: 1,
        cur_search_word: '',
        total_count: 1
      };
    },
    mounted() {
      if (this.$route.params.order_id !== 'new') {
        this.getOrderDetail();
      }
    },
    methods: {
      getOrderDetail: function () {
        axios.get('/../admin/order/getOrderDetail', {
          params: {
            orderid: '24887'
          }
        }).then(res => {
          this.order_detail = res.data.data.data;
          this.total_count = parseInt(res.data.data.total_count);
        });
      }
    }
  };
</script>
