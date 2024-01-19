import type { FieldSet } from "../../../types";

const formatData = (data: any) => {
  const formattedData: any = {};

  const assignValue = (obj: any, key: string, value: any) => {
    if (key.includes(".")) {
      const keys: string[] = key.split(".") as string[];
      const parentKey: string = keys.shift() as string;
      if (!obj[parentKey]) {
        obj[parentKey] = {};
      }
      assignValue(obj[parentKey], keys.join("."), value);
    } else {
      obj[key] = value;
    }
  };

  Object.keys(data).forEach((key) => {
    const value = data[key];
    assignValue(formattedData, key, value);
  });
  return formattedData;
};

const validateMail = (mail: string) => {
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return mailRegex.test(mail);
};

const verifyFields = (data: any, field: any) => {
  const confirmationField = field.props.confirmation;
  const confirmationValue = data[confirmationField];
  const value = data[field.props.name];

  if (confirmationValue !== value) {
    return false;
  }

  return true;
};

export const validateForm = (
  $event: Event,
  form: FieldSet[],
  callback: Function
) => {
  const formData = new FormData($event.target as any);
  const data: any = {};
  [...formData.entries()].forEach(([key, value]) => {
    data[key] = value;
  });
  const errors: any = [];

  const checkData = (data: any, field: any, key: string) => {
    const error = {
      key,
      message: `${key.replace(/\./g, " ")} is required`,
    };

    if (field.props.type == "email" && !validateMail(field.props.value)) {
      error.message = "Please enter a valid email address";
      errors.push(error);
    } else if (field.props.confirmation && !verifyFields(data, field)) {
      error.message = "Fields do not match";
      errors.push(error);
    } else if (field.props.required && !data[key]) {
      errors.push(error);
    }
  };

  form.forEach((fieldset: FieldSet) => {
    fieldset.fields.forEach((field: any) => {
      checkData(data, field, field.props.name);
    });
  });

  if (errors.length > 0) {
    return callback({ errors });
  } else {
    const formattedData = formatData(data);
    return callback(formattedData);
  }
};
