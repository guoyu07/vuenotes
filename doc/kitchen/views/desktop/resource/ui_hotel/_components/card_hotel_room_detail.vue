<template>
  <card class="card-product-groups">
    <card-header slot="card-header" :title="'基本信息'" :is_save_actions_show="is_form_changed"
                 @reset-form="resetProductGroup"
                 @save-form="saveProductGroup">
    </card-header>

    <g-row :spacing="1" :break_row="1">
      <g-col :span="'1/1'">
        <g-row>
          <g-col :span="'1/1'">
            <grid-input :title="'房型中文名称'" :row_num="2">
              <text-input v-model="product_group.room_type_name" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'房型英文名称'" :row_num="2">
              <text-input v-model="product_group.room_type_name_en" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'房型描述'">
              <text-input v-model="product_group.descriptive" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'标准入住人数'" :row_num="1">
              <textarea-input v-model="product_group.capacity" :in_grid="true"
                              @input="is_form_changed = true"></textarea-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'最大入住人数'" :row_num="1">
              <textarea-input v-model="product_group.max_capacity" :in_grid="true"
                              @input="is_form_changed = true"></textarea-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'面积'" :row_num="1">
              <textarea-input v-model="product_group.area" :in_grid="true"
                              @input="is_form_changed = true"></textarea-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'床型描述'" :row_num="1">
              <textarea-input v-model="product_group.bed_description" :in_grid="true"
                              @input="is_form_changed = true"></textarea-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'楼层'" :row_num="1">
              <textarea-input v-model="product_group.floor" :in_grid="true"
                              @input="is_form_changed = true"></textarea-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'有无窗口'" :row_num="1">
              <textarea-input v-model="product_group.windows" :in_grid="true"
                              @input="is_form_changed = true"></textarea-input>
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
      if (this.$route.params.room_id !== 'new') {
        this.queryProductGroup();
      } else {
        this.$set(this.product_group, 'type', 1);
        this.$root.$emit('init-paper', this.getPaperTitle());
      }
    },
    methods: {
      queryProductGroup: function () {
        console.log(this.$route.params.room_id);
        console.log(this.$route.params.hotel_id);
        axios.get('/chef/api/resource/hotel/RoomDetail', {
          params: {
            room_id: this.$route.params.room_id
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
        if (this.$route.params.room_id === 'new') {
          this.product_group.hotel_id = this.$route.params.hotel_id;
          axios.post('/chef/api/resource/hotel/RoomAdd', this.product_group).then(res => {
            if (res.data.code === 200) {
              this.is_form_changed = false;
              this.$router.push({
                name: 'resource_hotel_detail',
                params: { hotel_id: this.$route.params.hotel_id, tab: 'base' }
              });
            }
          });
        } else {
          axios.put('/chef/api/resource/hotel/RoomUpdate', this.product_group).then(res => {
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
        return this.$route.params.room_id === 'new' ? '添加房型' : '房型ID' + this.$route.params.room_id;
      },
      setCitiesForAddGroup: function (city_codes, cities) {
        this.is_city_hunter_show = false;
        this.cur_cities = city_codes;
//        this.product_group.group_locations = [];
//        cities.map(city => {
//          this.product_group.group_locations.push({ city: city });
//        });
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
