<template>
  <paper class="ui_guideline">

    <paper-header slot="paper-header"></paper-header>

    <card class="text-center">
      <tab :tabs="{ vi: 'VI', pc: 'PC', mobile: 'Mobile' }" :cur_id="cur_tab"
           @switch-tab="switchTab"></tab>
    </card>

    <keep-alive>
      <card-vi-wantu v-if="cur_tab == 'vi'"></card-vi-wantu>
      <cards-ui-pc v-else-if="cur_tab == 'pc'"></cards-ui-pc>
    </keep-alive>

  </paper>
</template>

<script>
  export default {
    computed: {
      cur_tab: function () {
        return this.$route.params.tab_id;
      }
    },
    components: {
      'card-vi-wantu': require('./_components/card_vi_wantu'),
      'cards-ui-pc': require('./_components/cards_ui_pc')
    },
    mounted () {
      this.$root.$emit('init-paper', 'HiUI 视觉语言指引');
    },
    methods: {
      switchTab: function (tab_id) {
        this.$router.push({ params: { tab_id: tab_id } });
      }
    }
  };
</script>
