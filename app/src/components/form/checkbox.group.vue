<template>
  <div class="vp-check-group" :class="['vp-check-group-' + arrow]">
    <vp-check
      :style="checkStyle"
      v-for="(op, index) in options"
      :type="type"
      :key="index"
      :checked="isChecked(op)"
      :disabled="op.disabled == true || disabled == true ? true : false"
      @change="change(op, $event)"
      >{{ op.text }}</vp-check
    >
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    value: { type: Array as PropType<any[] | any> },
    options: { type: Array as PropType<{ text: string; value: any }[]> },
    type: { type: String, default: "checkbox" },
    multiple: { type: Boolean, default: false },
    /**
     * 水平对方v 还是 垂直对方 h
     */
    arrow: { type: String, default: "v" },
    disabled: { type: Boolean, default: false },
    gap: { type: Number },
  },
  computed: {
    checkStyle() {
      var style: Record<string, any> = {};
      if (this.arrow == "v") {
        style.marginRight = (this.gap || 10) + "px";
      } else if (this.arrow == "h") {
        style.marginBottom = (this.gap ||2) + "px";
      }
      return style;
    },
  },
  methods: {
    isChecked(op) {
      if (this.multiple == true) {
        if (
          Array.isArray(this.value) &&
          this.value.exists((x) => x == op.value)
        )
          return true;
        else return false;
      } else {
        if (this.value == op.value) return true;
        else return false;
      }
    },
    change(op, value: boolean) {
      if (this.multiple == true) {
        if (!Array.isArray(this.value)) this.$set(this, "value", []);
        if (value == true) {
          if (!this.value.exists((x) => x == op.value))
            this.value.push(op.value);
        } else {
          this.value.remove((x) => x == op.value);
        }
        this.$emit("change", this.value);
      } else {
        if (value == true) {
          if (typeof this.value == "undefined")
            this.$set(this, "value", op.value);
          else this.value = op.value;
          this.$emit("change", this.value);
        } else {
          if (typeof this.value == "undefined")
            this.$set(this, "value", op.value);
          else this.value = op.value;
          this.$forceUpdate();
        }
      }
    },
  },
});
</script>
<style lang="less">
.vp-check-group {
  display: flex;
  &-v {
    justify-content: flex-start;
    align-items: center;
  }
  &-h {
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>