import type { Component } from "../../../types";

export const deleteElement = (parent: Component[], idx: number) => {
  parent.splice(idx, 1);
};
