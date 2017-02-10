<template>
  <card class="card-product-group-products">

    <card-header slot="card-header" :title="'分组列表'">
      <btn :icon="'i-plus'" :text="'添加房型'" :mood="'emphasis'"
           @click.native="$router.push({ name: 'resource_hotel_room_detail', params: { room_id: 'new', hotel_id: hotel_id } })"></btn>
    </card-header>

    <table-grid-2 :data_source="products"
                  :use_sort="true"
                  @do-sort="sortProducts">
      <table-grid-row v-for="product in products">
        <table-grid-col :col_title="'ID.'" :span="'50px'">{{ product.id }}</table-grid-col>
        <table-grid-col :col_title="'中文名称'">{{ product.room_type_name }}</table-grid-col>
        <table-grid-col :col_title="'英文名称'" :span="'90px'">{{ product.room_type_name_en }}</table-grid-col>
        <table-grid-col :col_title="'描述'" :span="'100px'">{{ product.descriptive }}</table-grid-col>
        <table-grid-col :col_title="'标准'" :span="'40px'">{{ product.capacity }}人</table-grid-col>
        <table-grid-col :col_title="'最多'" :span="'40px'">{{ product.max_capacity }}人</table-grid-col>
        <table-grid-col :col_title="'面积'" :span="'40px'">{{ product.area }}</table-grid-col>
        <table-grid-col :col_title="'床型'" :span="'90px'">{{ product.bed_description }}</table-grid-col>
        <table-grid-col :col_title="'楼层'" :span="'40px'">{{ product.floor }}</table-grid-col>
        <table-grid-col :col_title="'窗户'" :span="'90px'">{{ product.windows }}</table-grid-col>
        <table-grid-col :col_title="'操作'" :span="'100px'" :align="'right'">
          <btn :text="'详情'" @click.native="goProductGroupDetail(product)"></btn>
          <btn :icon="'i-bin'" :mood="'danger'" @click.native="deleteProduct(product)"></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>

  </card>
</template>

<script>
  /* global axios:true */
  export default {
    data () {
      return {
        products: [],
        hotel_id: '',
        is_product_hunter_show: false
      };
    },
    mounted () {
      this.hotel_id = this.$route.params.hotel_id;
      this.queryProducts();
    },
    methods: {
      queryProducts: function () {
        axios.get('/chef/api/resource/hotel/RoomList', {
          params: {
            hotel_id: this.hotel_id
          }
        }).then(res => {
          this.products = res.data.data.list;
        });
      },
      deleteProduct: function (product) {
        axios.delete('/chef/api/resource/hotel/HotelRoomDel', {
          params: {
            room_id: product.id
          }
        }).then(res => {
          this.queryProducts();
        });
      },
      sortProducts: function (product, new_index) {
        axios.put('/chef/api/operation/productGroup/groupProduct', {
          group_id: this.$route.params.group_id,
          product_id: product.product_id,
          new_index: new_index
        });
      },
      goProductGroupDetail: function (room) {
        this.$router.push({
          name: 'resource_hotel_room_detail',
          params: { room_id: room.id, hotel_id: this.hotel_id }
        });
      }
    }
  };
</script>
