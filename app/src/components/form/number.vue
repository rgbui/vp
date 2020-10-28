<template>
  <div
    :class="[
      'vp-number',
      {
        'vp-number-disabled': disabled,
      },
    ]"
  >
    <input
      ref="input"
      :readonly="readonly"
      :value="text"
      :disabled="disabled"
      @input="input"
      @blur="blur"
      @keydown.enter="enter"
      @mousedown.stop="mousedown"
      @keydown.46="remove($event)"
      @keydown.40.stop="down($event)"
      @keydown.33.stop="down($event)"
      @keydown.38.stop="up($event)"
      @keydown.34.stop="up($event)"
      @keydown="keydown"
    />
    <div class="vp-number-counter">
      <vp-icon
        icon="caret-up:font"
        class="vp-number-down"
        @click.native.stop="up"
      />
      <vp-icon
        icon="caret-down:font"
        class="vp-number-up"
        @click.native.stop="down"
      />
    </div>
    <span v-if="tip ? true : false" class="vp-number-tip">{{ tip }}</span>
  </div>
</template><script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>