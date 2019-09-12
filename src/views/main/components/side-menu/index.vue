<template>
  <el-aside width="200px" class="my-aside">
    <el-menu
      class="my-menu"
      text-color="#fff"
      background-color="#333"
    >
      <template v-for="item of data">
        <router-link :to="{ name: item.name }" :key="item.name" class="menu-item-link">
          <el-menu-item :index="item.name">
            <i class="el-icon-setting"></i>
            <span slot="title">{{ item.meta && item.meta.title }}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-aside {
  background-color: #333;

  .my-menu {
    border-right-width: 0;

    .menu-item-link {
      text-decoration: none;
    }
  }
}
</style>
