<template>
  <div
    class="sr-accordion"
    :class="{ open, [css.class]: css.class }"
    :style="{ ...css.style }"
    ref="accordionEl"
  >
    <button
      @click="toggle"
      aria-label="Toggle acordion"
      class="sr-accordion-label"
    >
      <slot name="label"></slot>
      {{ label }}

      <div class="sr-accordion-label-chevron">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
          />
        </svg>
      </div>
    </button>
    <div class="sr-accordion-content">
      <slot name="content"></slot>
      <component
        v-for="(component, i) in content"
        :key="i"
        :is="component.component"
        v-bind="component.props"
        @input="updateValue(component, $event)"
        @change="updateValue(component, $event)"
        @delete="deleteElement(content, i)"
        @edit-props="($event: any, props: any) => {
Object.entries(props || {}).forEach(([key, value]: [string, any]) => component.props[key] = value)
          EmitHandler($event, component, (data: any) =>
            $emit('edit-props', data)
          )
        }
        "
        @component-list="
          EmitHandler($event, component, (data: any) =>
            $emit('component-list', data)
          )
        "
        @media-gallery="
          EmitHandler($event, component, (data: any) =>
            $emit('media-gallery', data)
          )
        "
        @icon-gallery="
          EmitHandler($event, component, (data: any) =>
            $emit('icon-gallery', data)
          )
        "
      ></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, defineExpose, nextTick } from "vue";
import type { Component } from "../../types";
import {
  updateValue,
  EmitHandler,
  deleteElement,
} from "../../assets/ts/utilities";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  transitionDuration: {
    type: Number,
    default: 350,
  },
  label: {
    type: String,
    default: "",
  },
  content: {
    type: Array<Component>,
    default: () => [],
  },
  css: {
    type: Object,
    default: () => ({
      class: "",
      style: {},
    }),
  },
});

const accordionEl = ref(null);
const open = ref(false);

const emit = defineEmits([
  "toggle",
  "edit-props",
  "component-list",
  "media-gallery",
  "icon-gallery",
]);

const toggle = () => {
  open.value = !open.value;
  emit("toggle", { key: "open", value: open.value });
};

const close = () => {
  open.value = false;
};

const openAccordion = () => {
  open.value = true;
};

defineExpose({
  toggle,
  close,
  openAccordion,
});

nextTick(() => {
  if (props.isOpen) {
    openAccordion();
  }
});
</script>

<style lang="scss" scoped>
.sr-accordion {
  display: flex;
  flex-direction: column;
  border: pxToRem(1) solid #ccc;
  border-radius: pxToRem(4);
  overflow: hidden;
  &-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: pxToRem(8) pxToRem(16);
    background-color: #eee;
    cursor: pointer;
    border: none;
    &:hover {
      background-color: #ddd;
    }

    &-chevron {
      color: currentColor;
      width: pxToRem(24);
      height: pxToRem(24);
      transition: transform 0.35s ease;
      svg {
        fill: currentColor;
      }
    }
  }
  &-content {
    padding-right: pxToRem(16);
    padding-left: pxToRem(16);
    background-color: #fff;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s ease-out, padding 0.35s ease;
  }

  &.open {
    .sr-accordion-label {
      background-color: #ddd;
    }
    .sr-accordion-content {
      max-height: 100vw;
      padding-top: pxToRem(10);
    }

    .sr-accordion-label-chevron {
      transform: rotate(180deg);
    }
  }
}
</style>
