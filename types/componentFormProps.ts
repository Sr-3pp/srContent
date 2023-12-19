export interface ComponentFormProps {
  [key: string | number]: string | number | boolean | object | undefined;
  value: string | number | boolean;
  placeholder?: string;
  label?: string;
  name: string;
  type?: string;
  hint?: string;
  error?: string;
  info?: string;
  required?: boolean;
  options?: Array<any>;
}
