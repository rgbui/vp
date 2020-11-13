<template>
  <div
    :class="[
      'vp-number',
      {
        'vp-number-disabled': disabled,
        'vp-number-focus': isFocus,
        'vp-number-line': block == false,
      },
    ]"
    tabindex="100"
    @focusout="blur"
    @focusin="focus"
  >
    <input
      ref="input"
      type="text"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      @keydown.enter="enter"
      @keydown.46="remove($event)"
      @keydown.40.stop="down($event)"
      @keydown.33.stop="down($event)"
      @keydown.38.stop="up($event)"
      @keydown.34.stop="up($event)"
      @keyup="keyup"
      :maxlength="maxLength"
    />
    <div class="vp-number-operator">
      <vp-icon
        icon="angle-up:font"
        class="vp-number-down"
        @click.native.stop="up"
      />
      <vp-icon
        icon="angle-down:font"
        class="vp-number-up"
        @click.native.stop="down"
      />
    </div>
    <span v-if="unit ? true : false" class="vp-number-unit">{{ unit }}</span>
  </div>
</template><script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    block: { type: Boolean, default: true },
    default: { type: Number },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: "" },
    value: { type: Number },
    min: { type: Number },
    max: { type: Number },
    step: { type: Number, default: 1 },
    unit: { type: String, default: "" },
    /**
     * 如果为0表示只能输入整数
     * 大于0 表示保留precision 小数
     */
    precision: { type: Number, default: 0 },
    /**
     * 表示开启一定的数字运算
     */
    clac: { type: Boolean, default: false },
    maxLength: { type: Number },
  },
  data() {
    return {
      isFocus: false,
    };
  },
  methods: {
    keyup(event: KeyboardEvent) {
      let reg = /^[\-\d]+$/;
      if (this.precision > 0) {
        reg = /^[\-\d\.]+$/;
      }
      if (this.clac == true) {
        if (this.precision == 0) reg = /^[\d\+\-\*\/]+$/;
        else reg = /^[\d\+\-\*\/\.]+$/;
      }
      var input = this.$refs.input;
      var value = input.value;
      if (reg.test(value)) {
        if (this.isNumberValue()) {
          if (typeof this.value == "undefined")
            this.$set(this, "value", parseFloat(value));
          else this.value = parseFloat(value);
          this.handleValue();
          input.value = this.value;
          this.notify();
        }
      } else {
        input.value = input.value.substring(0, input.value.length - 1);
      }
    },
    isNumberValue() {
      var input = this.$refs.input;
      var value = input.value;
      return /^\-?[1-9][0-9]*([\.][0-9]{1,20})?$/.test(value);
    },
    handleValue() {
      if (this.precision > 0 && this.value.toString().indexOf(".") > -1) {
        var ext = this.value
          .toString()
          .substring(this.value.toString().lastIndexOf(".") + 1);
        if (ext.length > this.precision) {
          this.value = this.value.toFixed(this.precision);
          this.value = parseFloat(this.value);
        }
      } else if (this.clac != true) {
        var v = parseFloat(this.value);
        if (!isNaN(v)) this.value = v;
        else return;
      }
      if (
        /[\d\.]+/.test(this.max) &&
        typeof this.value == "number" &&
        this.value > parseFloat(this.max)
      ) {
        this.value = parseFloat(this.max);
      }
      if (
        /[\d\.]+/.test(this.min) &&
        typeof this.value == "number" &&
        this.value < parseFloat(this.min)
      ) {
        this.value = parseFloat(this.min);
      }
    },
    notify() {
      this.$emit("input", this.value);
    },
    focus() {
      if (this.disabled == true) return;
      this.isFocus = true;
    },
    blur() {
      if (this.disabled == true) return;
      this.isFocus = false;
    },
    enter() {
      if (this.clac == true) {
        var input = this.$refs.input;
        var value = input.value;
        var oldValue = this.value;
        try {
          var value = window.eval("(" + value + ")");
          this.value = value;
          input.value = this.value;
          this.handleValue();
          this.notify();
        } catch (e) {
          input.value = value;
          this.value = oldValue;
        }
      }
    },
    down(event: KeyboardEvent) {
      event.preventDefault();
      if (!this.isNumberValue()) return;
      if (typeof this.value != "number" && typeof this.default == "number")
        this.$set(this, "value", this.default);
      if (typeof this.value == "number")
        this.value -= parseFloat(this.step) || 1;
      this.handleValue();
      this.notify();
    },
    up(event) {
      event.preventDefault();
      if (!this.isNumberValue()) return;
      if (typeof this.value != "number" && typeof this.default == "number")
        this.$set(this, "value", this.default);
      if (typeof this.value == "number")
        this.value += parseFloat(this.step) || 1;
      this.handleValue();
      this.notify();
    },
  },
});
</script>
<style lang="less">
.vp-number {
  width: 100%;
  position: relative;
  input {
    height: @height;
    width: 100%;
    box-sizing: border-box;
    color: @text-color;
    background-color: @grey;
    border-radius: @radius;
    border: 1px solid @grey-border-3x;
    box-shadow: @shadow-inner-2x;
    text-indent: @gap-min;
    &::-webkit-input-placeholder {
      color: @text-color-disabled;
    }
  }
  &-operator {
    background-color: transparent;
    position: absolute;
    width: 16px;
    border-radius: @radius;
    height: @height;
    top: 0px;
    right: 0px;
  }
  &-down,
  &-up {
    position: absolute;
    right: 0px;
    width: 100%;
    height: 11px;
    display: flex;
    justify-content: center;
    color: @text-color-secondary;
    cursor: pointer;
  }
  &-down {
    top: 0px;
    align-items: flex-start;
  }
  &-up {
    bottom: 0px;
    align-items: flex-start;
  }
  &-focus {
    input {
      border: 1px solid @primary-color !important;
    }
    .vp-number-operator {
      background: @primary-fill;
    }
    .vp-number-down,
    .vp-number-up {
      color: #fff;
    }
    .vp-number-unit {
      color: @text-color;
    }
  }
  &-unit {
    position: absolute;
    top: 0px;
    right: 16px;
    height: @height;
    padding-right: @gap-min;
    display: flex;
    justify-content: center;
    align-items: center;
    color: @text-color-disabled;
  }
  &-disabled,
  &-disabled.vp-number-focus {
    input {
      border: 1px solid @grey-border;
      color: @text-color-disabled;
    }
    .vp-number-down,
    .vp-number-up {
      visibility: visible;
      color: @text-color-disabled;
    }
    .vp-number-unit {
      color: @text-color-disabled;
    }
  }
  &-line {
    margin-right: @gap;
  }
}
</style>