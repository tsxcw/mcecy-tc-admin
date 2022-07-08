<!--
 * @Author: tushan
 * @Date: 2022-02-12 19:34:05
 * @LastEditTime: 2022-03-05 23:25:40
 * @Description: 文件介绍
 * @FilePath: /mcecy-admin/src/views/settings/index.vue
-->
<template>
  <div class="settings-page" ml mr mt>
    <el-form v-model="formData" label-position="top" style="width: 600px">
      <el-form-item label="是否开启上传图片">
        <el-select v-model="formData.uploads" style="width: 100%">
          <el-option :value="1" label="开启"></el-option>
          <el-option label="关闭" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新用户注册方式">
        <el-select v-model="formData.registerType" style="width: 100%">
          <el-option :value="3" label="手机号码/邮箱地址"></el-option>
          <el-option :value="1" label="手机注册"></el-option>
          <el-option :value="2" label="邮箱注册"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新用户默认空间大小">
        <unit v-model="formData.default_storage_size" unit="GB"/>
      </el-form-item>
      <el-form-item label="最大上传文件尺寸">
        <unit v-model="formData.max_upload" unit="MB"/>
      </el-form-item>
      <el-form-item label="网站名称">
        <el-input v-model.number="formData.app_name" clearable/>
      </el-form-item>
      <el-form-item label="网站logo">
        <el-input v-model.number="formData.app_logo" clearable placeholder="请输入网站LOGOhttp地址"/>
      </el-form-item>
      <el-form-item label="备案号">
        <el-input v-model.number="formData.bah" clearable/>
      </el-form-item>
      <el-form-item label="邮件服务器配置">
        <el-card>
          <span>smtp服务器地址</span>
          <el-input v-model.number="formData.smtpServer.host" clearable placeholder="smtp服务器地址"/>
          <span>smtp服务器用户名</span>
          <el-input v-model.number="formData.smtpServer.username" clearable placeholder="smtp服务器用户名"/>
          <span>smtp服务器用户密码</span>
          <el-input v-model.number="formData.smtpServer.password" clearable placeholder="smtp服务器用户密码" show-password/>
        </el-card>
      </el-form-item>
      <el-form-item label="腾讯云配置">
        <el-card>
          <span>腾讯云SecretId</span>
          <el-input v-model.number="formData.tencent.secretId" placeholder="smtp服务器地址"/>
          <span>腾讯云SecretKey</span>
          <el-input v-model.number="formData.tencent.secretKey" placeholder="smtp服务器用户名" show-password type="password"/>
        </el-card>
      </el-form-item>
      <el-form-item label="是否cos储存">
        <el-select v-model="formData.uploads_cos" style="width: 100%">
          <el-option :value="1" label="开启"></el-option>
          <el-option label="关闭" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否开启鉴黄">
        <el-select v-model="formData.cos_check" style="width: 100%">
          <el-option :value="1" label="开启"></el-option>
          <el-option label="关闭" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="腾讯云COS配置">
        <el-card>
          <span>储存桶地域REGION</span>
          <el-input v-model.number="formData.tencent.Region" placeholder="REGION"/>
          <span>储存桶名称BUCKET</span>
          <el-input v-model.number="formData.tencent.Bucket" placeholder="BUCKET"/>
        </el-card>
      </el-form-item>
      <el-form-item label="腾讯云短信配置">
        <el-card>
          <span>腾讯云短信SmsSdkAppId</span>
          <el-input v-model.number="formData.tencent.SmsSdkAppId" placeholder="SmsSdkAppId"/>
          <span>腾讯云短信TemplateId</span>
          <el-input v-model.number="formData.tencent.TemplateId" placeholder="TemplateId"/>
        </el-card>
      </el-form-item>
      <el-button mb style="width: 100%" type="primary" @click="save">保存配置</el-button>
    </el-form>
  </div>
</template>

<script>
import { setting_list, setting_update } from '@/api/settings'
import Unit from '@/components/unit'

export default {
  components: { Unit },
  data() {
    return {
      formData: {
        app_name: '',
        app_logo: '',
        bah: '',
        max_upload: '',
        uploads: '',
        default_storage_size: '',
        smtpServer: {
          host: '',
          username: '',
          password: ''
        },
        tencent: {
          secretId: '',
          secretKey: '',
          SmsSdkAppId: '',
          TemplateId: '',
          Region: '',
          Bucket: ''
        },
        cos_check: '',
        uploads_cos: '',
        registerType: ''
      }

    }
  },
  mounted() {
    this.list()
  },
  methods: {
    async list() {
      const { list } = await setting_list()
      list.map(el => {
        this.formData[el.key] = el.value
      })
    },
    save() {
      setting_update({ data: this.formData }).then(({ code }) => {
        if (code === 200) {
          this.$message.success('修改成功')
        }
      })
    }
  },
  computed: {
    cos() {
      return this.formData.uploads_cos
    }
  },
  watch: {
    cos(e) {
      if (e == 0) {
        this.formData.cos_check = '0'
      }
    }
  }
}
</script>

<style lang="scss">
.settings-page {
  display: flex;
  flex-wrap: wrap;
}

.box-card {
  width: 400px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
