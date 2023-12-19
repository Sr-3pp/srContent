<template>
  <div class="component-detail">
    <p>component details here</p>
    <ol>
      <li v-for="(el, i) in page.content" :key="i">
        <component :is="el.type" v-bind="el.props"></component>
      </li>
    </ol>

    <p>Props:</p>
    <ul>
      <li v-for="([key, value], j) in Object.entries(page.props)" :key="j">
        <span>{{ key }}: </span>
        <span>{{ value }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { component: componentName } = route.params;

const { page } = await $fetch(`/api/content?page=components/${componentName}`);
</script>
