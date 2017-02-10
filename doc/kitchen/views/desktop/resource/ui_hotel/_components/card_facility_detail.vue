<template>
  <card class="card-product-groups">
    <card-header slot="card-header" :title="'基本信息'" :is_save_actions_show="is_form_changed"
                 @reset-form="resetProductGroup"
                 @save-form="saveProductGroup">
    </card-header>

    <g-row :spacing="1" :break_row="1">
      <g-col :span="'3/3'">
        <g-row>
          <g-col :span="'1/1'">
            <grid-input :title="'名称'" :row_num="2">
              <text-input v-model="product_group.title" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'是否付费'" :row_num="1">
              <tab :tabs="{ '1': '免费', '0': '收费' }" :in_grid="true" :cur_id="product_group.is_free"
                   @switch-tab="switchIsFree"></tab>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'描述'">
              <text-input v-model="product_group.descriptive" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'显示顺序'" :row_num="1">
              <textarea-input v-model="product_group.display_order" :in_grid="true"
                              @input="is_form_changed = true"></textarea-input>
            </grid-input>
          </g-col>
        </g-row>
      </g-col>
    </g-row>

  </card>
</template>

<script>
  /* global axios:true */
  export default {
    data () {
      return {
        product_group: {},
        orig_product_group: {},
        is_form_changed: false,
        is_city_hunter_show: false
      };
    },
    mounted () {
      if (this.$route.params.group_id !== 'new') {
        this.queryProductGroup();
      } else {
        this.$set(this.product_group, 'type', 1);
        this.$root.$emit('init-paper', this.getPaperTitle());
      }
    },
    methods: {
      queryProductGroup: function () {
        axios.get('/chef/api/resource/hotel/FacilityList', {
          params: {
            facility_id: this.$route.params.facility_id
          }
        }).then(res => {
          this.orig_product_group = Object.assign({}, res.data.data);
          this.product_group = Object.assign({}, res.data.data.list);
          this.$root.$emit('init-paper', this.getPaperTitle(), { city_codes: this.cur_cities });
        });
      },
      saveProductGroup: function () {
        if (this.$route.params.group_id === 'new') {
          axios.post('/chef/api/resource/hotel/FacilityAdd', this.product_group).then(res => {
            if (res.data.code === 200) {
              this.is_form_changed = false;
              this.$router.push({
                name: 'resource_hotel_detail',
                params: { facility_id: res.data.data.last_insert_id, tab: 'base' }
              });
              this.queryProductGroup();
            }
          });
        } else {
          axios.put('/chef/api/resource/hotel/FacilityUpdate', this.product_group).then(res => {
            this.is_form_changed = false;
            this.$root.$emit('replace-paper', this.getPaperTitle());
          });
        }
      },
      resetProductGroup: function () {
        this.product_group = Object.assign({}, this.orig_product_group);
        this.is_form_changed = false;
      },
      getPaperTitle: function () {
        return this.$route.params.group_id === 'new' ? '添加设备' : '酒店设备';
      },
      switchIsFree: function (cur_tab) {
        this.is_form_changed = true;
        this.product_group.is_free = cur_tab;
      }
    }
  };
</script>
