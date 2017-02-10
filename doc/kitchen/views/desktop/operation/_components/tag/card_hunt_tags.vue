<template>
  <card class="card-hunt-tags" :use_padding="false">

    <text-input class="hunter-filter" :icon="'i-search'" :icon_event="'keyup-enter'"
                v-model=""></text-input>

    <div class="option-list">1
    </div>


  </card>
</template>

<style scoped lang="stylus">
  @import '~styles/variables.styl';
</style>

<script>
  /* global axios:true */
  export default {
    mounted () {
      this.queryHunterBook();
    },
    methods: {
      queryHunterBook: function () {
        axios.get('/chef/api/cookBook/cook', {
          params: {
            type: this.type,
            search_word: this.self_search_word,
            city: this.in_cities,
            country: this.in_countries,
            continent: this.in_continents
          }
        }).then(res => {
          this.list = res.data.data;
        });
      },
      selectOption: function (option) {
        var option_id = option[TYPE[this.type].id_field];
        var index = this.cur_ids.indexOf(option_id);
        if (index >= 0) {
          this.cur_ids.splice(index, 1);
          this.self_cur_items.splice(index, 1);
        } else {
          this.cur_ids.unshift(option_id);
          this.self_cur_items.unshift(option);
        }
        this.$forceUpdate();
        this.$emit('do-hunt', this.cur_ids, this.self_cur_items);
      }
    }
  };
</script>
