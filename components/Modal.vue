<template>
  <div
    class="sr-modal"
    :class="{ active, 'active-done': activeDone, [layout as string]: layout, [css.class]: css.class }"
  >
    <div class="sr-modal-content">
      <button class="sr-modal-close" @click="toogleModal(false)">
        <slot name="close" />
      </button>
      <slot name="header" />
      <slot name="body" />
      <slot name="footer" />
    </div>
    <div @click="toogleModal(false)" class="sr-modal-backdrop"></div>
  </div>
</template>

<script lang="ts" setup>
import { lockBody } from "../assets/ts/utilities";

const activeDone = ref(false);

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
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

const emit = defineEmits(["close"]);

const toogleModal = (sw: boolean) => {
  if (sw) {
    setTimeout(() => {
      activeDone.value = true;
    }, 100);
  } else {
    activeDone.value = false;
    setTimeout(() => {
      emit("close");
    }, 300);
  }

  lockBody(sw);
};

watch(
  () => props.active,
  (sw) => {
    toogleModal(sw);
  }
);
</script>

<style lang="scss">
.sr-modal {
  --modal-background-color: #fefefe;
  --backdrop-background-color: rgba(0, 0, 0, 0.4);
  --close-btn-background-color: red;
  --close-btn-color: white;

  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.35s ease;

  &.left,
  &.right {
    .sr-modal {
      &-content {
        height: 100%;
        width: 30%;
        min-width: pxToRem(300);
      }
    }
    &.active-done {
      .sr-modal {
        &-content {
          transform: translateX(0);
        }
      }
    }
  }

  &.top,
  &.bottom {
    .sr-modal {
      &-content {
        height: 30%;
        width: 100%;
        min-height: pxToRem(200);
        max-width: inherit;
      }
    }
    &.active-done {
      .sr-modal {
        &-content {
          transform: translateY(0);
        }
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
        transform: translateY(-100%);
        transition: transform 0.35s ease, opacity 0.35s ease;
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
        transform: translateY(100%);
        transition: transform 0.35s ease, opacity 0.35s ease;
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
        transform: translateX(-100%);
        transition: transform 0.35s ease, opacity 0.35s ease;
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
        transform: translateX(100%);
        transition: transform 0.35s ease, opacity 0.35s ease;
      }

      &-close {
        top: pxToRem(10);
        right: inherit;
        left: 0;
        transform: translateX(-50%);
      }
    }
  }

  &.active {
    display: flex;

    &-done {
      opacity: 1;
    }
  }

  &-content {
    position: relative;
    z-index: 2;
    background-color: var(--modal-background-color);
    border-radius: pxToRem(8);
    width: 100%;
    max-width: pxToRem(1100);
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

  &-backdrop {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--backdrop-background-color);
  }
}
</style>
