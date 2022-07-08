<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <reset-pass :show="pass" @close="pass = false"></reset-pass>
      <div mr @click="setpass">修改密码</div>
      <img :src="avatar" class="user-avatar"/>
      <div class="loginOut" @click="loginout">退出系统</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ResetPass from '@/components/resetPass'

export default {
  components: {
    ResetPass,
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      pass: false
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    setpass() {
      this.pass = true
    },
    async loginout() {
      try {
        await this.$confirm('是否退出管理系统', '退出确认')
      } catch (error) {
        return
      }
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  top: 0px;
  height: 50px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    align-items: center;

    &:focus {
      outline: none;
    }

    > .loginOut {
      margin: 0px 15px;
      color: #000;
      cursor: pointer;
      user-select: none;
    }

    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
  }
}
</style>
