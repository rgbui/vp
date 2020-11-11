<template>
  <div class="vp-panel"><slot></slot></div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  provide() {
    return {
      panel: this,
    };
  },
  props: {
    labelWidth: { type: Number },
    labelAlign: { type: String },
    labelValign: { type: String },
    align: { type: String },
    valign: { type: String },
    rowGap: { type: Number },
    colGap: { type: Number },
    lineGap:{type:Number}
  },
});
</script>