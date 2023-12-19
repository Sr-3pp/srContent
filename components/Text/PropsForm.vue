<template>
  <div class="sr-text-form">
    <fieldset>
      <legend>Text Properties</legend>
      <div>
        <h5>Alignment</h5>
        <ul>
          <li>
            <FormBox
              label="Left"
              type="radio"
              name="alignment"
              value="left"
              v-model="textElement.css.style[`--text-align${responsive}`]"
            />
          </li>
          <li>
            <FormBox
              label="Center"
              type="radio"
              name="alignment"
              value="center"
              v-model="textElement.css.style[`--text-align${responsive}`]"
            />
          </li>
          <li>
            <FormBox
              label="Right"
              type="radio"
              name="alignment"
              value="right"
              v-model="textElement.css.style[`--text-align${responsive}`]"
            />
          </li>
        </ul>
      </div>

      <FormSelect
        label="Font Size"
        v-model="textElement.css.style[`--text-size${responsive}`]"
        :options="fontSizes.map((size) => ({ name: size.px, value: size.rem }))"
      />

      <FormInput
        label="color"
        type="color"
        v-model="textElement.css.style[`--text-color${responsive}`]"
      />

      <FormInput label="Class" v-model="textElement.css.class" />
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import { pxToRem } from "~/assets/ts/utilities";
import FormInput from "../Form/Input.vue";

defineProps({
  textElement: {
    type: Object,
    default: () => ({}),
  },
  responsive: {
    type: String,
    default: "",
  },
});

const fontSizes = [
  8, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44,
].map((px) => ({
  px: `${px}px`,
  rem: pxToRem(px),
}));
</script>

<style lang="scss">
.sr-text-form {
}
</style>
