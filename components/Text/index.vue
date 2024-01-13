<template>
  <component
    :is="tag"
    class="sr-text"
    :class="{ editable, [css.class]: css.class }"
    :style="{ ...css.style }"
  >
    <slot></slot>
    <div
      v-html="text"
      class="sr-text-container"
      @blur="emitValue"
      :contenteditable="editable"
    ></div>
    <ActionBox
      v-if="editable"
      @edit-props="$emit('edit-props', null, props)"
      @delete="$emit('delete')"
    />
  </component>
</template>

<script lang="ts" setup>
import ActionBox from "../ActionBox.vue";
const props: any = defineProps({
  text: {
    type: [String, Number],
    default: "",
  },
  tag: {
    type: String,
    default: "div",
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

const emit = defineEmits(["input", "edit-props", "delete"]);
const emitValue = (event: any) => {
  const text = event.target.innerText;
  emit("input", {
    key: "text",
    value: text,
  });
};
</script>

<style lang="scss" scoped>
.sr-text {
  --text-align: left;
  --text-align-sm: var(--text-align);
  --text-align-md: var(--text-align-sm);
  --text-align-lg: var(--text-align-md);
  --text-align-xl: var(--text-align-lg);

  --text-size: pxToRem(16);
  --text-size-sm: var(--text-size);
  --text-size-md: var(--text-size-sm);
  --text-size-lg: var(--text-size-md);
  --text-size-xl: var(--text-size-lg);

  --text-color: "currentColor";
  --text-color-sm: var(--text-color);
  --text-color-md: var(--text-color-sm);
  --text-color-lg: var(--text-color-md);
  --text-color-xl: var(--text-color-lg);

  --highlight-color: green;

  &-container {
    @include responsiveVars() using ($br) {
      text-align: var(--text-align#{$br});
      font-size: var(--text-size#{$br});
      color: var(--text-color#{$br});
    }
  }
}
</style>
