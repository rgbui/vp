<template>
  <div class="head">
    <div class="head-wrapper" v-if="isLogin ? false : true">
      <div class="head-left">
        <a>火凤凰</a>
      </div>
      <div class="head-right">
        <a href="/login">登陆</a>
        <a href="/reg">注册</a>
      </div>
    </div>
    <div class="head-wrapper" v-else-if="isLogin ? true : false">
      <div class="head-left">
        <a>火凤凰</a>
      </div>
      <div class="head-right">
        <a>
          <img :src="user.face" v-if="user.face" />
          <span v-else>{{ user.name.substring(0, 1) }}</span>
        </a>
      </div>
    </div>
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
<script lang="ts">
import Vue from "vue";
import { user } from "../../user";
export default Vue.extend({
  props: {
    isLogin: { type: Boolean, default: false },
    user: { type: Object, default: null },
  },
  mounted() {
    user.getUserInfo((user) => {
      if (user) {
        this.isLogin = true;
        this.user = user;
      } else {
        this.isLogin = false;
      }
    });
  },
});
</script>
