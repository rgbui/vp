<template>
  <div class="editor-region"></div>
</template>
<script lang="ts">
import Vue from "vue";
import { Editor } from "../src/rich/editor";
export default Vue.extend({
  mounted() {
    let editor = new Editor(this.$el as HTMLDivElement, {
      width: 400,
      height: 300,
    });
    var el: HTMLDivElement = this.$el;
    el.style.marginTop = "100px";
    el.style.marginLeft = "100px";
    el.style.width = "400px";
    el.style.height = "300px";
  },
});
</script>
<style lang="less">
.editor-region {
  border: 1px solid @grey-border;
}
</style>