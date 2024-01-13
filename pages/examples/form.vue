<template>
  <div class="sr-form-test">
    <Form :fieldsets="fieldsets" @submit="submitForm" submit="enviar" />
    <p><strong>Test:</strong> {{ testSw }}</p>
    <FormBox type="checkbox" label="Usar direccion de envio" v-model="testSw" />
  </div>
</template>

<script lang="ts" setup>
const testSw = ref(false);

const submitForm = (data: any) => {
  console.log(fieldsets);
  console.log(data);
};

const fieldsets = [
  {
    name: "Personal Information",
    fields: [
      {
        component: "FormInput",
        props: {
          label: "First Name",
          name: "first_name",
          type: "text",
          value: "",
        },
      },
      {
        component: "FormInput",
        props: {
          label: "Last Name",
          name: "last_name",
          type: "text",
          value: "",
        },
      },
      {
        component: "FormInput",
        props: {
          label: "Email",
          name: "email",
          type: "email",
          value: "",
        },
      },
      {
        component: "FormInput",
        props: {
          label: "Phone",
          name: "phone",
          type: "tel",
          value: "",
        },
      },
    ],
  },
  {
    name: "Address",
    fields: [
      {
        component: "FormInput",
        props: {
          label: "Street",
          name: "street",
          type: "text",
          value: "",
        },
      },
      {
        component: "FormInput",
        props: {
          label: "City",
          name: "city",
          type: "text",
          value: "",
        },
      },
      {
        component: "FormInput",
        props: {
          label: "State",
          name: "state",
          type: "text",
          value: "",
        },
      },
      {
        component: "FormInput",
        props: {
          label: "Zip",
          name: "zip",
          type: "text",
          value: "",
        },
      },
    ],
  },
  {
    name: "Message",
    fields: [
      {
        component: "FormInput",
        props: {
          label: "Message",
          name: "message",
          type: "textarea",
          value: "",
        },
      },
    ],
  },
  {
    name: "Select",
    fields: [
      {
        component: "FormSelect",
        props: {
          label: "Select",
          name: "select",
          options: [
            {
              label: "Option 1",
              value: "option1",
            },
            {
              label: "Option 2",
              value: "option2",
            },
            {
              label: "Option 3",
              value: "option3",
            },
          ],
          value: "",
        },
      },
    ],
  },
  {
    name: "Box",
    fields: [
      {
        component: "FormBox",
        props: {
          label: "Box",
          name: "box",
          value: true,
        },
      },
    ],
  },
];
</script>

<style lang="scss"></style>
