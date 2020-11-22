<template>
  <div class="text-component" style="padding-bottom: 350px">
    <vp-dialoug icon="home:font" title="对话框" ref="dialoug">
      <vp-panel>
        <vp-row label="帐号:">
          <vp-col span="10"><vp-input /></vp-col>
        </vp-row>
        <vp-row label="姓别:">
          <vp-col span="10">
            <vp-check-group
              type="radio"
              :options="[
                { text: '男', value: 'body' },
                { text: '女', value: 'girl' },
              ]"
            ></vp-check-group>
          </vp-col>
        </vp-row>
        <vp-devide></vp-devide>
        <vp-row label="显示滚动条:">
          <vp-col>
            <vp-check-group
              arrow="h"
              type="radio"
              :options="[
                { text: '不显示', value: 'body' },
                { text: '随内容滚动', value: 'girl' },
                { text: '完全滚动', value: 'g1irl' },
              ]"
            ></vp-check-group>
          </vp-col>
        </vp-row>
        <vp-row label="默认浏览器:">
          <vp-col span="10">
            <vp-select
              :options="[
                { text: '不显示', value: 'body' },
                { text: '随内容滚动', value: 'girl' },
                { text: '完全滚动', value: 'g1irl' },
              ]"
            ></vp-select
          ></vp-col>
        </vp-row>
        <vp-row label="文稿数量:">
          <vp-col>
            需要大约<vp-select
              :block="false"
              style="width: 50px"
              value="10"
              :options="[
                { text: '10', value: 10 },
                { text: '20', value: 20 },
                { text: '30', value: 30 },
              ]"
            ></vp-select
            >个文稿
          </vp-col>
          <vp-col>
            <vp-check>记得勾选数据</vp-check>
          </vp-col>
        </vp-row>
        <vp-row label=" ">
          <vp-col>
            <vp-button size="small">保存</vp-button>
            <vp-button size="small" type="grey">取消</vp-button>
          </vp-col>
        </vp-row>
      </vp-panel>
    </vp-dialoug>
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
      <vp-row label="按钮:">
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
          <vp-button size="large" type="grey">保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button type="grey">保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button size="small" type="grey">保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button size="small" disabled type="grey">保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button size="small" type="danger">保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button size="small" type="danger" shape="circle"
            ><vp-icon icon="plus:font"></vp-icon
          ></vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button size="small" shape="rect">保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button loading size="small" shape="rect">保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button icon="home:font" size="small" type="text" shape="rect"
            >保存</vp-button
          >
        </vp-col>
        <vp-col span="2">
          <vp-button size="small" shape="rect" type="link">保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button size="small" shape="rect" type="solid">保存</vp-button>
        </vp-col>
        <vp-col span="2">
          <vp-button
            size="small"
            shape="circle"
            type="dashed"
            icon="home:font"
          ></vp-button>
        </vp-col>
      </vp-row>
      <vp-row label="复选框:">
        <vp-col span="3">
          <vp-check checked>选项</vp-check>
        </vp-col>
        <vp-col span="3">
          <vp-check type="radio">选项1</vp-check>
        </vp-col>
        <vp-col span="3">
          <vp-check type="radio" disabled>选项1</vp-check>
        </vp-col>
        <vp-col span="3">
          <vp-check-group
            :options="[
              { text: '鞋子', value: 'ssss' },
              { text: '衣服', value: 'sssx' },
            ]"
            multiple
          ></vp-check-group>
        </vp-col>
        <vp-col span="3">
          <vp-check-group
            type="radio"
            :options="[
              { text: '鞋子', value: 'ssss' },
              { text: '衣服', value: 'sssx' },
            ]"
            arrow="h"
          ></vp-check-group>
        </vp-col>
      </vp-row>
      <vp-row label="开关或标签:">
        <vp-col span="3">
          <vp-switch></vp-switch>
        </vp-col>
        <vp-col span="3">
          <vp-switch disabled></vp-switch>
        </vp-col>
        <vp-col span="3">
          <vp-tags :tags="['sjsis', 'xxxx']"></vp-tags>
        </vp-col>
      </vp-row>
      <vp-row label="下拉选择框:">
        <vp-col span="4">
          <vp-select
            :options="[
              { text: '跳舞', value: 'xxx' },
              { text: '跑步', value: 'sss' },
            ]"
          ></vp-select>
        </vp-col>
        <vp-col span="4">
          <vp-select
            placeholder="请选择"
            :drop-style="{ maxWidth: '80px', maxHeight: '30px' }"
            drop-align="right"
            :options="[
              { text: '跳舞', value: 'xxx' },
              { text: '跑步', value: 'sss' },
              {
                text: '小跑步',
                value: 'ssshh',
                childs: [
                  { text: '跳舞', value: 'xxx' },
                  { text: '跑步', value: 'sss' },
                ],
              },
            ]"
          ></vp-select>
        </vp-col>
        <vp-col span="4">
          <vp-select
            type="drop"
            :options="[
              { text: '跳舞', value: 'xxx' },
              { text: '跑步', value: 'sss' },
              {
                text: '小跑步',
                value: 'ssshh',
                childs: [
                  { text: '跳舞', value: 'xxx' },
                  { text: '跑步', value: 'sss' },
                ],
              },
            ]"
          ></vp-select>
        </vp-col>
        <vp-col span="4">
          <vp-select
            multiple
            :options="[
              { text: '跳舞', value: 'xxx' },
              { text: '跳舞disabled', disabled: true, value: 'xdisablexx' },
              { type: 'input', placeholder: '指令' },
              { text: '跑步', value: 'sss', type: 'check', check: true },
              {
                text: '小跑步',
                value: 'ssshh',
                childs: [
                  { text: '跳舞1', value: 'xxx1' },
                  { type: 'devide' },
                  {
                    type: 'des',
                    text: `默认情况下 onChange 里只能拿到 value，如果需要拿到选中的节点文本 label，可以使用 labelInValue 属性。
选中项的 label 会被包装到 value 中传递给 onChange 等函数，此时 value 是一个对象。`,
                  },
                  { text: '跑步2', value: 'sss2' },
                ],
              },
            ]"
          ></vp-select>
        </vp-col>
        <vp-col span="4">
          <vp-select
            type="drop"
            :options="[
              { text: '跳舞', value: 'xxx' },
              { text: '跑步', value: 'sss' },
              {
                text: '小跑步',
                value: 'ssshh',
                childs: [
                  { text: '跳舞', value: 'xxx' },
                  { text: '跑步', value: 'sss' },
                ],
              },
            ]"
          >
            <vp-icon icon="plus:font"></vp-icon>
          </vp-select>
        </vp-col>
      </vp-row>
      <vp-row label="对话框操作:">
        <vp-col span="3">
          <vp-button @click.native="openDialoug">打开对话框</vp-button>
        </vp-col>
        <vp-col span="3">
          <vp-button @click.native="closeDialoug">关闭对话框</vp-button>
        </vp-col>
      </vp-row>
      <vp-row label="文字显示:">
        <vp-col span="3">
          <vp-text>正常的文本显示</vp-text>
        </vp-col>
        <vp-col span="3">
          <vp-text type="link">正常的文本显示</vp-text>
        </vp-col>
        <vp-col span="3">
          <vp-text type="bold">正常的文本显示</vp-text>
        </vp-col>
        <vp-col span="3">
          <vp-text type="des">正常的文本显示</vp-text>
        </vp-col>
        <vp-col span="3">
          <vp-text type="code">正常的文本显示</vp-text>
        </vp-col>
        <vp-col span="3">
          <vp-text type="quote">正常的文本显示</vp-text>
        </vp-col>
      </vp-row>
      <vp-row label="进度条滑块:">
        <vp-col span="6"> <vp-slider :value="2"></vp-slider> </vp-col
        ><vp-col span="4">
          <vp-progress :value="68"></vp-progress>
        </vp-col>
      </vp-row>
      <vp-row label="提示和右键菜单:">
        <vp-col span="3"
          ><vp-tip tip="我要提示内容"
            ><vp-button>提示按钮</vp-button></vp-tip
          ></vp-col
        >
        <vp-col span="3"
          ><vp-tip tip="我要提示内容" direction="left"
            ><vp-button>提示按钮</vp-button></vp-tip
          ></vp-col
        >
        <vp-col span="3">
          <vp-button @contextmenu.native="contextmenu">右键菜单</vp-button>
        </vp-col>
      </vp-row>
      <vp-row label="日期:">
        <vp-col span="4">
          <vp-date></vp-date>
        </vp-col>
      </vp-row>
      <vp-row label="分页">
        <vp-col> <vp-pagination :total="50" :size="4"></vp-pagination></vp-col
      ></vp-row>
    </vp-panel>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { Contextmenu } from "../src/components/present/contextmenu.single";
