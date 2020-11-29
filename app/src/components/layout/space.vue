<template>
  <div class="vp-space" :class="['vp-space-' + arrow]"><slot></slot></div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    arrow: { type: String, default: "x" },
    gap: { type: Number, default: 10 },
  },
  mounted() {
    var ele: HTMLDivElement = this.$el;
    var cs = ele.children;
    for (let i = 0; i < cs.length - 1; i++) {
      let el: HTMLDivElement = cs[i] as HTMLDivElement;
      if (this.arrow == "x") el.style.marginRight = this.gap + "px";
      else if (this.arrow == "y") el.style.marginBottom = this.gap + "px";
    }
  },
});
</script>
<style lang="less">
.vp-space {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  &-y {
    flex-direction: column;
  }
}
</style>