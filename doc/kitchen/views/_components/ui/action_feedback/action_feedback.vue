<template>
  <section class="action-feedback">
    <toast v-show="is_feedback_show && mood == 'normal'" :text="text" :icon="icon"></toast>
    <dialogue v-show="is_feedback_show && mood != 'normal'"
              :text="text"
              :mood="'danger'"
              :actions="[{ text: '哦~', event: 'close-dialogue' }]"
              @close-dialogue="is_feedback_show = false"></dialogue>
  </section>
</template>

<style scoped>
  .action-feedback { position: relative; z-index: 1000; }
</style>

<script>
  export default {
    data () {
      return {
        text: '未知错误, 请告诉程序员不要拉屎!',
        mood: 'normal',
        icon: 'i-check',
        is_feedback_show: false
      };
    },
    created () {
      this.$root.$on('action-feedback', ({ msg, mood, icon }) => {
        this.text = msg;
        this.mood = mood || 'normal';
        this.icon = icon || 'i-check';
        this.is_feedback_show = true;
        if (this.mood === 'normal') {
          setTimeout(() => {
            this.is_feedback_show = false;
          }, 2000);
        }
      });
    }
  };
</script>
