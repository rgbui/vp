<template>
  <ol>
    <li v-for="(item, index) in childs" :key="item.id || index">
      <div
        class="vp-tree-item"
        :class="getItemClass(item)"
        :style="getItemStyle(item)"
        @contextmenu.prevent="contextmenu(item, $event)"
        @click="clickItem(item, $event)"
        @mousedown="dragStart(item, $event)"
        @mouseenter="mouseenter(item, $event)"
        @mouseleave="mouseleave(item, $event)"
      >
        <i @click="clickSpread(item, $event)">
          <vp-icon
            :icon="item.spread == true ? 'angle-down:font' : 'angle-right:font'"
            v-if="item.childs && item.childs.length > 0"
          ></vp-icon>
        </i>
        <vp-icon :icon="item.icon" v-if="item.icon ? true : false"></vp-icon>
        <span v-if="tree.editId != item.id">{{ item.text }}</span>
        <input
          v-else
          type="text"
          :value="item.text"
          @input="input(item, $event)"
          @keydown.enter="enter(item, $event)"
        />
        <div class="vp-tree-item-operators">
          <vp-icon
            v-for="(op, at) in getOperators(item)"
            :key="at"
            :icon="op.icon"
            @click.native.stop="operatorClick(item, op)"
          ></vp-icon>
        </div>
        <div class="vp-tree-item-message" v-if="tree.editId == item.id">
          {{ tree.editErrorMsg }}
        </div>
      </div>
      <vp-tree-box
        v-if="item.spread == true"
        :childs="item.childs"
        :deep="deep + 1"
      ></vp-tree-box>
    </li>
  </ol>
</template>
<script lang="ts">
import Vue from "vue";
import { Drag } from "../util/drag";
export default Vue.extend({
  name: "VpTreeBox",
  props: {
    childs: { type: Array },
    deep: { type: Number, default: 0 },
  },
  inject: ["tree"],
  methods: {
    getItemClass(item) {
      let classList: string[] = [];
      if (this.tree && Array.isArray(this.tree.focusIds)) {
        if (this.tree.focusIds.exists((x) => x == item.id)) {
          classList.push("vp-item-focus");
        }
        if (this.tree.errorIds.exists((x) => x == item.id)) {
          classList.push("vp-item-error");
        }
        if (this.tree.dragOverId == item.id) {
          if (this.tree.dragOverPos) {
            classList.push("vp-item-dragover-" + this.tree.dragOverPos);
          }
        }
      }
      return classList;
    },
    getItemStyle(item) {
      var style: Record<string, any> = {};
      style.paddingLeft = this.deep * 20 + "px";
      return style;
    },
    getOperators(item) {
      if (typeof this.tree.getItemOperators == "function") {
        var result = this.tree.getItemOperators(item);
        if (Array.isArray(result)) return result;
      } else if (Array.isArray(this.tree.itemOperators)) {
        return this.tree.itemOperators;
      }
      return [];
    },
    operatorClick(item, op) {
      this.tree.$emit("operatorClick", { item, operaror: op });
    },
    input(item, event: MouseEvent) {
      if (typeof this.tree.validInput == "function") {
        var r = this.tree.validInput(
          item,
          (event.target as HTMLInputElement).value.trim(),
          (msg) => {
            if (msg) this.tree.editErrorMsg = msg;
            else this.tree.editErrorMsg = "";
          }
        );
        if (r) this.tree.editErrorMsg = r;
        else this.tree.editErrorMsg = "";
      }
    },
    enter(item, event: KeyboardEvent) {
      var newName = (event.target as HTMLInputElement).value;
      newName = newName.trim();
      if (typeof this.tree.validName == "function") {
        var r = this.tree.validName(item, newName);
        if (r == false) newName = item.text;
      }
      if (item.text != newName) {
        this.tree.history("rename", {
          nodeId: item.id,
          oldName: item.text,
          newName: newName,
        });
        this.tree.$emit("rename", { item, oldName: item.text, newName });
      }
      item.text = newName;
      this.tree.editId = "";
    },
    contextmenu(item, event: MouseEvent) {
      this.tree.$emit("contextmenu", { item, event });
    },
    clickItem(item, event: MouseEvent) {
      this.tree.focusIds = [item.id];
      this.tree.$emit("click", { item, event });
    },
    clickSpread(item, event: MouseEvent) {
      if (typeof item.spread == "undefined") this.$set(item, "spread", true);
      else item.spread = !item.spread;
    },
    dragStart(item, event: MouseEvent) {
      if (this.tree.dragger != true) return;
      var itemDiv = event.currentTarget as HTMLDivElement;
      var bound = itemDiv.getBoundingClientRect();
      var clone = itemDiv.cloneNode(true) as HTMLDivElement;
      var self = this;
      Drag({
        mousedownEvent: event,
        moveStart() {
          self.tree.dragId = item.id;
        },
        getDragElement() {
          return clone;
        },
        setDragBox(dragBox) {
          dragBox.style.marginLeft = bound.left - event.pageX + "px";
          dragBox.style.marginTop = bound.top - event.pageY + "px";
        },
        moveEnd(isMove, ev) {
          if (isMove) {
            if (self.tree.dragOverId) {
              self.tree.move(
                self.tree.find(self.tree.dragId),
                self.tree.find(self.tree.dragOverId),
                self.tree.dragOverPos
              );
            }
          }
          self.tree.dragId = "";
        },
      });
    },
    mouseenter(item, event: MouseEvent) {
      if (this.tree.dragId) this.tree.dragOverId = item.id;
      var itemDiv = event.currentTarget as HTMLDivElement;
      var span = itemDiv.querySelector(">span");
      var sb = span.getBoundingClientRect();
      if (event.pageY < sb.top + sb.height / 3) {
        this.tree.dragOverPos = "prev";
      } else {
        if (event.pageY < sb.left) {
          this.tree.dragOverPos = "next";
        } else this.tree.dragOverPos = "append";
      }
    },
    mouseleave(item, event: MouseEvent) {
      this.tree.dragOverId = "";
      this.tree.dragOverPos = "";
    },
  },
});
</script>
<style lang="less">
</style>