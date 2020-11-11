<template>
  <div class="text-component">
    <vp-panel style="width: 1000px">
      <vp-row label="输入框:">
        <vp-col span="3">
          <vp-input placeholder="请输入帐号"></vp-input>
        </vp-col>
        <vp-col span="2">
          <vp-input type="password" placeholder="请输入密码"></vp-input>
        </vp-col>
        <vp-col span="2">
          <vp-input
            type="textarea"
            disabled
            placeholder="请输入文本"
          ></vp-input>
        </vp-col>
        <vp-col span="2">
          <vp-input type="text" clear placeholder="请输入搜索内容" />
        </vp-col>
        <vp-col span="3">
          <vp-input
            type="text"
            max-length="2"
            clear
            placeholder="请输入搜索内容"
          >
            <vp-icon icon="search:font" slot="prepend"></vp-icon>
          </vp-input>
        </vp-col>
      </vp-row>
      <vp-row label="数字输入框:">
        <vp-col span="3">
          <vp-number placeholder="请输入数字"></vp-number>
        </vp-col>
        <vp-col span="3">
          <vp-number placeholder="请输入数字" disabled></vp-number>
        </vp-col>
        <vp-col span="3">
          <vp-number clac placeholder="请输入数字" unit="x"></vp-number>
        </vp-col>
        <vp-col span="3">
          <vp-number
            placeholder="请输入数字"
            precision="2"
            step="0.2"
            min="0"
            max="10"
            unit="px"
          ></vp-number>
        </vp-col>
      </vp-row>
      <vp-row label="按钮">
        <vp-col span="2">
          <vp-button size="large">保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button>保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button size="small">保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button size="large" type="ghost">保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button type="ghost">保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button size="small" type="ghost">保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button size="small" disabled type="ghost">保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button size="small" type="blank">保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button size="small" type="blank" shape="circle"
            ><vp-icon icon='plus:font'></vp-icon
          ></vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button size="small" shape="rect">保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button loading size="small" shape="rect">保存</vp-button>
        </vp-col>
      </vp-row>
    </vp-panel>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>