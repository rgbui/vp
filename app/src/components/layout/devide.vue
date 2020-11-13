<template>
  <div class="vp-devide">
    <label><slot></slot></label>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    align: { type: String, default: "left" },
  },
  computed: {
    style() {
      var style: Record<string, any> = {};
      style.alignItems = "flex-start";
      if (this.align == "center") style.alignItems = "center";
      else if (this.align == "right") style.alignItems = "flex-end";
      return style;
    },
  },
});
</script>
<style lang="less">
.vp-devide {
  position: relative;
  height: 10px;
  &::after {
    content: "\20";
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 0px;
    right: 0px;
    transform: translate(0, 50%);
    height: 1px;
    background-color: @grey-border-3x;
  }
  display: flex;
  justify-content: center;
  align-items: flex-start;
  label {
    margin: 0px 10px;
  }
}
</style>