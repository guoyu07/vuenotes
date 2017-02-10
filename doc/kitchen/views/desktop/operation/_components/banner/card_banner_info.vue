<template>
  <card class="card-banner" :use_padding="is_new ? false : true">

    <card-header slot="card-header"
                 :title="'Banner'" :is_save_actions_show="is_form_changed"
                 @reset-form="resetBanner"
                 @save-form="saveBanner"></card-header>

    <g-row :spacing="1">
      <g-col :span="'2/3'">
        <grid-image :image_url="banner.pc_image_url" :row_num="4"
                    :title="'Pc'" :min_size="[1400, 450]" :max_volume="'1mb'"
                    @image-uploaded="setPcImage"></grid-image>
      </g-col>
      <g-col :span="'1/3'">
        <grid-image :image_url="banner.h5_image_url" :row_num="4"
                    :title="'H5'" :min_size="[828, 552]" :max_volume="'1mb'"
                    @image-uploaded="setH5Image"></grid-image>
      </g-col>
      <g-col :span="'2/3'">
        <grid-input :title="'标题'" :row_num="1">
          <text-input v-model="banner.title" :in_grid="true"
                      @input="is_form_changed = true"></text-input>
        </grid-input>
      </g-col>
      <g-col :span="'1/3'">
        <grid-input :title="'开始日期'" :row_num="1">
          <text-input v-model="banner.start_date" :type="'date'" :in_grid="true"
                      @input="is_form_changed = true"></text-input>
        </grid-input>
      </g-col>
      <g-col :span="'2/3'">
        <grid-input :title="'到达页面的链接'" :row_num="1">
          <text-input v-model="banner.link_url" :in_grid="true"
                      @input="is_form_changed = true"></text-input>
        </grid-input>
      </g-col>
      <g-col :span="'1/3'">
        <grid-input :title="'结束日期'" :row_num="1">
          <text-input v-model="banner.end_date" :type="'date'" :in_grid="true"
                      @input="is_form_changed = true"></text-input>
        </grid-input>
      </g-col>
    </g-row>

  </card>
</template>

<script>
  export default {
    /* global axios:true */
    props: ['banner_id', 'is_new', 'ref_params'],
    data () {
      return {
        banner: {},
        orig_banner: {},
        is_form_changed: false
      };
    },
    mounted () {
      if (!this.is_new) this.queryBanner();
    },
    methods: {
      queryBanner: function () {
        axios.get('/chef/api/operation/banner/banner', {
          params: { banner_id: this.banner_id }
        }).then(res => {
          this.banner = Object.assign({}, res.data.data);
          this.orig_banner = Object.assign({}, res.data.data);
          this.$root.$emit('init-paper', '头图: ' + this.banner.title);
        });
      },
      saveBanner: function () {
        if (this.is_new) {
          if (this.ref_params) {
            this.banner.type = this.ref_params.type;
            this.banner.code = this.ref_params.code;
          }
          axios.post('/chef/api/operation/banner/banner', this.banner).then(res => {
            this.$emit('banner-added');
          });
        } else {
          axios.put('/chef/api/operation/banner/banner', this.banner).then(res => {
            this.is_form_changed = false;
          });
        }
      },
      resetBanner: function () {
        this.banner = Object.assign({}, this.orig_banner);
        this.is_form_changed = false;
      },
      setPcImage: function (image_url) {
        this.banner.pc_image_url = image_url;
        this.is_form_changed = true;
      },
      setH5Image: function (image_url) {
        this.banner.h5_image_url = image_url;
        this.is_form_changed = true;
      }
    }
  };
</script>
