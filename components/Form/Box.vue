<template>
  <label
    class="sr-form-box"
    :class="{ [css.class]: css.class, [type]: type }"
    :style="{ ...css.style }"
  >
    <input
      tabindex="0"
      :type="type"
      :name="name"
      :value="value"
      :disabled="disabled"
      :checked="
        type == 'radio' ? Boolean(value == modelValue) : Boolean(modelValue)
      "
      @change="updateValue"
    />
    <span class="sr-form-box-box"></span>
    <span class="sr-form-box-label">
      {{ label }}
    </span>
    <div class="sr-form-box-feedback"></div>
  </label>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "checkbox",
  },
  name: {
    type: String,
    default: "sr",
  },
  value: {
    type: [String, Number, Boolean],
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

const updateValue = (event: any) => {
  if (props.type === "radio") {
    emit("update:modelValue", props.value);
  } else {
    emit("update:modelValue", event.target.checked);
  }
};
</script>

<style lang="scss" scoped>
.sr-form-box {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--box-color);
  input {
    width: 0;
    height: 0;
    appearance: none;
    position: absolute;
    opacity: 0;
    z-index: 0;

    &:checked + .sr-form-box-box {
      background-color: var(--box-bg);
      box-shadow: 0 0 pxToRem(10) var(--box-border-color);
      &::after {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.5);
      }
    }

    &:focus + .sr-form-box-box {
      box-shadow: 0 0 pxToRem(20) var(--focus-color);
      outline: {
        width: pxToRem(1);
        style: solid;
        color: var(--focus-color);
      }
    }
  }
  &-label {
    position: relative;
    z-index: 1;
    width: 100%;
    padding-top: pxToRem(4);
    color: var(--input-color);
  }
  &-box {
    width: pxToRem(16);
    height: pxToRem(16);
    flex-shrink: 0;
    border: {
      width: pxToRem(2);
      style: solid;
      color: var(--box-border-color);
      radius: pxToRem(4);
    }
    margin-right: pxToRem(10);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: pxToRem(2);
    transition: box-shadow 0.35s ease-in-out, background-color 0.35s ease-in-out;

    &::after {
      content: "✓";
      color: var(--box-check-color);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transform-origin: 0% 50%;
      width: 100%;
      opacity: 0;
      transition: opacity 0.35s ease-in-out, transform 0.35s ease-in-out;
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

  &.radio {
    .sr-form-box-box {
      border-radius: 50%;
    }
  }
}
</style>
