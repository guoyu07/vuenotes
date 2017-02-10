<template>
  <section class="paper">

    <!-- 下层页链接 -->
    <router-link class="under-paper shadow-deep"
                 v-for="(under, index) in paper_stack"
                 :to="under.route"
                 :style="{ 'margin': '0 ' + (10 * (paper_stack.length - index)) + 'px -4px',
                           'z-index': 1 * index }">{{ under.name }}
    </router-link>

    <!-- 顶层当前页 -->
    <div class="top-paper shadow-deep">
      <div class="paper-header-wrap">
        <slot name="paper-header"></slot>
      </div>
      <slot></slot>

      <transition name="fade">
        <loading-cover v-show="self_is_loading_show"></loading-cover>
      </transition>
    </div>

  </section>
</template>

<style scoped lang="stylus">
  @import '~styles/variables.styl';
  .paper { position: relative; width: 880px; }
  .under-paper { position: relative; display: block; background: light_gray_2; color: gray_1; line-height: 28px; padding: 0 12px 2px; border-radius: 1px 1px 0 0; cursor: pointer; transition: all .2s ease; }
  .under-paper:hover { transform: translateY(-3px) !important; }
  .top-paper { position: relative; z-index: 100; min-height: 600px; background: light_gray_3; padding: 50px 40px; color: black; border-radius: 1px; }
  .top-paper .paper-header-wrap { position: absolute; top: 0; left: 12px; right: 12px; padding: 6px 0 0; }
</style>

<script>
  export default {
    props: {
      title: String,
      is_root_paper: { type: Boolean, default: true },
      is_loading_show: { type: Boolean, default: false }
    },
    data () {
      return {
        self_is_loading_show: this.is_loading_show
      };
    },
    computed: {
      paper_stack: function () {
        return this.$store.state.paper_stack.filter((paper, index) => {
          return index < this.$store.state.paper_stack.length - 1;
        });
      }
    },
    created () {
      this.$root.$once('init-paper', (paper_title, paper_data) => {
        this.handlePaperStack(paper_title, paper_data);
        // setTimeout(() => {
        this.self_is_loading_show = false;
        this.$forceUpdate();
        // }, 1000);
      });
      this.$root.$on('replace-paper', (paper_title, paper_data) => {
        this.$store.dispatch('REPLACE_PAPERS', { name: paper_title, route: this.$route.fullPath, data: paper_data });
      });
    },
    mounted: function () {
      if (this.is_root_paper) {
        this.$store.dispatch('CLEAR_PAPERS');
      }
    },
    methods: {
      handlePaperStack: function (paper_title, paper_data) {
        // 一个页面只接受一次paper_stack压栈操作
        var cur_path = '';
        if (cur_path !== this.$route.fullPath) {
          cur_path = this.$route.fullPath;
          this.$nextTick(() => {
            this.$store.dispatch('PUSH_PAPER', { name: paper_title, route: cur_path, data: paper_data });
            // paper已经在栈内, 出栈到该paper
            const PAPER_STACK = this.$store.state.paper_stack;
            var new_paper = PAPER_STACK[PAPER_STACK.length - 1];
            PAPER_STACK.map((paper, index) => {
              if (index !== (PAPER_STACK.length - 1) && paper.route === new_paper.route) {
                this.$store.dispatch('POP_PAPERS', index + 1);
              }
            });
          });
        }
      }
    }
  };
</script>
