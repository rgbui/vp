<template>
  <div class="head">
    <div class="head-wrapper" v-if="isLogin ? false : true">
      <div class="head-left">
        <a>火凤凰</a>
      </div>
      <div class="head-right">
        <button>登陆</button>
        <button>注册</button>
      </div>
    </div>
    <div v-else-if="isLogin ? true : false"></div>
  </div>
</template>
<style lang='less'>
.head {
  height: 40px;
  &-wrapper {
    width: 1200px;
    margin: 0 auto;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &-left {
    width: 120px;
    flex-shrink: 0;
  }
  &-right {
    flex-grow: 1;
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
<script>
export default {
  props: {
    isLogin: { type: Boolean, default: false },
  },
  mounted() {
    /**通过cookie去主动查询用户信息 */
  },
};
</script>