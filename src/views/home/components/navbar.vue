<template>
  <header class="layout-header">
    <span class="header-logo">系统框架</span>
    <ul class="header-bar">
      <li class="header-bar-nav">
        <el-dropdown>
          <span class="userinfo-inner">
            <img class="userinfo-img" :src="avatar">
            {{userinfo.realName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { User } from '@/store/modules/user'

@Component
export default class Navbar extends Vue {
  get userinfo(): User {
    this.$store.dispatch('user/getUserInfo')
    return this.$store.state.user.user
  }

  get avatar(): string {
   const src = this.$store.state.user.user.avatar
    return src ? src : '../../../assets/user.png'
  }
}
</script>
