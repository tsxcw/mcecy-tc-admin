<template>
  <el-drawer
    :visible.sync="canshow"
    :close-on-press-escape="false"
    :wrapperClosable="false"
    :before-close="handleClose"
    title="用户反馈详情"
    size="400px"
  >
    <div class="detail_info">
      <div class="title">意见建议:</div>
      <div mt class="content">{{ remove_xss(detailInfo.context) }}</div>
      <div mt class="title">附件图片:</div>
      <div mt class="img_list">
        <transition v-for="(item, index) in detailInfo.annex_img" :key="index">
          <div>
            <img :src="item + imageSize(240)" />
          </div>
        </transition>
      </div>
      <div mt class="title">其他联系方式:</div>
      <div mt class="content">
        {{ detailInfo.link || "未预留其他联系方式" }}
      </div>
      <div mt id="editBox" v-html="detailInfo.reply_text"></div>
      <div mt>
        <el-button type="primary" w100 @click="save">提交</el-button>
      </div>
      <div mt flex>
        <el-link mr-auto type="warning" @click="deleteReport">删除</el-link>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { cpjson } from "@/utils";
import { banner_update } from "@/utils/banner";
import { remove_xss } from "@/utils/xss";
import NewsEdit from "./NewsEdit.vue";
import { init } from "@/utils/wangeditConfig";
import { report_reply, report_deltet } from "@/api/report";
export default {
  props: {
    info: {
      value: Object,
    },
    show: {
      value: Boolean,
    },
  },
  data() {
    return {
      edit: null,
      canshow: this.show,
      detailInfo: {
        context: "",
        annex_img: [],
        reply_text: "",
        is_reply: false,
        addtime: "",
        reply_time: "",
        id: "",
        uid: "",
      },
    };
  },
  methods: {
    remove_xss,
    render(e) {
      if (this.edit) {
        this.edit.destroy();
        this.edit = null;
      }
      this.$nextTick((_) => (this.edit = init("#editBox")));
      this.fetchData();
    },
    fetchData() {},
    async deleteReport() {
      try {
        await this.$confirm("请确认是否删除此消息", "删除确认");
      } catch (error) {
        return;
      }
      report_deltet({ id: this.detailInfo.id }).then((e) => {
        this.$message.success(e.msg);
        if (e.code == 200) {
          this.close();
        }
      });
    },
    openDetail(scope) {
      this.detailInfo = scope.row;
      this.detail = true;
    },
    handleClose(done) {
      done();
      this.close();
    },
    close() {
      this.edit.destroy();
      this.$emit("close", false);
    },
    save() {
      const text = remove_xss(this.edit.txt.html());
      const info = {
        reply_text: text,
        is_reply: "2",
        id: this.detailInfo.id,
      };
      report_reply(info)
        .then((e) => {
          if (e.code == 200) {
            this.$message.success(e.msg);
            this.close();
          } else {
            this.$message.error(e.msg);
          }
        })
        .catch((e) => {});
    },
  },
  mounted() {
    this.detailInfo = this.info;
  },
  watch: {
    show(e) {
      this.render();
      this.canshow = e;
    },
    info(info) {
      this.detailInfo = info;
    },
  },
  components: { NewsEdit },
};
</script>

<style lang="scss">
.detail_info {
  position: absolute;
  width: calc(100% - 40px);
  left: 20px;
  height: calc(100% - 100px);
  top: 80px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 15px;
  &::-webkit-scrollbar {
    display: none;
  }
  > .title {
    color: var(--bg2);
  }
  > .img_list {
    display: grid;
    grid-template-columns: 172px 172px;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    > div {
      height: 172px;
      > img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        margin-right: 15px;
        background: rgb(240, 240, 240);
        border-radius: 10px;
      }
    }
  }
  > .content {
    font-size: 14px;
    border-radius: 5px;
    padding: 15px;
    line-height: 20px;
    background: rgb(240, 240, 240);
    > img,
    > p > img,
    > *img {
      display: block;
      border-radius: 5px;
      width: 100% !important;
    }
  }
  > .time {
    font-size: 12px;
    color: var(--bg2);
  }
}
> .footer-box {
  background: #fff;
  margin-top: 15px;
}
> .top {
  padding: 15px;
  background: #fff;
}
> .history_list {
  margin-top: 15px;
  padding: 15px;
  background: #fff;
}
</style>
