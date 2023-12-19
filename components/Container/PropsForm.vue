<template>
  <div class="sr-container-form">
    <fieldset>
      <legend>With paddding</legend>
      <label>
        <input type="checkbox" v-model="containerElement.withPadding" />
      </label>
    </fieldset>
    <fieldset>
      <legend>Contained</legend>
      <label>
        <input type="checkbox" v-model="containerElement.contained" />
      </label>
    </fieldset>
    <fieldset>
      <legend>Calss</legend>
      <label>
        <input type="text" v-model="containerElement.css.class" />
      </label>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  containerElement: {
    type: Object,
    default: () => ({
      css: {
        class: "",
        style: {},
      },
    }),
  },
  responsive: {
    type: String,
    default: "",
  },
});

console.log(props.containerElement);
</script>

<style scoped lang="scss"></style>
