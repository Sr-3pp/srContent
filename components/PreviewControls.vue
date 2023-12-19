<template>
  <header class="sr-preview-controls">
    <Container :with-padding="true">
      <fieldset>
        <legend>Preview Controls</legend>
        <FormSelect
          class="light"
          placeholder="Select a Page"
          :options="pagesOptions"
          v-model="page"
        />
        <div>
          <ul class="sr-preview-controls-resolutions">
            <li
              class="sr-preview-controls-resolution"
              v-for="(br, i) in breakpoints"
              :key="i"
            >
              <FormBox
                :label="br.name"
                type="radio"
                name="responsive"
                :value="br.value"
                :checked="resolution == br.value"
                v-model="resolution"
              />
            </li>
          </ul>
        </div>
        <FormButton @click="$emit('preview')" label="Preview" />
      </fieldset>
    </Container>
  </header>
</template>

<script lang="ts" setup>
import FormBox from "../components/Form/Box.vue";
import FormSelect from "../components/Form/Select.vue";
import FormButton from "../components/Form/Button.vue";

const props = defineProps({
  breakpoints: {
    type: Array as PropType<any[]>,
    default: (): any[] => [
      {
        name: "Mobile",
        value: "",
      },
      {
        name: "Portrait",
        value: "-sm",
      },
      {
        name: "Landscape",
        value: "-md",
      },
      {
        name: "Desktop",
        value: "-lg",
      },
      {
        name: "Large Desktop",
        value: "-xl",
      },
    ],
  },
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

const emit = defineEmits(["set-resolution", "preview"]);

const resolution = computed({
  get: () => props.responsive,
  set: (value) => {
    emit("set-resolution", value);
  },
});
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
