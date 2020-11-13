<template>
  <div
    class="vp-tags"
    :class="[
      disabled ? 'vp-tags-disabled' : '',
      isFocus ? 'vp-tags-focus' : '',
    ]"
    tabindex="1"
    @focusin="focus"
    @focusout="blur"
  >
    <a v-for="(tag, index) in tags" :key="index">
      <span>{{ tag }}</span>
      <i @click.stop="remove(index)">&times;</i>
    </a>
    <input
      size="2"
      type="text"
      ref="input"
      v-if="readonly ? false : true"
      @keyup.enter="enter"
      @keyup.space="enter"
      @keyup="keyup"
      @keydown.delete="backspace"
    />
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    disabled: { type: Boolean, default: false },
    tags: { type: Array as PropType<string[]> },
    repeat: { type: Boolean, default: true },
  },
  data() {
    return {
      isFocus: false,
    };
  },
  computed: {
    input() {
      return this.$refs.input as HTMLInputElement;
    },
  },
  methods: {
    blur() {
      this.isFocus = false;
    },
    enter() {
      var value = this.input.value;
      if (value) value = value.trim();
      if (value) {
        if (!Array.isArray(this.tags)) this.$set(this, "tags", []);
        if (this.repeat == true) {
          this.tags.push(value);
          this.input.value = "";
          this.$forceUpdate();
          Vue.nextTick(() => {
            this.focus();
          });
          this.$emit("change", this.tags);
        } else {
          if (!this.tags.exists((x) => x == value)) {
            this.tags.push(value);
            this.input.value = "";
            this.$forceUpdate();
            Vue.nextTick(() => {
              this.focus();
            });
            this.$emit("change", this.tags);
          }
        }
      }
    },
    backspace() {
      if (!Array.isArray(this.tags)) this.$set(this, "tags", []);
      if (!this.input.value) {
        this.tags.splice(this.tags.length - 1, 1);
        this.$forceUpdate();
        Vue.nextTick(() => {
          this.focus();
        });
        this.$emit("change", this.tags);
      }
    },
    focus() {
      this.isFocus = true;
      this.input.focus();
    },
    remove(at: number) {
      if (!Array.isArray(this.tags)) this.$set(this, "tags", []);
      this.tags.splice(at, 1);
      this.$forceUpdate();
      Vue.nextTick(() => {
        this.focus();
      });
      this.$emit("change", this.tags);
    },
    autoInputWidth() {
      var value = this.input.value;
      (this.input as HTMLInputElement).setAttribute("size", value.length + 2);
    },
    keyup() {
      this.autoInputWidth();
    },
  },
});
</script>
<style lang="less">
.vp-tags {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  background-color: @grey;
  border-radius: @radius;
  border: 1px solid @grey-border-3x;
  box-shadow: @shadow-inner-2x;
  min-height: 22px;
  box-sizing: border-box;
  padding: 0px @gap-min @gap-min 0px;
  &-focus {
    border: 1px solid @primary-color;
  }
  a {
    background-color: @primary-highlight;
    padding: @gap-space 0px @gap-space 14px;
    margin: @gap-min 0px 0px @gap-min;
    border-radius: @radius;
    color: #fff;
    span {
      display: inline-block;
    }
    i {
      display: inline-block;
      margin: 0px @gap-space;
      visibility: hidden;
      width: 8px;
    }
    &:hover {
      background-color: @primary-color;
      i {
        visibility: visible;
      }
    }
  }
  input {
    margin: @gap-min 0px 0px @gap-min;
  }
}
</style>