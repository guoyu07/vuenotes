import Vue from 'vue';
import axios from 'axios';
import draggable from 'vuedraggable';
import App from './kitchen.vue';

// 全局组件注册
Vue.component('draggable', draggable);

Vue.component('icon', require('views/_components/ui/icon/icon'));
Vue.component('action-feedback', require('views/_components/ui/action_feedback/action_feedback'));
Vue.component('board', require('views/_components/ui/board/board'));
Vue.component('btn', require('views/_components/ui/btn/btn'));
Vue.component('card', require('views/_components/ui/card/card'));
Vue.component('card-neck', require('views/_components/ui/card/card_neck'));
Vue.component('card-header', require('views/_components/ui/card/card_header'));
Vue.component('card-footer', require('views/_components/ui/card/card_footer'));
Vue.component('cheat-sheet', require('views/_components/ui/cheat_sheet/cheat_sheet'));
Vue.component('checkbox-group', require('views/_components/ui/checkbox/checkbox_group'));
Vue.component('city-selector', require('views/_components/ui/selector/city_selector'));
Vue.component('color-card', require('views/_components/ui/color/color_card'));
Vue.component('dialogue', require('views/_components/ui/dialogue/dialogue'));
Vue.component('dropdown', require('views/_components/ui/dropdown/dropdown'));
Vue.component('dropdown-menu', require('views/_components/ui/dropdown/dropdown_menu'));
Vue.component('dropdown-item', require('views/_components/ui/dropdown/dropdown_item'));
Vue.component('g-row', require('views/_components/ui/grid/g_row'));
Vue.component('g-col', require('views/_components/ui/grid/g_col'));
Vue.component('grid-checkbox', require('views/_components/ui/grid/grid_checkbox'));
Vue.component('grid-image', require('views/_components/ui/grid/grid_image'));
Vue.component('grid-input', require('views/_components/ui/grid/grid_input'));
Vue.component('loading-cover', require('views/_components/ui/loading/loading_cover'));
Vue.component('hunter', require('views/_components/ui/hunter/hunter'));
Vue.component('nav-list', require('views/_components/ui/nav/nav_list'));
Vue.component('modal', require('views/_components/ui/modal/modal'));
Vue.component('multiple-hunter', require('views/_components/ui/hunter/multiple_hunter'));
Vue.component('single-hunter', require('views/_components/ui/hunter/single_hunter'));
Vue.component('pagination', require('views/_components/ui/pagination/pagination'));
Vue.component('paper', require('views/_components/ui/paper/paper'));
Vue.component('paper-header', require('views/_components/ui/paper/paper_header'));
Vue.component('selector', require('views/_components/ui/selector/selector'));
Vue.component('su-selector', require('views/_components/ui/selector/su_selector'));
Vue.component('tab', require('views/_components/ui/tab/tab'));
Vue.component('table-grid', require('views/_components/ui/table_grid/table_grid'));
Vue.component('table-grid-2', require('views/_components/ui/table_grid/table_grid_2'));
Vue.component('table-grid-row', require('views/_components/ui/table_grid/table_grid_row'));
Vue.component('table-grid-col', require('views/_components/ui/table_grid/table_grid_col'));
Vue.component('text-input', require('views/_components/ui/text_input/text_input'));
Vue.component('textarea-input', require('views/_components/ui/text_input/textarea_input'));
Vue.component('toast', require('views/_components/ui/toast/toast'));

const bus = new Vue(App);

window.axios = axios;

bus.$mount('#app');
