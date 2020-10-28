<template>
  <strong
    class="vp-check"
    :class="[
      type ? 'vp-check-' + type : '',
      {
        'vp-check-checked': value,
        'vp-check-disabled': disabled,
      },
    ]"
    @click="click"
  >
    <vp-icon
      class="define"
      v-if="checkedIcon || uncheckedIcon ? true : false"
      :icon="value ? checkedIcon : uncheckedIcon"
    />
    <i v-else></i>
    <span>
      <slot>{{ label }}</slot>
    </span>
  </strong>
</template>