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
  background-color: #161616;
  color: #fff;
  padding: pxToRem(10) pxToRem(20);
  text-align: center;
  font-size: pxToRem(14);
  border: none;
  border-radius: pxToRem(8);
  text-transform: capitalize;
}
</style>
