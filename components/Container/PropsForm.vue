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
  breakpoints: {
    type: Array,
    default: () => ["", "-sm", "-md", "-lg", "-xl"],
  },
});
</script>

<style scoped lang="scss">
.sr-container-form {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: pxToRem(20);
  fieldset {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    legend {
      width: auto;
    }
    width: calc(33.333% - pxToRem(20));
    min-width: pxToRem(300);
    > * {
      width: 100%;
    }
  }
}
</style>
