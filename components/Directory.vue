<template>
  <div class="sr-directory">
    <ol class="sr-directory-list">
      <li
        class="sr-directory-list"
        v-for="(item, i) in directory"
        :key="(item as any)"
      >
        <button
          class="sr-directory-action"
          :disabled="item.children.length == 0"
          @click="item.open = !item.open"
        >
          <span
            class="sr-directory-action-icon"
            :class="{ active: item.open }"
            v-if="item.children.length > 0"
          ></span>
          {{ item.name }}
        </button>
        <Directory
          v-if="item.open && item.children.length > 0"
          :directory="item.children"
        />
      </li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
import type { Directory } from "../types";

defineProps({
  directory: {
    type: Array<Directory>,
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
.sr-directory {
  &-list {
    list-style: none;
    margin: 0;

    .sr-directory-list {
      padding-left: pxToRem(10);
    }
  }
  &-action {
    display: flex;
    align-items: center;
    width: 100%;
    text-align: left;
    padding: pxToRem(10);
    border: none;
    background: transparent;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    &-icon {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: pxToRem(20);
      height: pxToRem(20);
      margin-right: pxToRem(10);
      border-radius: 50%;
      background-color: #333;
      color: white;
      &::before,
      &::after {
        content: "";
        display: block;
        background-color: currentColor;
        height: pxToRem(4);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      &::before {
        width: 70%;
      }
      &::after {
        width: pxToRem(4);
        height: 70%;
        max-height: 100%;
        transition: max-height 0.35s ease;
      }

      &.active {
        &::after {
          max-height: pxToRem(4);
        }
      }
    }

    .sr-directory-list {
      padding-left: pxToRem(20);
    }
  }
}
</style>
