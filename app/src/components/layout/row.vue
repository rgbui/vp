<template>
  <div
    class="vp-row-label"
    v-if="typeof label != typeof undefined ? true : false"
  >
    <div class="vp-label" :style="labelStyle">{{ label }}</div>
    <div class="vp-row" :style="style">
      <slot></slot>
    </div>
  </div>
  <div v-else class="vp-row" :style="style">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  inject: ["panel"],
  computed: {
    style() {
      var style: Record<string, any> = {};
      var gap = this.getDefault(
        this.panel ? this.panel.rowGap : undefined,
        this.rowGap,
        10
      );
      style.marginTop = gap + "px";
      style.marginBottom = gap + "px";
      style.justifyContent = "flex-start;";
      var align = this.getDefault(
        this.panel ? this.panel.align : undefined,
        this.align,
        "left"
      );
      if (align == "center") style.justifyContent = "center";
      else if (align == "right") style.justifyContent = "flex-end";
      style.alignItems = "flex-start";
      var valign = this.getDefault(
        this.panel ? this.panel.valign : undefined,
        this.valign,
        "top"
      );
      if (valign == "middle") style.alignItems = "center";
      else if (valign == "bottom") style.alignItems = "flex-end";
      return style;
    },
    labelStyle() {
      var style: Record<string, any> = {};
      var colGap = 10;
      if (typeof this.colGap == "number") colGap = this.colGap;
      else if (this.panel && typeof this.panel.colGap == "number")
        colGap = this.panel.colGap;
      style.paddingLeft = colGap / 2 + "px";
      style.paddingRight = colGap / 2 + "px";
      var lineGap = 5;
      if (typeof this.lineGap == "number") lineGap= this.lineGap;
      else if (this.panel && this.panel.lineGap) lineGap = this.panel.lineGap;
      style.paddingTop = lineGap / 2 + "px";
      style.paddingBottom = lineGap / 2 + "px";
      var gap = this.getDefault(
        this.panel ? this.panel.rowGap : undefined,
        this.rowGap,
        10
      );
      style.marginTop = gap + "px";
      style.marginBottom = gap + "px";
      style.width =
        this.getDefault(
          this.panel ? this.panel.labelWidth : undefined,
          this.labelWidth,
          160
        ) + "px";
      style.justifyContent = "flex-start;";
      var align = this.getDefault(
        this.panel ? this.panel.labelAlign : undefined,
        this.labelAign,
        "right"
      );
      if (align == "center") style.justifyContent = "center";
      else if (align == "right") style.justifyContent = "flex-end";
      style.alignItems = "flex-start";
      var valign = this.getDefault(
        this.panel ? this.panel.labelValign : undefined,
        this.labelValign,
        "middle"
      );
      if (valign == "middle") style.alignItems = "center";
      else if (valign == "bottom") style.alignItems = "flex-end";
      return style;
    },
  },
  props: {
    label: { type: String },
    labelWidth: { type: Number },
    labelAlign: { type: String },
    labelValign: { type: String },
    rowGap: { type: Number },
    colGap: { type: Number },
    lineGap: { type: Number },
  },
  methods: {
    getDefault(panelValue, currentValue, defaultValue) {
      if (currentValue) return currentValue;
      if (panelValue) return panelValue;
      if (defaultValue) return defaultValue;
    },
  },
});
</script>
<style lang="less">
.vp-row,
.vp-label,
.vp-row-label {
  display: flex;
}
.vp-row-label{
    justify-content: flex-start;
    align-items: flex-start;
}
.vp-label {
   flex-shrink: 0;
   min-height: 22px;
}
.vp-row-label > .vp-row {
  flex-grow: 1;
}
.vp-row {
  flex-wrap: wrap;
}
</style>