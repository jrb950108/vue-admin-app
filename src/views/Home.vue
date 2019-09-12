<template>
  <div class="home">
    <m-button></m-button>

    <br>
    <br>

    <el-button type="primary" size="medium">{{ $t('首页') }}</el-button>

    <br>
    <br>

    <el-select :value="null"></el-select>
  </div>
</template>

<script>
import { getTopics } from '@/api/cnode'

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  mounted () {
    // this.getTopics()
  },
  methods: {
    getTopics () {
      getTopics({ page: 1, tab: 'good', limit: 10 }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
