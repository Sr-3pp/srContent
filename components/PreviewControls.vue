<template>
  <header class="sr-preview-controls">
    <Container>
      <fieldset>
        <legend>Preview Controls</legend>
        <FormSelect
          class="light"
          placeholder="Select a Page"
          :options="pagesOptions"
          v-model="page"
        />

        <FormButton @click="$emit('preview')" label="Preview" />
      </fieldset>
    </Container>
  </header>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import Container from "../components/Container/index.vue";
import FormSelect from "../components/Form/Select.vue";
import FormButton from "../components/Form/Button.vue";

const props = defineProps({
  pages: {
    type: Array as PropType<any[]>,
    default: (): any[] => [],
  },
  responsive: {
    type: String,
    default: "",
  },
});

const page = ref("");
const pagesOptions = computed(() => {
  return props.pages.map((page) => {
    return {
      name: page.title,
      value: page.url,
    };
  });
});

const emit = defineEmits(["preview"]);
</script>

<style lang="scss" scoped>
.sr-preview-controls {
  position: sticky;
  top: 0;
  z-index: 4;
  background: linear-gradient(
    90deg,
    rgba(255, 97, 110, 0.8) 0%,
    rgba(255, 195, 112, 0.8) 100%
  );
  box-shadow: 0 pxToRem(4) pxToRem(20) rgba(255, 97, 110, 0.5);
  margin-bottom: pxToRem(40);
  backdrop-filter: blur(pxToRem(10));
  .sr-container {
    display: flex;
    align-items: center;
    padding-top: pxToRem(20);
    padding-bottom: pxToRem(20);

    fieldset {
      > * {
        display: flex;
        width: auto;
      }
      .sr-form-select {
        width: pxToRem(200);
      }
    }
  }

  &-resolutions {
    display: flex;
  }
  &-resolution {
    &:not(:last-child) {
      margin-right: pxToRem(10);
    }
  }
}
</style>
