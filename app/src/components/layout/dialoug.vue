
<template>
  <div class="dialoug-cover" v-if="show" @mousedown="closeCover">
    <div class="dialoug" :style="dialougStyle || {}">
      <div class="dialoug-head" v-if="head">
        <Icon :icon="icon"></Icon><span></span>
      </div>
      <div class="dialoug-head-btns" v-if="head">
        <Icon icon="remove:font" @click.native="close"></Icon>
      </div>
      <div class="dialoug-content" :style="contentStyle || {}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.dialoug-cover {
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 100000;
  background-color: rgba(0, 0, 0, 0.25);
  // &&::after {
  //   content: "\20";
  //   position: absolute;
  //   top: 0px;
  //   left: 0px;
  //   width: 100%;
  //   height: 100%;
  //   z-index: 1;
  //}
  .dialoug {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    border-radius: 4px;
    &-head {
      height: 30px;
    }
    &-content {
      padding: 10px;
    }
  }
}
</style>
<script lang="ts">
import Vue from "vue";
import Icon from "./icon.vue";
export default Vue.extend({
  props: {
    dialougStyle: { type: Object, default: null },
    contentStyle: { type: Object, default: null },
    head: { type: Boolean, default: true },
    show: { type: Boolean, default: false },
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    closeCover(event: MouseEvent) {
      if (event.target === this.$el) {
        this.close();
      } else return;
    },
  },
});
</script>