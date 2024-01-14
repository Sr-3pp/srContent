<template>
  <label
    class="sr-form-input"
    :class="{ [css.class]: css.class }"
    :style="{ ...css.style }"
  >
    <input
      class="sr-form-input-input"
      :class="{ filled: modelValue, color: type === 'color' }"
      :name="name"
      :type="type"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      @input="updateValue"
    />
    <span class="sr-form-input-label"> {{ label }}</span>
    <div class="sr-form-input-feedback">
      <transition name="fade">
        <p
          v-if="error || info || hint"
          class="sr-form-input-hint"
          :class="{ error, info, hint }"
        >
          {{ error || info || hint }}
        </p>
      </transition>
    </div>
  </label>
</template>

<script lang="ts" setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  hint: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  info: {
    type: String,
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
      class: "",
      style: {},
    }),
  },
});

const emit = defineEmits(["input", "update:modelValue"]);

const updateValue = (event: any) => {
  emit("update:modelValue", event.target.value);
};
</script>

<style lang="scss" scoped>
.sr-form-input {
  position: relative;
  padding-top: pxToRem(25);
  overflow: hidden;

  input {
    appearance: none;
    width: 100%;
    height: 100%;
    padding: pxToRem(6);
    padding-right: pxToRem(20);
    border: {
      width: pxToRem(1);
      style: solid;
      color: var(--input-border-color);
    }
    border-radius: pxToRem(8);
    outline: none;
    font-size: pxToRem(16);
    transition: border 0.35s ease, box-shadow 0.35s ease;
    &:focus {
      border-color: rgba(227, 245, 255, 0.8);
      box-shadow: 0 0 pxToRem(16) var(--focus-shadow-color);
      background-color: var(--input-bg);
      backdrop-filter: blur(pxToRem(10));

      + .sr-form-input-label {
        animation-name: labelAnimation;
        top: pxToRem(10);
        transform: translateY(0%);
      }
    }
    &.filled {
      + .sr-form-input-label {
        animation-name: labelAnimation;
        top: pxToRem(10);
        transform: translateY(0%);
      }
    }

    &.color {
      height: pxToRem(40);
    }
  }

  &-label {
    display: flex;
    font-size: pxToRem(14);
    font-weight: 600;
    position: absolute;
    top: calc(50% + pxToRem(12));
    left: pxToRem(6);
    transform: translate(0, -50%);
    transition: top 0.35s ease;
    transition-delay: 0.16s;
    animation-duration: 0.6s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;

    @keyframes labelAnimation {
      from {
        transform: translate(0, -50%);
      }
      25% {
        transform: translate(-120%, -50%);
      }
      95% {
        transform: translate(-120%, -50%);
      }
      to {
        transform: translate(0%, -50%);
      }
    }
  }
}
</style>
