<template>
  <div class="home">
    <PreviewControls
      :responsive="responsive"
      @set-resolution="setResolution"
      @preview="previewSw = true"
    />
    <Modal
      :active="previewSw"
      @close="closePreview"
      v-bind="{ css: { class: 'preview-modal' } }"
    >
      <template #close>
        <span> X </span>
      </template>
      <template #header>
        <div class="sr-modal-header">
          <Container :with-padding="true">
            <h2>Preview</h2>
          </Container>
        </div>
      </template>
      <template #body>
        <div class="sr-modal-body">
          <Preview
            v-if="previewSw"
            :responsive="responsive"
            v-bind="{
              content: proccessContent(content) as any,
            }"
          />
        </div>
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

    <Modal :active="mediaSw" @close="mediaSw = false">
      <template #close>
        <span> X </span>
      </template>
      <template #body>
        <div class="sr-modal-body">
          <MediaList :media="mediaImgs" @setMedia="setPicture" />
        </div>
      </template>
    </Modal>

    <Modal :active="iconSw" @close="iconSw = false">
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

    <Modal :active="componentSw" @close="componentSw = false">
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

    <Modal
      class="component-props-modal"
      :active="propsSw"
      @close="propsSw = false"
      layout="bottom"
    >
      <template #close>
        <span> X </span>
      </template>
      <template #body>
        <div class="sr-modal-body">
          <TextPropsForm
            :responsive="responsive"
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
    <button @click="sideModalSw = true">open side modal</button>

    <Modal :active="sideModalSw" layout="top" @close="sideModalSw = false">
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

const mediaSw = ref(false);
const iconSw = ref(false);
const sideModalSw = ref(false);
const componentSw = ref(false);
const propsSw = ref(false);
const previewSw = ref(false);

const responsive = ref("");

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
  mediaSw.value = true;
  currentComponent.value.component = component;
};

const setPicture = (src: string) => {
  currentComponent.value.component.props.src = src;
  mediaSw.value = false;
};

const setIcon = (name: string) => {
  currentComponent.value.component.props.name = name;
  iconSw.value = false;
};

const IconGallery = (component: Component) => {
  iconSw.value = true;
  currentComponent.value.component = component;
};

const listComponents = ({
  component,
  sw,
}: {
  component: Component;
  sw: boolean;
}) => {
  componentSw.value = true;
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
  componentSw.value = false;
};

const editProps = (component: Component) => {
  propsSw.value = true;
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
};

const closePreview = () => {
  proccessContent(content.value, true);
  previewSw.value = false;
};

const setResolution = (resolution: string) => {
  responsive.value = resolution;
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
  .sr-modal-content {
    max-width: 100%;
    width: 100%;
    height: 100%;
    padding: 0;
    border-radius: 0;
  }

  .sr-modal-body {
    padding: pxToRem(20);
    max-height: 100vh;
    background-color: #161616;
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
