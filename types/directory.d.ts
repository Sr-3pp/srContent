export interface Directory {
  [key: string]: string | Boolean | Directory[] | undefined | null;
  name: string;
  path: string;
  open?: boolean;
  children?: Directory[] | null;
}
