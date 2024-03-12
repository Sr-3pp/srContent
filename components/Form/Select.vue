<template>
  <label
    class="sr-form-select"
    :class="{ [css.class]: css.class, info, error, warning }"
    :style="{ ...css.style }"
  >
    <span v-if="label" class="label">
      {{ label }}
    </span>
    <select
      tabindex="0"
      :value="modelValue"
      :name="name"
      :disabled="disabled"
      :required="required"
      @change="handleChange"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="(option, i) in options" :value="option.value" :key="i">
        {{ option.name }}
      </option>
    </select>
    <span
      v-if="hint || info || warning || error"
      class="sr-form-select-feedback"
    >
      {{ hint || info || warning || error }}
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed } from "vue";
interface srSelectOption {
  name: string;
  value: string;
}
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<srSelectOption[]>,
    default: (): srSelectOption[] => [],
  },
  error: {
    type: String,
    default: "",
  },
  hint: {
    type: String,
    default: "",
  },
  info: {
    type: String,
    default: "",
  },
  warning: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  css: {
    type: Object,
    default: () => ({
      style: {},
      class: "",
    }),
  },
});

const emit = defineEmits(["update:modelValue"]);

const selected = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const handleChange = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<style lang="scss" scoped>
.sr-form-select {
  display: flex;
  flex-direction: column;
  color: #161616;
  .label {
    font-size: pxToRem(14);
    font-weight: 600;
    margin-bottom: pxToRem(8);
  }
  select {
    appearance: none;
    font-size: pxToRem(16);
    background: {
      image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="black" d="M2 0L0 2h4zm0 5L0 3h4z"/></svg>');
      repeat: no-repeat;
      position: right pxToRem(10) top 50%, 0 0;
      size: pxToRem(8) auto, 100%;
    }
    width: 100%;
    padding: pxToRem(6);
    padding-right: pxToRem(20);
    color: var(--input-color);
    border: {
      width: pxToRem(1);
      style: solid;
      color: var(--input-border-color);
    }
    border-radius: pxToRem(8);
    background-color: var(--input-bg);
    backdrop-filter: blur(pxToRem(10));
    outline: none;
    transition: border 0.35s ease, box-shadow 0.35s ease;
    &:focus {
      border-color: rgba(227, 245, 255, 0.8);
      box-shadow: 0 0 pxToRem(16) var(--focus-shadow-color);
    }
  }

  &.error {
    .sr-form-select-feedback {
      color: red;
    }
  }

  &.warning {
    .sr-form-select-feedback {
      color: orange;
    }
  }

  &.info {
    .sr-form-select-feedback {
      color: blue;
    }
  }

  &-feedback {
    display: flex;
    align-items: center;
    font-size: pxToRem(12);
    margin-top: pxToRem(6);
    font-weight: 300;
    color: currentColor;
  }
}
</style>
