<template>
  <div class="app-container">
    <div class="header-control">
      <div class="search-input">
        <el-input v-model="search" class="input-with-select" placeholder="请输入内容">
          <el-select slot="prepend" v-model="search_type" placeholder="请输入ID">
            <el-option label="发布者" value="uid"></el-option>
            <el-option label="作品ID" value="id"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="fetchData">查询</el-button>
        </el-input>
      </div>
      <el-button ml type="danger" @click="reset">重置条件</el-button>
      <div v-if="multipleSelection.length" ml>
        <el-button type="warning">批量下架</el-button>
        <el-button type="success">批量上架</el-button>
      </div>
      <div class="right-reload">
        <el-button circle icon="el-icon-refresh" type="primary" @click="renderset"></el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      element-loading-text="Loading"
      fit
      highlight-current-row
      mt
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column align="center" label="ID" width="100">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column align="center" label="发布者" max-width="350" min-width="200">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.user" type="warning">{{ scope.row.user.name }}</el-tag>
          <el-tag v-else>账号错误</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预览" width="110">
        <template slot-scope="scope">
          <el-image
            :preview-src-list="renderArr(scope.row.murl)"
            :src="scope.row.murl"
            class="image-image"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="宽度（px）" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.width }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="高度（px）" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.height }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="大小（mb）" width="180">
        <template slot-scope="scope">
          <span>{{ (scope.row.size / 1024).toFixed(3) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="文件地址" width="180">
        <template slot-scope="scope">
          <span>{{ (scope.row.path) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="url" width="180">
        <template slot-scope="scope">
          <span>{{ (scope.row.url) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="pron值" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.pron }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布时间" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="copy(scope.row.url)">复制地址</el-button>
          <el-button size="small" type="danger" @click="deleteInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page :info="page" @limit="renderset" @topage="renderset"/>
  </div>
</template>

<script>
import { article_delete, article_list } from '@/api/article'
import { timeFormat } from '@/utils/time'
import { copy } from '@/utils'
export default {
  filters: {
    time(e) {
      return timeFormat(e * 1000, 'YYYY-MM-DD HH:hh:ss')
    }
  },
  data() {
    return {
      search_type: 'id',
      search: '',
      list: null,
      listLoading: true,
      page: {},
      multipleSelection: [],
      editInfo: {},
      editBox: false,
      sh: false
    }
  },
  created() {
    const { uid = '' } = this.$route.query
    if (uid) {
      this.search_type = 'uid'
      this.search = uid
    }
    this.fetchData()
  },
  methods: {
    setinfo(item) {
      this.editInfo = item
      this.editBox = true
    },
    copy:copy,
    /**删除 */
    async deleteInfo(rows) {
      try {
        await this.$confirm('确认删除？', '提示')
      } catch (error) {
        return
      }
      article_delete({ id: rows.id }).then(e => {
        if (e.code == 200) {
          this.$message.success(e.msg)
          const index = this.list.findIndex(el => el.id == rows.id)
          this.list.splice(index, 1)
        }
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    reset() {
      //重置搜索条件
      this.search = ''
      this.$router.replace({
        path: '/article/index',
        query: {}
      })
      this.$nextTick((_) => this.fetchData())
    },
    closesh() {
      this.editInfo = {}
      this.sh = false
    },
    shenghe(item) {
      //审核
      this.editInfo = item
      this.sh = true

    },
    closeEdit() {
      this.editInfo = {}
      this.editBox = false
      this.fetchData()
    },
    async fetchData() {
      //获取列表数据
      this.listLoading = true
      let info = await article_list({
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

    renderArr(E) {
      //图片字符串放在数组里返回
      return [E + this.imageSize(900)]
    },
    renderset() {
      //重新渲染

      this.fetchData()
    }
  },
  watch: {
    multipleSelection(e) {
      console.log(e)
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

.image-image {
  min-width: 60px;
  max-width: 90px;
  height: 60px;
  object-fit: cover;
}
</style>
