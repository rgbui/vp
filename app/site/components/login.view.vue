<template>
  <div class="page-cover" v-if="show">
    <div class="login" v-if="isLogin">
      <a class="close-btn" @click="close"></a>
      <h3>火凤凰</h3>
      <div>
        <input v-model="phone" placeholder="请输入您的手机号" type="text" />
      </div>
      <div>
        <input
          type="password"
          placeholder="请输入您的密码"
          v-model="password"
        />
      </div>
      <div><button @click="login">登录</button></div>
      <div class="login-error"></div>
      <div class="login-nav">
        <a class="login-nav-left">忘记密码</a>
        <span class="login-nav-right">还没有火凤凰帐号？<a>点击注册»</a></span>
      </div>
    </div>
    <div class="reg" v-else>
      <a class="close-btn" @click="close"></a>
      <h3>火凤凰</h3>
      <div class="reg-phone-box">
        <div class="reg-phone">
          <input type="text" placeholder="请输入您的手机号" />
        </div>
        <div class="reg-phone-code"><input type="text" /><label></label></div>
        <div><button>继续</button></div>
      </div>
      <div class="reg-account">
        <div><input type="text" /></div>
        <div><input type="password" /></div>
        <div><button>注册</button></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    isLogin: { type: Boolean, default: true },
    phone: { type: String, default: "" },
    password: { type: String, default: "" },
  },
  data() {
    return { show: true };
  },
  methods: {
    login() {},
    close() {
      this.show = false;
    },
    open() {
      this.show = true;
    },
  },
});
</script>

<style lang="less">
.login {
  width: 420px;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  .close-btn {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0px;
    top: 0px;
    margin: 5px;
    cursor: pointer;
    background: url(../../assert/img/msg_close.png) 0 0 no-repeat;
  }
  h3 {
    font-size: 18px;
  }
  button {
    text-shadow: none;
    background: #ec414d;
    color: #fff;
    box-shadow: none;
    border: 1px solid #ec414d;
    width: 100%;
    cursor: pointer;
    height: 40px;
    &:hover {
      border-color: #e31725;
      background: #e31725;
      color: #fff;
    }
  }
  input {
    width: 100%;
    border: 1px solid #ddd;
    box-sizing: border-box;
    height: 40px;
    text-indent: 10px;
    &::input-placeholder {
      color: #999;
    }
  }
  &-nav {
    height: 20px;
    &-left {
      float: left;
      height: 100%;
      justify-content: flex-start;
    }
    &-right {
      float: right;
      justify-content: flex-end;
    }
    > * {
      display: flex;
      align-items: center;
    }
  }
  input,
  button,
  &-nav {
    margin-top: 10px;
    border-radius: 4px;
  }
}
</style>
