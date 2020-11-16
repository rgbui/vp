<template>
  <div class="designer">
    <div class="designer-head">
      <workspace-bar ref="workspace-bar"></workspace-bar>
    </div>
    <div class="designer-content">
      <div class="designer-left">
        <div class="designer-tree">
          <vp-tree ref="tree"></vp-tree>
        </div>
      </div>
      <div class="designer-right">
        <div ref="designer"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { renderLayout } from "./layout";
import WorkspaceBar from "./workspace/bar.vue";

export default Vue.extend({
  computed: {
    tree() {
      return this.$refs.tree;
    },
    workspaceBar() {
      return this.$refs["workspace-bar"];
    },
  },
  mounted() {
    renderLayout(this);
  },
});
</script>