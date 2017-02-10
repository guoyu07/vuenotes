<template>
  <card class="card-product-groups">
    <card-header slot="card-header" :title="'基本信息'" :is_save_actions_show="is_form_changed"
                 @reset-form="resetProductGroup"
                 @save-form="saveProductGroup">
    </card-header>

    <g-row :spacing="1" :break_row="1">
      <g-col :span="'2/3'">
        <g-row>
          <g-col :span="'1/1'">
            <grid-input :title="'酒店中文名称'" :row_num="2">
              <text-input v-model="product_group.hotel_name_cn" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'酒店英文名称'" :row_num="2">
              <text-input v-model="product_group.hotel_name_en" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'所属城市'" :row_num="1">
              <span>{{ product_group.city_cn_name }}</span>
              <btn :text="'设置'" :mood="'emphasis'"
                   @click.native="is_city_hunter_show = true"></btn>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'描述'">
              <text-input v-model="product_group.short_info" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'中文地址'" :row_num="1">
              <textarea-input v-model="product_group.address_zh" :in_grid="true"
                              @input="is_form_changed = true"></textarea-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'英文地址'" :row_num="1">
              <textarea-input v-model="product_group.address_en" :in_grid="true"
                              @input="is_form_changed = true"></textarea-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'儿童政策'" :row_num="1">
              <textarea-input v-model="product_group.children_policy" :in_grid="true"
                              @input="is_form_changed = true"></textarea-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'膳食安排'" :row_num="1">
              <textarea-input v-model="product_group.meal_sheet" :in_grid="true"
                              @input="is_form_changed = true"></textarea-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'宠物政策'" :row_num="1">
              <textarea-input v-model="product_group.pet" :in_grid="true"
                              @input="is_form_changed = true"></textarea-input>
            </grid-input>
          </g-col>
        </g-row>
      </g-col>
      <g-col :span="'1/3'">
        <g-row>
          <g-col :span="'1/1'">
            <grid-input :title="'入住时间'">
              <text-input v-model="product_group.check_in_time" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'离开时间'">
              <text-input v-model="product_group.check_out_time" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'开业时间'">
              <text-input v-model="product_group.opening_date" :type="'date'" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'酒店星级'">
              <text-input v-model="product_group.star_level" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'房间数量'">
              <text-input v-model="product_group.room_quantity" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'酒店网址'">
              <text-input v-model="product_group.website" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'前台电话'">
              <text-input v-model="product_group.tel" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'电子邮件'">
              <text-input v-model="product_group.email" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'高德坐标'">
              <text-input v-model="product_group.position_gaode" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'谷歌坐标'">
              <text-input v-model="product_group.position_google" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'百度坐标'">
              <text-input v-model="product_group.position_baidu" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
        </g-row>
      </g-col>
    </g-row>


    <g-row :spacing="1" :break_row="1">
      <g-col :span="'2/3'">
        <grid-image :image_url="product_group.pc_image_url" :row_num="4"
                    :title="'Pc封面图'" :min_size="[1400, 450]" :max_volume="'1mb'"
                    @image-uploaded="setGroupPcImage"></grid-image>
      </g-col>
      <g-col :span="'1/3'">
        <grid-image :image_url="product_group.h5_image_url" :row_num="4"
                    :title="'H5封面图'" :min_size="[828, 552]"
                    @image-uploaded="setGroupH5Image"></grid-image>
      </g-col>
    </g-row>

    <!-- 城市选择弹窗 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_city_hunter_show" @close-modal="is_city_hunter_show = false" :size="'small'">
      <card-header slot="modal-header" :title="'选择城市'"></card-header>
      <single-hunter :type="'city'"
                     @cancel-hunt="is_city_hunter_show = false"
                     @do-hunt="setCity"></single-hunter>
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
        cur_cities: [],
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
        axios.get('/chef/api/resource/hotel/Hoteldetail', {
          params: {
            hotel_id: this.$route.params.hotel_id
          }
        }).then(res => {
          this.orig_product_group = Object.assign({}, res.data.data);
          this.product_group = Object.assign({}, res.data.data.detail);
          this.cur_cities = [];
//          res.data.data.group_locations.map(city => {
//            this.cur_cities.push(city.city_code);
//          });
          this.$root.$emit('init-paper', this.getPaperTitle(), { city_codes: this.cur_cities });
        });
      },
      saveProductGroup: function () {
        if (this.$route.params.group_id === 'new') {
          axios.post('/chef/api/resource/hotel/HotelAdd', this.product_group).then(res => {
            if (res.data.code === 200) {
              this.is_form_changed = false;
              this.$router.push({
                name: 'resource_hotel_detail',
                params: { hotel_id: res.data.data.last_insert_id, tab: 'base' }
              });
              this.queryProductGroup();
            }
          });
        } else {
          axios.put('/chef/api/resource/hotel/HotelUpdate', this.product_group).then(res => {
            this.is_form_changed = false;
            this.$root.$emit('replace-paper', this.getPaperTitle());
          });
        }
      },
      saveProductGroupCities: function (group_id, next) {
        axios.put('/chef/api/resource/hotel/HotelAdd', {
          group_id: group_id,
          location_label: this.cur_cities
        }).then(res => {
          console.log(this.cur_cities);
          this.$root.$emit('replace-paper', this.getPaperTitle(), { city_codes: this.cur_cities });
          next();
        });
      },
      resetProductGroup: function () {
        this.product_group = Object.assign({}, this.orig_product_group);
        this.is_form_changed = false;
      },
      getPaperTitle: function () {
        return this.$route.params.group_id === 'new' ? '新建分组' : '酒店ID' + this.$route.params.hotel_id + ': ' + this.product_group.hotel_name_cn;
      },
      setGroupPcImage: function (image_url) {
        this.product_group.pc_image_url = image_url;
        this.is_form_changed = true;
      },
      setGroupH5Image: function (image_url) {
        this.product_group.h5_image_url = image_url;
        this.is_form_changed = true;
      },
      setCity: function (city) {
        this.is_city_hunter_show = false;
        this.product_group.city_code = city.city_code;
        this.product_group.city_cn_name = city.cn_name;
        this.is_form_changed = true;
      }
    }
  };
</script>
