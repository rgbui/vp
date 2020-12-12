<template>
  <div class="editor-selector">
    <div class="editor-selector-cursor" :style="style"></div>
    <textarea ref="textarea"></textarea>
    <div class="editor-selector-selection"></div>
    <div class="editor-selector-box"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    openCursor() {},
    closeCursor() {},
    renderCursor(cursorStyle: { top: number; left: number; height: number }) {},
  },
});
</script>