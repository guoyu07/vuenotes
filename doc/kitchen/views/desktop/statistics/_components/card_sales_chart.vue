<template>
  <section class="card-sales-chart">
    <div id="sales_chart"></div>
  </section>
</template>

<script>
  import G2 from 'g2';
  export default {
    data () {
      return {
        sales_data: []
      };
    },
    created () {
      var self = this;
      self.$http.post('/admin/statistics/orderListByDate', {
        query_filter: {
          date_start: '2016-07-01',
          date_end: '2016-09-31'
        }
      }).then(function (res) {
        self.initChart(res.data.data);
      });
    },
    methods: {
      initChart: function (data) {
        data.map(function (date) {
          date.sub_amount = parseInt(date.sub_amount);
          date.sub_amount_app = parseInt(date.sub_amount_app);
          date.sub_amount_mobile = parseInt(date.sub_amount_mobile);
        });
        var Frame = G2.Frame;
        var frame = new G2.Frame(data);
        frame = Frame.combinColumns(frame, [
          'sub_amount', 'sub_amount_app', 'sub_amount_mobile'
        ], 'sales', 'amount', 'date_added');

        var chart = new G2.Chart({
          id: 'sales_chart', // 指定图表容器 ID
          width: 800, // 指定图表宽度
          height: 400 // 指定图表高度
        });
        // Step 2: 载入数据源
        chart.source(frame, {
          date_added: {
            type: 'time',
            tickCount: 12,
            mask: 'm/d'
          },
          sales: {
            type: 'linear',
            alias: '总销售额'
          }
        });
        // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
        chart.line().position('date_added*sales').color('amount', ['#333', '#f99', '#99f']);
        // Step 4: 渲染图表
        chart.render();
      }
    }
  };
</script>