<template>
  <div
    :class="[
      'vp-input',
      type == 'textarea' ? 'vp-textarea' : '',
      {
        'vp-input-disabled': disabled,
        'vp-input-append': $slots.append || clear ? true : false,
        'vp-input-prepend': $slots.prepend,
      },
    ]"
    :style="viewStyle"
  >
    <span v-if="$slots.prepend ? true : false">
      <slot name="prepend"></slot>
    </span>
    <input
      v-if="type != 'textarea'"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly || disabled"
      :style="style"
      @blur="blur"
      @input="input"
      @keydown.stop="keydown"
    />
    <textarea
      v-else
      :value="value"
      :readonly="readonly || disabled"
      @keydown.stop="keydown"
      :placeholder="placeholder"
      :disabled="disabled"
      :style="style"
      @blur="blur"
      @input="input"
    ></textarea>
    <span v-if="$slots.append ? true : false">
      <slot name="append"></slot>
    </span>
    <span
      class="vp-input-clean"
      v-else-if="clear ? true : false"
      @click="value = ''"
      style="cursor: pointer"
    >
      <vp-icon icon="remove:font" />
    </span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>