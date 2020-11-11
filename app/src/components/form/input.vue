<template>
  <div
    :class="[
      'vp-input',
      type == 'textarea' ? 'vp-textarea' : '',
      {
        'vp-input-disabled': disabled,
        'vp-input-focus': isFocus,
      },
    ]"
  >
    <span v-if="$slots.prepend ? true : false" class="vp-input-prepend">
      <slot name="prepend"></slot>
    </span>
    <input
      v-if="type != 'textarea'"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly || disabled"
      :style="style"
      @blur="blur"
      @input="input"
      @keydown.stop="keydown"
      @focus="focus"
      :maxlength="maxLength"
    />
    <textarea
      v-else
      :value="value"
      :readonly="readonly || disabled"
      @keydown.stop="keydown"
      :placeholder="placeholder"
      :disabled="disabled"
      :style="style"
      @blur="blur"
      @input="input"
      @focus="focus"
    ></textarea>
    <span class="vp-input-append" v-if="$slots.append ? true : false">
      <slot name="append"></slot>
    </span>
    <span
      class="vp-input-append"
      v-else-if="clear && value ? true : false"
      style="cursor: pointer"
      @click="clearInput"
    >
      <vp-icon icon="times:font" />
    </span>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: "" },
    value: { type: String, default: "" },
    /**
     * 对当前输入的值进行校验，如果返回文本，则说明有错误
     * 如果有异步的校验，可传递callback
     * validMethod:(val:string,callback?:(error)=>void):string
     */
    valid: {
      type: Function as PropType<
        (val: string, callback?: (error: string) => void) => string
      >,
    },

    /***
     * text password textarea
     */
    type: { type: String, default: "text" },
    /**
     * 输入框的高度
     */
    inputHeight: { type: Number },
    /**
     * 删了输入框内容
     */
    clear: { type: Boolean, default: false },
    /**
     * 用户输入时是否异步更新
     */
    sync: { type: Boolean, default: true },
    syncDue: { type: Number, default: 2e3 },
    maxLength: { type: Number },
  },
  data() {
    return {
      isFocus: false,
    };
  },
  computed: {
    style() {
      var style: Record<string, any> = {};
      if (typeof this.inputHieght == "number")
        style.height = this.inputHeight + "px";
      return style;
    },
  },
  methods: {
    input(event: FocusEvent) {
      var input = event.target as HTMLInputElement;
      this.value = input.value;
      if (typeof this.valid == "function") {
        var error = this.valid(this.value, (error) => {
          if (typeof error == "string") this.emit("error", error);
        });
        if (typeof error == "string") this.emit("error", error);
      }
      this.notify();
    },
    focus() {
      this.isFocus = true;
    },
    blur() {
      this.isFocus = false;
      this.notify(true);
    },
    keydown(event: KeyboardEvent) {},
    clearInput() {
      this.value = "";
      this.notify();
    },
    notify(force?: boolean) {
      if (this.timer) clearTimeout(this.timer);
      if (this.sync == true && force != true) {
        this.timer = setTimeout(() => {
          this.$emit("input", this.value);
        }, this.syncDue);
      } else {
        this.$emit("input", this.value);
      }
    },
  },
});
</script>
<style lang="less">
.vp-input {
  display: block;
  width: 100%;
  position: relative;
  input[type="text"],
  input[type="password"],
  textarea {
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
  textarea {
    height: 60px;
    text-indent: 0px;
    padding: 3px @gap-min;
    resize: none;
  }
  &-append,
  &-prepend {
    position: absolute;
    min-width: 22px;
    height: 22px;
    color: @text-color-disabled;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0px;
    cursor: pointer;
  }
  &-append {
    right: 0px;
  }
  &-prepend {
    left: 0px;
  }
  &-prepend + input,
  &-prepend + textarea {
    text-indent: 22px !important;
  }
  &-focus {
    textarea,
    input {
        border: 1px solid @primary-color !important;
    }
    .vp-input-prepend,
    .vp-input-append {
      color: @text-color-secondary;
    }
  }
  &-disabled,
  &-disabled.vp-input-focus {
    input[type="text"],
    input[type="password"],
    textarea {
      border: 1px solid @grey-border;
      color: @text-color-disabled;
    }
    .vp-input-prepend,
    .vp-input-append {
      color: @text-color-disabled;
    }
  }
}
</style>