<template>
  <card class="card-gift-card">
    <card-header slot="card-header" :title="'基本信息'" :is_save_actions_show="is_form_changed"
                 @reset-form="resetGiftCard"
                 @save-form="saveGiftCard">
    </card-header>

    <g-row :spacing="1" :break_row="1">
      <g-col :span="'1/1'">
        <g-row>
          <g-col :span="'1/1'">
            <grid-input :title="'所属商户'" :row_num="1">
              <span>{{ gift_card.merchant_name }}</span>
              <btn v-if="this.$route.params.card_id == 'new'" :text="'设置(保存后商户不可修改)'" :mood="'emphasis'"
                   @click.native="is_merchant_hunter_show = true"></btn>
            </grid-input>
          </g-col>
        </g-row>
      </g-col>
    </g-row>

    <g-row :spacing="1" :break_row="1">
      <g-col :span="'1/1'">
        <grid-input :title="'礼品卡名'" :row_num="2">
          <text-input v-model="gift_card.title" :in_grid="true"
                      @input="is_form_changed = true"></text-input>
        </grid-input>
      </g-col>
      <g-col :span="'1/1'">
        <grid-input :title="'短描述'">
          <text-input v-model="gift_card.brief" :in_grid="true"
                      @input="is_form_changed = true"></text-input>
        </grid-input>
      </g-col>
      <g-col :span="'1/1'">
        <grid-input :title="'详情'" :row_num="2">
          <textarea-input v-model="gift_card.detail" :in_grid="true"
                          @input="is_form_changed = true"></textarea-input>
        </grid-input>
      </g-col>
      <g-col :span="'1/1'">
        <grid-input :title="'最低消费'">
          <text-input v-model="gift_card.limit_price" :type="'number'" :in_grid="true" :prefix="'฿'"
                      @input="is_form_changed = true"></text-input>
        </grid-input>
      </g-col>
    </g-row>


    <g-row :spacing="1" :break_row="1">
      <g-col :span="'1/2'">
        <grid-image :image_url="gift_card.image_url" :row_num="4"
                    :title="'礼品卡图'" :min_size="[828, 414]" :max_volume="'1mb'"
                    @image-uploaded="setCardImage"></grid-image>
      </g-col>
      <g-col :span="'1/2'">
        <grid-image :image_url="gift_card.order_image" :row_num="4"
                    :title="'买单小票图'" :min_size="[828, 414]" :max_volume="'1mb'"
                    @image-uploaded="setCardOrderImage"></grid-image>
      </g-col>
    </g-row>

    <!-- 商户选择弹窗 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_merchant_hunter_show" @close-modal="is_merchant_hunter_show = false">
      <card-header slot="modal-header" :title="'选择商户'"></card-header>
      <single-hunter :type="'merchant'"
                     @cancel-hunt="is_merchant_hunter_show = false"
                     @do-hunt="setMerchantForGiftCard"></single-hunter>
    </modal>

  </card>
</template>

<script>
  /* global axios:true */
  export default {
    data () {
      return {
        gift_card: {},
        orig_gift_card: {},
        cur_cities: [],
        is_form_changed: false,
        is_merchant_hunter_show: false
      };
    },
    mounted () {
      if (this.$route.params.card_id !== 'new') {
        this.queryGiftCard();
      } else {
        this.$root.$emit('init-paper', this.getPaperTitle());
      }
    },
    methods: {
      queryGiftCard: function () {
        axios.get('/chef/api/operation/markWeApp/giftCard', {
          params: {
            card_id: this.$route.params.card_id
          }
        }).then(res => {
          this.orig_gift_card = Object.assign({}, res.data.data);
          this.gift_card = Object.assign({}, res.data.data);
          this.cur_cities = [res.data.data.city_code];
          this.$root.$emit('init-paper', this.getPaperTitle(), { city_codes: this.cur_cities });
        });
      },
      saveGiftCard: function () {
        if (this.$route.params.card_id === 'new') {
          if (!this.gift_card.title) {
            this.$root.$emit('action-feedback', { msg: '请输入礼品卡名称', mood: 'danger' });
            return;
          }
          if (!this.gift_card.merchant_id) {
            this.$root.$emit('action-feedback', { msg: '请选择礼品卡商户', mood: 'danger' });
            return;
          }
          axios.post('/chef/api/operation/markWeApp/giftCard', this.gift_card).then(res => {
            if (res.data.code === 200) {
              this.is_form_changed = false;
              this.$router.push({
                name: 'operation_wxapp_bolo_gift_card_detail',
                params: { card_id: res.data.data.card_id, tab: 'base' }
              });
              this.orig_gift_card = Object.assign({}, res.data.data);
              this.gift_card = Object.assign({}, res.data.data);
              this.cur_cities = [res.data.data.city_code];
              this.$root.$emit('replace-paper', this.getPaperTitle(), { city_codes: this.cur_cities });
            }
          });
        } else {
          axios.put('/chef/api/operation/markWeApp/giftCard', this.gift_card).then(res => {
            this.is_form_changed = false;
            this.$root.$emit('replace-paper', this.getPaperTitle(), { city_codes: this.cur_cities });
          });
        }
      },
      resetGiftCard: function () {
        this.gift_card = Object.assign({}, this.orig_gift_card);
        this.is_form_changed = false;
      },
      getPaperTitle: function () {
        return this.$route.params.card_id === 'new' ? '新建礼品卡' : '礼品卡' + this.$route.params.card_id + ': ' + this.gift_card.title;
      },
      setMerchantForGiftCard: function (merchant) {
        this.is_merchant_hunter_show = false;
        this.cur_cities = [merchant.city_code];
        this.gift_card.city_code = merchant.city_code;
        this.gift_card.merchant_name = merchant.name;
        this.gift_card.merchant_id = merchant.merchant_id;
        this.is_form_changed = true;
      },
      setCardImage: function (image_url) {
        this.gift_card.image_url = image_url;
        this.is_form_changed = true;
      },
      setCardOrderImage: function (image_url) {
        this.gift_card.order_image = image_url;
        this.is_form_changed = true;
      }
    }
  };
</script>
