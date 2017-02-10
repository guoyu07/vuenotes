<template>
  <card class="card-tag-info" :is_little="true">

    <card-header slot="card-header" :title="'ID.: ' + tag.tag_id" :is_save_actions_show="is_form_changed"
                 @reset-form="resetTag"
                 @save-form="saveTag">
      <btn v-show="!is_form_changed" :icon="'i-plus'" :text="'图标'" @click.native="addIcon"></btn>
    </card-header>

    <g-row :spacing="1">
      <g-col :span="'1/2'">
        <grid-input :title="'分组名'" :row_num="2">
          <text-input v-model="tag.name" :in_grid="true" :readonly="true"
                      @input="is_form_changed = true"></text-input>
        </grid-input>
      </g-col>
      <g-col :span="'1/6'" v-for="(icon, index) in tag.icons">
        <grid-image :image_url="icon.tag_icon" :row_num="2" :title="'风格' + (index + 1)" :min_size="[144, 144]"
                    :display_type="'contain'" :index="index" @image-uploaded="setIcon"></grid-image>
      </g-col>
    </g-row>

  </card>
</template>

<script>
  /* global axios:true */
  export default {
    props: ['orig_tag', 'is_new', 'ref_params'],
    data () {
      return {
        is_form_changed: false
      };
    },
    computed: {
      tag: function () {
        return Object.assign({}, this.orig_tag);
      }
    },
    methods: {
      saveTag: function () {
        if (this.is_new) {
        } else {
          var icons = [];
          this.tag.icons.map(icon => {
            icons.push(icon.tag_icon);
          });
          axios.patch('/chef/api/operation/productTag/tagIcons', {
            tag_id: this.tag.tag_id,
            tag_icons: icons
          }).then(res => {
            this.is_form_changed = false;
          });
        }
      },
      addIcon: function () {
        this.tag.icons.push({
          tag_id: this.tag.tag_id,
          tag_icon: ''
        });
      },
      resetTag: function () {
        this.tag = Object.assign({}, this.orig_tag);
        this.is_form_changed = false;
      },
      setIcon: function (icon_url, index) {
        this.tag.icons[index].tag_icon = icon_url;
        this.is_form_changed = true;
      }
    }
  };
</script>
