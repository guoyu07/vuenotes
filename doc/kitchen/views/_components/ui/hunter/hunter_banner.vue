<template>
  <card class="hunter-banner" :use_padding="false" :is_little="true">

    <g-row :spacing="1">
      <g-col :span="'1/6'">
        <grid-checkbox :row_num="2" v-model="self_is_selected" @input="$emit('do-select', banner)"></grid-checkbox>
      </g-col>
      <g-col :span="'5/6'" v-if="banner.pc_image_url != ''">
        <grid-image :image_url="banner.pc_image_url" :row_num="2" :title="'[PC, H5] ' + banner.title"></grid-image>
      </g-col>
      <g-col :span="'1/2'" v-if="banner.pc_image_url == '' && !!banner.h5_image_url">
        <grid-image :image_url="banner.h5_image_url" :row_num="2" :title="'[H5] ' + banner.title"></grid-image>
      </g-col>
    </g-row>

  </card>
</template>

<script>
  export default {
    props: {
      banner: Object,
      is_selected: { type: Boolean, default: false }
    },
    computed: {
      self_is_selected: function () {
        return this.is_selected;
      }
    }
  };
</script>
