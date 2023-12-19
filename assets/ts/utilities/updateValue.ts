import type { Component, ComponentProps } from "~/types";

export const updateValue = (
  component: Component,
  { key, value }: { key: string; value: string | Array<Component> }
) => {
  component.props[key] = value;
};
