<template>
  <div>
    <el-button type="primary" @click="login">登录</el-button>

    <br/>

    <img src="@/assets/cat.jpeg" />

    <br/>

    <el-button v-waves type="primary">
      水波纹效果
    </el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    login () {
      let data = { userName: 'admin', password: 1 }
      this.handleLogin(data).then(res => {
        if (res.status.code === '0') {
          this.getUserInfo().then(res => {
            // console.log(res)
            if (res.status.code === '0') {
              this.$router.push({ path: '/app' })
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
