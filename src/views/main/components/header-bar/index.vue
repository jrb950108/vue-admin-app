<template>
  <div class="header-bar">
    <div class="logo-wrapper" style="background-color: #000">
      <span style="color: #fff">logo</span>
    </div>
    <div class="custom-wrapper">
      <slot></slot>
    </div>
    <div class="account-wrapper"></div>
  </div>
</template>

<style lang="scss" scoped>
.header-bar {
  display: flex;
  height: inherit;

  .logo-wrapper {
    width: 200px;
    flex-shrink: 0;
    background-color: #333;
  }

  .custom-wrapper {
    flex: 1;
  }

  .account-wrapper {
    width: 160px;
    flex-shrink: 0;
    background-color: #333;
  }
}
</style>
