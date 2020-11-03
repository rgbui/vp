
<template>
  <div class="button-group"><slot></slot></div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  provide() {
    return {
      group: this,
    };
  },
});
</script>