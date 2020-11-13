<template>
  <div
    class="vp-contextmenu"
    tabindex="1"
    @focusin="focus"
    @focusout="blur"
    v-show="show"
    :style="style"
  >
    <vp-contextmenu-box :menus="menus"></vp-contextmenu-box>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { ContextmenuItem } from "./contextmenu.single";
export default Vue.extend({
  name: "VpContextmenu",
  props: {
    menus: { type: Array as PropType<ContextmenuItem> },
    itemWidth: { type: Number, default: 180 },
  },
  data() {
    return {
      show: false,
      top: 0,
      left: 0,
      isFocus: false,
    };
  },
  computed: {
    style() {
      var style: Record<string, any> = {};
      style.top = this.top + "px";
      style.left = this.left + "px";
      style.width = this.itemWidth + "px";
      return style;
    },
  },
  provide() {
    return {
      contextmenu: this,
    };
  },
  methods: {
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
      this.show = false;
    },
    open(menus, point: { x: number; y: number }) {
      this.menus = menus;
      this.top = point.y;
      this.left = point.x;
      this.show = true;
      Vue.nextTick(() => {
        (this.$el as HTMLInputElement).focus();
        //主要是自动调整当前菜单的位置，尽可能的显示在屏幕中。
        this.autoAdjustPosition();
      });
    },
    autoAdjustPosition() {},
    mousedown(item, event) {
      this.show = false;
      this.$emit("mousedown", { item, event });
    },
    input(item, event) {
      this.show = false;
      this.$emit("input", { item, event });
    },
    check(item, event) {
      this.show = false;
      this.$emit("check", { item, event });
    },
  },
});
</script>
<style lang="less">
.vp-contextmenu {
  min-width: 180px;
  border-radius: @radius-2x;
  background-color: @grey-background;
  border: 1px solid @grey-border-2x;
  box-shadow: @shadow;
  padding: @gap-min 0px;
  position: absolute;
}
</style>
