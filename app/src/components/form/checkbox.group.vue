<template>
  <div class="checkbox-group">
    <VpCheckbox v-for="(op, index) in options" :key="index"></VpCheckbox>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    value: { type: Array as PropType<any[] | any> },
    options: { type: Array as PropType<{ text: string; value: any }[]> },
    type: { type: String, default: "checkbox" },
  },
});
</script>