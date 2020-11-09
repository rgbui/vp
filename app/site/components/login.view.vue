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
      <div><button :disabled="disabled" @click="login">登录</button></div>
      <div class="login-error">{{ loginError }}</div>
      <div class="login-nav">
        <a class="login-nav-left">忘记密码</a>
        <span class="login-nav-right"
          >还没有火凤凰帐号？<a @click="toReg()">点击注册»</a></span
        >
      </div>
    </div>
    <div class="reg" v-else>
      <a class="close-btn" @click="close"></a>
      <h3>火凤凰</h3>
      <div class="reg-phone-box" v-if="regStep == 1 || regStep == 2">
        <div class="reg-phone">
          <input v-model="phone" type="text" placeholder="请输入您的手机号" />
        </div>
        <div class="reg-phone-code" v-if="regStep == 2">
          <input type="text" placeholder="输入验证码" v-model="code" /><label
            @click="getCode()"
            >{{ getPhoneCodeText }}</label
          >
        </div>
        <div><button :disabled="disabled" @click="goToReg()">继续</button></div>
      </div>
      <div class="reg-account" v-else-if="regStep == 3">
        <div>
          <input placeholder="输入帐号" type="text" v-model="account" />
        </div>
        <div>
          <input placeholder="输入密码" type="password" v-model="password" />
        </div>
        <div>
          <button :disabled="disabled" @click="regUpdate()">注册</button>
        </div>
      </div>
      <div class="reg-error">{{ regError }}</div>
      <div class="reg-nav">
        <a class="reg-nav-left">忘记密码</a>
        <span class="reg-nav-right"
          >已有火凤凰帐号？<a @click="toLogin()">登录»</a></span
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Axios from "axios";
import { user } from "../../user";
export default Vue.extend({
  props: {
    phone: { type: String, default: "" },
    password: { type: String, default: "" },
    loginError: { type: String, default: "" },
    regStep: { type: Number, default: 1 },
    getPhoneCodeText: { type: String, default: "获取验证码" },
    regError: { type: String, default: "" },
    code: { type: String, default: "" },
    codeTime: { type: Number, default: -1 },
    account: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return { show: true, isLogin: true };
  },
  methods: {
    login() {
      if (!/^1[34578]\d{9}$/.test(this.phone)) {
        return (this.loginError = "手机号输入不正确");
      }
      if (
        !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$/.test(this.password)
      ) {
        return (this.loginError = "密码必须包含字母和和数字，且在6~18位之间");
      }
      this.loginError = "";
      if (this.disabled == true) return;
      this.disabled = true;
      Axios.post("/user/phone/login", {
        phoneNumber: this.phone,
        pwd: this.password,
      })
        .then((res) => {
          this.disabled = false;
          if (res && res.data.success == true) {
            user.saveCache(res.data.user);
            location.href = "/designer";
          } else this.loginError = "帐号或密码错误";
        })
        .catch((err) => {
          this.disabled = false;
          this.loginError = "网络异常、登录失败";
        });
    },
    close() {
      this.show = false;
    },
    open() {
      this.show = true;
    },
    toReg() {
      this.isLogin = false;
      this.regStep = 1;
    },
    toLogin() {
      this.isLogin = true;
    },
    goToReg() {
      if (this.regStep == 1) {
        if (!/^1[34578]\d{9}$/.test(this.phone)) {
          return (this.regError = "手机号输入不正确");
        }
        if (this.disabled == true) return;
        this.disabled = true;
        Axios.post("/search/phone", { phoneNumber: this.phone })
          .then((res) => {
            this.disabled = false;
            if (res && res.data && res.data.success == true) {
              this.regError = "手机号已存在，请直接登录";
            } else this.regStep = 2;
          })
          .catch((err) => {
            this.disabled = false;
            this.regError = "网络异常";
          });
      } else if (this.regStep == 2) {
        if (!/^1[34578]\d{9}$/.test(this.phone)) {
          return (this.regError = "手机号输入不正确");
        }
        if (!/^[\d]{4,6}$/.test(this.code)) {
          return (this.regError = "验证码输入不合法");
        }
        if (this.disabled == true) return;
        this.disabled = true;
        Axios.post("/user/phone/reg", {
          phoneNumber: this.phone,
          phoneCode: this.code,
        })
          .then((r) => {
            this.disabled = false;
            if (r && r.data && r.data.success == true) {
              user.saveCache(r.data.user);
              this.regStep = 3;
            }
          })
          .catch((err) => {
            this.disabled = false;
            this.regError = "网络异常";
          });
      }
    },
    getCode() {
      if (this.codeTime != -1) return;
      this.codeTime = 0;
      Axios.post("/send/phone/code", { phoneNumber: this.phone })
        .then((r) => {})
        .catch((err) => {
          this.regError = "网络异常，验证码出错!";
        });
      this.timer = setInterval(() => {
        this.codeTime += 1;
        this.getPhoneCodeText = `${120 - this.codeTime}s`;
        if (this.codeTime >= 120) {
          this.codeTime = -1;
          this.getPhoneCodeText = "获取验证码";
          clearInterval(this.timer);
        }
      }, 1000);
    },
    regUpdate() {
      this.account = this.account.trim();
      if (this.account.length < 2)
        return (this.regError = "呢称长度不能低于2位");
      if (
        !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$/.test(this.password)
      ) {
        return (this.regError = "密码必须包含字母和和数字，且在6~18位之间");
      }
      if (this.disabled == true) return;
      this.disabled = true;
      Axios.post("/user/phone/regUpdate", {
        account: this.account,
        pwd: this.password,
      })
        .then((r) => {
          this.disabled = false;
          if (r && r.data && r.data.success == true) {
            if (r.data.user) user.saveCache(r.data.user);
            location.href = "/designer";
          }
        })
        .catch((err) => {
          this.disabled = false;
          this.regError = "";
        });
    },
  },
});
</script>

<style lang="less">
.login,
.reg {
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
.reg {
  &-phone-code {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    input {
      flex-grow: 1;
    }
    label {
      border: 1px solid #ddd;
      cursor: pointer;
      width: 160px;
      flex-shrink: 0;
      height: 40px;
      margin-left: 10px;
      line-height: 40px;
    }
  }
}
</style>
