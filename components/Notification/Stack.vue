<template>
  <TransitionGroup name="slide-down" tag="ul" class="sr-notification-stack">
    <li
      class="sr-notification-stack-item"
      v-for="(notification, i) in notifications"
      :key="(notification as any)"
    >
      <Notification
        v-bind="(notification.props as any)"
        @close="notifications.splice(i, 1)"
      >
      </Notification>
    </li>
  </TransitionGroup>
</template>

<script lang="ts" setup>
import type { Component } from "../../types";
import Notification from "./index.vue";

defineProps({
  notifications: {
    type: Array<Component>,
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
</script>

<style lang="scss" scoped>
.slide-down-move,
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
}

.slide-down-leave-active {
  transform: translateY(100%);
}
.sr-notification-stack {
  position: fixed;
  padding: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column-reverse;
  gap: pxToRem(10);
  padding: pxToRem(10);

  .sr-icon {
    width: pxToRem(20);
    height: pxToRem(20);
  }
}
</style>
