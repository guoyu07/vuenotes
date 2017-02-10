<template>
  <section class="sign-in">
    <h1 class="brand">HiKitchen</h1>
    <div class="sign-in-wrap">

      <g-row :spacing="1" class="shadow-deep">
        <g-col :span="'1/1'">
          <grid-input :type="'horizontal'" :title="'邮箱'">
            <text-input v-model="username" :type="'email'" :in_grid="true"></text-input>
          </grid-input>
        </g-col>
        <g-col :span="'1/1'">
          <grid-input :type="'horizontal'" :title="'密码'">
            <text-input v-model="password" :type="'password'" :in_grid="true"></text-input>
          </grid-input>
        </g-col>
      </g-row>

      <div class="do-sign-in" @click="doSignIn">
        <icon class="shadow-deep" :name="'i-enter'" :color="'#fff'"></icon>登陆
      </div>

    </div>
  </section>
</template>

<style scoped>
  .brand { position: fixed; color: rgba(255, 255, 255, .2); font-size: 99px; font-weight: 100; top: 50%; left: 50%; width: 380px; margin: -220px 0 0 -190px; text-align: center; }
  .sign-in-wrap { position: fixed; top: 50%; left: 50%; width: 360px; height: 200px; margin: 0 0 0 -180px; }
  .sign-in-wrap .do-sign-in { display: block; width: 100px; height: 46px; margin: 25px auto; padding: 11px 18px; font-size: 14px; border-radius: 25px; border: 1px solid rgba(255, 255, 255, .5); cursor: pointer; transition: all .1s ease; }
  .sign-in-wrap .do-sign-in:hover { border-color: #fff; }
  .sign-in-wrap .do-sign-in .i-enter { width: 24px; height: 24px; margin-right: 9px; }
</style>

<script>
  /* global axios:true */
  export default {
    data () {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      doSignIn: function () {
        axios.post('/admin/site/ajaxLogin', {
          LoginForm: {
            username: this.username,
            password: this.password,
            rememberMe: 0
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$router.push({ name: 'operation_product_group' });
          }
        });
      }
    }
  };
</script>
