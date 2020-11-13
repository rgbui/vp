<template>
  <ol v-if="show" :style="style" class="vp-contextmenu-box">
    <li
      v-for="(item, index) in menus"
      :key="item.name || index"
      @mouseleave="mouseleave(index, $event)"
      @mouseenter="mouseenter(index, $event)"
    >
      <a
        class="vp-contextmenu-item-option"
        :class="[
          item.disabled == true ? 'vp-contextmenu-item-disabled' : '',
          focusIndex == index ? 'hover' : '',
        ]"
        @mousedown="mousedown(item, $event)"
        v-if="item.type == 'text' || (item.type ? false : true)"
      >
        <i><vp-icon v-if="item.icon ? true : false" :icon="item.icon" /></i>
        <span>{{ item.text }}</span>

        <em
          class="vp-contextmenu-box-item-arrow"
          v-if="item.childs && item.childs.length > 0"
        >
          <vp-icon icon="angle-down:font"></vp-icon>
        </em>
        <label v-else-if="item.label ? true : false">{{ item.label }}</label>
      </a>
      <a v-else-if="item.type == 'devide'" class="vp-contextmenu-item-devide">
      </a>
      <a
        v-else-if="item.type == 'check'"
        class="vp-contextmenu-item-check"
        @mousedown="check(item, $event)"
        :class="[item.disabled == true ? 'vp-contextmenu-item-disabled' : '']"
      >
        <i>
          <vp-icon v-if="item.check == true" icon="check:font"></vp-icon>
        </i>
        <span>{{ item.text }}</span>
        <em
          class="vp-contextmenu-box-item-arrow"
          v-if="item.childs && item.childs.length > 0"
        >
          <vp-icon icon="angle-down:font"></vp-icon>
        </em>
        <label v-else-if="item.label ? true : false">{{ item.label }}</label>
      </a>
      <a v-else-if="item.type == 'input'" class="vp-contextmenu-item-input">
        <input
          type="text"
          :placeholder="item.placeholder"
          v-model="item.value"
          @keydown.enter="input(item, $event)"
        />
      </a>
      <a v-else-if="item.type == 'html'" class="vp-contextmenu-item-html">
        <i></i>
        <span v-html="item.value"></span>
      </a>
      <vp-contextmenu-box
        :ref="'box' + index"
        :menus="item.childs"
        v-if="item.childs && item.childs.length > 0"
        :deep="deep + 1"
      ></vp-contextmenu-box>
    </li>
  </ol>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { ContextmenuItem } from "./contextmenu.single";
export default Vue.extend({
  name: "VpContextmenuBox",
  props: {
    menus: {
      type: Object as PropType<ContextmenuItem[]>,
      default: [],
    },
    deep: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      focusIndex: -1,
      show: this.deep == 0 ? true : false,
    };
  },
  computed: {
    style() {
      var style: Record<string, any> = {};
      if (this.deep > 0) {
        style.width = this.contextmenu.itemWidth + "px";
      }
      return style;
    },
  },
  inject: ["contextmenu"],
  methods: {
    input(item, event: FocusEvent) {
      item.value = (event.target as HTMLInputElement).value;
      if (this.contextmenu) this.contextmenu.input(item, event);
    },
    mousedown(item, event: MouseEvent) {
      if (this.contextmenu) this.contextmenu.mousedown(item, event);
    },
    check(item, event) {
      if (typeof item.check == "undefined") this.$set(item, "check", true);
      else item.check = item.check ? false : true;
      if (this.contextmenu) this.contextmenu.check(item, event);
    },
    mouseenter(index, event: MouseEvent) {
      this.focusIndex = index;
      var subBox = this.$refs["box" + index];
      if (Array.isArray(subBox)) subBox = subBox[0];
      if (subBox) {
        subBox.open();
      }
    },
    mouseleave(index, event: MouseEvent) {
      this.focusIndex = -1;
      var subBox = this.$refs["box" + index];
      if (Array.isArray(subBox)) subBox = subBox[0];
      if (subBox) {
        subBox.close();
      }
    },
    open() {
      this.show = true;
      Vue.nextTick(() => {});
    },
    close() {
      this.show = false;
    },
  },
});
</script>
<style lang="less">
.vp-contextmenu-box {
  > li {
    position: relative;
    > a {
      position: relative;
      height: @height;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-right: @gap-min;
      > i {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: @height;
        height: @height;
        flex-shrink: 0;
        .vp-icon {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: @height;
          height: @height;
        }
      }
      > span {
        display: inline-block;
        flex-grow: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      > label {
        display: inline-flex;
        justify-content: flex-end;
        align-items: center;
        flex-shrink: 0;
        width: 60px;
      }
      > em {
        position: absolute;
        top: 0px;
        right: @gap-min;
        height: 100%;
        width: @height;
        height: @height;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &:hover,
      &.hover {
        background-color: @primary-color;
        > i,
        > span,
        > label,
        > em {
          color: #fff;
        }
      }
    }
    > .vp-contextmenu-box {
      position: absolute;
      top: 0px;
      right: -100%;
      border-radius: @radius-2x;
      background-color: @grey-background;
      border: 1px solid @grey-border-2x;
      box-shadow: @shadow;
      padding: @gap-min 0px;
    }
  }
  .vp-contextmenu-item {
    &-input {
      padding-left: @gap-min;
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
      &:hover {
        background-color: transparent;
      }
    }
    &-devide {
      height: 12px;
      position: relative;
      &::after {
        content: "\20";
        position: absolute;
        top: 5px;
        height: 1px;
        left: 0px;
        right: 0px;
        background-color: @grey-border-3x;
      }
      &:hover {
        background-color: transparent;
      }
    }
    &-disabled {
      min-height: 22px;
      > i,
      > span,
      > label,
      > em {
        color: @text-color-disabled;
      }
      &:hover {
        background-color: transparent;
        i,
        span,
        label,
        em {
          color: @text-color-disabled;
        }
      }
    }
  }
}
</style>