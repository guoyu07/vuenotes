<template>
  <card class="card-custom-nav-info">
    <g-col :span="'1/1'">
      <grid-input :title="'如何到达'" :row_num="1">
        <text-input v-model="update_merchant.arrival" :in_grid="true"></text-input>
      </grid-input>
    </g-col>
    <card-footer class="pure-u-1-1">
      <btn :text="'取消'" @click.native="cancel"></btn>
      <btn :icon="'i-check'" :mood="'emphasis'" :text="'保存'"
           @click.native="saveHowToGetThere"></btn>
    </card-footer>
  </card>
</template>

<script>
  /* global axios:true */
  export default {
    props: ['merchant'],
    data () {
      return {
        update_merchant: {}
      };
    },
    mounted () {
      this.update_merchant = Object.assign({}, this.merchant);
    },
    methods: {
      saveHowToGetThere: function () {
        console.log(this.merchant.arrival + '----' + this.update_merchant.arrival);
        if (this.merchant.arrival === this.update_merchant.arrival) {
          this.cancel();
        } else {
          axios.put('/chef/api/operation/markWeApp/GiftCardMerchant', this.update_merchant).then(res => {
            this.$emit('save-how-to-get-there');
          });
        }
      },
      cancel: function () {
        this.$emit('cancel-edit');
      }
    }
  };
</script>
