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
      v-if="editable ? true : false"
      @keyup.enter="enter"
      @keydown.backspace="backspace"
    />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>