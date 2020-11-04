<template>
  <div class="login">
    <div>
      <h3>{{ isLogin ? "登陆" : "欢迎注册火凤凰" }}</h3>
    </div>
    <div>
      <input v-model="phone" placeholder="请输入您的手机号" type="text" />
    </div>
    <div><button @click="phoneLogin">继续</button></div>
    <div class="qr"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    isLogin: { type: Boolean, default: true },
    phone: { type: String, default: "" },
  },
  methods: {
    phoneLogin() {},
  },
});
</script>
