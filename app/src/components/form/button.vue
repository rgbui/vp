<template>
  <button
    class="vp-button"
    :disabled="disabled"
    :class="[
      type && type != 'default' && !disabled ? 'vp-button-' + type : '',
      size && size != 'default' ? 'vp-button-' + size : '',
      shape && shape != 'default' ? 'vp-button-' + shape : '',
      disabled ? 'vp-button-disabled' : '',
    ]"
  >
    <slot></slot>
  </button>
</template>
<style lang="less">
.vp-button {
  &-small {
  }
  &-large {
  }
  &-circle {
  }
  &-ghost {
  }
}
</style>
<script>
import VpIcon from "../layout/icon.vue";
export default {
  props: {
    disabled: { type: Boolean, default: false },
    size: { type: String, default: "default" },
    type: { type: String, default: "default" },
    shape: { type: String, default: "default" },
    loading: { type: Boolean, default: false },
    loadingTip: { type: String, default: "加载中" },
  },
};
</script>