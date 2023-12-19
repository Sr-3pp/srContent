import { ComponentProps, ComponentFormProps } from "./index";

export interface Component {
  [key: string]:
    | string
    | boolean
    | number
    | Array
    | ComponentProps
    | ComponentFormProps;
  component: string;
  props: ComponentProps | ComponentFormProps;
}
