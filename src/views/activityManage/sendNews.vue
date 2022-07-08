<!--
 * @Author: tushan
 * @Date: 2022-03-03 19:36:17
 * @LastEditors: tushan
 * @LastEditTime: 2022-03-05 19:57:57
 * @Description: 
-->
<template>
  <div class="app-container">
    <div class="header-control">
      <div class="search-input">
        <el-input
          placeholder="请输入内容"
          v-model="search"
          class="input-with-select"
        >
          <el-select v-model="search_type" slot="prepend" placeholder="标题">
            <el-option label="标题" value="title"></el-option>
            <el-option label="ID" value="id"></el-option>
          </el-select>
          <el-button slot="append" @click="fetchData" icon="el-icon-search"
            >查询</el-button
          >
        </el-input>
      </div>
      <el-button type="danger" ml @click="reset">重置条件</el-button>
      <div class="right-reload">
        <el-button type="danger" icon="el-icon-edit" @click="createEdit">
          发布公告
        </el-button>
        <el-button
          @click="fetchData"
          type="primary"
          circle
          icon="el-icon-refresh"
        ></el-button>
      </div>
    </div>
    <BaseTable mt :tableConfig="Config" :tableList="list" v-loading="listLoading">
      <template #status="scope">
        <el-tag v-if="scope.row.status == '1'" type="info">未发布</el-tag>
        <el-tag v-else type="danger">已发布</el-tag>
      </template>
    </BaseTable>
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :visible.sync="editBox"
      title="编辑"
      width="800px"
    >
      <div v-if="editBox">
        <edit @close="closeEdit" :info="editInfo"> </edit>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { news_list } from "@/api/news";
import BaseTable from "@/components/baseTable/index.vue";
export default {
  components: {
    edit: () => import("./component/NewsEdit.vue"),
    BaseTable,
  },
  data() {
    return {
      search_type: "title",
      search: "",
      list: [],
      listLoading: true,
      editBox: false,
      editInfo: {},
      Config: [
        {
          name: "selection",
          type: "selection",
          select(list) {
            console.log(list);
          },
        },
        { name: "id", prop: "id", width: "100px" },
        { name: "标题", prop: "title" },
        {
          name: "发布者",
          prop: "admin.name",
          width: "200px",
        },
        { name: "状态", slot: "status", width: "100px" },
        {
          name: "操作",
          type: "control",
          fixed: "right",
          width: "100px",
          button: [
            {
              text: "编辑",
              typeof: "danger",
              size: "mini",
              click: (row, index) => {
                this.editInfo = row;
                this.editBox = true;
              },
            },
          ],
        },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    reset() {
      this.search = "";
    },
    aa(s) {
      console.log(s);
    },
    async fetchData() {
      //获取列表数据
      this.listLoading = true;
      let info = await news_list({
        search_type: this.search_type,
        search: this.search,
      });
      this.list = info.list.data;
      this.listLoading = false;
    },
    closeEdit(statue) {
      this.fetchData();
      this.editBox = false;
      this.editInfo = null;
    },
    createEdit() {
      //编辑
      this.editBox = true;
    },
  },
};
</script>
<style lang="scss" scope>
.tags {
  margin: 5px 5px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.input-with-select {
  min-width: 400px;
}
.header-control {
  display: flex;
  > .right-reload {
    margin-left: auto;
  }
}
</style>
