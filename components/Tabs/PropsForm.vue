<template>
  <div class="sr-tabs-form">
    <fieldset>
      <legend>Tabs Props</legend>
      <FormInput
        label="Active"
        v-model="tabsElement.active"
        type="number"
        name="justify-content"
      />
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import FormInput from "../Form/Input.vue";

defineProps({
  tabsElement: {
    type: Object,
    default: () => ({}),
  },
  breakpoints: {
    type: Array,
    default: () => ["", "-sm", "-md", "-lg", "-xl"],
  },
});
</script>

<style lang="scss">
.sr-tabs-form {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: pxToRem(20);
  fieldset {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    legend {
      width: auto;
    }
    width: calc(33.333% - pxToRem(20));
    min-width: pxToRem(300);
    > * {
      width: 100%;
    }
  }
}
</style>
