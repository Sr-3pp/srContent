<template>
  <div
    class="sr-container"
    :class="{ contained, withPadding, editable, [css.class]: css.class }"
    :style="{ ...css.style }"
  >
    <button
      @click="$emit('component-list', { component: { props }, sw: false })"
      v-if="editable"
      class="prepend-btn"
    >
      Prepend Element
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
    <button
      v-if="editable"
      @click="$emit('component-list', { component: { props }, sw: true })"
      class="append-btn"
    >
      Insert element here
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
  contained: {
    type: Boolean,
    default: true,
  },
  withPadding: {
    type: Boolean,
    default: false,
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
</script>

<style lang="scss" scoped>
.sr-container {
  --highlight-color: #22a699;
  --highlight-foreground: #ffffff;
  --highlight-hover-background: #125952;

  margin-left: auto;
  margin-right: auto;
  width: 100%;

  &.contained {
    padding-left: pxToRem(20);
    padding-right: pxToRem(20);

    @media (min-width: pxToRem(768)) {
      max-width: pxToRem(680);
      padding-left: 0;
      padding-right: 0;
    }
    @media (min-width: pxToRem(1024)) {
      max-width: pxToRem(960);
    }
    @media (min-width: pxToRem(1280)) {
      max-width: pxToRem(1100);
    }
    @media (min-width: pxToRem(1920)) {
      max-width: pxToRem(1400);
    }
  }

  &.withPadding {
    padding-top: pxToRem(20);
    padding-bottom: pxToRem(20);

    @media (min-width: pxToRem(768)) {
      padding-top: pxToRem(30);
      padding-bottom: pxToRem(30);
    }
    @media (min-width: pxToRem(1024)) {
      padding-top: pxToRem(50);
      padding-bottom: pxToRem(50);
    }

    & + .withPadding {
      padding-top: 0;
    }
  }
}
</style>
