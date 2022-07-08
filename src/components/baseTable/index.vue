<!--
 * @Author: tushan
 * @Date: 2022-03-04 18:41:20
 * @LastEditors: tushan
 * @LastEditTime: 2022-03-05 19:43:03
 * @Description: 
-->
<template>
  <div>
    <el-table
      :data="tableList"
      :height="height"
      ref="multipleTableRef"
      row-class-name="table-row"
      border
      @selection-change="handleSelectionChange"
    >
      <transition v-for="(item, index) in tableConfig" :key="index">
        <el-table-column
          v-if="item.type == 'selection'"
          fixed
          align="center"
          type="selection"
          width="55"
        />
        <el-table-column
          v-else
          :label="item.name"
          :width="item.width || ''"
          :max-width="item.maxWidth"
          :propKey="item.prop"
          :fixed="item.fixed"
          align="center"
        >
          <template slot-scope="scope">
            <!-- 如果附带了slot参数，则采用slot插槽内容，否则使用默认模板 -->
            <slot v-if="item.slot" :name="item.slot" :row="scope.row"></slot>
            <!-- 控制操作类型 -->
            <div
              v-else-if="item.type == 'control'"
              :class="['control', item.class]"
            >
              <div v-if="item.button && item.button.length">
                <!-- 按钮类型 -->
                <div v-for="(ite, i) in item.button" :key="i">
                  <el-button
                    :type="ite.typeof"
                    :size="ite.size"
                    @click="callClick(ite, scope.row, scope.$index)"
                  >
                    {{ ite.text }}
                  </el-button>
                </div>
              </div>
              <div v-if="item.link && item.link.length">
                <!-- 链接类型-->
                <div v-for="(ite, i) in item.link" :key="i">
                  <router-link :to="callTo(ite, scope.row, scope.$index)">
                    <el-link
                      :type="ite.typeof"
                      @click="callClick(ite, scope.row, scope.$index)"
                    >
                      {{ ite.text }}
                    </el-link>
                  </router-link>
                </div>
              </div>
            </div>
            <!-- 图片类型 -->
            <div v-else-if="item.type == 'image'" :class="[item.class]">
              <el-image
                preview-teleported
                class="table-img"
                :preview-src-list="[getKeyValue(scope.row, item.prop)]"
                :src="getKeyValue(scope.row, item.prop)"
              />
            </div>
            <!-- 默认内容渲染 并且如果有class则绑定class -->
            <div
              v-else
              :class="item.class"
              @click="callClick(item, scope.row, scope.$index)"
            >
              <transition v-if="item.format">
                <!-- 如果有自定义文本渲染为富文本 -->
                <span
                  @click="callClick(item, scope.row, scope.$index)"
                  v-html="callFormat(item, scope.row, scope.$index)"
                ></span>
              </transition>
              <transition v-else>
                <!-- 默认文本 -->
                <span>{{ getKeyValue(scope.row, item.prop) }}</span>
              </transition>
            </div>
          </template>
        </el-table-column>
      </transition>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      multipleTableRef: "",
      multipleSelection: [],
    };
  },
  props: ["tableList", "tableConfig", "height", "page"],
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.tableConfig.forEach((element) => {
        //查找是否有selection类型的配置，回调已选择的列表
        if (element.type == "selection") {
          element.select && element.select(val);
        }
      });
    },
    callTo(enevt, row, index) {
      return enevt.path && enevt.path(row, index);
    },
    callClick(enevt, row, index) {
      enevt.click && enevt.click(row, index);
      return true;
    },
    callFormat(enevt, row, index) {
      return enevt.format && enevt.format(row, index);
    },
    getKeyValue(item, key) {
      try {
        const data = eval(`item.${key}`);
        return data || null;
      } catch (error) {
        console.error("未找到");
        return null;
      }
    },
    refresh(page) {
      this.$emit("refresh", page);
    },
  },
};
</script>
<style lang="scss">
.control {
  > div {
    display: flex;
    justify-content: center;
    > div {
      margin: 0px 7px;
    }
  }
}
</style>
