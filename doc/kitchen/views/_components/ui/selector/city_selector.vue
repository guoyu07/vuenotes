<template>
  <span class="city-selector">
    <selector v-model="cur_search_word" :options="cities" :cur_id="cur_id" :use_filter="true"
              @switch-option="switchOption"></selector>
  </span>
</template>

<script>
  /* global axios:true */
  export default {
    data () {
      return {
        cities: {},
        cur_search_word: '',
        cur_id: ''
      };
    },
    watch: {
      cur_search_word: function () {
        this.queryHunterBook();
      }
    },
    mounted () {
      this.queryHunterBook();
    },
    methods: {
      queryHunterBook: function () {
        axios.get('/chef/api/cookBook/cook', {
          params: {
            type: 'city',
            search_word: this.cur_search_word
          }
        }).then(res => {
          var cities = {};
          if (this.cur_search_word === '') {
            res.data.data.unshift({
              city_code: '',
              cn_name: '全部城市'
            });
          }
          res.data.data.map(city => {
            cities[city.city_code] = city.cn_name;
          });
          this.cities = cities;
        });
      },
      switchOption: function (option_id) {
        this.cur_id = option_id;
        this.$emit('switch-select', option_id);
      }
    }
  };
</script>
