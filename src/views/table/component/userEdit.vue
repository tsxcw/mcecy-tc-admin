<!--
 * @Author: your name
 * @Date: 2021-10-04 15:56:42
 * @LastEditTime: 2022-03-05 23:09:26
 * @LastEditors: tushan
 * @Description: In User Settings Edit
 * @FilePath: /mcecy-admin/src/views/table/userEdit.vue
-->
<template>
  <div>
    <el-drawer
      :visible="shows"
      size="400px"
      custom-class="form-box"
      :before-close="cencel"
      :with-header="false"
      :show-close="false"
      :close-on-press-escape="false"
      :wrapperClosable="false"
    >
      <div style="padding: 15px">
        <el-form :model="form">
          <el-form-item label="用户昵称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="储存空间">
            <el-input v-model.number="form.info.total_store" type="number">
              <template slot="append">GB</template>
            </el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-collapse v-model="activeNames">
            <el-collapse-item title="账号状态操作" name="1">
              <el-button @click="freezeUser(1)" :type="type_format(1)"
                >正常</el-button
              >
              <el-button @click="freezeUser(2)" :type="type_format(2)"
                >封禁</el-button
              >
            </el-collapse-item>
          </el-collapse>
        </div>
        <div flex mt>
          <el-button @click="cencel">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { set_info } from "@/api/userList";
import { enjson, dejson, cpjson, sizeConvert } from "@/utils";
export default {
  props: ["show", "info"],
  data() {
    return {
      activeNames: [],
      showThis: this.show,
      form: {
        name: "",
        status: "",
        mobile: "",
        info: {
          total_store: 0,
        },
      },
    };
  },
  methods: {
    freezeUser(state) {
      this.form.status = state;
    },
    async update(state) {
      let info = await set_info({
        userinfo: {
          name: this.form.name,
          mobile: this.form.mobile,
          status: this.form.status,
        },
        info: {
          total_store: this.form.info.total_store * 1000 * 1000,
        },
        uid: this.info.uid,
      });
      if (info.code == 200) {
        this.$message.success(info.msg);
        this.close(this.info.uid);
      }
    },
    close(e = false) {
      this.$emit("close", e);
    },
    confirm() {
      //..修改操作
      this.update();
    },
    cencel() {
      this.close();
    },
    type_format(num) {
      return this.form.status == num ? "primary" : "";
    },
  },
  computed: {
    shows() {
      return this.show;
    },
  },
  watch: {
    info(e) {
      if (e && Object.keys(e).length > 0) {
        const { info, name, mobile, status } = cpjson(e);
        this.form.name = name;
        this.form.mobile = mobile;
        this.form.status = status;
        this.form.info = {
          total_flow: info.total_flow / 1000 / 1000,
          total_store: info.total_store / 1000 / 1000,
        };
      }
    },
  },
};
</script>

<style></style>
