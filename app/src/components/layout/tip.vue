<template>
  <div class="vp-tip" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <slot></slot>
  </div>
</template>
<style lang="less">
.vp-tip {
  display: inline-block;
}
.vp-tip-box {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  color: #fff;
  padding: 5px 10px;
  &-error {
  }
  &-warn {
  }
}
</style>
<script lang="ts">
import Vue from "vue";

class Tip {
  box: HTMLDivElement;
  constructor() {
    var div = document.createElement("div");
    div.setAttribute("class", "vp-tip-box");
    document.body.appendChild(div);
    this.box = div;
    this.box.style.display = "none";
  }
  open(
    el: HTMLDivElement,
    tip: string,
    options: {
      direction: "top" | "left" | "bottom" | "right";
      type: "text" | "warn" | "error";
      gap?: number;
    }
  ) {
    this.box.setAttribute(
      "class",
      ["vp-tip-box", "vp-tip-box" + options.type].join(" ")
    );
    this.box.innerHTML = tip;
    this.box.style.opacity = "0";
    this.box.style.display = "block";
    var gap = options.gap || 10;
    var bound = el.getBoundingClientRect();
    var boxBound = this.box.getBoundingClientRect();
    let top, left;
    if (options.direction == "top" || options.direction == "bottom") {
      left = bound.left + bound.width / 2 - boxBound.width / 2;
      if (options.direction == "top") {
        top = bound.top - gap - boxBound.height;
      } else if (options.direction == "bottom") {
        top = bound.top + bound.height + gap;
      }
      if (top < 0 || top + boxBound.height > window.innerHeight) {
        if (top < 0) {
          top = bound.top + bound.height + gap;
        } else {
          top = bound.top - gap - boxBound.height;
        }
      }
      if (left < 0 || left + boxBound.width > window.innerWidth) {
        if (left < 0) left = 10;
        else left = window.innerWidth - boxBound.width - 10;
      }
    } else if (options.direction == "left" || options.direction == "right") {
      top = bound.top + bound.height / 2 - boxBound.height / 2;
      if (options.direction == "left") {
        left = bound.left - gap - boxBound.width;
      } else if (options.direction == "right") {
        left = bound.left + bound.width + gap;
      }
      if (left < 0 || left + boxBound.width > window.innerWidth) {
        if (left < 0) left = bound.left + bound.width + gap;
        else left = bound.top - gap - boxBound.width;
      }
      if (top < 0 || top + boxBound.height > window.innerHeight) {
        if (top < 0) top = 20;
        else top = window.innerHeight - boxBound.height - 10;
      }
    }
    this.box.style.top = top + "px";
    this.box.style.left = left + "px";
    this.box.style.opacity = "1";
  }
  close() {
    this.box.setAttribute("class", "vp-tip-box");
    this.box.innerHTML = "";
    this.box.style.display = "none";
  }
  private static _tip: Tip;
  static get tip() {
    if (!this._tip) this._tip = new Tip();
    return this._tip;
  }
}

export default Vue.extend({
  props: {
    tip: { type: String, default: "" },
    gap: { type: Number },
    type: { type: String, default: "text" },
    direction: { type: String, default: "top" },
  },
  methods: {
    mouseenter() {
      this.timer = setTimeout(() => {
        Tip.tip.open(
          (this.$el as HTMLDivElement).children[0] as HTMLDivElement,
          this.tip,
          {
            direction: this.direction,
            type: this.type,
            gap: this.gap,
          }
        );
      }, 4e2);
    },
    mouseleave() {
      if (this.timer) {
        Tip.tip.close();
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
  },
});
</script>