export interface Directory {
  [key: string]: string | Boolean | Directory[];
  name: string;
  path: string;
  open?: boolean;
  children: Directory[];
}
