<template>
  <div
    :class="[
      'vp-switch',
      {
        'vp-switch-checked': checked ? true : false,
        'vp-switch-disabled': disabled,
      },
    ]"
  >
    <span @click.stop="click"></span>
    <label><slot></slot></label>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  methods: {
    click(event: MouseEvent) {
      this.checked = this.checked ? false : true;
      this.$emit("change", this.checked);
    },
  },
});
</script>