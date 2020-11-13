<template>
  <div class="vp-progress">
    <div class="vp-progress-value" :style="{ width: value + '%' }"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    value: { type: Number, default: 0 },
  },
});
</script>
<style lang="less">
.vp-progress {
  border-radius: 5px;
  height: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid @grey-border;
  background-color: @grey-background-2x;
  &-value {
    height: 100%;
    border-radius: 5px;
    background-color: @primary-color;
  }
}
</style>