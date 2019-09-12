<template>
  <ul class="nav-menu">
    <template v-for="(item, index) of data">
      <router-link class="nav-menu-item" tag="li" :to="{ name: item.name }" :key="index" @click.native="click(item)">
        <a>{{ item.meta && item.meta.title }}</a>
      </router-link>
    </template>
  </ul>
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
  },
  mounted () {

  },
  methods: {
    click (item) {
      this.$emit('select', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-menu {
  margin: 0;
  padding: 0;
  height: 100%;
  display: inline-flex;

  .nav-menu-item {
    height: 100%;

    a {
      height: 100%;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #666;
      text-decoration: none;
    }
  }

  .nav-menu-item.router-link-active {
    a {
      color: #000;
    }
  }
}
</style>
