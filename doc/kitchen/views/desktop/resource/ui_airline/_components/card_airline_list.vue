<template>
    <card class="card-airline-list">

        <card-header slot="card-header" :title="'航空公司'">
            <btn :icon="'i-plus'" :text="'新增航空公司'" :mood="'emphasis'"
                 @click.native="$router.push({ name: 'new_resource_airline', params: { tab: 'new' } })"></btn>
        </card-header>

        <card-neck slot="card-neck"></card-neck>

        <table-grid-2 :data_source="airlines" :page_num="cur_page_num">
            <table-grid-row v-for="airline in airlines" @click.native="goProductGroupDetail(airline)">
                <table-grid-col :col_title="'二字码'">{{ airline.iata_code }}</table-grid-col>
                <table-grid-col :col_title="'全称'">{{ airline.cn_name }}</table-grid-col>
                <table-grid-col :col_title="'简称'">{{ airline.cn_short_name }}</table-grid-col>
            </table-grid-row>
        </table-grid-2>

    </card>
</template>

<script>
    /* global axios: true */
    export default {
      data() {
        return {
          airlines: [],
          total: 0,
          search: {
            search_condition: '',
            page_limit: 20,
            page_number: 1
          },
          cur_page_num: 1
        };
      },
      mounted () {
        this.queryProductGroups();
      },
      methods: {
        queryProductGroups: function () {
          axios.get('/admin/flight/airlineList').then(res => {
            this.airlines = res.data.data.airlines;
            this.total = parseInt(res.data.data.total);
            this.$root.$emit('init-paper', '航空公司列表');
          });
        },
        goProductGroupDetail: function (airline) {
          this.$router.push({
            name: 'resource_airline_detail',
            params: { airline_id: airline.airline_id }
          });
        }
      }
    };
</script>
