import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Container from "@/src/components/Container.vue";

describe("Container", () => {
  it("renders correctly", () => {
    const wrapper = mount(Container, {
      slots: {
        default: "<div>im the slot</div>",
      },
    });
    expect(wrapper.exists()).toBeTruthy();
  });
});
