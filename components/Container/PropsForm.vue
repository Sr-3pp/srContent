<template>
  <div class="sr-container-form">
    <fieldset>
      <FormBox v-model="containerElement.withPadding" label="With padding" />
    </fieldset>
    <fieldset>
      <FormBox v-model="containerElement.contained" label="Contained" />
    </fieldset>
    <fieldset>
      <legend>Calss</legend>
      <Input v-model="containerElement.css.class" />
    </fieldset>
    <fieldset class="style-fieldset">
      <legend>Style</legend>
      <template v-for="(style, s) in containerElement.css.style" :key="s">
        <Input
          v-if="!String(s).includes('image')"
          v-model="containerElement.css.style[s]"
          :label="String(s)"
        />
        <button
          v-else
          @click="
            EmitHandler($event, containerElement, (data: any) =>
              $emit('media-gallery', data)
            )
          "
        >
          <span>{{ s }}</span>
          <img :src="parseImgUrl(containerElement.css.style[s])" alt="" />
          <span>{{ parseImgUrl(containerElement.css.style[s]) }}</span>
        </button>
      </template>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import Input from "../Form/Input.vue";
import FormBox from "../Form/Box.vue";
import { EmitHandler } from "../../assets/ts/utilities";

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

const parseImgUrl = (url: string) => {
  return url.replace(`url('`, "").replace(`')`, "");
};
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

    &.style-fieldset {
      width: 100%;
      flex-direction: row;
      flex-wrap: wrap;
      gap: pxToRem(10);

      .sr-form-input {
        width: calc(33.33% - pxToRem(10));
      }
    }
  }
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    img {
      width: pxToRem(100);
    }
  }
}
</style>
