<template>
  <div class="viewparse-workspace-bar">
    <span v-if="icon ? false : true">{{ name.substring(0, 1) }}</span>
    <span><img :src="icon" /></span>
    <span>{{ name }}</span>
    <div class="viewparse-workspace-bar-operators">
      <span>
        <vp-icon icon="angle-down:font"></vp-icon>
        <vp-icon icon="angle-up:font"></vp-icon>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      name: "",
      id: "",
      icon: "",
    };
  },
  methods: {
    load(data) {
      for (var n in data) {
        this.$set(this, n, data[n]);
      }
    },
  },
});
</script>