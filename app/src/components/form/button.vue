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
    <span v-if="loading" class="vp-button-loading-content">
      <em></em>
      <span>{{ loadingTip }}</span>
    </span>
    <slot v-else> </slot>
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
  &-blank {
    background: @grey;
    color: @text-color-secondary;
    border: 1px solid @grey-border-2x;
    &:hover {
      background: @grey;
      color: @text-color;
      border: 1px solid @primary-color;
    }
  }
  &-ghost {
    background: @grey-fill-3x;
    color: @text-color-secondary;
    border: 1px solid @grey-border-2x;
    box-shadow: @shadow;
    &:hover {
      background: @grey-background-5x;
      color: #fff;
    }
  }
  &-disabled {
    background: @grey-fill-2x;
    color: @text-color-disabled;
    border: 1px solid @grey-border;
    box-shadow: @shadow;
    &:hover {
      background: @grey-fill-2x;
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
        width: 10px;
        height: 10px;
        margin-right:@gap-space;
        background-image: url(data:image/gif;base64,R0lGODlhCgAKAJEDAMzMzP9mZv8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAADACwAAAAACgAKAAACF5wncgaAGgJzJ647cWua4sOBFEd62VEAACH5BAUAAAMALAEAAAAIAAMAAAIKnBM2IoMDAFMQFAAh+QQFAAADACwAAAAABgAGAAACDJwHMBGofKIRItJYAAAh+QQFAAADACwAAAEAAwAIAAACChxgOBPBvpYQYxYAIfkEBQAAAwAsAAAEAAYABgAAAgoEhmPJHOGgEGwWACH5BAUAAAMALAEABwAIAAMAAAIKBIYjYhOhRHqpAAAh+QQFAAADACwEAAQABgAGAAACDJwncqi7EQYAA0p6CgAh+QQJAAADACwHAAEAAwAIAAACCpRmoxoxvQAYchQAOw==);
      }
    }
  }
}
</style>
<script lang="ts">
import Vue from "vue";
import VpIcon from "../layout/icon.vue";
export default Vue.extend({
  props: {
    disabled: { type: Boolean, default: false },
    size: { type: String, default: "default" },
    type: { type: String, default: "default" },
    shape: { type: String, default: "default" },
    loading: { type: Boolean, default: false },
    loadingTip: { type: String, default: "加载中" },
  },
  methods: {},
});
</script>