import pagination from "../src/components/present/pagination.vue";
export default Vue.extend({
  components: { pagination },
  computed: {
    dialoug() {
      return this.$refs.dialoug;
    },
  },
  methods: {
    openDialoug() {
      this.dialoug.open();
    },
    closeDialoug() {
      this.dialoug.close();
    },
    contextmenu(event: MouseEvent) {
      event.preventDefault();
      Contextmenu.contextmenu.open(
        [
          { text: "复制", icon: "copy:font", label: "ctrl+x" },
          { text: "粘帖", icon: "cut:font", label: "ctrl+y" },
          { type: "devide" },
          { type: "input", value: "xxxx", text: "复制", label: "ctrl+x" },
          { text: "粘帖", label: "ctrl+y" },
          { type: "checked", check: true, text: "复制", label: "ctrl+x" },
          { text: "粘帖", label: "ctrl+y" },
          {
            text: "复制",
            label: "ctrl+x",
            childs: [
              { text: "样式1" },
              { text: "样式2" },
              { text: "样式3" },
              { text: "样式4" },
              { text: "样式5" },
              { text: "样式6" },
            ],
          },
          { text: "粘帖", label: "ctrl+y" },
        ],
        {
          x: event.pageX,
          y: event.pageY,
        }
      );
      Contextmenu.contextmenu.once("input", (item, event) => {
        console.log("input", item, event);
      });
      Contextmenu.contextmenu.once("mousedown", (item, event) => {
        console.log("mousedown", item, event);
      });
      Contextmenu.contextmenu.once("check", (item, event) => {
        console.log("click", item, event);
      });
    },
  },
});
</script>