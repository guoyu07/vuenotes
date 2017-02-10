<template>
  <card class="card-tag-item" :is_little="true">

    <card-header slot="card-header" :title="'Tag' + (index + 1)">
      <icon class="drag-handle" slot="after-title" :name="'i-sort'" :color="'#999'"></icon>

      <btn v-if="!!tag.backend_icons && tag.backend_icons.length > 1" :text="'换图'" @click.native="is_hunt_icon_modal_show = true"></btn>
      <btn :icon="'i-bin'" :mood="'danger'" @click.native="removeTagRef()"></btn>
    </card-header>

    <g-row :spacing="1">
      <g-col :span="'1/1'">
        <grid-image :image_url="tag.tag_icon" :row_num="2" :title="'风格图标'" :display_type="'contain'"></grid-image>
      </g-col>
      <g-col :span="'14/24'">
        <grid-input :title="'标签名'" :row_num="1">
          <text-input v-model="tag.name" :in_grid="true" :readonly="true" @input="is_form_changed = true"></text-input>
        </grid-input>
      </g-col>
      <g-col :span="'10/24'">
        <grid-input :title="'商品数'" :row_num="1">
          <text-input v-model="tag.product_num" :in_grid="true" :readonly="true"
                      @input="is_form_changed = true"></text-input>
        </grid-input>
      </g-col>
    </g-row>

    <!-- Icons 选择弹窗 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_hunt_icon_modal_show" :size="'small'" @close-modal="is_hunt_icon_modal_show = false">
      <card-header slot="modal-header" :title="'选择一个Icon用作展示'"></card-header>

      <g-row :spacing="1">
        <g-col :span="'1/3'" v-for="(icon, index) in tag.backend_icons">
          <grid-image :image_url="icon.tag_icon" :row_num="2" :title="'风格' + (index + 1)"
                      :display_type="'contain'"></grid-image>
          <grid-checkbox :row_num="1" @click.native="saveIcon(icon)"></grid-checkbox>
        </g-col>
      </g-row>
    </modal>

  </card>
</template>

<script>
  /* global axios:true */
  export default {
    props: ['tag', 'index'],
    data () {
      return {
        is_hunt_icon_modal_show: false
      };
    },
    methods: {
      removeTagRef: function () {
        axios.delete('/chef/api/operation/operation/operationTag', {
          params: { id: this.tag.id }
        }).then(res => {
          this.$emit('ref-removed');
        });
      },
      saveIcon: function (icon) {
        axios.put('/chef/api/operation/operation/operationTag', {
          id: this.tag.id,
          op_tag_id: icon.op_tag_id
        }).then(res => {
          this.$emit('icon-saved');
          this.is_hunt_icon_modal_show = false;
        });
      }
    }
  };
</script>
