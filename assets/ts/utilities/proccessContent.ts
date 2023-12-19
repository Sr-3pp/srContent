import type { Component } from "~/types";

export const proccessContent = (content: Component[], sw: boolean = false) => {
  const _content = content.map((component: Component) => {
    if (component.props) {
      component.props.editable = sw;
    }
    if (component.component && component.component.includes("Picture")) {
      component.props.width = "auto";
      component.props.height = "auto";
    }

    const elements =
      component.props?.content || component.props?.items || component.content;

    if (elements) {
      proccessContent(elements as Component[], sw);
    }

    return component;
  });
  return _content;
};
