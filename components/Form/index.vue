<template>
  <form
    class="sr-form"
    :class="{ [css.class]: css.class }"
    :style="{ ...css.style }"
    @submit.prevent="validateForm($event, submitForm)"
  >
    <fieldset v-for="(fieldset, i) in fieldsets" :key="i">
      <legend v-if="fieldset.name">{{ fieldset.name }}</legend>
      <component
        v-for="(field, j) in fieldset.fields"
        :key="j"
        :is="field.component"
        v-bind="field.props"
        v-model="field.props.value"
      ></component>
    </fieldset>
    <FormButton :label="submit"></FormButton>
  </form>
</template>

<script lang="ts" setup>
import { validateForm } from "../../assets/ts/utilities";
import type { FieldSet } from "../../types";
import FormButton from "./Button.vue";

defineProps({
  submit: {
    type: String,
    default: "Send",
  },
  fieldsets: {
    type: Array<FieldSet>,
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

const emit = defineEmits(["submit"]);

const submitForm = (data: any) => {
  emit("submit", data);
};

const setValue = (value: any) => {
  console.log(value);
};
</script>

<style lang="scss">
.sr-form {
  fieldset {
    display: flex;
    flex-direction: column;
    gap: pxToRem(10);
    padding: pxToRem(10);
    border: {
      width: pxToRem(1);
      style: solid;
      color: var(--input-border-color);
      radius: pxToRem(8);
    }
    box-shadow: 0 0 pxToRem(10) var(--shadow-color);

    &:not(:last-child) {
      margin-bottom: pxToRem(20);
    }
  }
  legend {
    font-size: pxToRem(16);
    color: var(--color);
  }
}
</style>
