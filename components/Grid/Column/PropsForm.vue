<template>
  <div class="sr-form-column">
    <fieldset>
      <legend>Column Properties</legend>
      <FormSelect
        label="Column size"
        v-model="
          columnElement.size[
            responsive == '' ? 'mobile' : responsive.replace('-', '')
          ]
        "
        :options="sizes.map((size: any) => ({name: size, value: size}))"
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
defineProps({
  columnElement: {
    type: Object,
    default: () => ({}),
  },
  responsive: {
    type: String,
    default: "",
  },
});

const sizes = ["1", "1/2", "1/3"];
</script>

<style lang="scss">
.sr-form-column {
}
</style>
