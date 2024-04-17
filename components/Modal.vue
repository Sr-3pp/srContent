<template>
  <dialog
    ref="modalEl"
    class="sr-modal"
    :class="{ active, [layout as string]: layout, [css.class]: css.class }"
    :style="{
      ...css.style,
      '--transition-duration': `${transitionDuration}ms`,
    }"
    @click="close"
  >
    <div class="sr-modal-container">
      <div class="sr-modal-content">
        <button class="sr-modal-close" @click="toggle">
          <slot name="close">
            <span>&times;</span>
          </slot>
        </button>

        <div v-if="$slots.header" class="sr-modal-header">
          <slot name="header" />
        </div>

        <div v-if="$slots.body" class="sr-modal-body">
          <slot name="body" />
        </div>

        <div v-if="$slots.footer" class="sr-modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { lockBody } from "../assets/ts/utilities";

const modalEl = ref();
const active = ref(false);

const props = defineProps({
  transitionDuration: {
    type: Number,
    default: 350,
  },
  layout: {
    type: String,
    default: "",
  },
  css: {
    type: Object,
    default: () => ({
      class: "",
      style: {},
    }),
  },
});

const close = (e: MouseEvent) => {
  if (e && (e.target as HTMLElement).nodeName !== "DIALOG") return;
  toggle();
};

const toggle = () => {
  active.value = !active.value;
  if (active.value) {
    modalEl.value.showModal();
  } else {
    setTimeout(() => {
      modalEl.value.close();
    }, props.transitionDuration);
  }

  lockBody(active.value);
};

defineExpose({
  toggle,
});
</script>

<style>
@keyframes sr-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes sr-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes sr-slide-up-in {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes sr-slide-up-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}

@keyframes sr-slide-down-in {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes sr-slide-down-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes sr-slide-left-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes sr-slide-left-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes sr-slide-right-in {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes sr-slide-right-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>

<style lang="scss" scoped>
.sr-modal {
  --transition-duration: 350ms;
  --transition-in: "sr-fade-in";
  --transition-out: "sr-fade-out";
  --modal-background: #fefefe;
  --backdrop-background-color: rgba(0, 0, 0, 0.4);
  --close-btn-background-color: red;
  --close-btn-color: white;

  display: none;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;

  &[open] {
    display: flex;
    animation: var(--transition-out) var(--transition-duration) forwards;

    &::backdrop {
      animation: "sr-fade-out" var(--transition-duration) forwards;
    }

    &.active {
      animation: var(--transition-in) var(--transition-duration) forwards;

      &::backdrop {
        animation: "sr-fade-in" var(--transition-duration) forwards;
      }
    }
  }

  &.full {
    margin: 0;
    width: 100vw;
    height: 100vh;
    max-width: inherit;
    max-height: inherit;
    .sr-modal-container,
    .sr-modal-content {
      width: 100%;
      height: 100%;
    }

    .sr-modal-container {
      padding: 0;
    }
  }

  &.left,
  &.right {
    &.sr-modal {
      margin: 0;
      max-width: inherit;
      max-height: inherit;
      height: 100vh;
      width: 100vw;
    }
    .sr-modal {
      &-content {
        width: 100%;
        margin: 0;
        min-width: pxToRem(300);
      }
      &-container {
        width: 30%;
        padding: 0;
      }
      &-container,
      &-content {
        height: 100%;
      }
    }
  }

  &.top,
  &.bottom {
    &.sr-modal {
      margin: 0;
      max-width: inherit;
      max-height: inherit;
      height: 100vh;
      width: 100vw;
    }
    .sr-modal {
      &-content {
        height: 100%;
        min-height: pxToRem(200);
        max-width: inherit;
      }

      &-container {
        height: 30%;
        padding: 0;
      }

      &-container,
      &-content {
        width: 100%;
      }
    }
  }

  &.top {
    .sr-modal {
      &-content {
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        top: 0;
        margin-top: 0;
        margin-bottom: auto;
      }

      &-container {
        margin-bottom: auto;
      }

      &-close {
        top: 0;
        right: 0;
        transform: none;
      }
    }
  }

  &.bottom {
    .sr-modal {
      &-content {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        top: inherit;
        bottom: 0;
        margin-bottom: 0;
        margin-top: auto;
      }
      &-container {
        margin-top: auto;
      }
    }
  }

  &.left {
    .sr-modal {
      &-content {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
        left: 0;
        margin-left: 0;
      }

      &-container {
        margin-right: auto;
      }

      &-close {
        top: pxToRem(10);
        right: 0;
        transform: translateX(50%);
      }
    }
  }

  &.right {
    .sr-modal {
      &-content {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        left: inherit;
        right: 0;
        margin-right: 0;
      }

      &-container {
        margin-left: auto;
      }

      &-close {
        top: pxToRem(10);
        right: inherit;
        left: 0;
        transform: translateX(-50%);
      }
    }
  }

  &-container {
    display: flex;
    padding: pxToRem(20);
  }

  &-content {
    position: relative;
    z-index: 2;
    background: var(--modal-background);
    border-radius: pxToRem(8);
    width: 100%;
    min-width: pxToRem(1100);
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-direction: column;
  }

  &-body {
    padding: pxToRem(20);
    overflow: auto;
    height: 100%;
    max-height: 80vh;
  }

  &-footer {
    padding: pxToRem(20);
    margin-top: auto;
  }

  &-close {
    width: pxToRem(30);
    height: pxToRem(30);
    border-radius: pxToRem(30);
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-50%, -50%);
    background-color: var(--close-btn-background-color);
    color: var(--close-btn-color);
    border: none;
    cursor: pointer;
    outline: none;
  }

  &::backdrop {
    background-color: var(--backdrop-background-color);
  }
}
</style>
