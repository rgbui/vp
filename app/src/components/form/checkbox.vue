<template>
  <strong
    class="vp-check"
    :class="[
      type ? 'vp-check-' + type : '',
      {
        'vp-check-checked': checked,
        'vp-check-disabled': disabled,
      },
    ]"
    @click="click"
  >
    <i></i>
    <span>
      <slot></slot>
    </span>
  </strong>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    /**
     * checkbox radio
     */
    type: { type: String, default: "checkbox" },
    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  methods: {
    click() {
      if (this.disabled == true) return;
      this.checked = this.checked == false ? true : false;
      this.$emit("change", this.checked);
    },
  },
});
</script>