<template>
  <Container>
    <Form :fieldsets="testForm" @submit="saveForm" />

    <Picture
      @media-gallery="MediaGallery(picture)"
      :editable="true"
      :src="picture.props.src"
    >
      <figcaption>
        <Text text="Picture caption" />
      </figcaption>
    </Picture>

    <Grid>
      <GridColumn :size="{ mobile: '1', sm: '1/3' }">
        <Text text="Hello Grid e" />
      </GridColumn>
    </Grid>
  </Container>
</template>

<script lang="ts" setup>
import type { FieldSet, Component, ComponentFormProps } from "~/types";

const MediaGallery = (component: Component) => {
  console.log("open media gallery");
  component.props.src = "https://picsum.photos/200";
};

const testForm: Ref<FieldSet[]> = ref([
  {
    name: "Fieldset1",
    fields: [
      {
        component: "FormInput",
        props: {
          label: "Name",
          name: "name",
          value: "si que si",
          required: false,
        },
      },
      {
        component: "FormInput",
        props: {
          label: "Email",
          name: "email",
          value: "",
          type: "email",
          required: false,
        },
      },
      {
        component: "FormInput",
        props: {
          label: "Birthday",
          name: "birthday",
          value: "",
          type: "date",
          required: false,
        },
      },
      {
        component: "FormInput",
        props: {
          label: "Quantity",
          name: "quantity",
          value: 0,
          type: "number",
          required: false,
        },
      },
      {
        component: "FormSelect",
        props: {
          label: "Select",
          name: "select-test",
          placeholder: "type",
          value: "",
          required: true,
          options: [
            {
              name: "Option 1",
              value: 1,
            },
            {
              name: "Option 2",
              value: 2,
            },
            {
              name: "Option 3",
              value: 3,
            },
          ],
        },
      },
    ],
  },
]);

const picture = ref({
  component: "Picture",
  props: {
    src: "https://picsum.photos/300",
    editable: true,
  },
});

const saveForm = (data: any) => {
  console.log(data);
};
</script>
