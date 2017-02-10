<template>
  <section class="dialogue shadow-deep">

    <icon :name="'i-cross'" @click.native="$emit('close-dialogue')"></icon>

    <div class="dialogue-body">
      <div class="dialogue-left">
        <icon :name="mood_face[mood]"></icon>
      </div>
      <div class="dialogue-main">
        <h3 class="dialogue-text">{{ text }}</h3>
      </div>
    </div>

    <card-footer class="dialogue-actions">
      <btn v-for="action in actions"
           :icon="action.icon" :mood="action.mood" :text="action.text" @click.native="$emit(action.event)">
    </card-footer>

  </section>
</template>

<style scoped lang="stylus">
  @import '~styles/variables.styl';
  .dialogue { position: fixed; z-index: 999; width: 300px; height: 120px; top: 50%; left: 50%; margin: -60px 0 0 -150px; padding: 10px; background: light_gray_2; color: black; border-radius: 1px; }
  .dialogue .i-cross { display: block; position: absolute; top: 4px; right: 4px; padding: 4px; border-radius: 2px; opacity: .6; }
  .dialogue .i-cross:hover { opacity: 1; cursor: pointer; transition: all .1s; }
  .dialogue-body { display: flex; }
  .dialogue-body .dialogue-left { width: 40px; text-align: center; }
  .dialogue-body .dialogue-left .icon { width: 30px; height: 30px; }
  .dialogue-body .dialogue-main { padding-left: 10px; }
  .dialogue-body .dialogue-main .dialogue-text { padding: 5px 0; font-weight: normal; }
  .dialogue-actions { position: absolute; bottom: 0; left: 0; right: 0; margin: 0 10px; text-align: right; }
  .dialogue-actions > .btn:not(:first-child) { margin-left: 2px; }
</style>

<script>
  export default {
    props: {
      text: String,
      page_url: String,
      api_url: String,
      mood: { type: String, default: 'normal' },
      actions: Array
    },
    data () {
      return {
        mood_face: {
          'normal': 'i-face-cool',
          'danger': 'i-face-cry'
        }
      };
    }
  };
</script>
