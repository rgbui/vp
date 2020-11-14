<template>
  <div class="viewparse">
    <router-view></router-view>
    <div class="viewparse-load" v-if="loading == true">加载中</div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props:{
    loading:{type:Boolean,default:false}
  },
});
</script>
<style lang="less">
.viewparse-load {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  opacity: 0.7;
  background-color: #fff;
}
</style>