<template>
  <section class="modal" :class="[size, { 'no-padding': !use_padding }]">
    <div class="modal-under" @click="$emit('close-modal')"></div>
    <div class="modal-wrap shadow-deep" @click.stop>
      <icon class="shadow-normal" :name="'i-cross'" @click.native.stop="$emit('close-modal')"></icon>
      <slot name="modal-header"></slot>
      <div class="modal-body">
        <slot></slot>
      </div>
      <slot name="modal-footer"></slot>
    </div>
  </section>
</template>

<style scoped lang="stylus">
  @import '~styles/variables.styl';
  .modal { position: fixed; z-index: 500; top: 0; left: 0; right: 0; bottom: 0; }
  .modal-under { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, .5); }
  .modal-wrap { position: absolute; top: 50%; left: 50%; max-height: 90%; min-height: 50px; max-width: 98%; min-width: 400px; padding: 10px 15px; background: light_gray_3; border-radius: 1px; transform: translateY(-50%); }
  .modal-wrap .i-cross { display: block; position: absolute; top: 0px; right: -21px; padding: 4px; background: rgba(255, 255, 255, 1); border-radius: 1px; opacity: .2; }
  .modal-wrap .i-cross:hover { opacity: .8; cursor: pointer; transition: all .1s; }
  /* 尺寸 */
  .modal.small .modal-wrap { width: 400px; margin-left: -200px; }
  .modal.middle .modal-wrap { width: 800px; margin-left: -400px; }
  .modal.large .modal-wrap { width: 1200px; margin-left: -600px; }
  /* 状态 */
  .modal.no-padding .modal-wrap { padding: 0 !important; }
</style>

<script>
  export default {
    props: {
      size: { type: String, default: 'middle' },
      use_padding: { type: Boolean, default: true }
    }
  };
</script>


