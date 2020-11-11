<template>
  <span
    :title="title"
    class="vp-icon"
    :class="[disabled ? 'vp-icon-disabled' : '']"
    v-html="icon_html"
    ><slot></slot
  ></span>
</template>
<script lang="ts">
///<reference path='../../../../declare.d.ts'/>
import Vue from "vue";
export default Vue.extend({
  props: {
    title: { type: String },
    /**
     * @param icon [name:font] font-awesome
     * @param icon [name:vp] fonticon.cn 阿里巴巴上面提供的图标库
     * @param icon [name:icon]  这是本身提供的图片库
     * @param icon [name:svg]   是本地提供的svg文件（会读取当前SVG的信息）
     *
     */
    icon: String,
    angle: { type: Number, default: 0 },
    /**
     * @param flip none 不翻转
     * @param  flip x 水平翻转
     * @param flip y  垂直翻转
     */
    flip: { type: String, default: "none" },
    size: Number,
    disabled: { type: Boolean, default: false },
  },
  computed: {
    icon_style() {
      var style = {} as any;
      if (typeof this.size == "number") {
        style.width = this.size + "px";
        style.height = this.size + "px";
      }
      var angle: number = 0;
      if (typeof this.angle == "number") angle = this.angle;
      if (angle != 0) {
        style["transform"] = `rotate(${angle}deg)`;
      }
      if (this.filp == "x") {
        if (style["transform"]) style["transform"] += `scaleX(-1)`;
        else style["transform"] = `scaleX(-1)`;
      } else if (this.flip == "y") {
        if (style["transform"]) style["transform"] += `scaleY(-1)`;
        else style["transform"] = `scaleY(-1)`;
      }
      return style;
    },
    icon_html() {
      if (!this.icon) {
        return;
      }
      var ics = this.icon.split(":");
      var name = ics[0];
      var type = "font";
      if (ics[1]) type = ics[1];
      var map: any = {
        font: "fa",
        vp: "vpfont",
      };
      var prefix = map[type as any] as any;
      if (typeof prefix == "string")
        return `<span class='${prefix} ${prefix}-${name}'></span>`;
      else {
        if (typeof window.importVpIcon == "function") {
          return window.importVpIcon(type, name);
        }
      }
    },
  },
});
</script>