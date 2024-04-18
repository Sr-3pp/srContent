<template>
  <div class="home">
    <PreviewControls
      :responsive="responsive"
      @set-resolution="setResolution"
      @preview="showPreview"
      @close="closePreview"
    />
    <Modal ref="previewModal" class="preview-modal" layout="full">
      <template #close>
        <span> X </span>
      </template>
      <template #header>
        <Container :with-padding="true">
          <h2>Preview</h2>
          <ul class="sr-preview-controls-resolutions">
            <li
              class="sr-preview-controls-resolution"
              v-for="(br, i) in breakpoints"
              :key="i"
            >
              <FormBox
                :label="br.name"
                type="radio"
                name="responsive"
                :value="br.value"
                :checked="responsive == br.value"
                v-model="responsive"
              />
            </li>
          </ul>
        </Container>
      </template>
      <template #body>
        <Preview
          v-if="previewSw"
          :responsive="responsive"
          v-bind="{
              content: proccessContent(content) as any,
            }"
        />
      </template>
    </Modal>

    <Container
      class="content-container"
      @edit-props="editProps"
      @media-gallery="MediaGallery"
      @icon-gallery="IconGallery"
      @component-list="listComponents"
      :with-padding="false"
      :content="content"
      :editable="true"
    />

    <Container :with-padding="true">
      <Directory :directory="testDir"></Directory>
    </Container>

    <button @click="saveContent">save</button>

    <Modal ref="mediaModal">
      <template #close>
        <span> X </span>
      </template>
      <template #body>
        <div class="sr-modal-body">
          <MediaList :media="mediaImgs" @setMedia="setPicture" />
        </div>
      </template>
    </Modal>

    <Modal ref="iconModal">
      <template #close>
        <span> X </span>
      </template>
      <template #body>
        <div class="sr-modal-body">
          <p>Display Icon gallery here</p>
          <MediaIcons :icons="mediaIcons" @setMedia="setIcon" />
        </div>
      </template>
    </Modal>

    <Modal ref="componentModal">
      <template #close>
        <span> X </span>
      </template>
      <template #body>
        <div class="sr-modal-body">
          <p>Display Icon gallery here</p>
          <button @click="insertComponent">Add component</button>
        </div>
      </template>
    </Modal>

    <Modal class="component-props-modal" ref="propsModal" layout="bottom">
      <template #close>
        <span> X </span>
      </template>
      <template #body>
        <div class="sr-modal-body">
          <TextPropsForm
            :responsive="responsive"
            @clear-breakpoint="clearBreakpoint"
            v-if="currentComponent.component.component == 'Text'"
            :text-element="currentComponent.component.props"
          />
          <GridPropsForm
            :responsive="responsive"
            v-if="currentComponent.component.component == 'Grid'"
            :grid-element="currentComponent.component.props"
          />
          <GridColumnPropsForm
            :responsive="responsive"
            v-if="currentComponent.component.component == 'GridColumn'"
            :column-element="currentComponent.component.props"
          />
          <ContainerPropsForm
            :responsive="responsive"
            v-if="currentComponent.component.component == 'Container'"
            :container-element="currentComponent.component.props"
          />
          <TabsPropsForm
            :responsive="responsive"
            v-if="currentComponent.component.component == 'Tabs'"
            :tabs-element="currentComponent.component.props"
          />
        </div>
      </template>
    </Modal>

    <NotificationStack :notifications="notifications" />
    <button @click="notify">push notification</button>
    <button @click="(sideModal as any).toggle()">open side modal</button>

    <Modal
      ref="sideModal"
      layout="top"
      style="--transition-in: sr-slide-up-in; --transition-out: sr-slide-up-out"
    >
      <template #close>
        <span> X </span>
      </template>
      <template #body>
        <div class="sr-modal-body">
          <p>this is a side modal</p>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { proccessContent } from "~/assets/ts/utilities";
import type { Component, Media, Directory } from "~/types";

const { page }: any = await $fetch("/api/content?page=index");
const content = ref(page.content);

content.value = proccessContent(content.value, true);

const mediaModal = ref(null);
const iconModal = ref(null);
const sideModal = ref(null);
const componentModal = ref(null);
const propsModal = ref(null);
const previewModal = ref(null);
const previewSw = ref(false);

const responsive = ref("");

const breakpoints = [
  {
    name: "Mobile",
    value: "",
  },
  {
    name: "Portrait",
    value: "-sm",
  },
  {
    name: "Landscape",
    value: "-md",
  },
  {
    name: "Desktop",
    value: "-lg",
  },
  {
    name: "Large Desktop",
    value: "-xl",
  },
];

const mediaImgs: Media[] = await $fetch<Media[]>("/api/media/img");
const mediaIcons = await $fetch("/api/media/icons");

