<template>
  <div :class="{ ...buildColumns(), editable }" :style="{ ...css.style }">
    <button
      v-if="editable"
      @click="$emit('component-list', { component: { props }, sw: false })"
      class="prepend-btn"
    >
      Insert element here
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
import type { Component } from "../../../types";
import ActionBox from "../../ActionBox.vue";
import {
  updateValue,
  EmitHandler,
  deleteElement,
} from "../../../assets/ts/utilities";
const props = defineProps({
  size: {
    type: Object,
    default: () => ({
      mobile: "1",
    }),
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
  editable: {
    type: Boolean,
    default: false,
  },
});
const buildColumns = () => {
  const { mobile, sm, md, lg, xl } = props.size;
  return {
    [`sr-grid-col-${mobile}`]: mobile,
    [`sm:sr-grid-col-${sm}`]: sm,
    [`md:sr-grid-col-${md}`]: md,
    [`lg:sr-grid-col-${lg}`]: lg,
    [`xl:sr-grid-col-${xl}`]: xl,
  };
};
</script>

<style lang="scss" scoped>
$breakpoint-sm: 48em;
$breakpoint-md: 64em;
$breakpoint-lg: 80em;
$breakpoint-xl: 90em;
$size-10: 0.625rem;

$_breakpoints: (
  sm: "print, (min-width: #{$breakpoint-sm})",
  md: "print, (min-width: #{$breakpoint-md})",
  lg: "(min-width: #{$breakpoint-lg})",
  xl: "(min-width: #{$breakpoint-xl})",
);

/** Keys need to be escaped twice: [1]@each -> [2]with-responsive (?) */
$_col-widths: (
  "1": 100%,
  "1\\/12": 8.333333%,
  "1\\/8": 12.5%,
  "1\\/6": 16.666667%,
  "1\\/5": 20%,
  "1\\/4": 25%,
  "1\\/3": 33.333333%,
  "2\\/5": 40%,
  "1\\/2": 50%,
  "3\\/5": 60%,
  "2\\/3": 66.666667%,
  "3\\/4": 75%,
  "4\\/5": 80%,
  "5\\/6": 83.333333%,
  "7\\/8": 87.5%,
  "11\\/12": 91.666667%,
);

[class*="sr-grid-col-"],
:deep([class*="sr-grid-col-"]) {
  --flex-direction: column;
  --flex-direction-sm: var(--flex-direction);
  --flex-direction-md: var(--flex-direction-sm);
  --flex-direction-lg: var(--flex-direction-md);
  --flex-direction-xl: var(--flex-direction-lg);

  --align-items: stretch;
  --align-items-sm: var(--align-items);
  --align-items-md: var(--align-items-sm);
  --align-items-lg: var(--align-items-md);
  --align-items-xl: var(--align-items-lg);

  --justify-content: flex-start;
  --justify-content-sm: var(--justify-content);
  --justify-content-md: var(--justify-content-sm);
  --justify-content-lg: var(--justify-content-md);
  --justify-content-xl: var(--justify-content-lg);

  display: flex;
  flex-basis: auto;
  flex-grow: 1;
  padding: pxToRem(10);

  @include responsiveVars() using ($br) {
    flex-direction: var(--flex-direction#{$br});
    align-items: var(--align-items#{$br});
    justify-content: var(--justify-content#{$br});
  }

  &.editable {
    --highlight-color: #f24c3d;
    --highlight-hover-background: #962f26;
    margin-top: pxToRem(10);
    margin-bottom: pxToRem(10);
  }
}

@each $col-key, $col-value in $_col-widths {
  .sr-grid-col-#{$col-key},
  :deep(.sr-grid-col-#{$col-key}) {
    width: $col-value;
    max-width: $col-value;
  }
}

@each $breakpoint-key, $breakpoint-value in $_breakpoints {
  @media #{$breakpoint-value} {
    @each $col-key, $col-value in $_col-widths {
      .#{$breakpoint-key}\:sr-grid-col-#{$col-key},
      :deep(.#{$breakpoint-key}\:sr-grid-col-#{$col-key}) {
        width: $col-value;
        max-width: $col-value;
      }
    }
  }
}
</style>
