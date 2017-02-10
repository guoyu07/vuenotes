<template>
  <section class="card-custom-nav-info">
    <card>
      <card-header :title="'区域信息'"></card-header>
      <grid-input :title="'区域名称'" :row_num="1">
        <text-input v-model="custom_area.title" :in_grid="true"
                    :readonly="custom_area.type != '1'"></text-input>
      </grid-input>
    </card>
    <card v-if="hot_destinations.length > 0">
      <card-header :title="'热门目的地'"></card-header>
      <table-grid-2 class="table-hot-destinations" :data_source="hot_destinations" :use_sort="true"
                    @do-sort="sortHotDestinations">
        <table-grid-row class="table-row" v-for="(destination, index) in hot_destinations">
          <table-grid-col class="table-td" :col_title="'code.'" :span="'70px'">
            {{ destination.code }}
          </table-grid-col>
          <table-grid-col class="table-td" :col_title="'目的地名'">
            {{ destination.title }}
          </table-grid-col>
        </table-grid-row>
      </table-grid-2>
    </card>
    <card-footer class="pure-u-1-1">
      <btn :text="'取消'" @click.native="cancel"></btn>
      <btn :icon="'i-check'" :mood="'emphasis'" :text="'保存'"
           @click.native="saveCustomAreaTitle"></btn>
    </card-footer>
  </section>
</template>

<style scoped>
  .table-hot-destinations { max-height : 250px; overflow-y : auto; }
</style>

<script>
  /* global axios:true */
  export default {
    props: ['pid', 'custom_area', 'have_hot_destinations'],
    data () {
      return {
        org_title: '',
        hot_destinations: []
      };
    },
    mounted () {
      this.org_title = this.custom_area.title;
      if (this.have_hot_destinations && this.custom_area.id) {
        this.queryHotDestinations();
      }
    },
    methods: {
      saveCustomAreaTitle: function () {
        if (this.custom_area.title === this.org_title) {
          this.cancel();
        } else {
          if (this.custom_area.id) {
            axios.put('/chef/api/operation/navigate/navigate', this.custom_area).then(res => {
              this.$emit('rename-or-added');
            });
          } else {
            this.custom_area.pid = this.pid;
            axios.post('/chef/api/operation/navigate/navigate', this.custom_area).then(res => {
              this.$emit('rename-or-added');
            });
          }
        }
      },
      queryHotDestinations: function () {
        axios.get('/chef/api/operation/navigate/hotNavigate', {
          params: {
            id: this.custom_area.id
          }
        }).then(res => {
          this.hot_destinations = res.data.data;
        });
      },
      sortHotDestinations: function (hot_destination, new_index) {
        axios.put('/chef/api/operation/navigate/hotNavigates', {
          ppid: hot_destination.ppid,
          id: hot_destination.id,
          new_index: new_index
        }).then(res => {
          this.queryHotDestinations();
        });
      },
      cancel: function () {
        this.$emit('cancel-rename');
      }
    }
  };
</script>
