<template>
  <div>
    <el-dialog
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      append-to-body
      title="修改密码"
      width="30%"
    >
      <el-form ref="numberValidateForm" :model="numberValidateForm" :rules="rules">
        <el-form-item label="新的密码" prop="newpass">
          <el-input v-model="numberValidateForm.newpass" placeholder="请输入新密码" show-password type="password"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="confirm('numberValidateForm')">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { resetpass } from '@/api/admin'

export default {
  props: ['show'],
  data() {
    return {
      numberValidateForm: {
        newpass: ''
      },
      rules: {
        newpass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      dialogVisible: false
    }
  },
  methods: {
    handleClose(done) {
      this.$emit('close', false)
      done()
    },
    close(){
      this.$emit('close', false)
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          resetpass({ newPass: this.numberValidateForm.newpass }).then(({ code, msg }) => {
            if (code === 200) {
              this.$message.success(msg)
              this.close()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })

    }
  },
  watch: {
    show(e) {
      this.dialogVisible = e
      if (!e) {
        this.numberValidateForm.newpass = ''
      }
    }
  }
}
</script>

<style scoped>
.el-dialog {
  border-radius: 16px !important;
}
</style>
