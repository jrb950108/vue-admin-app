<template>
  <el-container class="app-container">
    <el-header height="66px">
      <header-bar>
        <nav-menu :data="navMenu"></nav-menu>
      </header-bar>
    </el-header>

    <el-container style="min-height: calc(100vh - 66px);">
      <side-menu :data="sideMenu"></side-menu>

      <el-main class="main-container">
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from './components/nav-menu'
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'

export default {
  components: {
    NavMenu,
    SideMenu,
    HeaderBar
  },
  computed: {
    navMenu () {
      return this.$store.state.user.navMenu
    }
    // sideMenuMap () {
    //   return this.$store.state.user.sideMenuMap
    // }
  },
  data () {
    return {
      sideMenu: []
    }
  },
  created () {
    // this.sideMenuInit()
  },
  watch: {
    // $route () {
    //   this.sideMenuInit()
    // }
  },
  methods: {
    // sideMenuInit () {
    //   let arr = this.$route.path.split('/')
    //   for (let i = 0; i < arr.length; i++) {
    //     if (arr[i] in this.sideMenuMap) {
    //       this.sideMenu = this.sideMenuMap[arr[i]]
    //       break
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .el-header {
    color: #333;
    background-color: #B3C0D1;
    padding: 0;
  }

  .main-container {
    padding: 0;
  }
}
</style>
