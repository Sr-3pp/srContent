<template>
  <ol
    class="sr-accordion-group"
    :class="{ [css.class]: css.class }"
    :style="{ ...css.style }"
  >
    <slot></slot>
    <li
      class="sr-accordion-group-item"
      v-for="(accordion, i) in content"
      :key="i"
    >
      <Accordion
        v-bind="accordion.props"
        @input="updateValue(accordion, $event)"
        @toggle="toggleAccordions(accordion)"
        @change="updateValue(accordion, $event)"
        @delete="deleteElement(content, i)"
        @edit-props="($event: any, props: any) => {
Object.entries(props || {}).forEach(([key, value]: [string, any]) => accordion.props[key] = value)
          EmitHandler($event, accordion, (data: any) =>
            $emit('edit-props', data)
          )
        }
        "
        @component-list="
          EmitHandler($event, accordion, (data: any) =>
            $emit('component-list', data)
          )
        "
        @media-gallery="
          EmitHandler($event, accordion, (data: any) =>
            $emit('media-gallery', data)
          )
        "
        @icon-gallery="
          EmitHandler($event, accordion, (data: any) =>
            $emit('icon-gallery', data)
          )
        "
      />
    </li>
  </ol>
</template>

<script lang="ts" setup>
import type { Component } from "../../types";
import Accrodion from "./index.vue";
import {
  updateValue,
  EmitHandler,
  deleteElement,
} from "../../assets/ts/utilities";
const props = defineProps({
  content: {
    type: Array<Component>,
    default: () => [],
  },
  closeAll: {
    type: Boolean,
    default: false,
  },
  css: {
    type: Object,
    default: () => ({
      class: "",
      style: {},
    }),
  },
});

const toggleAccordions = (accordion: Component) => {
  const current: Component | undefined = props.content.find(
    (a: Component) => a.props.open
  );
  if (current && current != accordion) {
    current.props.open = false;
    accordion.props.open = !accordion.props.open;
  } else if (!current) {
    accordion.props.open = !accordion.props.open;
  }

  if (props.closeAll && current && current == accordion) {
    current.props.open = false;
  }
};
</script>

<style lang="scss" scoped>
.sr-accordion-group {
  &-item {
    &:not(:last-child) {
      margin-bottom: pxToRem(16);
    }
  }
}
</style>
