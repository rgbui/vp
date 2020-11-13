
<template>
  <div class="vp-slider">
    <input
      :style="style"
      ref="input"
      type="range"
      :max="max"
      :min="min"
      step="step"
      :value="value"
      :disabled="disabled"
      @input="change"
    />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    disabled: { type: Number, default: false },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 10 },
    step: { type: Number, default: 1 },
    value: { type: Number, default: 0 },
  },
  computed: {
    style() {
      var style: Record<string, any> = {};
      var r = this.value / (this.max - this.min);
      style.backgroundSize = `${r * 100}% 100%`;
      return style;
    },
  },
  methods: {
    change(event) {
      var input = this.$refs.input as HTMLInputElement;
      var value = input.value;
      this.value = value;
      this.$emit("input", this.value);
    },
  },
});
</script>
<style lang="less">
.vp-slider {
  width: 100%;
  height: @height;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  input[type="range"] {
    width: 100%;
    appearance: none;
    border-radius: 4px;
    height: 8px;
    cursor: pointer;
    box-sizing: border-box;
    border: 1px solid @grey-border;
    background: linear-gradient(@primary-color, @primary-color) no-repeat
      @grey-background-2x;

    &::-webkit-slider-thumb
    // ,
    // &::-moz-range-thumb
    {
      appearance: none;
      height: 16px;
      width: 16px;
      margin-top: -4px;
      background-color: @grey;
      border-radius: 50%;
      box-sizing: border-box;
      /*外观设置为圆形*/
      border: 1px solid @grey-border-2x;
    }
    &::-webkit-slider-runnable-track
    // ,
    // &::-moz-range-track
    {
      height: 8px;
      border-radius: 4px;
      box-sizing: border-box;
      border: 1px solid @grey-border;
      /*将轨道设为圆角的*/
    }
    &:focus {
      outline: none;
    }
  }
}
</style>