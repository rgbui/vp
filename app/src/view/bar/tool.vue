<template>
  <div class="designer-tool">
    <div class="designer-tool-bar"></div>
    <div class="designer-tool-operators">
      <vp-icon @click.native="publish" icon="location-arrow:font"></vp-icon>
      <vp-icon @click.native="settings" icon="cog:font"></vp-icon>
      <a class="user-face" @click.native="openUser">
        <span v-if="face ? false : true">{{ name.substring(0, 1) }}</span>
        <img v-else :src="face" />
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { user } from "../../user/user";
export default Vue.extend({
  data() {
    return {
      name: "",
      face: "",
    };
  },
  mounted() {
    var ui = user.userInfo;
    if (ui) {
      this.name = ui.name;
      this.face = ui.face;
    }
  },
  methods: {
    publish(event: MouseEvent) {},
    settings(event: MouseEvent) {},
    openUser(event: MouseEvent) {},
  },
});
</script>
<style lang="less">
.designer-tool {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  //   background-color: @grey-background;
  border-bottom: 1px solid @grey-border-2x;
  &-bar {
    flex-grow: 1;
  }
  &-operators {
    width: 100px;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .vp-icon {
      width: 30px;
      height: 30px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: @radius;
      cursor: pointer;
      &:hover {
        background-color: @grey-background;
      }
    }
    .user-face {
      display: flex;
      justify-content: center;
      align-items: center;
      > span {
        display: inline-block;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 50%;
        line-height: 30px;
        background-color: @primary-color;
        color: #fff;
        text-transform: uppercase;
      }
      img {
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
  }
}
</style>
