
<template>
  <vp-dialoug ref="dialoug" icon="home:font" title="创建空间">
    <vp-panel>
      <vp-row label="名称:">
        <vp-col span="8">
          <vp-input v-model="name" @input="input" />
        </vp-col>
        <vp-col span="8" v-if="error">
          <vp-text type="error">{{ error }}</vp-text>
        </vp-col>
      </vp-row>
      <vp-row>
        <vp-col>
          <vp-button size="small" @click.native="create">创建</vp-button>
          <vp-button size="small" @click.native="close" type="grey"
            >取消</vp-button
          >
        </vp-col>
      </vp-row>
    </vp-panel>
  </vp-dialoug>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      name: "",
      error: "",
    };
  },
  computed: {
    dialoug() {
      return this.$refs.dialoug;
    },
  },
  methods: {
    input() {
      if (this.name) this.error = "";
      else this.error = "名称不能为空";
    },
    create() {
      this.error = "";
      if (this.name) {
        this.$emit("create", this.name);
      } else {
        this.error = "名称不能为空";
      }
    },
    cancel() {
      this.dialoug.close();
    },
  },
});
</script>