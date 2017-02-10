import Vue from 'vue';
import Router from 'vue-router';
import operation_routes from './operation';
import sale_rule from './sale_rule';
import library from './library';
import resource from './resource';
import order from './order';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/k/',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: require('../home') },
    {
      path: '/desktop', name: 'desktop', component: require('views/desktop/desktop'),
      children: [
        operation_routes, sale_rule, library, order, resource
      ]
    },
    { path: '/sign_in', component: require('../sign_in/sign_in') },
    { path: '*', redirect: '/' }
  ]
});
