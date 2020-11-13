<template>
  <div
    :style="selectStyle"
    class="vp-select"
    :class="[
      disabled ? 'vp-select-disabled' : '',
      multiple ? 'vp-select-multiple' : '',
      'vp-select-drop-' + dropAlign,
      'vp-select-' + type,
      isFocus ? 'vp-select-focus' : '',
      block ? '' : 'vp-select-line',
    ]"
    tabindex="1"
    @focusin="focus"
    @focusout="blur"
  >
    <div class="vp-select-display" @click="toggle">
      <slot :option="currentOption">
        <input
          v-if="multiple == false && type == 'box'"
          readonly
          type="text"
          :placeholder="placeholder"
          :value="currentText"
        />
        <span v-else-if="multiple == false && type == 'drop'">{{
          currentText
        }}</span>
        <div v-else class="vp-select-display-multiple">
          <a v-for="(item, index) in currentText" :key="index">
            <span>{{ item }}</span
            ><i @click.stop="remove(index)">&times;</i></a
          >
        </div>
      </slot>
      <vp-icon icon="angle-down:font"></vp-icon>
    </div>
    <div v-if="spread" class="vp-select-dropbox" :style="selectDropStyle">
      <vp-select-options :options="options"></vp-select-options>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    block: { type: Boolean, default: true },
    /**
     * @param type box
     * @param type drop
     */
    type: { type: String, default: "box" },
    placeholder: { type: String, default: "" },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    value: { type: Array as PropType<any[] | any> },
    options: {
      type: Array as PropType<
        {
          text: string;
          value: any;
          icon?: string;
          type?: "option" | "des" | "devide" | "check" | "input" | "html";
        }[]
      >,
    },
    dropAlign: { type: String, default: "full" },
    dropStyle: { type: Object, default: null },
    onlySelectSubOption: { type: Boolean, default: true },
  },
  data() {
    return {
      spread: false,
      isFocus: false,
      dropTop: 22,
    };
  },
  provide() {
    return { select: this };
  },
  computed: {
    currentOption() {
      if (this.multiple == true) {
        var ops = this.options.arrayJsonFindAll("childs", (x) => {
          return Array.isArray(this.value) && this.value.includes(x.value);
        });
        return ops;
      } else {
        var op = this.options.arrayJsonFind(
          "childs",
          (x) => x.value == this.value
        );
        return op;
      }
    },
    currentText() {
      if (this.multiple == true) {
        return this.currentOption.map((x) => x.text);
      } else {
        var op = this.currentOption;
        if (op) return op.text;
        else return "";
      }
    },
    selectDropStyle() {
      var style: Record<string, any> = {};
      if (this.dropStyle) Object.assign(style, this.dropStyle);
      style.top = this.dropTop + "px";
      if (this.block == true) {
        if (!style.minWidth) style.minWidth = "150px";
      }
      return style;
    },
    selectStyle() {
      var style: Record<string, any> = {};
      if (this.spread == true) {
        style.zIndex = "100000";
      }
      return style;
    },
  },
  methods: {
    remove(index) {
      if (Array.isArray(this.value)) this.value.removeAt(index);
      this.$emit("change", this.value);
    },
    clickOption(option) {
      if (option.disabled == true) return;
      if (Array.isArray(option.childs)) {
        if (this.onlySelectSubOption == true) return;
      }
      if (this.multiple == true) {
        if (!Array.isArray(this.value)) this.$set(this, "value", []);
        this.value.push(option.value);
        console.log(this.value, "option.value");
        this.$forceUpdate();
      } else {
        if (typeof this.value == "undefined")
          this.$set(this, "value", option.value);
        else this.value = option.value;
      }
      this.spread = false;
      this.$emit("change", this.value);
    },
    inputOption(option, value) {
      if (typeof option.value == "undefined") this.$set(option, "value", value);
      else option.value = value;
      this.$emit("inputChange", option);
    },
    checkOption(option) {
      if (typeof option.check == "undefined") this.$set(option, "check", true);
      else option.check = option.check ? false : true;
      this.spread = false;
      this.$emit("checkChange", option);
    },
    focus() {
      this.isFocus = true;
    },
    blur(event: FocusEvent) {
      if (
        (this.$el as HTMLDivElement).contains(
          event.relatedTarget as HTMLDivElement
        )
      )
        return;
      this.isFocus = false;
      this.spread = false;
    },
    toggle() {
      this.spread = !this.spread;
      if (this.spread == true) {
        var displayHeight = (this.$el as HTMLDivElement)
          .querySelector(".vp-select-display")
          .getBoundingClientRect().height;
        this.dropTop = displayHeight;
      }
    },
  },
});
</script>
<style lang="less">
.vp-select {
  position: relative;
  &-display {
    height: @height;
  }
  &-box {
    width: 100%;
    .vp-select-display {
      width: 100%;
      input {
        width: 100%;
        height: @height;
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
      > .vp-icon {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 22px;
        height: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: @text-color-disabled;
      }
    }
  }
  &-drop {
    display: inline-block;
    .vp-select-display {
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      > span {
        display: inline-block;
        color: @text-color-2x;
        cursor: pointer;
        margin-right: @gap-space;
      }
      > .vp-icon {
        display: inline-flex;
        color: @text-color-2x;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }
  &-drop-full {
    .vp-select-dropbox {
      left: 0px;
      right: 0px;
    }
  }
  &-drop-left {
    .vp-select-dropbox {
      left: 0px;
    }
  }
  &-drop-right {
    .vp-select-dropbox {
      right: 0px;
    }
  }
  &-dropbox {
    position: absolute;
    top: @height;
    box-shadow: @shadow-2x;
    border: 1px solid @grey-border-3x;
    padding: @gap-space 0px;
    border-radius: @radius-2x;
    background-color: @grey-background;
    max-height: 200px;
    overflow: auto;
  }
  &-multiple {
    .vp-select-display {
      min-height: @height;
      height: auto;
      &-multiple {
        width: 100%;
        min-height: @height;
        box-sizing: border-box;
        color: @text-color;
        background-color: @grey;
        border-radius: @radius;
        border: 1px solid @grey-border-3x;
        box-shadow: @shadow-inner-2x;
        text-indent: @gap-min;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        padding: 0px @gap-min @gap-min 0px;
        a {
          background-color: @primary-highlight;
          padding: @gap-space;
          margin: @gap-min 0px 0px @gap-min;
          border-radius: @radius;
          color: #fff;
          span {
            // display: inline-block;
          }
          i {
            // display: inline-block;
            margin-left: @gap-space;
            width: 8px;
          }
          &:hover {
            background-color: @primary-color;
          }
        }
      }
      > .vp-icon {
        height: 100%;
        align-items: flex-start;
        padding-top: 4px;
        box-sizing: border-box;
      }
    }
  }
  &-focus.vp-select-box {
    .vp-select-display {
      input {
        border: 1px solid @primary-color;
      }
      .vp-icon {
        background: @primary-fill;
        color: #fff;
        border-radius: @radius;
      }
    }
  }
  &-focus.vp-select-drop {
    .vp-select-display {
      span {
        color: @text-color;
      }
      .vp-icon {
        color: @text-color;
      }
    }
  }
  &-disabled {
    .vp-select-display {
      input {
        border: 1px solid @grey-border;
      }
      .vp-icon {
        background-color: transparent;
        color: @text-color-disabled;
        border-radius: @radius;
      }
    }
  }
  &-line {
    width: auto;
    margin-right: @gap;
  }
}
</style>