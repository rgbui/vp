<template>
  <ol>
    <li v-for="(item, index) in childs" :key="item.id || index">
      <div
        class="vp-tree-item"
        :class="getItemClass(item)"
        :style="getItemStyle(item)"
        @contextmenu="contextmenu(item, $event)"
      >
        <i @click="clickSpread(item, $event)">
          <VpIcon
            :icon="item.spread == true ? 'angle-down:font' : 'angle-right:font'"
            v-if="item.childs && item.childs.length > 0"
          ></VpIcon>
        </i>
        <VpIcon :icon="item.icon" v-if="item.icon ? true : false"></VpIcon>
        <span v-if="tree.editId != item.id">{{ item.text }}</span>
        <input v-else type="text" v-model="item.text" />
        <div class="vp-tree-item-operators">
          <VpIcon
            v-for="(op, at) in getOperators(item)"
            :key="at"
            :icon="op.icon"
            @click.native="operatorClick(item, op)"
          ></VpIcon>
        </div>
        <div class="vp-tree-item-message"></div>
      </div>
      <vp-tree
        v-if="item.spread == true"
        :childs="item.childs"
        :deep="deep + 1"
      ></vp-tree>
    </li>
  </ol>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  name: "VpTree",
  inject: ["tree"],
  provide() {
    if (this.deep == 0) return { tree: this };
    else return {};
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
    deep: {
      type: Number,
      default: 0,
    },
    /***
     * root props
     */
    focusIds: { type: Array as PropType<string[]>, default: [] },
    errorIds: { type: Array as PropType<string[]>, default: [] },
    editId: { type: String, default: "" },
    editErrorMsg: { type: String, default: "" },
  },
  computed: {
    style() {
      return {};
    },
  },
  methods: {
    getOperators(item) {},
    operatorClick(item, operator) {},
    getItemStyle(item) {},
    getItemClass(item) {
      let classList: string[] = [];
      if (this.tree && Array.isArray(this.tree.focusIds)) {
        if (this.tree.focusIds.exists((x) => x == item.id)) {
          classList.push("vp-item-focus");
        }
        if (this.tree.errorIds.exists((x) => x == item.id)) {
          classList.push("vp-item-error");
        }
      }
      return classList;
    },
    clickSpread(item, event: MouseEvent) {},
    contextmenu(item, event: MouseEvent) {},
  },
});
</script>
<style lang="less">
</style>