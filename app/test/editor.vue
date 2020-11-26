<template>
  <div class="editor-region"></div>
</template>
<script lang="ts">
import Vue from "vue";
import { Editor } from "../src/rich/editor";
export default Vue.extend({
  mounted() {
    let editor = new Editor(this.$el, { width: 400, height: 300 });
  },
});
</script>
<style lang="less">
.editor-region {
  border: 1px solid @grey-border;
}
</style>