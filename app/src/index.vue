<template>
  <div class="designer">
    <div class="designer-slider" :style="{ width: toolWidth + 'px' }">
      <workspace-bar ref="workspace-bar"></workspace-bar>
      <vp-tree class="designer-tree" ref="tree"></vp-tree>
    </div>
    <div class="designer-content">
      <tool-bar></tool-bar>
      <div ref="designer" style="margin-top: 50px"></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { renderLayout } from "./layout";
import WorkspaceBar from "./workspace/bar.vue";
import VpTree from "./components/present/tree.vue";
import ToolBar from "./view/bar/tool.vue";

export default Vue.extend({
  components: {
    WorkspaceBar,
    VpTree,
    ToolBar,
  },
  computed: {
    tree() {
      return this.$refs.tree;
    },
    workspaceBar() {
      return this.$refs["workspace-bar"];
    },
    designer() {
      return this.$refs["designer"];
    },
  },
  data() {
    return {
      toolWidth: 250,
    };
  },
  mounted() {
    renderLayout(this);
  },
  methods: {},
});
</script>
<style lang="less">
.designer {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  height: 100vh;
  width: 100vw;
  &-slider {
    flex-shrink: 0;
    background-color: @grey-background;
  }
  &-content {
    flex-grow: 1;
    position: relative;
  }
  &-tree {
    padding: @gap 0px;
  }
}
</style>