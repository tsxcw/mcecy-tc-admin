<!--
 * @Author: your name
 * @Date: 2021-10-04 15:56:42
 * @LastEditTime: 2021-11-07 11:16:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mcecy-admin/src/views/table/userEdit.vue
-->
<template>
  <div>
    <el-drawer
      :before-close="cencel"
      :close-on-press-escape="false"
      :show-close="false"
      :visible="shows"
      :with-header="false"
      :wrapperClosable="false"
      custom-class="form-box"
      size="400px"
    >
      <div class="userEdit-page">
        <el-form :model="form">
          <el-form-item label="昵称">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="form.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sex" filterable placeholder="请选择" style="width:100%">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限组">
            <div style="width: 100%;display: flex;">
              <el-select v-model="form.role" filterable placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in options"
                  :key="item.rid"
                  :label="item.role_name"
                  :value="item.rid"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-form>
        <div>
          <el-collapse v-model="activeNames">
            <el-collapse-item name="1" title="账号状态操作">
              <el-button :type="type_format(1)" @click="freezeUser(1)">恢复</el-button>
              <el-button :type="type_format(2)" @click="freezeUser(2)">冻结</el-button>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="userEdit-footer">
          <el-button @click="cencel">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
        <div v-show="editType == 'reset'" class="delete-admin" mt>
          <span @click="deleteThis">删除管理员</span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { admin_delete, admin_role, set_admin_role } from '@/api/admin'
import { cpjson } from '@/utils'

export default {
  props: ['show', 'info', 'editType'],
  data() {
    return {
      activeNames: [],
      showThis: this.show,
      options: [{
        role_name: '超级管理员',
        rid: 1
      }, {
        role_name: '管理员',
        rid: 2
      }],
      form: {
        aid: '',
        name: '',
        account: '',
        status: '',
        mobile: '',
        role: '',
        sex: ''
      }
    }
  },
  methods: {
    /**
     * 修改管理员账号状态设置
     */
    freezeUser(state) {
      this.form.status = state
    },
    /**
     * 更新管理员信息
     */
    async update() {
      let info = await set_admin_role({
        info: {
          name: this.form.name,
          mobile: this.form.mobile,
          account: this.form.account,
          sex: this.form.sex,
          role: this.form.role,
          status: this.form.status
        },
        aid: this.form.aid,
        type: this.editType
      })
      if (info.code === 200) {
        this.$message.success(info.msg)
        this.close()
      }
    },
    close() {
      this.$emit('close', false)
    },
    confirm() {
      //..修改操作
      this.update()
    },
    cencel() {
      this.close()
    },
    /**删除管理员账号 */
    deleteThis() {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        let info = await admin_delete({ aid: this.form.aid })
        if (info.code == 200) {
          this.$message.success(info.msg)
          this.close()
        }
      }).catch(() => {
      })
    },
    type_format(num) {
      return this.form.status == num ? 'primary' : ''
    }
  },
  mounted() {
  },
  computed: {
    shows() {
      return this.show
    }
  },
  watch: {
    info(e) {
      if (e) {
        this.form = cpjson(e)
      } else {
        Object.keys(this.form).map(e => {
          this.form[e] = ''
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.block-userEdit {
  display: flex;
  justify-content: center;
}

.userEdit-page {
  position: absolute;
  padding: 20px 20px 100px 20px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  .userEdit-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    > button {
      width: 45%;
      height: 45px;
      font-size: 16px;
    }
  }
}

.delete-admin {
  display: flex;

  > span {
    font-size: 13px;
    margin-left: auto;
    color: rgb(0, 162, 255);
    cursor: pointer;
  }
}
</style>
