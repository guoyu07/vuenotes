<template>
  <paper class="channel-contact" :is_root_paper="false">

    <paper-header slot="paper-header"></paper-header>

    <card>

      <card-header slot="card-header" :title="'基本信息'" :is_save_actions_show="is_form_changed"
                   @reset-form="resetContact"
                   @save-form="saveContact">
      </card-header>

      <g-row>
        <g-col :span="'1/4'">
          <grid-input :title="'姓名'" :row_num="2">
            <text-input v-model="contact.name" :in_grid="true"
                        @input="is_form_changed = true"></text-input>
          </grid-input>
        </g-col>
        <g-col :span="'3/4'">
          <g-row>
            <g-col :span="'1/3'">
              <grid-input :title="'职务'">
                <text-input v-model="contact.title" :in_grid="true"
                            @input="is_form_changed = true"></text-input>
              </grid-input>
            </g-col>
            <g-col :span="'1/3'">
              <grid-input :title="'电话'">
                <text-input v-model="contact.telephone" :in_grid="true"
                            @input="is_form_changed = true"></text-input>
              </grid-input>
            </g-col>
            <g-col :span="'1/3'">
              <grid-input :title="'微信'">
                <text-input v-model="contact.wechat" :in_grid="true"
                            @input="is_form_changed = true"></text-input>
              </grid-input>
            </g-col>
          </g-row>
          <g-row>
            <g-col :span="'1/3'">
              <grid-input :title="'QQ'">
                <text-input v-model="contact.qq" :in_grid="true"
                            @input="is_form_changed = true"></text-input>
              </grid-input>
            </g-col>
            <g-col :span="'2/3'">
              <grid-input :title="'邮件'">
                <text-input v-model="contact.email" :in_grid="true"
                            @input="is_form_changed = true"></text-input>
              </grid-input>
            </g-col>
          </g-row>
        </g-col>
      </g-row>
      <g-row>
        <g-col :span="'1/1'">
          <grid-input :title="'地址'">
            <text-input v-model="contact.address" :in_grid="true"
                        @input="is_form_changed = true"></text-input>
          </grid-input>
        </g-col>
      </g-row>

    </card>
  </paper>
</template>
<style scoped>
</style>
<script>
  /* global axios:true */
  export default {
    data () {
      return {
        contact: {},
        is_form_changed: false
      };
    },
    components: {
    },
    mounted () {
      this.$root.$emit('init-paper', this.$route.params.id === 'new' ? '新建联系人' : '联系人信息');
      this.getContact();
    },
    methods: {
      getContact: function () {
        if (this.$route.params.id !== 'new') {
          axios.get('/chef/api/saleRule/channel/contact?id=' + this.$route.params.id).then(res => {
            if (res.data.code === 200) {
              this.contact = res.data.data;
            }
          });
        }
      },
      resetContact: function () {
        this.contact = {};
      },
      saveContact: function () {
        if (this.$route.params.id === 'new') {
          this.contact.channel_id = this.$route.params.channel_id;
          axios.post('/chef/api/saleRule/channel/contact', this.contact).then(res => {
            if (res.data.code === 200) {
              this.$root.$emit('replace-paper', '联系人信息');
              this.contact.id = res.data.data.id;
              this.$router.replace({
                name: this.$route.name,
                params: {
                  channel_id: this.$route.params.channel_id,
                  id: res.data.data.id
                }
              });
              this.is_form_changed = false;
            }
          });
        } else {
          axios.put('/chef/api/saleRule/channel/contact', this.contact).then(res => {
            if (res.data.code === 200) {
              this.is_form_changed = false;
            }
          });
        }
      }
    }
  };
</script>
