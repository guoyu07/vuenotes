<template>
  <transition :name="'from-right'">
    <section class="cheat-sheet shadow-deep">
      <icon class="shadow-normal" :name="'i-cross'"
            @click.native.stop="$store.dispatch('SET_CHEAT_SHEET_SHOW', false)"></icon>
      <slot name="sheet-header"></slot>
      <slot></slot>
    </section>
  </transition>
</template>

<style scoped lang="stylus">
  @import '~styles/variables.styl';
  .cheat-sheet { position: fixed; z-index: 200; top: 45px; left: 50%; margin-left: 281px; width: 320px; height: 580px; padding: 11px 12px; background: light_gray_3; border-radius: 1px; }
  .cheat-sheet .i-cross { display: block; position: absolute; top: 0px; right: -21px; padding: 4px; background: rgba(255, 255, 255, 1); border-radius: 1px; opacity: .2; }
  .cheat-sheet .i-cross:hover { opacity: .8; cursor: pointer; transition: all .1s; }
</style>
