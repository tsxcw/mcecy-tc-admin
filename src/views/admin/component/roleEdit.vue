<!--
 * @Author: your name
 * @Date: 2021-10-04 15:56:42
 * @LastEditTime: 2021-11-02 15:15:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mcecy-admin/src/views/table/userEdit.vue
-->
<template>
  <div>
    <el-dialog title="信息修改" :show-close="false" :visible="shows">
      <div class="block">
        <el-avatar :size="50" :src="form.avatar" fit="scale-down"></el-avatar>
      </div>
      <el-form :model="form">
        <el-form-item label="用户昵称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="账号状态操作" name="1">
            <el-button @click="freezeUser(1)" :type="type_format(1)">恢复</el-button>
            <el-button @click="freezeUser(2)" :type="type_format(2)">冻结</el-button>
            <el-button @click="freezeUser(3)" :type="type_format(3)">删除</el-button>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cencel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { set_info } from "@/api/userList";
import { enjson, dejson, cpjson } from "@/utils";
export default {
  props: ["show", "info"],
  data() {
    return {
      activeNames: [],
      showThis: this.show,
      form: {
        name: "",
        status: "",
        mobile: ""
      }
    };
  },
  methods: {
    freezeUser(state) {
      this.form.status = state;
    },
    async update(state) {
      let info = await set_info({
        info: {
          name: this.form.name,
          mobile: this.form.mobile,
          status: this.form.status
        }, uid: this.info.uid
      });
      if (info.code == 200) {
        this.$message.success(info.msg);
        this.close();
      } else {
        this.$message.error(info.msg);
      }
    },
    close() {
      this.$emit("close", false);
    },
    confirm() {
      //..修改操作
      this.update()
    },
    cencel() {
      this.close();
    },
    type_format(num) {
      return this.form.status == num ? 'primary' : '';
    }
  },
  computed: {
    shows() {
      return this.show
    }
  },
  watch: {
    info(e) {
      if (e) {
        this.form = cpjson(e);
        console.log(e);
      }
    }
  }
};
</script>

<style>
</style>
