<template>
  <card class="card-banner-item" :is_little="true" :use_padding="true">

    <card-header slot="card-header" :title="banner.title" :in_little_card="true">
      <icon class="drag-handle" slot="after-title" :name="'i-sort'" :color="'#999'"></icon>

      <btn :icon="'i-pencil'" @click.native="goBannerDetail()"></btn>
      <btn :text="'解除关联'" :mood="'danger'" @click.native="removeBannerRef()"></btn>
    </card-header>

    <g-row :spacing="1">
      <g-col :span="'2/3'">
        <grid-image :image_url="banner.pc_image_url" :row_num="2" :title="'Pc'"></grid-image>
      </g-col>
      <g-col :span="'1/3'">
        <grid-image :image_url="banner.h5_image_url" :row_num="2" :title="'H5'"></grid-image>
      </g-col>
    </g-row>

  </card>
</template>

<style scoped>
  .card-banner-item .drag-handle { width: 12px; height: 12px; vertical-align: -2px; margin-left: 5px; }
</style>

<script>
  /* global axios:true */
  export default {
    props: ['banner', 'index'],
    methods: {
      goBannerDetail: function () {
        this.$router.push({ name: 'operation_web_home_banner_detail', params: { banner_id: this.banner.banner_id } });
      },
      removeBannerRef: function () {
        axios.delete('/chef/api/operation/operation/operationBanner', {
          params: { id: this.banner.id }
        }).then(res => {
          this.$emit('ref-removed');
        });
      }
    }
  };
</script>
