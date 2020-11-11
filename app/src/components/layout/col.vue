<template>
  <div
    :class="[
      'vp-col',
      'vp-col-' + span,
      offset > 0 ? 'vp-col-offset-' + offset : '',
    ]"
    :style="style"
  >
    <slot></slot>
  </div>
</template>
<style lang="less">
.vp-col {
  box-sizing: border-box;
}
.loop-vp-col(@count) when (@count > 0) {
  .vp-col-@{count} {
    width: percentage(((@count)/12));
  }
  .loop-vp-col(@count - 1) // 递归调用自身;
}
.loop-vp-col(12);
.loop-vp-offset(@count) when (@count > 0) {
  .vp-row > .vp-col-offset-@{count} {
    margin-left: percentage(((@count)/12));
  }
  .loop-vp-offset(@count - 1) // 递归调用自身;
}
.loop-vp-offset(12);
</style>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  inject: ["panel", "row"],
  props: {
    span: { type: Number, default: 12 },
    offset: { type: Number, default: 0 },
    align: { type: String, default: "left" },
    valign: { type: String, default: "top" },
    gap: { type: Number },
    lineGap: { type: Number },
  },
  computed: {
    style() {
      var style: Record<string, any> = {};
      var gap = 10;
      if (typeof this.gap == "number") gap = this.gap;
      else if (this.row && this.row.colGap) gap = this.row.colGap;
      else if (this.panl && this.panel.colGap) gap = this.panel.colGap;
      style.paddingLeft = gap / 2 + "px";
      style.paddingRight = gap / 2 + "px";
      var lineGap = 5;
      if (typeof this.lineGap == "number") lineGap = this.lineGap;
      else if (this.row && this.row.lineGap) lineGap = this.row.lineGap;
      else if (this.panl && this.panel.lineGap) lineGap = this.panel.lineGap;
      style.paddingTop = lineGap / 2 + "px";
      style.paddingBottom = lineGap / 2 + "px";
      if (
        !(
          typeof this.align == typeof undefined &&
          typeof this.valign == typeof undefined
        )
      ) {
        style.display = "flex";
        style.flexWrap = "wrap";
        style.justifyContent = "flex-start;";
        if (this.align == "center") style.justifyContent = "center";
        else if (this.align == "right") style.justifyContent = "flex-end";
        style.alignItems = "flex-start";
        if (this.valign == "middle") style.alignItems = "center";
        else if (this.valign == "bottom") style.alignItems = "flex-end";
      }
      return style;
    },
  },
});
</script>