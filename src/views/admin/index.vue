<template>
  <div class="app-container">
    <div class="header-control">
      <div class="search-input">
        <el-input v-model="search" class="input-with-select" placeholder="请输入内容">
          <el-select slot="prepend" v-model="search_type" placeholder="昵称">
            <el-option label="昵称" value="name"></el-option>
            <el-option label="工号" value="account"></el-option>
            <el-option label="手机号" value="mobile"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search">查询</el-button>
        </el-input>
      </div>
      <el-button ml type="danger">重置条件</el-button>
      <el-button ml type="primary" @click="addUser">添加管理员</el-button>
      <div class="right-reload">
        <el-button circle icon="el-icon-refresh" type="primary" @click="fetchData"></el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      element-loading-text="Loading"
      fit
      highlight-current-row
      style="margin-top: 15px;"
    >
      <el-table-column align="center" label="工号" width="150">
        <template slot-scope="scope">{{ scope.row.account }}</template>
      </el-table-column>
      <el-table-column align="center" label="昵称" width="150">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="手机号" width="150">
        <template slot-scope="scope">
          <span>{{ hiddenPhone(scope.row.mobile) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别" width="70">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex == 1" class="tags" color="#f6f5ec">男</el-tag>
          <el-tag v-if="scope.row.sex == 2" class="tags" color="#afdfe4">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属权限" width="150">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.role===1" type="success">超级管理员</el-tag>
          <el-tag v-else type="success">管理员</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账号状态" width="150">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '1'" type="success">正常</el-tag>
          <el-tag v-if="scope.row.status == '2'" type="warning">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册时间">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="最近登录">
        <template slot-scope="scope">
          <span>{{ scope.row.lasttime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
          >操作
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit :editType="editType" :info="editInfo" :show.sync="editBox" @close="closeEdit"/>
  </div>
</template>

<script>
import { admin_list } from '@/api/admin'
import edit from './component/userEdit'
import { timeFormat } from '@/utils/time'
import { hiddenPhone } from '@/utils/index'

export default {
  filters: {
    time(e) {
      return timeFormat(e * 1000, 'YYYY-MM-DD HH:hh:ss')
    }
  },
  components: {
    edit
  },
  data() {
    return {
      search_type: '',
      search: '',
      list: null,
      listLoading: true,
      editBox: false,
      editInfo: {},
      editType: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    hiddenPhone,
    closeEdit() {
      this.editInfo = {}
      this.editInfo = null
      this.editBox = false
      this.fetchData()
    },
    async fetchData() {
      //获取列表数据
      this.listLoading = true
      let info = await admin_list()
      this.list = info.list
      this.listLoading = false
    },
    handleEdit(index, row) {
      //编辑
      this.editType = 'reset'
      this.editInfo = row
      this.editBox = true
    },
    addUser() {
      this.editType = 'add'
      this.editBox = true
    }
  }
}
</script>
<style lang="scss" scoped>
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
