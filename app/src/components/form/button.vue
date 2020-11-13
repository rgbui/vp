<template>
  <button
    class="vp-button"
    :disabled="disabled"
    :class="[
      type && type != 'default' && !disabled ? 'vp-button-' + type : '',
      size && size != 'default' ? 'vp-button-' + size : '',
      shape && shape != 'default' ? 'vp-button-' + shape : '',
      disabled ? 'vp-button-disabled' : '',
      block ? 'vp-button-block' : '',
    ]"
  >
    <span v-if="loading" class="vp-button-loading-content">
      <em>
        <svg
          viewBox="0 0 1024 1024"
          focusable="false"
          class="anticon-spin"
          data-icon="loading"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
          ></path>
        </svg>
      </em>
      <span>{{ loadingTip }}</span>
    </span>
    <template v-else>
      <vp-icon
        :class="$slots.default ? 'vp-button-icon' : ''"
        :icon="icon"
        v-if="icon ? true : false"
      ></vp-icon>
      <slot> </slot>
    </template>
  </button>
</template>
<style lang="less">
.vp-button {
  background: @primary-fill;
  color: #fff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: @radius-2x;
  height: 28px;
  padding: 0px @gap*3;
  border: 1px solid @primary-highlight;
  margin-right: @gap;
  cursor: pointer;
  &:hover {
    background: @primary-fill-2x;
  }
  &-small {
    height: 22px;
    padding: 0px @gap*2;
  }
  &-large {
    height: 36px;
    padding: 0px @gap*4;
  }
  &-circle {
    border-radius: 50%;
    padding: 0px !important;
    width: 28px;
    height: 28px;
    .vp-button-small {
      width: 22px;
      height: 22px;
    }
    .vp-button-large {
      width: 36px;
      height: 36px;
    }
  }
  &-rect {
    border-radius: 0px;
  }
  &-solid {
    background: @grey;
    color: @text-color-secondary;
    border: 1px solid @grey-border-3x;
    &:hover {
      background: @grey;
      color: @primary-color;
      border: 1px solid @primary-color;
    }
  }
  &-dashed {
    background: @grey;
    color: @text-color-secondary;
    border: 1px dashed @grey-border-3x;
    &:hover {
      background: @grey;
      color: @primary-color;
      border: 1px dashed @primary-color;
    }
  }
  &-text {
    border: 1px solid transparent;
    color: @text-color-secondary;
    background: transparent;
    &:hover {
      border: 1px solid transparent;
      color: @text-color-secondary;
      background: transparent;
    }
  }
  &-link {
    border: 1px solid transparent;
    color: @primary-color;
    background: transparent;
    &:hover {
      border: 1px solid transparent;
      color: @primary-color;
      background: transparent;
    }
  }
  &-grey {
    background: @grey-fill-3x;
    color: @text-color-secondary;
    border: 1px solid @grey-border-3x;
    box-shadow: @shadow;
    &:hover {
      background: @grey-background-5x;
      color: #fff;
    }
  }
  &-danger {
    background: desaturate(@error-color, 30%);
    border: 1px solid @error-color;
    color: #fff;
    &:hover {
      background: saturate(@error-color, 20%);
    }
  }
  &-disabled {
    background: @grey-fill;
    color: @text-color-disabled;
    border: 1px solid @grey-border;
    box-shadow: none;
    &:hover {
      background: @grey-fill;
      color: @text-color-disabled;
    }
  }
  &-loading {
    &-content {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      em {
        display: inline-flex;
        width: 22px;
        height: 14px;
        margin-right: @gap-space;
        justify-content: center;
        align-items: center;
        svg {
          width: 14px;
          height: 14px;
          animation: turn 1s linear infinite;
        }
      }
    }
  }
  &-block {
    width: 100%;
    box-sizing: border-box;
  }
  &-icon {
    display: inline-block;
    margin-right: @gap-space;
  }
}
/* 
      turn : 定义的动画名称
      1s : 动画时间
      linear : 动画以何种运行轨迹完成一个周期
      infinite :规定动画应该无限次播放
     */
@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
<script lang="ts">
import Vue from "vue";
import VpIcon from "../layout/icon.vue";
export default Vue.extend({
  props: {
    block: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: "default" },
    /***
     * grey danger  text link dashed solid
     */
    type: { type: String, default: "default" },
    /***
     * rect circle
     */
    shape: { type: String, default: "default" },
    loading: { type: Boolean, default: false },
    loadingTip: { type: String, default: "加载中" },
    icon: { type: String },
  },
});
</script>
