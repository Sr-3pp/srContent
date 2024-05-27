<template>
  <iframe
    class="sr-preview-iframe"
    :class="responsive.replace('-', '')"
    width="100%"
    height="100%"
    ref="iframeRef"
    src=""
    frameborder="0"
  ></iframe>
</template>

<script lang="ts" setup>
import { createApp, h, ref, onMounted, onBeforeUpdate } from "vue";
import { Container } from "./index";

const props = defineProps({
  appComponents: {
    type: Object,
    default: () => ({}),
  },
  content: {
    type: Array,
    default: () => [],
  },
  responsive: {
    type: String,
    default: "",
  },
  css: {
    type: String,
    default: "",
  },
  prefix: {
    type: String,
    default: "",
  },
});

const iframeRef: any = ref(null);
let iframeApp: any = null;

onMounted(() => {
  const iframeDocument = iframeRef.value.contentDocument;
  var arrStyleBlocks = parent.document.getElementsByTagName("style");
  var arrStyleSheets = parent.document.getElementsByTagName("link");

  Array.from([...arrStyleBlocks, ...arrStyleSheets]).forEach((styleBlock) => {
    iframeDocument.head.appendChild(styleBlock.cloneNode(true));
  });

  const el = iframeDocument.createElement("div");
  el.style.width = "100%";
  el.style.overflow = "hidden";
  iframeDocument.body.appendChild(el);

  iframeApp = createApp({
    render: () =>
      h(Container, {
        content: props.content as any,
      }),
  });

  const allComponents = { ...props.appComponents };

  Object.keys(allComponents).forEach((componentName) => {
    iframeApp.component(componentName, (allComponents as any)[componentName]);
  });

  iframeApp.mount(el);
});

onBeforeUpdate(() => {
  if (!iframeApp || !iframeRef.value) {
    return;
  }
  if (props.css) {
    const style = iframeRef.value.contentDocument.createElement("style");
    style.innerHTML = props.css;
    iframeRef.value.contentDocument.head.appendChild(style);
  }
});
</script>

<style lang="scss" scoped>
.sr-preview-iframe {
  border-radius: pxToRem(10);
  background-color: #fff;
  width: 100%;
  height: 100%;
  border: none;
  display: flex;
  margin: auto;
  max-width: pxToRem(350);

  &.sm {
    max-width: pxToRem(768);
  }

  &.md {
    max-width: pxToRem(1024);
  }
  &.lg {
    max-width: pxToRem(1440);
  }
  &.xl {
    max-width: pxToRem(1920);
  }
}
</style>
