<template>
  <ol :style="style">
    <li
      v-for="(item, index) in menus"
      :key="item.name || index"
      @mouseleave="mouseleave(item, $event)"
      @mouseenter="mouseenter(item, $event)"
    >
      <a v-if="item.type == 'text' || (item.type ? false : true)">
        <i><VpIcon v-if="item.icon ? true : false" :icon="item.icon" /></i>
        <span>{{ item.text }}</span>
        <label v-if="item.label ? true : false">{{ item.label }}</label>
        <em v-if="item.childs && item.childs.length > 0"></em>
      </a>
      <a v-else-if="item.type == 'sp'" class="vp-contextmenu-sp"> </a>
      <a v-else-if="item.type == 'check'">
        <i
          ><VpIcon
            :icon="item.value == true ? 'check:font' : 'uncheck:font'"
          ></VpIcon
        ></i>
        <span>{{ item.text }}</span>
        <label v-if="item.label ? true : false">{{ item.label }}</label>
        <em v-if="item.childs && item.childs.length > 0"></em>
      </a>
      <a v-else-if="item.type == 'input'">
        <input
          type="text"
          :placeholder="item.placeholder"
          v-model="item.value"
          @input="input(item, $event)"
        />
      </a>
      <a v-else-if="item.type == 'html'">
        <i></i>
        <span v-html="item.value"></span>
      </a>
      <vp-contextmenu
        :menus="item.childs"
        v-if="item.childs && item.childs.length > 0"
        :deep="deep + 1"
      ></vp-contextmenu>
    </li>
  </ol>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import VpIcon from "../layout/icon.vue";
export default Vue.extend({
  name: "VpContextmenu",
  props: {
    menus: {
      type: Object as PropType<
        {
          name?: string;
          icon?: string;
          text?: string;
          type?: "text" | "html" | "sp" | "checked" | "input";
          disabled?: boolean;
          label?: string;
        }[]
      >,
      default: [],
    },
    deep: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    style() {
      return {};
    },
  },
  methods: {
    input(item, event: FocusEvent) {},
    mousedown(item, event: MouseEvent) {},
    mouseleave(item, event: MouseEvent) {},
    mouseenter(item, event: MouseEvent) {},
  },
});
</script>