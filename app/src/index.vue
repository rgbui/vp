<template>
  <div class="designer">
    <div class="designer-head"></div>
    <div class="designer-content">
      <div class="designer-left">
        <div class="designer-tree" ref="tree"></div>
      </div>
      <div class="designer-right"></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { renderLayout } from "./layout";
export default Vue.extend({
  mounted() {
    renderLayout(this);
  },
});
</script>