<template>
  <ul class="media-list">
    <li class="media-list-item" v-for="(el, i) in media" :key="i">
      <button class="media-list-action" @click="$emit('set-media', el.url)">
        <img :src="el.url" :alt="el.alt" />
      </button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { Media } from "../../types";

defineProps({
  media: {
    type: Array<Media>,
    default: () => [],
  },
  type: {
    type: String,
    default: "img",
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
.media-list {
  display: flex;
  flex-wrap: wrap;
  gap: pxToRem(10);

  &-item {
    flex: 0 0 calc(50% - pxToRem(10));
  }

  &-action {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: pxToRem(10);
    img {
      width: 100%;
    }
  }
}
</style>
