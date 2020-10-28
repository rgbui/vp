<template>
  <li v-if="item.type == 'separator' || item.type == 'sp'" class="separator">
    <a href="javascript:void(0);"></a>
  </li>
  <li
    ref="li"
    v-else
    v-bind:class="itemClass"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  > <a
      href="javascript:void(0);"
      @mouseup.stop="mousedown"
      :title="item.title || item.text"
    >
      <u v-if="item.icon ? false : true">
        <i
          v-if="typeof checked == 'boolean'"
          v-html="
            $icon_html(
              checked
                ? item.checkedIcon || 'check:font'
                : item.uncheckedIcon || ''
            )
          "
        ></i>
      </u>
      <b v-if="item.icon">
        <vp-icon :icon="item.icon"></vp-icon>
      </b>
      <span>{{ item.text || item.title }}</span>
      <label v-if="item.label ? true : false">{{ item.label }}</label>
      <em
        v-if="item.childs && item.childs.length > 0"
        v-html="
          $icon_html(hover == true ? 'angle-right:font' : 'angle-down:font')
        "
      ></em>
    </a>
    <ol
      ref="ol"
      v-show="hover == true"
      v-if="item.childs && item.childs.length > 0"
      :style="{ width: $root.width + 'px' }"
    >
      <vp-contextmenu-item-panel
        v-for="item in item.childs"
        :key="item.id"
        v-bind="{ item: item, deep: deep + 1 }"
      >
      </vp-contextmenu-item-panel>
    </ol>
  </li>
</template>