<template>
  <div
    :class="[
      'vp-switch',
      {
        'vp-switch-checked': checked ? true : false,
        'vp-switch-disabled': disabled,
      },
    ]"
    @click="click"
  >
    <span></span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  methods: {
    click(event: MouseEvent)
    {
      if (this.disabled == true) return;
      this.checked = this.checked ? false : true;
      this.$emit("change", this.checked);
    },
  },
});
</script>
<style lang="less">
.vp-switch {
  width: 44px;
  height: 22px;
  position: relative;
  display: inline-flex;
  border-radius: 11px;
  justify-content: flex-start;
  align-items: center;
  background-color: @grey-background-6x;
  cursor: pointer;
  span {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: @grey;
    margin: 2px;
  }
  &-checked {
    background-color: @primary-color;
    justify-content: flex-end;
  }
  &-disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
}
</style>