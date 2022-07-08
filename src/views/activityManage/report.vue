<template>
  <div class="app-container">
    <div class="header-control">
      <div class="search-input">
        <el-input
          placeholder="请输入内容"
          v-model.number="search"
          @change="fetchData"
          class="input-with-select"
        >
          <el-select v-model="search_type" slot="prepend" placeholder="搜索">
            <el-option label="工单ID" value="id"></el-option>
            <el-option label="用户UID" value="uid"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="fetchData">查询</el-button>
        </el-input>
      </div>
      <el-button type="danger" ml @click="resetSearch">重置条件</el-button>
      <div class="right-reload">
        <el-button type="primary" circle icon="el-icon-refresh" @click="resetSearch(1)"></el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="margin-top: 15px;"
    >
      <el-table-column label="ID" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="用户昵称" width="150" align="center">
        <template slot-scope="scope">
          <el-link type="primary">{{ scope.row.user.name }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="意见内容" max-width="350" align="center">
        <template slot-scope="scope">
          <div class="centext-box">{{ splitString(scope.row.context) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.link || '未填写' }}</template>
      </el-table-column>
      <el-table-column label="处理状态" width="100px" align="center">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.is_reply == '1'">未处理</el-tag>
          <el-tag type="success" v-else>已处理</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="提交时间" prop="addtime" width="170" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page :info.sync="page" @topage="render" @limit="limit" />
    <edit :show.sync="editBox" @close="closeEdit" :info="editInfo" :editType="editType" />
  </div>
</template>

<script>
import { report_list } from "@/api/report";
import edit from "./component/reportDetail.vue";
import { timeFormat } from "@/utils/time";
import { hiddenPhone } from "@/utils/index"
export default {
  filters: {
    time(e) {
      return timeFormat(e * 1000, "YYYY-MM-DD HH:hh:ss");
    }
  },
  components: {
    edit
  },
  data() {
    return {
      page: {},
      search_type: "id",
      search: "",
      list: null,
      listLoading: true,
      editBox: false,
      editInfo: {},
      editType: null,
      pagenum: 1,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    splitString(s) {
      return s.substring(0, 100)
    },
    hiddenPhone,
    closeEdit() {
      this.editBox = false;
    },
    resetSearch(type) {
      if (type != 1) {//1为刷新
        this.search = "";
      }
      this.fetchData();
    },
    async fetchData() {
      //获取列表数据
      this.listLoading = true;
      let info = await report_list({
        page: this.pagenum,
        limit: this.page.per_page,
        search_type: this.search_type,
        search: this.search
      });
      this.list = info.list.data;
      this.page = info.list;
      this.listLoading = false;
    },
    limit(e) {
      this.fetchData()
    },
    render(e) {
      this.pagenum = e;
      this.fetchData()
    },
    handleEdit(index, row) {
      //编辑
      this.editType = "reset";
      this.editInfo = row;
      this.editBox = true;
    },
  }
};
</script>
<style lang="scss" scoped>
.tags {
  margin: 5px 5px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.centext-box {
  max-height: 200px;
  text-align: left;
  text-overflow: ellipsis;
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