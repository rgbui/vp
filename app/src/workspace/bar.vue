<template>
  <div class="workspace-bar">
    <span class="workspace-bar-icon" v-if="icon ? false : true">{{
      name.substring(0, 1)
    }}</span>
    <span><img :src="icon" /></span>
    <span class="workspace-bar-name">{{ name }}</span>
    <div class="workspace-bar-operators">
      <a @click="openProperty($event)"
        ><vp-icon icon="ellipsis-h:font"></vp-icon
      ></a>
      <a @click="openSlider($event)"
        ><vp-icon icon="angle-double-left:font"></vp-icon
      ></a>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "WorkspaceBar",
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
    openProperty(event: MouseEvent) {},
    openSlider(event: MouseEvent) {},
  },
});
</script>
<style lang='less'>
.workspace {
  &-bar {
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    padding: @gap;
    box-sizing: border-box;
    &-icon {
      background-color: @primary-color;
      color: #fff;
      border-radius: @radius;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      text-transform: uppercase;
    }
    &-name {
      margin-left: @gap-space;
    }
    &-operators {
      visibility: hidden;
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .vp-icon {
        width: 30px;
        height: 30px;
        display: inline-flex;
        align-items: center;
        border-radius: @radius;
        justify-content: center;
        cursor: pointer;
        &:hover {
          background-color: @grey-background-2x;
        }
      }
    }
    &:hover {
      .workspace-bar-operators {
        visibility: visible;
      }
    }
  }
}
</style>