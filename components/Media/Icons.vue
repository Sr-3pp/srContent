<template>
  <ul class="media-list">
    <li class="media-list-item" v-for="(icon, i) in icons" :key="i">
      <button class="media-list-action" @click="$emit('set-media', icon.name)">
        <svg>
          <use :href="`${iconDir}/${icon.name}.svg#s`"></use>
        </svg>
      </button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps({
  icons: {
    type: Array<{ name: string }>,
    default: () => [],
  },
  iconDir: {
    type: String,
    default: "/icons",
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
