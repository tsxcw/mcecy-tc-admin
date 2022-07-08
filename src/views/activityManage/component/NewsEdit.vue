<!--
 * @Author: your name
 * @Date: 2021-10-04 15:56:42
 * @LastEditTime: 2022-03-05 19:18:56
 * @LastEditors: tushan
 * @Description: In User Settings Edit
 * @FilePath: /mcecy-admin/src/views/activityManage/component/NewsEdit.vue
-->
<template>
  <div class="NewsEdit">
    <el-form>
      <el-form-item label="公告标题">
        <el-input v-model="form.title" placeholder="请设置标题"></el-input>
      </el-form-item>
      <el-form-item label="公告内容">
        <div id="editBox" style="margin-top: 40px; height: 350px"></div>
      </el-form-item>
    </el-form>
    <div flex slot="footer">
      <el-button type="info" @click="deleteNews" v-if="form.id">删除</el-button>
      <el-button v-if="form.status == '1'" @click="release(2)" type="primary">
        发布公告
      </el-button>
      <el-button v-if="form.status == '2'" @click="release(1)" type="danger">
        撤回公告
      </el-button>
      <div mr-auto>
        <el-button @click="closeThis(false)" type="warning">关闭</el-button>
        <el-button @click="save" type="success">保存内容</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { init, html, appentHtml } from "@/utils/wangeditConfig";
import { news_add, news_del } from "@/api/news";
export default {
  props: ["info"],
  data() {
    return {
      edit: null,
      form: {
        title: "",
        context: "",
      },
    };
  },
  mounted() {
    this.createEdit();
  },
  methods: {
    createEdit() {
      if (this.info && Object.keys(this.info).length > 0) {
        this.form = this.info;
      }
      if (this.edit) {
        this.edit.destroy();
        this.edit = null;
      }
      this.$nextTick((_) => {
        this.edit = init("#editBox");
        this.edit.appentHtml(this.form.context);
      });
    },
    closeThis(state) {
      this.$emit("close", state);
    },
    release(state) {
      this.form.status = state;
      this.save();
    },
    async deleteNews() {
      try {
        await this.$confirm("是否删除此公告", "温馨提示");
        const info = await news_del(this.form);
        if (info.code == 200) {
          this.$message.success(info.msg);
          this.closeThis(true);
        }
      } catch (error) {}
    },
    async save() {
      const context = html(this.edit);
      this.form.context = context;
      try {
        const info = await news_add(this.form);
        if (info.code == 200) {
          this.$message.success(info.msg);
          this.form.id = info.id;
        }
      } catch (error) {}
    },
  },
  watch: {
    info(e) {
      this.createEdit();
    },
  },
};
</script>

<style lang="scss">
.w-e-text {
  > p > img,
  > img,
  > *img {
    width: 100% !important;
  }
}
</style>
