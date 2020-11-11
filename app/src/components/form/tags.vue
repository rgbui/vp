<template>
  <div
    class="vp-tags"
    :class="[disabled ? 'vp-tags-disabled' : '']"
    @click="focus"
  >
    <a v-for="(tag, index) in tags" :key="index">
      <span>{{ tag }}</span>
      <vp-icon icon="close:svg" @click.native.stop="remove(index)"></vp-icon>
    </a>
    <input
      type="text"
      ref="input"
      v-if="readonly ? false : true"
      @keyup.enter="enter"
      @keydown.backspace="backspace"
    />
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    tags: { type: Array as PropType<string[]>, default: [] },
  },
  methods: {
    enter() {},
    backspace() {},
    focus() {},
    remove(at: number) {},
  },
});
</script>