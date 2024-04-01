<template>
  <div class="sr-column-form">
    <fieldset v-for="(responsive, i) in breakpoints" :key="i">
      <legend>
        Column Properties -
        {{
          responsiveLabels[responsive == "" ? "mobile" : (responsive as string)]
        }}
      </legend>
      <FormSelect
        label="Column size"
        v-model="
          columnElement.size[
            responsive == '' ? 'mobile' : (responsive as string).replace('-', '')
          ]
        "
        :options="Object.keys(sizes).map((size: any) => ({name: size, value: size}))"
      />

      <div>
        <h5>Items Alignment</h5>
        <ul>
          <li>
            <FormBox
              label="Stretch"
              type="radio"
              name="align-items"
              value="stretch"
              v-model="columnElement.css.style[`--align-items${responsive}`]"
            />
          </li>
          <li>
            <FormBox
              label="Start"
              type="radio"
              name="align-items"
              value="flex-start"
              v-model="columnElement.css.style[`--align-items${responsive}`]"
            />
          </li>
          <li>
            <FormBox
              label="Center"
              type="radio"
              name="align-items"
              value="center"
              v-model="columnElement.css.style[`--align-items${responsive}`]"
            />
          </li>
          <li>
            <FormBox
              label="End"
              type="radio"
              name="align-items"
              value="flex-end"
              v-model="columnElement.css.style[`--align-items${responsive}`]"
            />
          </li>
        </ul>
      </div>

      <div>
        <h5>Justify Content</h5>
        <ul>
          <li>
            <FormBox
              label="Start"
              type="radio"
              name="justify-content"
              value="flex-start"
              v-model="
                columnElement.css.style[`--justify-content${responsive}`]
              "
            />
          </li>
          <li>
            <FormBox
              label="Center"
              type="radio"
              name="justify-content"
              value="center"
              v-model="
                columnElement.css.style[`--justify-content${responsive}`]
              "
            />
          </li>
          <li>
            <FormBox
              label="End"
              type="radio"
              name="justify-content"
              value="flex-end"
              v-model="
                columnElement.css.style[`--justify-content${responsive}`]
              "
            />
          </li>
        </ul>
      </div>

      <div>
        <h5>Content Direction</h5>
        <ul>
          <li>
            <FormBox
              label="Column"
              type="radio"
              name="flex-direction"
              value="column"
              v-model="columnElement.css.style[`--flex-direction${responsive}`]"
            />
          </li>
          <li>
            <FormBox
              label="Row"
              type="radio"
              name="flex-direction"
              value="row"
              v-model="columnElement.css.style[`--flex-direction${responsive}`]"
            />
          </li>
        </ul>
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import FormBox from "../../Form/Box.vue";
import FormSelect from "../../Form/Select.vue";

defineProps({
  columnElement: {
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

//const sizes = ["1", "1/2", "1/3"];
const sizes = {
  "1": 100,
  "1/12": 8.333333,
  "1/8": 12.5,
  "1/6": 16.666667,
  "1/5": 20,
  "1/4": 25,
  "1/3": 33.333333,
  "2/5": 40,
  "1/2": 50,
  "3/5": 60,
  "2/3": 66.666667,
  "3/4": 75,
  "4/5": 80,
  "5/6": 83.333333,
  "7/8": 87.5,
  "11/12": 91.666667,
};
</script>

<style lang="scss">
.sr-column-form {
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
