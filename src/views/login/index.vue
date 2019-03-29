<template>
  <el-form
    :model="loginForm"
    :rules="rules"
    ref="loginForm"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm login-container"
    @keydown.enter.native.prevent="onKeydown"
  >
    <h3 class="title">系统登录</h3>
    <el-form-item prop="username">
      <el-input
        type="text"
        v-model.trim="loginForm.username"
        auto-complete="off"
        autofocus
        clearable
        placeholder="账号"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model.trim="loginForm.password"
        auto-complete="off"
        clearable
        placeholder="密码"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button
        id="submit"
        type="primary"
        style="width:100%;"
        @click.native.prevent="submitForm"
        :loading="loading"
      >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import LoginForm from './model/login-form'

@Component
export default class Login extends Vue {
  loginForm: LoginForm = {
    username: '',
    password: ''
  }

  quantity: number = 0

  onKeydown() {
    this.submitForm()
  }

  loading: boolean = false

  rules = {
    username: [
      { required: true, message: '请输入登录名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]
  }

  submitForm(): void {
    const form: ElForm = this.$refs['loginForm'] as ElForm
    form.validate(valid => {
      if (!valid) {
        return false
      }

      this.loading = true

      let a = this.$store.dispatch('user/login', this.loginForm)
        .then((res) => {
          this.$router.push('/')
          console.log('登录成功')
        })
        .catch((res: any) => {
          this.$message.error(res.message)
          this.loading = false
        })

    })
  }
}
</script>

<style lang="less" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
}
</style>
