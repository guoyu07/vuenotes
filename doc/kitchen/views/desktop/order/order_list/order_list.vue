<template>
  <paper class="order-list" >
    <paper-header slot="paper-header">Write something here</paper-header>
    <card class="card-tags">
      <card-header></card-header>
      <card-neck slot="card-neck">
        <tab :tabs="{ all: '全部', online: '已上线', editing: '编辑中', out: '禁用' }"
             :cur_id="cur_filter_status"
             @switch-tab="switchFilterStatus"></tab>
        <select v-model="selected">
          <option value="1">确认但未支付</option>
          <option value="2">编辑中</option>
          <option value="3">已发货</option>
          <option value="4">待发货</option>
        </select>
        <text-input v-model="cur_search_word" :icon="'i-search'" @keyup-enter="retrieveOrderList"></text-input>
        <g-col :span="'1/3'">
          <g-row>
            <g-col :span="'1/1'">
              <grid-input :title="'预订日期开始'">
                <text-input v-model="booking_date.start_date" :type="'date'" :in_grid="true"
                            @input="is_form_changed = true"></text-input>
              </grid-input>
            </g-col>
            <g-col :span="'1/1'">
              <grid-input :title="'预订日期结束'">
                <text-input v-model="booking_date.end_date" :type="'date'" :in_grid="true"
                            @input="is_form_changed = true"></text-input>
              </grid-input>
            </g-col>
          </g-row>
        </g-col></br>
        <span>商品ID</span><text-input v-model="cur_search_word" @keyup-enter="retrieveOrderList"></text-input>
        <button v-on:click="retrieveOrderList" @keyup-enter="retrieveOrderList">查询</button>
      </card-neck>
      <table-grid
        :data_source="order_list"
        :fields="[{ name: '订单号', field: 'order_id', col_span: '2/24' },
                { name: '商品名称', field: 'name', col_span: '6/24' },
                { name: '联系人', field: 'contacts_name', col_span: '2/24' },
                { name: '联系电话', field: 'contacts_telephone', col_span: '2/24' },
                { name: '联系邮箱', field: 'contacts_email', col_span: '4/24' },
                { name: '订单状态', field: 'cn_name', col_span: '2/24' },
                { name: '预订日期', field: 'date_added', col_span: '4/24' }]"
        :actions="[{ icon: 'i-pencil', text: '详情', event: 'order—detail' }]"
        :actions_col_span="'2/24'"
        @order—detail="getOrderDetail">
      </table-grid>
      <pagination :page_num="cur_page_num" :total="total_count" @to-page="changePageNum"></pagination>
      <card-footer></card-footer>
    </card>
  </paper>
</template>

<script>
  /* global axios:true */
  export default {
    data () {
      return {
        booking_date: {},
        order_list: [],
        cur_filter_status: 'all',
        cur_page_num: 1,
        cur_search_word: '',
        total_count: 1
      };
    },
    methods: {
      retrieveOrderList: function () {
        axios.post('/../admin/order/getOrderList', {
          sort: {date_added: 0},
          paging: {start: 0, limit: 20},
          query_filter: {
            search_text: '',
            search_product_text: '',
            search_field: 'order_id',
            search_added_from_date: this.booking_date.start_date,
            search_added_to_date: this.booking_date.end_date,
            search_tour_from_date: '',
            search_tour_to_date: '',
            search_passenger: '',
            filter_supplier_id: '765',
            filter_order_status_id: '',
            filter_pay_method: '',
            filterNotShipped: 0,
            filterNeedRefund: 0,
            filterQuestion: 0,
            filterToDo: 0,
            notShipped_use_date: 0,
            notShipped_over_ship_date: 0,
            notShipped_to_ship_date: 0,
            todo_all: 0,
            todo_record: 0,
            todo_complain: 0,
            todo_urge: 0,
            todo_bill: 0,
            todo_total: 0,
            todo_edit: 0,
            todo_feedback: 0,
            todo_date_today: 0,
            todo_date_tomorrow: 0,
            todo_date_after_tomorrow: 0,
            feedback_type: 0,
            has_combination: 1,
            filter_pay_method_id: '0'
          }
        }).then(res => {
          this.order_list = res.data.data.data;
          this.total_count = parseInt(res.data.data.total_count);
        });
      },
      switchFilterStatus: function (status) {
        this.cur_filter_status = status;
        this.cur_page_num = 1;
        this.retrieveOrderList();
      },
      changePageNum: function (page_num) {
        this.cur_page_num = page_num;
        this.retrieveOrderList();
      },
      getOrderDetail: function (order) {
        var order_id = 'new';
        if (order !== 'new') {
          order_id = order.order_id;
        }
        this.$router.push({ name: 'order_detail', params: { 'order_id': order_id } });
      }
    }
  };
</script>
