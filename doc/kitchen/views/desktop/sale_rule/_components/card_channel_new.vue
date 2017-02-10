<template>
  <card class="card-info-contact">
    <card-header slot="card-header" :title="'基本信息'" :is_save_actions_show="is_form_changed"
                 @reset-form="resetContact" @save-form="saveContact">
    </card-header>

    <g-row :spacing="1">
      <g-col :span="'1/2'">
        <grid-input :title="'渠道名称'">
          <text-input v-model="name" :in_grid="true" @input="is_form_changed = true"></text-input>
        </grid-input>
      </g-col>
      <g-col :span="'1/2'">
        <grid-input :title="'渠道类型'">
          <tab :cur_id="type" :tabs="{ '3': '企业', '1': '同业', '2': '异业' }" :in_grid="true" @switch-tab="changeType"></tab>
        </grid-input>
      </g-col>
    </g-row>
  </card>
</template>
<style scoped>
</style>
<script>
  /* global axios:true */
  export default {
    data () {
      return {
        name: '',
        type: '3',
        is_form_changed: false
      };
    },
    components: {
    },
    mounted () {
      this.$root.$emit('init-paper', '新建政策');
    },
    methods: {
      resetContact: function () {
        this.name = '';
        this.type = '3';
        this.is_form_changed = false;
      },
      changeType: function (type) {
        this.is_form_changed = true;
        this.type = type;
      },
      saveContact: function () {
        if (!this.name) {
          window.alert('empty name');
          return;
        }
        axios.post('/chef/api/saleRule/channel/channel', {
          name: this.name,
          type: this.type
        }).then(res => {
          this.is_form_changed = false;
          this.$router.replace({
            name: 'sale_rule_channel_detail',
            params: {
              channel_id: res.data.data.channel_id
            }
          });
        });
      }
    }
  };
</script>
