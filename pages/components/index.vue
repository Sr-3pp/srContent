<template>
  <div class="component-catalog">
    <Text text="Component list" />
    <ComponentList :components="components" />
  </div>
</template>

<script lang="ts" setup>
const components = await $fetch("/api/content?dir=components");
</script>
