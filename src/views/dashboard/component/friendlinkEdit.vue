<!--
 * @Author: tushan
 * @Date: 2022-01-07 20:57:45
 * @LastEditTime: 2022-01-07 21:31:33
 * @Description: 文件介绍
 * @FilePath: /mcecy-admin/src/views/dashboard/component/friendlinkEdit.vue
-->
<template>
  <div ml mr>
    <el-form :model="form" label-position="top" label-width="80px" mt>
      <el-upload
        :action="upapi+'/file/upload_admin'"
        :before-upload="beforeAvatarUpload"
        :headers="head"
        :on-success="handleAvatarSuccess"
        :show-file-list="false"
        class="avatar-uploader"
      >
        <img v-if="form.logo" :src="form.logo" class="avatar"/>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form-item label="网站名称">
        <el-input v-model="form.name" placeholder="网站名称"></el-input>
      </el-form-item>
      <el-form-item label="超链接">
        <el-input v-model="form.href" placeholder="网站地址"></el-input>
      </el-form-item>
      <el-form-item label="网站介绍">
        <el-input v-model="form.tips" placeholder="网站介绍"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" w100>
          <el-option label="展示" value="1"></el-option>
          <el-option label="隐藏" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" w100 @click="save">保存</el-button>
    </el-form>
    <el-link mt type="danger" @click="del">删除</el-link>
  </div>
</template>

<script>
import { friend_save } from '../../../api/settings'
import { getToken } from '@/utils/auth'

export default {
  props: {
    info: {
      value: Object
    }
  },
  data() {
    return {
      upapi: process.env.VUE_APP_BASE_API,
      head: {
        'I-Tushan': getToken()
      },
      form: {
        id: '',
        name: '',
        logo: '',
        tips: '',
        href: '',
        status: ''
      }
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.form.logo = res.url + this.imageSize(240)
    },
    renderList() {
      if (Object.keys(this.info).length > 0) {
        this.form = this.info
      }
    },
    close() {
      this.$emit('close', true)
    },
    async del() {
      const { code, msg } = await friend_save({ is_delete: true, id: this.info.id })
      if (code == 200) {
        this.$message.success(msg)
        this.close()
      }
    },
    async save() {
      const { code, msg } = await friend_save(this.form)
      if (code == 200) {
        this.$message.success(msg)
        this.close()
      }
    }
  },
  mounted() {
    this.renderList()
  },
  watch: {
    info() {
      this.renderList()
    }
  }
}
</script>

<style>
</style>
