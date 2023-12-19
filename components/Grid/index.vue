<template>
  <div class="sr-grid" :class="{ ...css.class, editable }" :style="css.style">
    <button v-if="editable" @click="createColumn(false)" class="prepend-btn">
      Insert Column here
    </button>
    <slot></slot>
    <component
      v-for="(component, i) in content"
      :key="component"
      :is="component.component"
      v-bind="component.props"
      @input="updateValue(component, $event)"
      @change="updateValue(component, $event)"
      @toggle="updateValue(component, $event)"
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
    <button v-if="editable" @click="createColumn(true)" class="append-btn">
      Insert Column here
    </button>
    <ActionBox
      v-if="editable"
      @edit-props="$emit('edit-props', null, props)"
      @delete="$emit('delete')"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Component } from "../../types";
import ActionBox from "../ActionBox.vue";
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
  editable: {
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

const createColumn = (sw: boolean) => {
  props.content[sw ? "push" : "unshift"]({
    component: "GridColumn",
    props: {
      editable: true,
      size: { mobile: "1" },
      content: [
        { component: "Text", props: { text: "this is a test column" } },
      ],
    },
  });
};
</script>

<style lang="scss" scoped>
.sr-grid {
  --justify-content: start;
  --justify-content-sm: var(--justify-content);
  --justify-content-md: var(--justify-content-sm);
  --justify-content-lg: var(--justify-content-md);
  --justify-content-xl: var(--justify-content-lg);

  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  flex-basis: auto;
  flex-direction: row;
  justify-content: var(--justify-content);
  margin: pxToRem(-10);

  &.editable {
    --highlight-color: #f2be22;
    --highlight-hover-background: #9e7c15;
    margin: 0;
  }
}
</style>
