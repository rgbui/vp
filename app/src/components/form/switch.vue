<template>
    <div :class='[
"vp-switch",
{
    "vp-switch-checked":value==trueValue?true:false,
    "vp-switch-disabled":disabled
}]'>
    <span @click.stop='click'></span>
    <label>{{label}}</label>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>