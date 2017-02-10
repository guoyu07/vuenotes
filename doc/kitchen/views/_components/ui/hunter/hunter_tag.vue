<template>
  <card class="hunter-tag" :use_padding="false" :is_little="true">

    <g-row :spacing="1">
      <g-col :span="'1/6'">
        <grid-checkbox :row_num="2" v-model="self_is_selected" @input="$emit('do-select', tag)"></grid-checkbox>
      </g-col>
      <g-col :span="'1/3'">
        <grid-image :image_url="tag.icons[0].tag_icon" :row_num="2" :display_type="'contain'" :title="'共有' + tag.icons.length + '种风格'"></grid-image>
      </g-col>
      <g-col :span="'1/2'">
        <g-row>
          <g-col :span="'1/1'">
            <grid-input :title="'标签名'" :row_num="1">
              <text-input v-model="tag.name" :in_grid="true" :readonly="true" @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'商品数'" :row_num="1">
              <text-input v-model="tag.product_num" :in_grid="true" :readonly="true" @input="is_form_changed = true"></text-input>
            </grid-input>
          </g-col>
        </g-row>
      </g-col>
    </g-row>

  </card>
</template>

<script>
  export default {
    props: {
      tag: Object,
      is_selected: { type: Boolean, default: false }
    },
    computed: {
      self_is_selected: function () {
        return this.is_selected;
      }
    }
  };
</script>
