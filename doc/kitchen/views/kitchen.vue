<template>
  <div id="app" @click="handleBottomClick()">
    <router-view class="view"></router-view>
    <action-feedback></action-feedback>
  </div>
</template>

<style lang="stylus">
  @import './_styles/common';
</style>

<script>
  import router from './_router';
  import store from './_store';

  export default {
    router: router,
    store: store,
    mounted () {
      this.$nextTick(() => {
        /* global axios:true */
        // 全局Http请求处理
        axios.interceptors.request.use(config => {
          if (config.method === 'delete') {
            var CancelToken = axios.CancelToken;
            var source = CancelToken.source();
            config.cancelToken = source.token;
            if (!window.confirm('确认删除?')) {
              source.cancel('Cancel delete.');
            }
          }
          return config;
        }, function (error) {
          return Promise.reject(error);
        });
        // 全局Http响应处理
        axios.interceptors.response.use(response => {
          if (response.data.code !== 200) {
            this.$root.$emit('action-feedback', { msg: response.data.msg, mood: 'danger' });
          } else {
            switch (response.config.method) {
              case 'post':
                this.$root.$emit('action-feedback', { msg: '新建成功' });
                break;
              case 'put':
                this.$root.$emit('action-feedback', { msg: '更新成功' });
                break;
              case 'patch':
                this.$root.$emit('action-feedback', { msg: '挂接成功' });
                break;
              case 'delete':
                this.$root.$emit('action-feedback', { msg: '删除成功' });
                break;
            }
          }
          return response;
        }, error => {
          if (error.message !== 'Cancel delete.') {
            this.$root.$emit('action-feedback', { msg: '数据异常, 请联系开发人员~', mood: 'danger' });
            return Promise.reject(error);
          }
        });
      });
    },
    methods: {
      handleBottomClick: function () {
        this.$root.$emit('close-selector');
      }
    }
  };
</script>
