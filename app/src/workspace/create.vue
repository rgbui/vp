
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
      <vp-row label=" ">
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
import Axios from "axios";
import { user } from "../../user";
import Vue from "vue";
import { remote } from "../../util/remote";
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
  mounted() {
    this.dialoug.open();
  },
  methods: {
    input() {
      if (this.name) this.error = "";
      else this.error = "名称不能为空";
    },
    create() {
      this.error = "";
      if (this.name) {
        remote
          .post("/create/workspace", { name: this.name })
          .then((r) => {
            if (r && r.success == true) {
              var c = r.content;
              user.saveCache({ settings: { workspace_id: c.id } });
              this.$router.push({ name: "designer" });
            }
          })
          .catch((err) => {
            this.error = "网络错误";
          });
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