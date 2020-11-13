<template>
  <div class="vp-text" :class="[type ? 'vp-text-' + type : '']">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    /***
     *  text code link bold  quote des
     */
    type: { type: String, default: "" },
    block: { type: Boolean, default: false },
  },
});
</script>
<style lang="less">
.vp-text {
  color: @text-color;
  &-block {
    display: block;
  }
  &-code {
    background-color: @grey-background-2x;
    color: @text-color-disabled;
    border: 1px solid @grey-border-2x;
    border-radius: @radius;
    padding: 0px @gap-space;
  }
  &-link {
    color: @primary-color;
  }
  &-bold {
    font-weight: bold;
  }
  &-quote {
    position: relative;
    padding-left: @gap-max;
    &::after {
      content: "\20";
      position: absolute;
      top: 0px;
      left: (@gap)-1;
      bottom: 0px;
      width: 2px;
      background-color: @error-color;
    }
  }
  &-des {
    color: @text-color-disabled;
  }
}
</style>