<template>
  <div class="vp-text" :class="['vp-text-' + type]">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>