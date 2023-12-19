import { Component } from "./component";

export interface ComponentProps {
  [key: string | boolean | number]:
    | string
    | number
    | boolean
    | Object
    | Component[];
  text?: string;
  alt?: string;
  src?: string;
  name?: string;
  content?: Component[];
  css?: {
    class: string;
    style: CSSProperties;
  };
}
