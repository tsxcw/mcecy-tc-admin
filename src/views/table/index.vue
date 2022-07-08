<template>
  <div class="app-container">
    <div class="header-control">
      <div class="search-input">
        <el-input
          v-model="search"
          class="input-with-select"
          placeholder="请输入内容"
          @change="searchResult"
        >
          <el-select slot="prepend" v-model="search_type" placeholder="手机号">
            <el-option label="昵称" value="name"></el-option>
            <el-option label="账号" value="mobile"></el-option>
            <el-option label="UID" value="uid"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchResult">查询</el-button>
        </el-input>
      </div>
      <el-button ml type="danger" @click="searchResult('reset')">重置条件</el-button>
      <div class="right-reload">
        <el-button circle icon="el-icon-refresh" type="primary" @click="searchResult"></el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      element-loading-text="Loading"
      fit
      highlight-current-row
      style="margin-top: 15px"
    >
      <el-table-column align="center" fixed="left" label="UID" width="95">
        <template #default="scope">{{ scope.row.uid }}</template>
      </el-table-column>
      <el-table-column align="center" fixed="left" label="昵称" width="200">
        <template #default="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="账号" width="200">
        <template #default="scope">
          <span>{{ hiddenPhone(scope.row.mobile) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员" width="110">
        <template #default="scope">{{ scope.row.isvip }}</template>
      </el-table-column>
      <el-table-column align="center" label="已用 / 总内存" width="210">
        <template #default="scope">{{ sizeFormat(scope.row.info.use_store) }} /
          {{ sizeFormat(scope.row.info.total_store) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="作品数量" width="110">
        <template #default="scope">{{ scope.row.info.files_num }}</template>
      </el-table-column>
      <el-table-column align="center" label="账号状态" width="110">
        <template #default="scope">
          <el-tag v-if="scope.row.status == '1'" type="success">正常</el-tag>
          <el-tag v-if="scope.row.status == '2'" type="warning">封号</el-tag>
          <el-tag v-if="scope.row.status == '3'" type="danger">注销</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册时间" width="200">
        <template #default="scope">
          <span>{{ scope.row.createtime | time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="最近登录" width="200">
        <template #default="scope">
          <span>{{ scope.row.lasttime | time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="160">
        <template #default="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">操作</el-button>
          <el-button size="mini" type="primary" @click="lookHome(scope.row)">文件</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page :info.sync="page" @limit="render" @topage="render"/>
    <edit :info="editInfo" :show.sync="editBox" @close="closeEdit"/>
  </div>
</template>

<script>
import { list as userList, user_info } from '@/api/userList'
import edit from './component/userEdit'
import { timeFormat } from '@/utils/time'
import { cpjson, hiddenPhone } from '@/utils/index'
import { sizeFormat } from '@/utils/index.js'

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
      search_type: 'name',
      search: '',
      list: [],
      listLoading: true,
      editBox: false,
      editInfo: {},
      page: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    sizeFormat,
    /*关闭编辑*/
    closeEdit(info) {
      this.editBox = false
      this.editInfo = false
      //关闭编辑前要把修改过的当前用户的信息重新查询一遍
      if (info) {
        //如果info有用户的uid传递过来就更新用户的信息
        user_info({ uid: info }).then((el) => {
          if (el.code == 200) {
            const index = this.list.findIndex((e) => e.uid === info)
            this.list[index] = el.info
            this.list = cpjson(this.list)
          }
        })
      }
    },
    searchResult(e) {
      if (e == 'reset') {
        this.search = ''
      }
      this.fetchData()
    },
    hiddenPhone,
    async fetchData() {
      //获取列表数据
      this.listLoading = true
      let info = await userList({
        page: this.page.current_page,
        limit: this.page.per_page,
        search: this.search,
        type: this.search_type
      })
      if (info.code == 200) {
        this.list = info.list.data
        this.page = info.list
      }
      this.listLoading = false
    },
    handleEdit(index, row) {
      //编辑
      console.log(index, row)
      this.editInfo = row
      this.editBox = true
    },
    render(e) {
      this.fetchData()
    },
    lookHome(info) {
      //查看主页
      this.$router.push({
        path: '/article/index',
        query: {
          uid: info.uid
        }
      })
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
