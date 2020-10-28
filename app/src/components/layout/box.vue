<template>
  <div class="vp-box">
    <div class="vp-box-head">
        <slot name='head'>
       <VpIcon :icon="icon"></VpIcon>
<span>{{text}}</span>
        <slot>
    </div>
    <div class="vp-box-operators">
         <slot name='operators'><slot>
    </div>
    <div class="vp-box-content" v-if='spread'>
        <slot></slot>
    </div>
  </div>
</template>
<style lang="less">
.vp-box {
  position: relative;
  &-head {
    height: 24px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 5px;
  }
  &-operators {
    position: absolute;
    top: 0px;
    right: 0px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-right: 5px;
  }
  &-content {
    padding: 5px;
    overflow: auto;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
<script>
import VpIcon from "../layout/icon.vue";
export default {
  props: {
    spread: { type: Boolean, default: true },
    text: { type: String, default: "" },
    icon: { type: String, default: "angle-down:font" },
  },
};
</script>