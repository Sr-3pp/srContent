<template>
  <div class="sr-form-test">
    <Form :fieldsets="fieldsets" @submit="submitForm" submit="enviar" />
  </div>
</template>

<script lang="ts" setup>
const submitForm = (data: any) => {
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
];
</script>

<style lang="scss"></style>
