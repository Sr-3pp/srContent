<template>
  <ul>
    <li v-for="(component, i) in components" :key="i">
      <NuxtLink :to="component.url">
        {{ component.name }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { Component } from "../types";

defineProps({
  components: {
    type: Array<Component>,
    default: () => [],
  },
});
</script>
