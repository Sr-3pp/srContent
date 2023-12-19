<template>
  <div class="sr-form-tabs">
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
  responsive: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss">
.sr-form-tabs {
}
</style>
