<template>
  <card class="card-vi-wantu">

    <card-header :title="'玩途旅行'"></card-header>

    <g-row :spacing="1">
      <g-col :span="'1/3'">
        <grid-image :image_url="wt_brand_3x" :row_num="3"
                    :title="'600px * 150px'" :display_type="'contain'"></grid-image>
      </g-col>
      <g-col :span="'1/6'">
        <grid-image :image_url="wt_brand_3x" :row_num="3"
                    :title="'144px * 144px'" :display_type="'contain'"></grid-image>
      </g-col>
      <g-col :span="'1/6'">
        <grid-image :image_url="''" :row_num="3"
                    :title="'QR Code'" :max_volume="'1mb'"></grid-image>
      </g-col>
    </g-row>

    <g-row :spacing="1" :break_row="1">
      <g-col :span="'1/6'">
        <grid-input :title="'#88B04B'" :row_num="2">
          <color-card :value="'#88B04B'"></color-card>
        </grid-input>
      </g-col>
      <g-col :span="'1/6'">
        <grid-input :title="'#444'" :row_num="2">
          <color-card :value="'#444'"></color-card>
        </grid-input>
      </g-col>
      <g-col :span="'1/6'">
        <grid-input :title="'#fff'" :row_num="2">
          <color-card :value="'#fff'"></color-card>
        </grid-input>
      </g-col>
      <g-col :span="'1/6'">
        <grid-input :title="'#eee'" :row_num="2">
          <color-card :value="'#eee'"></color-card>
        </grid-input>
      </g-col>
    </g-row>

  </card>
</template>

<script>
  export default {
    data () {
      return {
        wt_brand_3x: require('./../_images/wantu_brand_3x.png')
      };
    }
  };
</script>
