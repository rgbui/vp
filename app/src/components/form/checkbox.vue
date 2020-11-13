<template>
  <strong
    class="vp-check"
    :class="[
      type ? 'vp-check-' + type : '',
      {
        'vp-check-checked': checked,
        'vp-check-disabled': disabled,
      },
    ]"
    @click="click"
  >
    <i></i>
    <span>
      <slot></slot>
    </span>
  </strong>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    /**
     * checkbox radio
     */
    type: { type: String, default: "checkbox" },
    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  methods: {
    click() {
      if (this.disabled == true) return;
      this.checked = this.checked == false ? true : false;
      this.$emit("change", this.checked);
    },
  },
});
</script>
<style lang="less">
.vp-check {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  height: 22px;
  i {
    display: inline-flex;
    margin-right: @gap-space;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    border: 1px solid @grey-border-3x;
    cursor: pointer;
    position: relative;
  }
  span {
    color: @text-color;
    cursor: pointer;
    font-weight: normal;
  }
  &-checkbox {
    i {
      border-radius: @radius;
      &::after {
        position: absolute;
        top: 50%;
        left: 22%;
        box-sizing: border-box;
        display: table;
        width: 5.71428571px;
        height: 9.14285714px;
        border: 2px solid @grey;
        border-top: 0;
        border-left: 0;
        -webkit-transform: rotate(45deg) scale(0) translate(-50%, -50%);
        transform: rotate(45deg) scale(0) translate(-50%, -50%);
        opacity: 0;
        -webkit-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6),
          opacity 0.1s;
        transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
        content: "\20";
      }
    }
  }
  &-radio {
    i {
      border-radius: 50%;
    }
  }
  &-checked.vp-check-checkbox {
    i {
      background-color: @primary-color;
      &::after {
        position: absolute;
        display: table;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        -webkit-transform: rotate(45deg) scale(1) translate(-50%, -50%);
        transform: rotate(45deg) scale(1) translate(-50%, -50%);
        opacity: 1;
        -webkit-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
        transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
        content: "\20";
      }
    }
  }
  &-checked.vp-check-radio {
    i {
      background-color: @primary-color;
      &::after {
        content: "\20";
        position: absolute;
        width: 6px;
        height: 6px;
        top: 50%;
        left: 50%;
        margin-top: -3px;
        margin-left: -3px;
        background-color: @grey;
        border-radius: 50%;
      }
    }
  }
  &-disabled {
    i {
      cursor: default;
      border: 1px solid @grey-border;
    }
    span {
      cursor: default;
      color: @text-color-disabled;
    }
  }
}
</style>