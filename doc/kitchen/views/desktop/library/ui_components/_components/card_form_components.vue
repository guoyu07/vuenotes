<template>
  <card class="card-form-components">

    <card-header slot="card-header" :title="'FORM 表单'">
      <!--<btn :icon="'i-check'" :mood="'emphasis'">保存</btn>-->
    </card-header>

    <g-row :spacing="1">
      <g-col :span="'2/3'">
        <g-row>
          <g-col :span="'1/1'">
            <!-- 多行容器 单行大标题 -->
            <grid-input :title="'单行大标题'" :row_num="2">
              <text-input v-model="txt" :in_grid="true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <!-- 一行容器 一行文字 -->
            <grid-input :title="'一行文字'">
              <text-input v-model="txt" :in_grid="true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <!-- 一行容器 一行数字 带前后缀 -->
            <grid-input :title="'一行数字 带前后缀'">
              <text-input v-model="txt" :type="'number'" :in_grid="true" :prefix="'减'" :suffix="'%'"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <!-- 多行容器 多行文字 -->
            <grid-input :title="'多行文字'" :row_num="2">
              <textarea-input v-model="txt" :in_grid="true"></textarea-input>
            </grid-input>
          </g-col>
        </g-row>
      </g-col>
      <g-col :span="'1/3'">
        <g-row>
          <g-col :span="'1/1'">
            <!-- 一行容器 按钮 -->
            <grid-input :title="'按钮'" :row_num="1">
              <btn :icon="'i-check'" :text="'正常'"></btn>
              <btn :icon="'i-check'" :text="'重要'" :mood="'emphasis'"></btn>
              <btn :text="'Warning'" :mood="'warning'"></btn>
              <btn :icon="'i-check'" :mood="'danger'"></btn>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <!-- 一行容器 tab单选 -->
            <grid-input :title="'单选tab'" :row_num="1">
              <tab :tabs="{ '1': '选项1', '2': '选项2' }" :cur_id="txt" :in_grid="true"></tab>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <!-- 多行行容器 多选 -->
            <grid-input :title="'多选'" :row_num="2">
              <checkbox-group :options="{ '1': '选项1', '2': '选项2', '3': '选项3', '4': '选项4', '5': '选项5', '6': '选项6' }"
                              :cur_ids="arr"
                              :in_grid="true"></checkbox-group>
            </grid-input>
          </g-col>
        </g-row>
      </g-col>
    </g-row>

    <g-row :spacing="1" :break_row="1">
      <g-col :span="'2/3'">
        <g-row>
          <g-col :span="'1/1'">
            <grid-input :title="'看,前面空开了一行'">
              <text-input v-model="txt" :in_grid="true"></text-input>
            </grid-input>
          </g-col>
          <g-col :span="'1/1'">
            <grid-input :title="'混合 (文字输入不能被混合)'">
              <btn :icon="'i-check'" :text="'重要'" :mood="'emphasis'"></btn>
              <tab :tabs="{ '1': '选项1', '2': '选项2' }" :cur_id="txt" :in_grid="true"></tab>
            </grid-input>
          </g-col>
        </g-row>
      </g-col>
    </g-row>

  </card>
</template>

<script>
  export default {
    data () {
      return {
        txt: '',
        arr: [],
        obj: {}
      };
    }
  };
</script>
