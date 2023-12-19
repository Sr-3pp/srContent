<template>
  <div class="sr-breakpoint-selector">
    <fieldset>
      <legend>Resolution</legend>
      <label v-for="(br, i) in breakpoints" :key="i">
        <span>{{ br.name }}</span>
        <input
          type="radio"
          name="resolution"
          :value="br.value"
          v-model="responsive"
        />
      </label>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  breakpoints: {
    type: Array as PropType<any[]>,
    default: (): any[] => [
      {
        name: "Mobile",
        value: "",
      },
      {
        name: "Portrait",
        value: "-sm",
      },
      {
        name: "Landscape",
        value: "-md",
      },
      {
        name: "Desktop",
        value: "-lg",
      },
      {
        name: "Large Desktop",
        value: "-xl",
      },
    ],
  },
});

const responsive = ref("");

const emit = defineEmits(["set-resolution"]);

watch(
  () => responsive.value,
  (value) => {
    emit("set-resolution", value);
  }
);
</script>

<style scoped></style>
