<template>
  <div class="sr-form-grid">
    <fieldset>
      <legend>Grid Properties</legend>
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
defineProps({
  gridElement: {
    type: Object,
    default: () => ({}),
  },
  responsive: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss">
.sr-form-grid {
}
</style>
