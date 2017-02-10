<template>
  <card class="card-info-contact">
    <card-header slot="card-header" :title="'基本信息'" :is_save_actions_show="is_form_changed"
      @reset-form="resetContact" @save-form="saveContact">
    </card-header>

    <g-row :spacing="1">
      <g-col :span="'1/2'">
        <grid-input :title="'渠道名称'">
          <text-input v-model="info.name" :in_grid="true" @input="is_form_changed = true"></text-input>
        </grid-input>
      </g-col>
      <g-col :span="'1/2'">
        <grid-input :title="'玩途负责人'">
          <text-input v-model="info.contacts" :in_grid="true" @input="is_form_changed = true"></text-input>
        </grid-input>
      </g-col>

      <g-col :span="'1/1'">
        <grid-input :title="'外部联系人'">
          <btn :icon="'i-plus'" :text="'新增联系人'" @click.native="addContact"></btn>
        </grid-input>
      </g-col>
    </g-row>

    <table-grid
      :data_source="contact_list"
      :fields="[{ name: '姓名', field: 'name', col_span: '3/24' },
                { name: '职务', field: 'title', col_span: '3/24' },
                { name: '电话', field: 'telephone', col_span: '4/24' },
                { name: '邮件', field: 'email', col_span: '4/24' },
                { name: '地址', field: 'address', col_span: '6/24' }]"
      :actions="[{ icon: 'i-pencil', text: '详情', event: 'contact—detail' }]"
      :actions_col_span="'4/24'"
      :use_delete="true"
      @do-delete="deleteContact"
      @contact—detail="contactDetail">
    </table-grid>
  </card>
</template>
<style scoped>
</style>
<script>
  /* global axios:true */
  export default {
    data () {
      return {
        info: {},
        orig_info: {},
        contact_list: [],
        is_form_changed: false
      };
    },
    components: {
    },
    mounted () {
      this.getChannel();
    },
    methods: {
      getChannel: function () {
        axios.get('/chef/api/saleRule/channel/channel', {
          params: {
            channel_id: this.$route.params.channel_id
          }
        }).then(res => {
          this.orig_info = Object.assign({}, res.data.data.info);
          this.info = res.data.data.info;
          this.contact_list = res.data.data.contact_list;
          this.$emit('channel-status', this.info.status);
          this.$root.$emit('init-paper', this.info.name);
        });
      },
      resetContact: function () {
        this.info = Object.assign({}, this.orig_info);
        this.is_form_changed = false;
      },
      saveContact: function () {
        axios.put('/chef/api/saleRule/channel/channel', this.info).then(res => {
          if (res.data.code === 200) {
            this.orig_info = Object.assign({}, this.info);
            this.$root.$emit('replace-paper', this.info.name);
            this.is_form_changed = false;
          }
        });
      },
      addContact: function () {
        this.$router.push({
          name: 'sale_rule_channel_contact',
          params: {
            channel_id: this.$route.params.channel_id,
            id: 'new'
          }
        });
      },
      contactDetail: function (contact) {
        this.$router.push({
          name: 'sale_rule_channel_contact',
          params: {
            channel_id: this.$route.params.channel_id,
            id: contact.id
          }
        });
      },
      deleteContact: function (contact, index) {
        axios.delete('/chef/api/saleRule/channel/contact?id=' + contact.id).then(res => {
          if (res.data.code === 200) {
            this.contact_list.splice(index, 1);
          }
        });
      }
    }
  };
</script>
