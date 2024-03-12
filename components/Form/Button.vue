<template>
  <component
    :is="tag"
    v-bind="{ href, disabled }"
    class="sr-button"
    :class="{ [css.class]: css.class }"
    :style="{ ...css.style }"
  >
    {{ label }}
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
defineProps({
  tag: {
    type: String,
    default: "button",
  },
  href: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  css: {
    type: Object,
    default: () => ({
      class: "",
      style: {},
    }),
  },
});
</script>

<style lang="scss" scoped>
.sr-button {
  --button-bg-color: #161616;
  --button-color: #fff;
  --button-hover-bg-color: #000;
  --button-border: none;
  --button-font-size: #{pxToRem(14)};
  --button-text-align: center;
  --button-padding: #{pxToRem(10)} #{pxToRem(20)};

  background-color: var(--button-bg-color);
  color: var(--button-color);
  padding: var(--button-padding);
  text-align: var(--button-text-align);
  font-size: var(--button-font-size);
  border: var(--button-border);
  border-radius: pxToRem(8);
  text-transform: capitalize;
}
</style>
