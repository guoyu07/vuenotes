<template>
    <card>
        <card-header slot="card-header" :title="'航空公司'" :is_save_actions_show="is_form_changed"
                     @reset-form="resetProductGroup" @save-form="saveProductGroup"></card-header>

        <g-row :spacing="1" :break_row="1">
            <g-col :span="'1/3'">
                <grid-image :image_url="product_group.h5_image_url" :row_num="4" :title="'航空公司LOGO'" :min_size="[35,35]"
                            :max_volume="'1mb'" :image-uploader="setGroupH5Image"></grid-image>
            </g-col>
            <g-col :span="'2/3'">
                <grid-input :title="'航空公司二字码(必须为两位的数字或字母)'">
                    <text-input :in_grid="true" @input="is_form_changed = true"></text-input>
                </grid-input>
                <grid-input :title="'中文名'">
                    <text-input :in_grid="true" @input="is_form_changed = true"></text-input>
                </grid-input>
                <grid-input :title="'中文简称'">
                    <text-input :in_grid="true" @input="is_form_changed = true"></text-input>
                </grid-input>
                <grid-input :title="'备注'">
                    <text-input :in_grid="true" @input="is_form_changed = true"></text-input>
                </grid-input>
            </g-col>
        </g-row>
    </card>
</template>

<script>
  export default {
    data() {
      return {
        product_group: {},
        is_form_changed: false
      };
    },
    mounted() {
      this.$root.$emit('init-paper', '航空公司详情');
    },
    methods: {
      resetProductGroup: function () {
      },
      saveProductGroup: function () {
      },
      setGroupH5Image: function (image_url) {
        this.product_group.h5_image_url = image_url;
        this.is_form_changed = true;
      }
    }
  };
</script>