import Vue from 'vue';
import Vuex from 'vuex';
import storejs from 'storejs';

Vue.use(Vuex);

var paper_stack = storejs.get('paper_stack') || [];
paper_stack.pop();

const store = new Vuex.Store({
  state: {
    paper_stack: paper_stack,
    is_cheat_sheet_show: false,
    cities_for_add_group: []
  },

  mutations: {
    PUSH_PAPER: (state, paper) => {
      state.is_cheat_sheet_show = false;
      state.paper_stack.push(paper);
      storejs.set('paper_stack', state.paper_stack);
    },
    POP_PAPERS: (state, index) => {
      state.is_cheat_sheet_show = false;
      state.paper_stack.splice(index);
      storejs.set('paper_stack', state.paper_stack);
    },
    REPLACE_PAPERS: (state, paper) => {
      var top_paper = state.paper_stack[state.paper_stack.length - 1];
      top_paper.name = paper.name || top_paper.name;
      top_paper.route = paper.route || top_paper.route;
      top_paper.data = paper.data || top_paper.data;
    },
    CLEAR_PAPERS: state => {
      state.is_cheat_sheet_show = false;
      state.paper_stack = [];
      storejs.set('paper_stack', state.paper_stack);
    },
    //
    SET_CHEAT_SHEET_SHOW: (state, is_show) => {
      state.is_cheat_sheet_show = is_show;
    },
    //
    SET_CITIES_FOR_ADD_GROUP: (state, cities) => {
      state.cities_for_add_group = cities;
    }
  },

  actions: {
    PUSH_PAPER: ({ commit }, paper) => {
      commit('PUSH_PAPER', paper);
    },
    POP_PAPERS: ({ commit }, index) => {
      commit('POP_PAPERS', index);
    },
    REPLACE_PAPERS: ({ commit }, paper) => {
      commit('REPLACE_PAPERS', paper);
    },
    CLEAR_PAPERS: ({ commit }) => {
      commit('CLEAR_PAPERS');
    },
    //
    SET_CHEAT_SHEET_SHOW: ({ commit }, is_show) => {
      commit('SET_CHEAT_SHEET_SHOW', is_show);
    },
    //
    SET_CITIES_FOR_ADD_GROUP: ({ commit }, cities) => {
      commit('SET_CITIES_FOR_ADD_GROUP', cities);
    }
  },

  getters: {}
});

export default store;
