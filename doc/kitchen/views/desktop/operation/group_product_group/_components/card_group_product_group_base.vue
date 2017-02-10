<template>
  <card class="card-group-product-groups">
    <card-header slot="card-header" :title="'基本信息'" :is_save_actions_show="is_form_changed"
                 @reset-form="resetProductGroup"
                 @save-form="saveProductGroup">
    </card-header>

    <g-row :spacing="1" :break_row="1">
      <g-col :span="'2/3'">
        <g-row>
          <g-col :span="'1/1'">
            <grid-input :title="'所属运营城市'" :row_num="1">
              <span v-for="city in product_group.group_locations">{{ city.city.cn_name }} | </span>
              <btn :text="'设置'" :mood="'emphasis'" @click.native="is_city_hunter_show = true"></btn>
            </grid-input>
          </g-col>
        </g-row>
      </g-col>
    </g-row>

    <g-row :spacing="1" :break_row="1">
      <g-col :span="'2/3'">
        <g-row>
          <g-col :span="'1/1'">
            <grid-input :title="'分组名'" :row_num="2">
              <text-input v-model="product_group.title" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'短描述'">
              <text-input v-model="product_group.short_desc" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'长描述'" :row_num="2">
              <textarea-input v-model="product_group.route_desc" :in_grid="true"
                              @input="is_form_changed = true"></textarea-input>
            </grid-input>
          </g-col>
        </g-row>
      </g-col>
      <g-col :span="'1/3'">
        <g-row>
          <g-col :span="'1/1'">
            <grid-input :title="'开始日期'">
              <text-input v-model="product_group.start_date" :type="'date'" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'结束日期'">
              <text-input v-model="product_group.end_date" :type="'date'" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
        </g-row>
      </g-col>
    </g-row>

    <g-row :spacing="1" :break_row="1">
      <g-col :span="'2/3'">
        <grid-image :image_url="product_group.pc_image_url" :row_num="4"
                    :title="'Pc封面图'" :min_size="[1400, 450]"
                    @image-uploaded="setGroupPcImage"></grid-image>
      </g-col>
      <g-col :span="'1/3'">
        <grid-image :image_url="product_group.h5_image_url" :row_num="4"
                    :title="'H5封面图'" :min_size="[828, 552]"
                    @image-uploaded="setGroupH5Image"></grid-image>
      </g-col>
    </g-row>

    <!-- 城市多选弹窗 -->
    <modal v-if="is_city_hunter_show" @close-modal="is_city_hunter_show = false">
      <card-header slot="modal-header" :title="'选择多个城市'"></card-header>
      <multiple-hunter :type="'city'" :cur_ids="cur_cities"
                       @cancel-hunt="is_city_hunter_show = false"
                       @do-hunt="setCitiesForAddGroup"></multiple-hunter>
    </modal>

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
        cur_cities: [],
        is_city_hunter_show: false
      };
    },
    mounted () {
      if (this.$route.params.group_id !== 'new') {
        this.queryProductGroup();
      } else {
        this.product_group.type = '2';
        this.$root.$emit('init-paper', this.getPaperTitle());
      }
    },
    methods: {
      queryProductGroup: function () {
        axios.get('/chef/api/operation/productGroup/Group', {
          params: {
            group_id: this.$route.params.group_id
          }
        }).then(res => {
          this.orig_product_group = Object.assign({}, res.data.data);
          this.cur_cities = [];
          res.data.data.group_locations.map(city => {
            this.cur_cities.push(city.city_code);
          });
          this.product_group = Object.assign({}, res.data.data);
          this.$root.$emit('init-paper', this.getPaperTitle(), { city_codes: this.cur_cities });
        });
      },
      saveProductGroup: function () {
        if (this.$route.params.group_id === 'new') {
          axios.post('/chef/api/operation/productGroup/Group', this.product_group).then(res => {
            this.is_form_changed = false;
            this.saveProductGroupCities(res.data.data.group_id, () => {
              // 切路由
              this.$router.push({
                name: 'operation_group_product_group_detail',
                params: { group_id: res.data.data.group_id }
              });
              this.queryProductGroup();
            });
          });
        } else {
          axios.put('/chef/api/operation/productGroup/Group', this.product_group).then(res => {
            this.is_form_changed = false;
            this.$root.$emit('replace-paper', this.getPaperTitle());
          });
        }
      },
      saveProductGroupCities: function (group_id, next) {
        axios.put('/chef/api/operation/productGroup/groupLabel', {
          group_id: group_id,
          location_label: this.cur_cities
        }).then(res => {
          this.$root.$emit('replace-paper', this.getPaperTitle(), { city_codes: this.cur_cities });
          next();
        });
      },
      resetProductGroup: function () {
        this.product_group = Object.assign({}, this.orig_product_group);
        this.is_form_changed = false;
      },
      getPaperTitle: function () {
        return this.$route.params.group_id === 'new' ? '新建分组的分组(专题组)' : '分组的分组(专题组)' + this.$route.params.group_id + ': ' + this.product_group.title;
      },
      setCitiesForAddGroup: function (citie_codes, cities) {
        this.is_city_hunter_show = false;
        this.cur_cities = citie_codes;
        this.product_group.group_locations = [];
        cities.map(city => {
          this.product_group.group_locations.push({ city: city });
        });
        if (this.$route.params.group_id !== 'new') {
          this.saveProductGroupCities(this.$route.params.group_id, () => {
            this.queryProductGroup();
          });
        }
      },
      setGroupPcImage: function (image_url) {
        this.product_group.pc_image_url = image_url;
        this.is_form_changed = true;
      },
      setGroupH5Image: function (image_url) {
        this.product_group.h5_image_url = image_url;
        this.is_form_changed = true;
      }
    }
  };
</script>
