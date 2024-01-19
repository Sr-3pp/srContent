import type { Component, ComponentProps } from "../../../types";

export const updateValue = (
  component: Component,
  { key, value }: { key: string; value: string | Array<Component> }
) => {
  if ("props" in component) {
    component.props[key] = value;
  }
};
