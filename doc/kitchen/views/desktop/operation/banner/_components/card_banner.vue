<template>
  <card class="card-banner" :is_little="is_new ? false : true" :use_padding="is_new ? false : true">

    <card-header slot="card-header"
                 :title="'No. ' + (index + 1)" :is_save_actions_show="is_form_changed"
                 @reset-form="resetBanner"
                 @save-form="saveBanner">
      <btn v-if="!is_new" :icon="'i-bin'" :mood="'danger'" @click.native="deleteBanner()"></btn>
    </card-header>

    <g-row :spacing="1">
      <g-col :span="'10/24'">
        <grid-image :image_url="banner.pc_image_url" :row_num="3"
                    :title="'Pc'" :min_size="[1400, 450]" :max_volume="'1mb'"
                    @image-uploaded="setPcImage"></grid-image>
      </g-col>
      <g-col :span="'6/24'">
        <grid-image :image_url="banner.h5_image_url" :row_num="3"
                    :title="'H5'" :min_size="[828, 621]" :max_volume="'1mb'"
                    @image-uploaded="setH5Image"></grid-image>
      </g-col>
      <g-col :span="'8/24'">
        <g-row>
          <g-col :span="'1/1'">
            <grid-input :title="'标题'" :row_num="1">
              <text-input v-model="banner.title" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'到达页面的链接'" :row_num="1">
              <text-input v-model="banner.link_url" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/2'">
            <grid-input :title="'开始日期'" :row_num="1">
              <text-input v-model="banner.start_date" :type="'date'" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/2'">
            <grid-input :title="'结束日期'" :row_num="1">
              <text-input v-model="banner.end_date" :type="'date'" :in_grid="true"
                          @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
        </g-row>
      </g-col>
    </g-row>

  </card>
</template>

<script>
  export default {
    /* global axios:true */
    props: ['orig_banner', 'is_new', 'index'],
    data () {
      return {
        banner: Object.assign({}, this.orig_banner),
        is_form_changed: false
      };
    },
    methods: {
      saveBanner: function () {
        if (this.is_new) {
          axios.post('/chef/api/operation/banner/banner', this.banner).then(res => {
            this.$emit('banner-added');
          });
        } else {
          axios.put('/chef/api/operation/banner/banner', this.banner).then(res => {
            this.$emit('banner-added');
          });
        }
      },
      deleteBanner: function () {
        axios.delete('/chef/api/operation/banner/banner', {
          params: { banner_id: this.banner.banner_id }
        }).then(res => {
          this.$emit('banner-deleted');
        });
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
