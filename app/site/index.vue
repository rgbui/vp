<template>
  <div class="viewparse-index">
    <div class="viewparse-index-head page-width">
      <div class="viewparse-index-head-left">
        <a></a>
        <span class="logo-title">火凤凰</span>
      </div>
      <div class="viewparse-index-head-right">
        <button @click="openLogin($event)">登录&nbsp;/&nbsp;注册</button>
      </div>
    </div>
    <div class="viewparse-index-content page-width"></div>
    <div class="viewparse-index-footer page-width"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { LoginDialoug } from "./components/login";
export default Vue.extend({
  methods: {
    openLogin(event: MouseEvent) {
      LoginDialoug.dialoug.open();
    },
  },
});
</script>
<style lang="less">
.viewparse-index {
  width: 100vw;
  height: 100vh;
  background-image: url(../assert/img/bg.jpeg);
  background-position: 50% 50%;
  &-head {
    height: 48px;
    margin: 0 auto;
    color: #fff;
    &-left {
      float: left;
      height: 48px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .logo-title {
        font-size: 16px;
      }
    }
    &-right {
      float: right;
      height: 48px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      button {
        background: #ec414d;
        color: #fff;
        box-shadow: none;
        border: 1px solid #ec414d;
        padding: 0 15px;
        height: 32px;
        border-radius: 2px;
        &:hover {
          border-color: #e31725;
          background: #e31725;
          color: #fff;
        }
      }
    }
  }
  &-content {
    margin: 0 auto;
  }
}
</style>
