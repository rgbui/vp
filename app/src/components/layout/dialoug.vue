
<template>
  <div class="dialoug-cover" v-if="show" @click="closeCover">
    <div class="dialoug" :style="style || {}">
      <div class="dialoug-head" v-if="head">
        <Icon :icon="icon"></Icon><span></span>
      </div>
      <div class="dialoug-head-btns" v-if="head">
        <Icon icon="remove:font" @click.native="close"></Icon>
      </div>
      <div class="dialoug-content"><slot></slot></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Icon from "./icon.vue";
export default Vue.extend({
  props: {
    style: { type: Object, default: null },
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