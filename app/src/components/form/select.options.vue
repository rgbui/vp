<template>
  <ol class="vp-select-item-box">
    <li v-for="op in options" :key="op.value">
      <a
        :class="[
          'vp-select-item-' + (op.type ? op.type : 'option'),
          op.disabled ? 'vp-select-item-disabled' : '',
        ]"
        :style="optionStyle"
        v-if="op.type == 'option' || (op.type ? false : true)"
        @click="clickOption(op)"
      >
        <i>
          <vp-icon v-if="op.icon ? true : false" :icon="op.icon"></vp-icon>
        </i>
        <span>{{ op.text }}</span>
      </a>
      <a
        v-else-if="op.type == 'des'"
        :class="[
          'vp-select-item-' + (op.type ? op.type : 'option'),
          op.disabled ? 'vp-select-item-disabled' : '',
        ]"
        :style="optionStyle"
      >
        <i></i>
        <span>{{ op.text }}</span>
      </a>
      <a
        v-else-if="op.type == 'devide'"
        :class="[
          'vp-select-item-' + (op.type ? op.type : 'option'),
          op.disabled ? 'vp-select-item-disabled' : '',
        ]"
      >
      </a>
      <a
        v-else-if="op.type == 'check'"
        :class="[
          'vp-select-item-' + (op.type ? op.type : 'option'),
          op.disabled ? 'vp-select-item-disabled' : '',
        ]"
        :style="optionStyle"
        @click="checkOption(op)"
      >
        <i>
          <vp-icon
            v-if="op.check == true ? true : false"
            icon="check:font"
          ></vp-icon>
        </i>
        <span>{{ op.text }}</span>
      </a>
      <a
        v-else-if="op.type == 'input'"
        :class="[
          'vp-select-item-' + (op.type ? op.type : 'option'),
          op.disabled ? 'vp-select-item-disabled' : '',
        ]"
        :style="optionStyle"
      >
        <i></i>
        <input
          type="text"
          :value="op.value"
          :placeholder="op.placeholder"
          @input="inputOption(op, $event.target.value)"
        />
      </a>
      <a
        v-else-if="op.type == 'html'"
        v-html="op.text"
        :class="[
          'vp-select-item-' + (op.type ? op.type : 'option'),
          op.disabled ? 'vp-select-item-disabled' : '',
        ]"
        :style="optionStyle"
      >
      </a>
      <vp-select-options
        v-if="op.childs && op.childs.length > 0"
        :options="op.childs"
        :deep="deep + 1"
      >
      </vp-select-options>
    </li>
  </ol>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  name: "VpSelectOptions",
  inject: ["select"],
  props: {
    options: {
      type: Array as PropType<
        {
          text: string;
          value: any;
          icon?: string;
          type?: "option" | "des" | "devide" | "check" | "input" | "html";
        }[]
      >,
    },
    deep: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    optionStyle() {
      var style: Record<string, any> = {};
      style.paddingLeft = this.deep * 20 + "px";
      return style;
    },
  },
  methods: {
    clickOption(option) {
      if (this.select) this.select.clickOption(option);
    },
    checkOption(option) {
      if (this.select) this.select.checkOption(option);
    },
    inputOption(option, value) {
      if (this.select) this.select.inputOption(option, value);
    },
  },
});
</script>
<style lang="less">
.vp-select-item {
  &-box {
    > li {
      > a {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-right: @gap;
        margin-top:@gap-space;
        margin-bottom:@gap-space;
      }
    }
  }

  &-option,
  &-check {
    min-height: 22px;
    > i {
      width: 22px;
      height: 22px;
      display:inline-flex;
      color: @text-color;
      justify-content: center;
      align-items: center;
    }
    > span {
      display: inline-block;
      color: @text-color;
    }
    &:hover {
      background-color: @primary-color;
      span,
      i {
        color: #fff;
      }
    }
  }
  &-des {
    min-height: 22px;
    > i {
      width: 22px;
      height: 22px;
      display: inline-block;
      flex-shrink: 0;
    }
    > span {
      display: inline-block;
      color: @text-color-disabled;
    }
  }
  &-devide {
    height: 12px;
    position: relative;
    &::after {
      content: "\20";
      position: absolute;
      top: 5px;
      height: 1px;
      left: 0px;
      right: 0px;
      background-color: @grey-border-3x;
    }
  }
  &-input {
    i {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
    }
    input {
      height: @height;
      width: 100%;
      box-sizing: border-box;
      color: @text-color;
      background-color: @grey;
      border-radius: @radius;
      border: 1px solid @grey-border-3x;
      box-shadow: @shadow-inner-2x;
      text-indent: @gap-min;
      &::-webkit-input-placeholder {
        color: @text-color-disabled;
      }
    }
  }
  &-disabled {
    min-height: 22px;
    > i {
      width: 22px;
      height: 22px;
      display: inline-block;
      color: @text-color-disabled;
    }
    > span {
      display: inline-block;
      color: @text-color-disabled;
    }
    &:hover {
      background-color: transparent;
      i,
      span {
        color: @text-color-disabled;
      }
    }
  }
}
</style>