const testDir: Ref<Directory[]> = ref([
  {
    name: "dir1",
    path: "/dir1",
    children: [
      {
        name: "dir1-1",
        path: "/dir1/dir1-1",
        children: [
          {
            name: "dir1-1-1",
            path: "/dir1/dir1-1/dir1-1-1",
            children: [
              {
                name: "dir1-1-1-1",
                path: "/dir1/dir1-1/dir1-1-1/dir1-1-1-1",
                children: [],
              },
            ],
          },
          {
            name: "dir1-1-1",
            path: "/dir1/dir1-1/dir1-1-1",
            children: [
              {
                name: "dir1-1-1-1",
                path: "/dir1/dir1-1/dir1-1-1/dir1-1-1-1",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "dir2",
    path: "/dir2",
    children: [
      {
        name: "dir2-1",
        path: "/dir2/dir2-1",
        children: [
          {
            name: "dir2-1-1",
            path: "/dir2/dir2-1/dir2-1-1",
            children: [
              {
                name: "dir2-1-1-1",
                path: "/dir2/dir2-1/dir2-1-1/dir2-1-1-1",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
]);

const notify = () => {
  notifications.value.push({
    component: "Notification",
    props: {
      content: [
        {
          component: "Text",
          props: {
            text: "This is a notification",
          },
        },
      ],
      css: {
        class: "new",
      },
    },
  } as Component);
};

const notifications: Ref<Component[]> = ref([]);

const currentComponent = ref<{ component: Component; sw?: boolean }>({
  component: {
    component: "",
    props: {},
  },
  sw: false,
});

const saveContent = async () => {
  await $fetch("/api/content?page=index&path=page.content", {
    method: "PUT",
    body: proccessContent(content.value, false),
  });
  notifications.value.push({
    component: "Notification",
    props: {
      content: [
        {
          component: "Text",
          props: {
            text: "Content saved",
          },
        },
      ],
      css: {
        class: "new",
      },
    },
  } as Component);

  proccessContent(content.value, true);
};

const MediaGallery = (component: Component) => {
  if (mediaModal.value) (mediaModal as any).value.toggle();
  currentComponent.value.component = component;
};

const setPicture = (src: string) => {
  currentComponent.value.component.props.src = src;
  if (mediaModal.value) (mediaModal as any).value.toggle();
};

const setIcon = (name: string) => {
  currentComponent.value.component.props.name = name;
  if (iconModal.value) (iconModal as any).value.toggle();
};

const IconGallery = (component: Component) => {
  if (iconModal.value) (iconModal as any).value.toggle();
  currentComponent.value.component = component;
};

const listComponents = ({
  component,
  sw,
}: {
  component: Component;
  sw: boolean;
}) => {
  if (componentModal.value) (componentModal as any).value.toggle();
  currentComponent.value.component = component;
  currentComponent.value.sw = sw;
};

const insertComponent = () => {
  const sw = currentComponent.value.sw;

  (currentComponent.value.component.props.content as Component[])[
    sw ? "push" : "unshift"
  ]({
    component: "Text",
    props: {
      text: "This is a text component",
    },
  });
  if (componentModal.value) (componentModal as any).value.toggle();
};

const editProps = (component: Component) => {
  if (propsModal.value) (propsModal as any).value.toggle();
  currentComponent.value.component = component || {
    component: "Container",
    props: {
      withPadding: true,
      contained: true,
      content: content.value,
      css: {
        class: "the-class",
        style: {},
      },
    },
  };
};

const showPreview = () => {
  previewSw.value = true;
  if (previewModal.value) (previewModal as any).value.toggle();
};

const closePreview = () => {
  previewSw.value = false;
  proccessContent(content.value, true);
  if (previewModal.value) (previewModal as any).value.toggle();
};

const setResolution = (resolution: string) => {
  responsive.value = resolution;
};

const clearBreakpoint = (resolution: string) => {
  Object.keys(
    (currentComponent as any).value.component.props.css.style
  ).forEach((key: string) => {
    if (key.includes(resolution)) {
      delete (currentComponent as any).value.component.props.css.style[key];
    }
  });
};
</script>

<style lang="scss">
.home {
}

.content-container {
  padding: pxToRem(20);
}

.top-bar {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 2;
  margin-bottom: pxToRem(20);
}

.preview-modal {
  .sr-modal-header {
    .sr-container {
      display: flex;

      h2 {
        margin-right: pxToRem(20);
      }
    }
  }

  .sr-modal-body {
    padding: pxToRem(20);
    max-height: 100vh;
    background-color: #161616;
    /* Hide scrollbar for Chrome, Safari and Opera */
    iframe {
      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
  }

  .sr-modal-close {
    top: pxToRem(20);
    right: pxToRem(20);
    transform: none;
  }
}

.component-props-modal {
  .sr-modal-content {
    background: linear-gradient(
      90deg,
      rgba(255, 97, 110, 0.8) 0%,
      rgba(255, 195, 112, 0.8) 100%
    );
    box-shadow: 0 pxToRem(4) pxToRem(20) rgba(255, 97, 110, 0.5);
    margin-bottom: pxToRem(40);
    backdrop-filter: blur(pxToRem(10));
  }
}

.sr-notification.new {
  .sr-notification-content {
    background-color: green;
  }
}
</style>
