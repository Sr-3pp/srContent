<template>
  <div
    class="sr-notification"
    :class="css.class"
    :style="{ ...css.style }"
    @mouseenter="removeTimeout"
    @mouseleave="startTimeout"
  >
    <div class="sr-notification-content">
      <slot></slot>
      <component
        :is="component.component"
        v-bind="component.props"
        v-for="(component, i) in content"
        :key="i"
      ></component>
    </div>
    <button @click="$emit('close')" class="sr-notification-close">
      <svg
        clip-rule="evenodd"
        fill-rule="evenodd"
        stroke-linejoin="round"
        stroke-miterlimit="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { Component } from "../../types";
const props = defineProps({
  content: {
    type: Array<Component>,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  css: {
    type: Object,
    default: () => ({
      class: "",
      style: {},
    }),
  },
  interval: {
    type: Number,
    default: 5000,
  },
});

const emit = defineEmits(["close"]);

const timeout = ref<NodeJS.Timeout>(
  setTimeout(() => {
    emit("close");
  }, props.interval)
);

const removeTimeout = () => {
  clearTimeout(timeout.value);
};

const startTimeout = () => {
  timeout.value = setTimeout(() => {
    emit("close");
  }, props.interval);
};
</script>

<style lang="scss" scoped>
.sr-notification {
  --close-background-color: red;
  --close-color: white;
  --background-color: lightgray;
  --border-radius: #{pxToRem(10)};
  --border-width: #{pxToRem(2)};
  --border-style: none;
  --border-color: gray;

  position: relative;
  width: pxToRem(300);

  &-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: pxToRem(80);
    padding: pxToRem(10);
    border: {
      width: var(--border-width);
      style: var(--border-style);
      color: var(--border-color);
      radius: var(--border-radius);
    }
    background-color: var(--background-color);
  }

  &-close {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(-50%, -50%);
    background-color: var(--close-background-color);
    color: var(--close-color);
    border-radius: pxToRem(20);
    width: pxToRem(30);
    height: pxToRem(30);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: pxToRem(2);

    svg {
      fill: currentColor;
      width: 100%;
    }
  }
}
</style>
