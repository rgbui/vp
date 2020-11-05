<template>
  <div class="page-cover" v-if="show">
    <div class="login" v-if="isLogin">
      <a class="close-btn" @click="close"></a>
      <div>
        <h3>火凤凰</h3>
      </div>
      <div>
        <input v-model="phone" placeholder="请输入您的手机号" type="text" />
      </div>
      <div>
        <input type="password" v-model="password" />
      </div>
      <div><button @click="login">登录</button></div>
      <div class="login-error"></div>
      <div>
        <a>忘记密码</a>
        <span>还没有火凤凰帐号？<a>点击注册»</a></span>
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
  width: 520px;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -155px 0 0 -260px;
  text-align: center;
  padding: 30px 0 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  .close-btn {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -10px 0 0 -10px;
    background: url(../../assert/img/msg_close.png) 0 0 no-repeat;
  }
  button {
    text-shadow: none;
    background: #ec414d;
    color: #fff;
    box-shadow: none;
    border: 1px solid #ec414d;
    width: 100%;
    cursor: pointer;
    &:hover {
      border-color: #e31725;
      background: #e31725;
      color: #fff;
    }
  }
}
</style>
