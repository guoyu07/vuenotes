<template>
  <card class="card-option-method">
    <card-header slot="card-header" :title="'酒店服务'" :is_save_actions_show="is_form_changed"
                 @reset-form="reset" @save-form="save">
    </card-header>

    <g-row :spacing="1">
      <g-col :span="'1/1'">
        <grid-input :title="'请选该酒店可提供的服务'" :row_num="5.3" v-if="!!data.list">
          <g-row>
            <g-col :span="'1/1'" v-if="!!data.list">
              <checkbox-group :toggle_all_label="'全选'" :cur_ids="data.list.chosen" :options="data.list.all" :in_grid="true" @switch-checkbox="is_form_changed = true"></checkbox-group>
            </g-col>
          </g-row>
        </grid-input>
      </g-col>
    </g-row>
  </card>
</template>

<style scoped>
</style>

<script>
  /* global axios:true */
  export default {
    data () {
      return {
        cur_ids: [1],
        data: {},
        is_form_changed: false
      };
    },
    components: {
    },
    mounted () {
      this.getMethod();
    },
    methods: {
      getMethod: function () {
        axios.get('/chef/api/resource/hotel/HotelService', {
          params: {
            hotel_id: this.$route.params.hotel_id
          }
        }).then(res => {
          this.orig_data = JSON.parse(JSON.stringify(res.data.data));
          this.data = res.data.data;
        });
      },
      reset: function () {
        this.data = JSON.parse(JSON.stringify(this.orig_data));
        this.is_form_changed = false;
      },
      save: function () {
        var post_data = JSON.parse(JSON.stringify(this.data));
        post_data.channel_id = this.$route.params.channel_id;
        axios.put('/chef/api/resource/hotel/HotelServiceUpdate', post_data).then(res => {
          if (res.data.code === 200) {
            this.is_form_changed = false;
          }
        });
      }
    }
  };
</script>
