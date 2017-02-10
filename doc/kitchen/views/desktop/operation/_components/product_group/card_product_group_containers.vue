<template>
  <card class="card-product-group-containers">

    <card-header slot="card-header" :title="'被使用的场景'"></card-header>

    <table-grid-2 :data_source="group.container">
      <table-grid-row v-for="(container, index) in group.container">
        <table-grid-col :col_title="'ID.'" :span="'40px'">{{ container.id }}</table-grid-col>
        <table-grid-col :col_title="'场景容器'">
          {{ TYPE[container.type] + ' / ' + container.name + ' / ' + container.tab }}
        </table-grid-col>
        <table-grid-col :col_title="'操作'" :span="'100px'" :align="'right'">
          <btn :text="'解除挂接'" :mood="'danger'" @click.native="removeScenesRef(container.id, index)"></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>

  </card>
</template>

<script>
  /* global axios:true */
  const TYPE = {
    1: '首页',
    2: '目的地页',
    3: '目的地页'
  };
  export default {
    props: ['group'],
    data () {
      return {
        TYPE: TYPE
      };
    },
    methods: {
      removeScenesRef: function (ref_id, index) {
        axios.delete('/chef/api/operation/operation/operationGroup', {
          params: {
            id: ref_id
          }
        }).then(res => {
          if (res && res.data.code === 200) {
            this.$emit('container-removed', index);
          }
        });
      }
    }
  };
</script>
