<template>
  <div class="vp-tree">
    <vp-tree-box :childs="childs"></vp-tree-box>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { util } from "../../../util/util";
export default Vue.extend({
  name: "VpTree",
  provide() {
    return { tree: this };
  },
  data() {
    return {
      focusIds: [],
      errorIds: [],
      editId: "",
      editErrorMsg: "",
      dragId: "",
      dragOverId: "",
      dragOverPos: "",
    };
  },
  props: {
    childs: {
      type: Array as PropType<
        {
          icon?: string;
          text?: string;
          spread?: boolean;
          id?: string;
          childs?: any[];
        }[]
      >,
      default: [],
    },
    dragger: {
      type: Boolean,
      default: true,
    },
    validName: {
      type: Function,
    },
    validInput: {
      type: Function,
    },
  },
  methods: {
    onEdit(node) {
      this.editId = node.id;
    },
    onFocus(node) {
      this.focusIds = [node.id];
    },
    find(nodeId: string) {
      if (Array.isArray(this.childs))
        return this.childs.arrayJsonFind("childs", (x) => x.id == nodeId);
    },
    findParent(nodeId: string) {
      if (this.childs.exists((x) => x.id == nodeId)) return null;
      else
        return this.childs.arrayJsonFind(
          "childs",
          (x) =>
            Array.isArray(x.childs) && x.childs.exists((z) => z.id == nodeId)
        );
    },
    findIndex(nodeId) {
      var pa = this.findParent(nodeId);
      if (pa) {
        return pa.childs.findIndex((x) => x.id == nodeId);
      } else return this.childs.findIndex((x) => x.id == nodeId);
    },
    remove(nodeId: string) {
      var pa = this.findParent(nodeId);
      var at = this.findIndex(nodeId);
      var node = this.find(nodeId);
      this.history("remove", {
        parentId: pa ? pa.id : undefined,
        at,
        data: this.getNode(node),
      });
      if (Array.isArray(this.childs))
        this.childs.arrayJsonRemove("childs", (x) => x.id == nodeId);
    },
    move(dragNode, toNode, pos: "prev" | "next" | "append") {
      var pa = this.findParent(dragNode.id);
      var at = this.findIndex(dragNode.id);
      if (Array.isArray(this.childs))
        this.childs.arrayJsonRemove("childs", (x) => x.id == dragNode.id);
      if (pos == "prev" || pos == "next") {
        var toPa = this.findParent(toNode);
        var toAt = this.findIndex(toNode);
        if (pos == "next") toAt += 1;
        var toArray = toPa ? toPa.childs : this.childs;
        toArray.insertAt(toAt, dragNode);
        this.history("move", {
          nodeId: dragNode.id,
          from: { parentId: pa ? pa.id : undefined, at },
          to: { parentId: toPa ? toPa.id : undefined, at: toAt },
        });
      } else {
        if (!Array.isArray(toNode.childs)) this.$set(toNode, "childs", []);
        toNode.childs.push(dragNode);
        this.history("move", {
          nodeId: dragNode.id,
          from: { parentId: pa ? pa.id : undefined, at },
          to: { parentId: toNode.id, at: toNode.childs.length },
        });
      }
      this.$emit("move", { from: dragNode, to: toNode, pos });
    },
    create(newNode, toNode, pos: "prev" | "next" | "append") {
      if (typeof newNode == "undefined") newNode = util.guid();
      if (pos == "prev" || pos == "next") {
        var toPa = this.findParent(toNode);
        var toAt = this.findIndex(toNode);
        if (pos == "next") toAt += 1;
        var toArray = toPa ? toPa.childs : this.childs;
        toArray.insertAt(toAt, newNode);
        this.history("create", {
          data: util.clone(newNode),
          to: { parentId: toPa ? toPa.id : undefined, at: toAt },
        });
      } else {
        if (!Array.isArray(toNode.childs)) this.$set(toNode, "childs", []);
        toNode.childs.push(newNode);
        this.history("create", {
          data: util.clone(newNode),
          to: { parentId: toNode.id, at: toNode.childs.length },
        });
      }
    },
    update(node, newNodeInfo) {
      var oldValue: Record<string, any> = {};
      var newValue: Record<string, any> = {};
      for (var n in newNodeInfo) {
        var ov = node[n];
        var nv = newNodeInfo[n];
        if (util.valueIsEqual(ov, nv)) continue;
        node[n] = util.clone(newNodeInfo[n]);
        oldValue[n] = ov;
        newValue[n] = nv;
      }
      this.history("update", { nodeId: node.id, oldValue, newValue });
      this.$emit("update", { node, update: newNodeInfo });
    },
    get() {
      return this.childs.arrayJsonToArray("childs", (x) => {
        var json = {};
        for (var n in x) {
          if (n == "childs") continue;
          else json[n] = util.clone(x[n]);
        }
        return json;
      });
    },
    getNode(node) {
      return ([node] as any).arrayJsonToArray("childs", (x) => {
        var json = {};
        for (var n in x) {
          if (n == "childs") continue;
          else json[n] = util.clone(x[n]);
        }
        return json;
      })[0];
    },
    history(command, data) {
      this.$emit("history", { command, data });
    },
  },
});
</script>
<style lang="less">
</style>