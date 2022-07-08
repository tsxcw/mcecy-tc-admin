<!--
 * @Author: your name
 * @Date: 2021-10-31 21:21:35
 * @LastEditTime: 2022-01-07 14:42:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mcecy-admin/src/views/activityManage/indexHot.vue
-->
<template>
  <div class="app-page">
    <div flex>
      <el-button type="primary" mr @click="edit({})">添加轮播图</el-button>
      <el-input
        style="width: 200px"
        v-model="search.name"
        placeholder="名称搜索/指向搜索/id搜索"
        mr
      ></el-input>
      <el-select style="width: 100px" ml v-model="search.status" placeholder="">
        <el-option label="全部" value=""></el-option>
        <el-option label="展示" value="1"></el-option>
        <el-option label="隐藏" value="2"></el-option>
      </el-select>
      <el-button ml type="danger" @click="fetchData">搜索</el-button>
      <el-button
        type="primary"
        circle
        mr-auto
        icon="el-icon-refresh"
        @click="fetchData"
      ></el-button>
    </div>
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      row-key="id"
      highlight-current-row
      @selection-change="handleSelectionChange"
      mt
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column label="id" width="100" align="center" sortable prop="id">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="名称" width="250" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="封面" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.cover + imageSize(240)" class="HotCover" />
        </template>
      </el-table-column>
      <el-table-column label="指向" align="center">
        <template slot-scope="scope">{{ scope.row.href }}</template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1">展示</el-tag>
          <el-tag type="danger" v-if="scope.row.status == 2">隐藏</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" sortable prop="sort">
        <template slot-scope="scope">{{ scope.row.sort }}</template>
      </el-table-column>
      <el-table-column label="添加时间" align="center" prop="'addtime" sortable>
        <template slot-scope="scope">{{ scope.row.addtime }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="danger" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      title="添加轮播图"
      :visible.sync="drawer"
      size="400px"
      direction="rtl"
      :wrapperClosable="false"
      :before-close="handleClose"
    >
      <HotEdit :selinfo="selectInfo" @update="updateFetch" />
    </el-drawer>
    <page :info="page" @topage="fetchData"> </page>
  </div>
</template>

<script>
import { banner_list } from "@/utils/banner";
import HotEdit from "./component/hotEdit.vue";

export default {
  data() {
    return {
      drawer: false,
      list: [],
      selectInfo: {},
      page: {},
      search: {
        status: "",
        name: "",
      },
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.selectInfo = {};
          done();
        })
        .catch((_) => {});
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    updateFetch() {
      this.drawer = false;
      this.selectInfo = {};
      this.fetchData();
    },
    edit(e) {
      this.selectInfo = e;
      this.drawer = true;
    },
    async fetchData() {
      const { list, msg, code } = await banner_list({
        page: this.page.current_page,
        limit: this.page.per_page,
        ...this.search,
      });
      this.page = list;
      this.list = list.data;
    },
  },
  async mounted() {
    this.fetchData();
  },
  components: { HotEdit },
};
</script>

<style>
.HotCover {
  width: 100px;
  height: 80px;
  object-fit: contain;
}
</style>
