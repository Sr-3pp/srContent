<template>
  <div class="sr-grid-form">
    <fieldset v-for="(responsive, i) in breakpoints" :key="i">
      <legend>
        Grid Properties -
        {{
          responsiveLabels[responsive == "" ? "mobile" : (responsive as string)]
        }}
      </legend>
      <div>
        <h5>Justify cintent</h5>
        <ul>
          <li>
            <FormBox
              label="Start"
              type="radio"
              name="justify-content"
              value="flex-start"
              v-model="gridElement.css.style[`--justify-content${responsive}`]"
            />
          </li>
          <li>
            <FormBox
              label="Center"
              type="radio"
              name="justify-content"
              value="center"
              v-model="gridElement.css.style[`--justify-content${responsive}`]"
            />
          </li>
          <li>
            <FormBox
              label="End"
              type="radio"
              name="justify-content"
              value="flex-end"
              v-model="gridElement.css.style[`--justify-content${responsive}`]"
            />
          </li>
        </ul>
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import FormBox from "../Form/Box.vue";
defineProps({
  gridElement: {
    type: Object,
    default: () => ({}),
  },
  breakpoints: {
    type: Array,
    default: () => ["", "-sm", "-md", "-lg", "-xl"],
  },
  responsiveLabels: {
    type: Object,
    default: () => ({
      mobile: "Mobile",
      "-sm": "Portrait",
      "-md": "Landscape",
      "-lg": "Desktop",
      "-xl": "Large Desktop",
    }),
  },
});
</script>

<style lang="scss">
.sr-grid-form {
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
